import axiosClient from "./axiosClient";

export const adminRoomApi = {
  // 특정 호텔의 객실 목록
  getRooms: (hotelId) => {
    return axiosClient.get(`/room/owner/hotel/${hotelId}`);
  },

  // 객실 생성
  createRoom: (hotelId, data) => {
    return axiosClient.post(`/room/owner/${hotelId}`, data);
  },

  // 객실 수정
  updateRoom: (roomId, data) => {
    return axiosClient.patch(`/room/owner/${roomId}`, data);
  },

  // 객실 삭제
  deleteRoom: (roomId) => {
    return axiosClient.delete(`/room/owner/${roomId}`);
  },
};

export default adminRoomApi;