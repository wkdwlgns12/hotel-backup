import axiosClient from "./axiosClient";

export const adminUserApi = {
  // [Admin] 유저 목록 조회
  getUsers: (params) => {
    return axiosClient.get("/user/admin", { params });
  },
  
  // [Admin] 유저 상세 조회
  getUserById: (userId) => {
    return axiosClient.get(`/user/admin/${userId}`);
  },

  // [Admin] 유저 정보 수정 (차단 포함)
  updateUserByAdmin: (userId, data) => {
    return axiosClient.put(`/user/admin/${userId}`, data);
  },
  
  // [Owner] 사업자 정보 조회 (필요 시)
  getOwnerProfile: () => {
    return axiosClient.get("/user/me"); // 혹은 auth/me
  }
};