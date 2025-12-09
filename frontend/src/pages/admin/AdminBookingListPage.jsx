import { useState, useEffect } from "react";
import AdminBookingTable from "../../components/admin/bookings/AdminBookingTable";
import AdminBookingFilter from "../../components/admin/bookings/AdminBookingFilter"; // 필터 컴포넌트가 있다면 사용
import { adminBookingApi } from "../../api/adminBookingApi";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import Loader from "../../components/common/Loader";

const AdminBookingListPage = () => {
  const { adminInfo } = useAdminAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: "" });

  const isOwner = adminInfo?.role === 'owner';

  useEffect(() => {
    fetchBookings();
  }, [isOwner, filter]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      // API 호출 시 role 정보를 전달하여 URL 분기 (adminBookingApi 수정본 기준)
      const roleParam = isOwner ? 'owner' : 'admin';
      const response = await adminBookingApi.getBookings(roleParam, filter);
      
      setBookings(response.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    if(!confirm(`상태를 ${newStatus}(으)로 변경하시겠습니까?`)) return;
    try {
      await adminBookingApi.updateBookingStatus(bookingId, newStatus);
      fetchBookings();
    } catch(err) {
      alert("상태 변경 실패");
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="admin-booking-list-page">
      <div className="page-header">
        <h1>{isOwner ? "내 호텔 예약 관리" : "전체 예약 관리"}</h1>
      </div>
      
      {/* 필터가 있다면 추가 */}
      {/* <AdminBookingFilter currentFilter={filter} onFilterChange={setFilter} /> */}

      <AdminBookingTable 
        bookings={bookings} 
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default AdminBookingListPage;