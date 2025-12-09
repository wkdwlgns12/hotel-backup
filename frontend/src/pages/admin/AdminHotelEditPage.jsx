import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminHotelForm from "../../components/admin/hotels/AdminHotelForm";
import { adminHotelApi } from "../../api/adminHotelApi";
import { adminRoomApi } from "../../api/adminRoomApi"; // Room API 추가
import Loader from "../../components/common/Loader";

const AdminHotelEditPage = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]); // 객실 목록 상태
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 호텔 정보는 리스트에서 가져오는게 좋지만, 임시로 로직 구성
    // 실제로는 room 목록만 불러와도 됨
    fetchData();
  }, [hotelId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      // 호텔 정보는 상위나 별도 로직으로 가져왔다고 가정하거나 api 추가 필요
      // 여기서는 객실 목록을 불러옵니다.
      const roomRes = await adminRoomApi.getRooms(hotelId);
      setRooms(roomRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateHotel = async (formData) => {
    try {
      await adminHotelApi.updateHotel(hotelId, formData);
      alert("수정되었습니다.");
      navigate("/admin/hotels");
    } catch (err) {
      alert("수정 실패");
    }
  };

  // 객실 추가 핸들러 (간단하게 prompt로 예시, 실제론 모달 필요)
  const handleAddRoom = async () => {
    const name = prompt("객실 이름:");
    if(!name) return;
    const price = prompt("가격:");
    
    try {
      await adminRoomApi.createRoom(hotelId, {
        name, 
        price: Number(price), 
        type: 'standard', 
        capacity: 2, 
        inventory: 10
      });
      fetchData(); // 목록 갱신
    } catch(err) { alert("객실 추가 실패"); }
  };

  // 객실 삭제 핸들러
  const handleDeleteRoom = async (roomId) => {
    if(!confirm("삭제하시겠습니까?")) return;
    try {
      await adminRoomApi.deleteRoom(roomId);
      fetchData();
    } catch(err) { alert("삭제 실패"); }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="admin-hotel-edit-page">
      <div className="page-header">
        <h1>호텔 및 객실 관리</h1>
      </div>
      
      {/* 호텔 정보 수정 폼 */}
      <section style={{marginBottom: '40px'}}>
        <h3>호텔 정보</h3>
        <AdminHotelForm hotel={hotel} onSubmit={handleUpdateHotel} onCancel={() => navigate("/admin/hotels")} />
      </section>

      {/* 객실 관리 섹션 추가 */}
      <section>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <h3>객실 목록</h3>
          <button onClick={handleAddRoom} className="btn btn-secondary">객실 추가</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>이름</th>
              <th>가격</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(room => (
              <tr key={room.id}>
                <td>{room.name}</td>
                <td>{room.price}</td>
                <td>
                  <button onClick={() => handleDeleteRoom(room.id)} className="btn btn-danger btn-sm">삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminHotelEditPage;