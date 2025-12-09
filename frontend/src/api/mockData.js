// Mock 데이터 - 로그인 테스트용 최소 데이터
export const mockAdminUser = {
  id: 1,
  name: "관리자",
  email: "admin@hotel.com",
  role: "admin",
};

export const mockDashboardStats = {
  todayBookings: 15,
  totalRevenue: 12500000,
  activeHotels: 45,
  newUsers: 8,
  chartData: {
    labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
    revenue: [2000000, 2500000, 2200000, 2800000, 3000000, 3200000],
    bookings: [45, 58, 52, 67, 72, 78],
  },
  recentBookings: [],
  recentUsers: [],
  recentReviews: [],
};
