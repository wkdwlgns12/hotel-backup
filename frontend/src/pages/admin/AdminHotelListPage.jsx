import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHotelTable from "../../components/admin/hotels/AdminHotelTable";
import { adminHotelApi } from "../../api/adminHotelApi";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import Loader from "../../components/common/Loader";

const AdminHotelListPage = () => {
  const navigate = useNavigate();
  const { adminInfo } = useAdminAuth();
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
      // 역할에 따라 다른 백엔드 API 호출
      if (isOwner) {
        response = await adminHotelApi.getOwnerHotels(); // /hotel/owner
      } else {
        response = await adminHotelApi.getPendingHotels(); // /hotel/admin/pending
      }
      
      // 백엔드 응답 형식에 따라 데이터 추출
      const items = response.data?.items || response.data || [];
      setHotels(items);
    } catch (err) {
      console.error("호텔 목록 로딩 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (hotelId) => {
    if (isOwner) return;
    if (!confirm("승인하시겠습니까?")) return;
    try {
      await adminHotelApi.approveHotel(hotelId);
      alert("승인되었습니다.");
      fetchHotels();
    } catch (err) {
      alert("승인 실패");
    }
  };

  const handleReject = async (hotelId) => {
    if (isOwner) return;
    const reason = prompt("거절 사유를 입력하세요:");
    if (!reason) return;
    try {
      await adminHotelApi.rejectHotel(hotelId, reason);
      alert("거절되었습니다.");
      fetchHotels();
    } catch (err) {
      alert("거절 실패");
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