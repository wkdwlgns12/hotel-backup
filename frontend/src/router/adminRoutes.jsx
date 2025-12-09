// src/router/adminRoutes.jsx
import AdminLoginPage from "../pages/auth/AdminLoginPage";
import AdminLayout from "../components/layout/AdminLayout";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminUserListPage from "../pages/admin/AdminUserListPage";
import AdminUserDetailPage from "../pages/admin/AdminUserDetailPage";
import AdminHotelListPage from "../pages/admin/AdminHotelListPage";
import AdminHotelCreatePage from "../pages/admin/AdminHotelCreatePage";
import AdminHotelEditPage from "../pages/admin/AdminHotelEditPage";
import AdminBookingListPage from "../pages/admin/AdminBookingListPage";
import AdminBookingDetailPage from "../pages/admin/AdminBookingDetailPage";
import AdminReviewListPage from "../pages/admin/AdminReviewListPage";
import AdminReviewDetailPage from "../pages/admin/AdminReviewDetailPage";
import AdminCouponListPage from "../pages/admin/AdminCouponListPage";
import AdminCouponCreatePage from "../pages/admin/AdminCouponCreatePage";
import AdminCouponEditPage from "../pages/admin/AdminCouponEditPage";
import AdminSettingsPage from "../pages/admin/AdminSettingsPage";
import AdminMyProfilePage from "../pages/admin/AdminMyProfilePage";

// ProtectedRoute 컴포넌트가 있다면 감싸주어야 합니다. (생략됨)

const adminRoutes = [
  {
    path: "/admin/login",
    element: <AdminLoginPage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />, // 공통 레이아웃 (사이드바, 헤더 포함)
    children: [
      { path: "", element: <AdminDashboardPage /> }, // 대시보드
      
      // --- 사용자 관리 (Admin Only) ---
      { path: "users", element: <AdminUserListPage /> },
      { path: "users/:userId", element: <AdminUserDetailPage /> },

      // --- 호텔 관리 (Admin: 승인 / Owner: 내 호텔) ---
      { path: "hotels", element: <AdminHotelListPage /> },
      { path: "hotels/new", element: <AdminHotelCreatePage /> },
      { path: "hotels/:hotelId/edit", element: <AdminHotelEditPage /> },

      // --- 예약 관리 ---
      { path: "bookings", element: <AdminBookingListPage /> },
      { path: "bookings/:bookingId", element: <AdminBookingDetailPage /> },

      // --- 리뷰 관리 ---
      { path: "reviews", element: <AdminReviewListPage /> },
      { path: "reviews/:reviewId", element: <AdminReviewDetailPage /> },

      // --- 쿠폰 관리 ---
      { path: "coupons", element: <AdminCouponListPage /> },
      { path: "coupons/new", element: <AdminCouponCreatePage /> },
      { path: "coupons/:couponId/edit", element: <AdminCouponEditPage /> },

      // --- 설정 및 프로필 ---
      { path: "settings", element: <AdminSettingsPage /> },
      { path: "profile", element: <AdminMyProfilePage /> },
    ],
  },
];

export default adminRoutes;