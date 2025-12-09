import axiosClient from "./axiosClient";

export const adminBookingApi = {
  // 예약 목록 조회 (Role에 따라 URL 분기 필요)
  getBookings: (role, params) => {
    const url = role === 'admin' ? "/reservation/admin" : "/reservation/owner";
    return axiosClient.get(url, { params });
  },

  // 예약 상태 변경
  updateBookingStatus: (bookingId, status) => {
    return axiosClient.patch(`/reservation/${bookingId}/status`, { status });
  },
};

export default adminBookingApi;