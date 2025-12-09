import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminHotelForm from "../../components/admin/hotels/AdminHotelForm";
import { adminHotelApi } from "../../api/adminHotelApi";
import { adminRoomApi } from "../../api/adminRoomApi"; // 객실 API
import Loader from "../../components/common/Loader";

const AdminHotelEditPage = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. 호텔 정보 로드 (목록에서 찾거나 개별 조회)
        // 백엔드에 /owner/hotel/:id API가 없다면 목록에서 필터링해야 할 수도 있음
        // 여기서는 API가 있다고 가정하고 호출 시도, 실패 시 목록에서 검색 로직 필요 가능성 있음
        try {
            // 임시: 상세 조회 API가 없으면 목록을 불러와서 찾음
            const listRes = await adminHotelApi.getOwnerHotels();
            const found = listRes.data.items.find(h => h._id === hotelId || h.id === hotelId);
            if(found) setHotel(found);
        } catch(e) { console.log(e); }

        // 2. 객실 목록 로드
        const roomRes = await adminRoomApi.getRooms(hotelId);
        setRooms(roomRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [hotelId]);

  const handleUpdateHotel = async (formData) => {
    try {
      await adminHotelApi.updateHotel(hotelId, formData);
      alert("호텔 정보가 수정되었습니다.");
    } catch (err) {
      alert("수정 실패: " + err.message);
    }
  };

  // 객실 추가 핸들러
  const handleAddRoom = async () => {
    const name = prompt("객실 이름 (예: 디럭스룸):");
    if (!name) return;
    const price = prompt("1박 가격 (숫자만):");
    const capacity = prompt("수용 인원:", "2");

    try {
      await adminRoomApi.createRoom(hotelId, {
        name,
        price: Number(price),
        capacity: Number(capacity),
        type: "standard",
        inventory: 10
      });
      // 목록 갱신
      const res = await adminRoomApi.getRooms(hotelId);
      setRooms(res.data);
    } catch (err) {
      alert("객실 추가 실패");
    }
  };

  // 객실 삭제 핸들러
  const handleDeleteRoom = async (roomId) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      await adminRoomApi.deleteRoom(roomId);
      setRooms(rooms.filter(r => (r._id || r.id) !== roomId));
    } catch (err) {
      alert("삭제 실패");
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="admin-hotel-edit-page">
      <div className="page-header">
        <h1>호텔 및 객실 관리</h1>
        <button onClick={() => navigate("/admin/hotels")} className="btn btn-secondary">뒤로가기</button>
      </div>

      <div style={{marginBottom: '40px'}}>
        <h3>1. 호텔 정보 수정</h3>
        {hotel && <AdminHotelForm hotel={hotel} onSubmit={handleUpdateHotel} />}
      </div>

      <hr />

      <div style={{marginTop: '40px'}}>
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:'15px'}}>
          <h3>2. 객실(Room) 목록</h3>
          <button onClick={handleAddRoom} className="btn btn-primary">+ 객실 추가</button>
        </div>
        
        <table className="table">
          <thead>
            <tr>
              <th>객실명</th>
              <th>가격</th>
              <th>인원</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length === 0 ? <tr><td colSpan="4">등록된 객실이 없습니다.</td></tr> : 
              rooms.map((room) => (
                <tr key={room._id || room.id}>
                  <td>{room.name}</td>
                  <td>{Number(room.price).toLocaleString()}원</td>
                  <td>{room.capacity}인</td>
                  <td>
                    <button onClick={() => handleDeleteRoom(room._id || room.id)} className="btn btn-danger btn-sm">삭제</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHotelEditPage;