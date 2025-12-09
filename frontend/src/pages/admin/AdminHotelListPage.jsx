import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHotelTable from "../../components/admin/hotels/AdminHotelTable";
import { adminHotelApi } from "../../api/adminHotelApi";
import { useAdminAuth } from "../../hooks/useAdminAuth"; // Auth 훅 필요
import Loader from "../../components/common/Loader";

const AdminHotelListPage = () => {
  const navigate = useNavigate();
  const { adminInfo } = useAdminAuth(); // 현재 로그인한 유저 정보
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const isOwner = adminInfo?.role === 'owner';

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      let response;
      if (isOwner) {
        response = await adminHotelApi.getOwnerHotels();
        // 백엔드 응답 구조: { success: true, data: { items: [], pagination: {} } }
        setHotels(response.data.items || []);
      } else {
        response = await adminHotelApi.getPendingHotels();
        setHotels(response.data.items || []);
      }
    } catch (err) {
      alert("데이터 로드 실패");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (hotelId) => {
    if(isOwner) return;
    try {
      await adminHotelApi.approveHotel(hotelId);
      fetchHotels();
    } catch (err) { alert("승인 실패"); }
  };

  const handleReject = async (hotelId) => {
    if(isOwner) return;
    const reason = prompt("거부 사유:");
    if (!reason) return;
    try {
      await adminHotelApi.rejectHotel(hotelId, reason);
      fetchHotels();
    } catch (err) { alert("거부 실패"); }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="admin-hotel-list-page">
      <div className="page-header">
        <h1>{isOwner ? "내 호텔 관리" : "호텔 승인 대기"}</h1>
        {isOwner && (
          <button onClick={() => navigate("/admin/hotels/new")} className="btn btn-primary">
            호텔 등록
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