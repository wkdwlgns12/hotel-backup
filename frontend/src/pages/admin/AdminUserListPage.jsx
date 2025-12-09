// src/pages/admin/AdminUserListPage.jsx
import { useState, useEffect } from "react";
import AdminUserTable from "../../components/admin/users/AdminUserTable";
import AdminUserFilter from "../../components/admin/users/AdminUserFilter";
import Pagination from "../../components/common/Pagination";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import { adminUserApi } from "../../api/adminUserApi"; // API 임포트

const AdminUserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 필터 및 페이지네이션 상태
  const [filters, setFilters] = useState({
    search: "",
    role: "", // 'user', 'owner', 'admin'
    isBlocked: "", // true, false
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 데이터 불러오기
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 백엔드 API 호출: params로 필터와 페이지 전달
      // 백엔드: GET /user/admin
      const response = await adminUserApi.getUsers({
        page: currentPage,
        limit: 10,
        name: filters.search, // 백엔드 검색 쿼리 파라미터명 확인 필요 (name or email)
        role: filters.role,
      });

      // 백엔드 응답 구조에 맞춰 데이터 설정 ({ data: { users: [], totalPages: ... } })
      const { users, totalPages } = response.data; 
      setUsers(users || []);
      setTotalPages(totalPages || 1);
    } catch (err) {
      console.error("유저 목록 로딩 실패:", err);
      setError("사용자 목록을 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, filters]); // 필터나 페이지가 바뀌면 재호출

  // 검색/필터 핸들러
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // 필터 변경 시 1페이지로 리셋
  };

  // 차단/차단 해제 핸들러 (삭제 대신 사용)
  const handleToggleBlock = async (userId, currentStatus) => {
    if (!window.confirm(currentStatus ? "차단을 해제하시겠습니까?" : "사용자를 차단하시겠습니까?")) return;

    try {
      // 백엔드: PUT /user/admin/:userId
      await adminUserApi.updateUserByAdmin(userId, { isBlocked: !currentStatus });
      alert("상태가 변경되었습니다.");
      fetchUsers(); // 목록 갱신
    } catch (err) {
      alert("상태 변경 실패: " + (err.response?.data?.message || err.message));
    }
  };

  if (loading && users.length === 0) return <Loader fullScreen />;

  return (
    <div className="admin-user-list-page">
      <div className="page-header">
        <h1>사용자 관리</h1>
        {/* 사용자 생성 버튼은 보통 어드민에서 제공하지 않으므로 제거하거나 유지 */}
      </div>

      <div className="content-wrapper">
        <AdminUserFilter filters={filters} onFilterChange={handleFilterChange} />
        
        {error ? (
          <ErrorMessage message={error} onRetry={fetchUsers} />
        ) : (
          <>
            <AdminUserTable 
              users={users} 
              onBlock={handleToggleBlock} // 삭제 대신 Block 전달
            />
            {users.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminUserListPage;