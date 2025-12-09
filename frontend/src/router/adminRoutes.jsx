import { Navigate } from "react-router-dom"; // Navigate 추가 필요
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

const adminRoutes = [
  {
    path: "/admin/login",
    element: <AdminLoginPage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      // 1. /admin 으로 접속 시 -> /admin/dashboard 로 자동 리다이렉트 (선택 사항, 추천)
      { index: true, element: <Navigate to="dashboard" replace /> },
      
      // 2. /admin/dashboard 경로 명시 (에러 해결의 핵심)
      { path: "dashboard", element: <AdminDashboardPage /> },

      // --- 사용자 관리 ---
      { path: "users", element: <AdminUserListPage /> },
      { path: "users/:userId", element: <AdminUserDetailPage /> },

      // --- 호텔 관리 ---
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