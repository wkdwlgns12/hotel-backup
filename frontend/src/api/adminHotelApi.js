import axiosClient from "./axiosClient";

export const adminHotelApi = {
  // [Owner] 내 호텔 목록 조회
  getOwnerHotels: (params) => {
    return axiosClient.get("/hotel/owner", { params });
  },

  // [Admin] 승인 대기 호텔 목록 조회
  getPendingHotels: (params) => {
    return axiosClient.get("/hotel/admin/pending", { params });
  },

  // [Owner] 호텔 상세 조회 (수정용)
  getHotelById: (hotelId) => {
    // 백엔드는 리스트 조회만 있고 단건 조회는 /owner/hotel/:id 가 없으므로
    // owner 리스트에서 필터링하거나, 백엔드에 단건 조회를 추가해야 함.
    // 현재 백엔드 room service에 getRoomsByHotel 체크 로직이 있으므로 
    // 여기서는 Room API를 호출하기 위해 호텔 ID만 넘깁니다.
    // *임시방편: 목록에서 데이터를 가져오는 방식으로 처리 권장*
    return Promise.resolve({}); 
  },

  // [Owner] 호텔 등록
  createHotel: (data) => {
    return axiosClient.post("/hotel/owner", data);
  },

  // [Owner] 호텔 수정
  updateHotel: (hotelId, data) => {
    return axiosClient.patch(`/hotel/owner/${hotelId}`, data);
  },

  // [Admin] 호텔 승인
  approveHotel: (hotelId) => {
    return axiosClient.patch(`/hotel/admin/${hotelId}/approve`);
  },

  // [Admin] 호텔 거부
  rejectHotel: (hotelId, reason) => {
    return axiosClient.patch(`/hotel/admin/${hotelId}/reject`, { reason });
  },
};

export default adminHotelApi;