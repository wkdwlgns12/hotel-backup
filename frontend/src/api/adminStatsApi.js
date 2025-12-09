import axiosClient from "./axiosClient";

export const adminStatsApi = {
  // 대시보드 통계 조회 (Role에 따라 구분)
  // 호출 시 role 인자를 받도록 변경 권장 ('admin' or 'owner')
  getDashboardStats: (role = 'admin') => {
    const url = role === 'owner' ? "/dashboard/owner" : "/dashboard/admin";
    return axiosClient.get(url);
  },

  // ⚠️ 아래 통계들은 현재 백엔드에 별도 엔드포인트가 없으므로
  // 우선 대시보드 API를 같이 호출하거나, 빈 데이터를 반환하도록 처리합니다.
  
  // 매출 통계
  getRevenueStats: (params) => {
    // 필요 시 백엔드에 /stats/revenue 추가 구현 필요
    return Promise.resolve({ data: [] });
  },

  // 예약 통계
  getBookingStats: (params) => {
    return Promise.resolve({ data: [] });
  },

  // 사용자 통계
  getUserStats: (params) => {
    return Promise.resolve({ data: [] });
  },

  // 호텔 통계
  getHotelStats: (params) => {
    return Promise.resolve({ data: [] });
  },
};

export default adminStatsApi;