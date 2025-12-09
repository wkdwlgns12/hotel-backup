import axiosClient from "./axiosClient";

export const adminReviewApi = {
  // [Owner] 신고된 리뷰 목록
  getOwnerReportedReviews: (params) => {
    return axiosClient.get("/reviews/owner/reported", { params });
  },

  // [Owner] 리뷰 어드민에게 이관(신고)
  escalateReview: (reviewId, reason) => {
    return axiosClient.patch(`/reviews/owner/${reviewId}/escalate`, { reason });
  },

  // [Admin] 신고된 리뷰 목록
  getAdminReportedReviews: (params) => {
    return axiosClient.get("/reviews/admin/reported", { params });
  },

  // [Admin] 신고 승인 (리뷰 삭제)
  approveReport: (reviewId) => {
    return axiosClient.patch(`/reviews/admin/${reviewId}/approve-report`);
  },

  // [Admin] 신고 거부 (리뷰 유지)
  rejectReport: (reviewId) => {
    return axiosClient.patch(`/reviews/admin/${reviewId}/reject-report`);
  },
};

export default adminReviewApi;