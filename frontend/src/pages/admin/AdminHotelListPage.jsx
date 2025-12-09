import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHotelTable from "../../components/admin/hotels/AdminHotelTable";
import { adminHotelApi } from "../../api/adminHotelApi";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import Loader from "../../components/common/Loader";

const AdminHotelListPage = () => {
  const navigate = useNavigate();
  const { adminInfo } = useAdminAuth(); // 로그인 정보 (role: 'admin' | 'owner')
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const isOwner = adminInfo?.role === 'owner';

  useEffect(() => {
    fetchHotels();
  }, [isOwner]);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      let response;
      if (isOwner) {
        // [사업자] 내 호텔 목록 조회
        response = await adminHotelApi.getOwnerHotels();
      } else {
        // [관리자] 승인 대기중인 호텔 목록 조회
        response = await adminHotelApi.getPendingHotels();
      }
      // 백엔드 응답 구조가 { data: { items: [...] } } 인지 { data: [...] } 인지에 따라 조정
      setHotels(response.data.items || response.data || []);
    } catch (err) {
      console.error(err);
      // alert("목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // [관리자] 승인 처리
  const handleApprove = async (hotelId) => {
    if (isOwner) return;
    if (!confirm("이 호텔을 승인하시겠습니까?")) return;
    try {
      await adminHotelApi.approveHotel(hotelId);
      alert("승인되었습니다.");
      fetchHotels();
    } catch (err) {
      alert("승인 실패");
    }
  };

  // [관리자] 거절 처리
  const handleReject = async (hotelId) => {
    if (isOwner) return;
    const reason = prompt("거절 사유를 입력하세요:");
    if (!reason) return;
    try {
      await adminHotelApi.rejectHotel(hotelId, reason);
      alert("거절되었습니다.");
      fetchHotels();
    } catch (err) {
      alert("처리 실패");
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="admin-hotel-list-page">
      <div className="page-header">
        <h1>{isOwner ? "내 호텔 관리" : "호텔 승인 대기"}</h1>
        {isOwner && (
          <button onClick={() => navigate("/admin/hotels/new")} className="btn btn-primary">
            + 호텔 등록
          </button>
        )}
      </div>
      <AdminHotelTable 
        hotels={hotels} 
        isOwner={isOwner}
        onApprove={handleApprove} 
        onReject={handleReject} 
      />
    </div>
  );
};

export default AdminHotelListPage;