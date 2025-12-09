import { NavLink } from "react-router-dom";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import "./AdminSidebar.scss"; // 이제 파일이 있으므로 에러가 사라집니다.

const AdminSidebar = () => {
  const { adminInfo, logout } = useAdminAuth();
  const isOwner = adminInfo?.role === 'owner';

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Hotel Admin</h2>
        <div className="user-info">
            <span className="name">{adminInfo?.name || "사용자"} 님</span>
            <span className="role badge">{isOwner ? "PARTNER" : "MASTER"}</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li><NavLink to="/admin" end>대시보드</NavLink></li>
          
          {/* 공통 메뉴 */}
          <li><NavLink to="/admin/hotels">호텔 관리</NavLink></li>
          <li><NavLink to="/admin/bookings">예약 관리</NavLink></li>
          <li><NavLink to="/admin/reviews">리뷰 관리</NavLink></li>

          {/* 관리자(Admin) 전용 메뉴 */}
          {!isOwner && (
            <>
              <li><NavLink to="/admin/coupons">쿠폰 관리</NavLink></li>
              <li><NavLink to="/admin/users">사용자 관리</NavLink></li>
              <li><NavLink to="/admin/settings">시스템 설정</NavLink></li>
              <li><NavLink to="/admin/dashboard">대시보드</NavLink></li>
            </>
          )}

          <li><NavLink to="/admin/profile">내 정보</NavLink></li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button onClick={logout} className="btn-logout">로그아웃</button>
      </div>
    </aside>
  );
};

export default AdminSidebar;