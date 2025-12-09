import { useState, useEffect } from "react";
import AdminReviewTable from "../../components/admin/reviews/AdminReviewTable";
import { adminReviewApi } from "../../api/adminReviewApi";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import Loader from "../../components/common/Loader";

const AdminReviewListPage = () => {
  const { adminInfo } = useAdminAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const isOwner = adminInfo?.role === 'owner';

  useEffect(() => {
    fetchReviews();
  }, [isOwner]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      let response;
      if (isOwner) {
        // 사업자: 내가 신고한 목록 or 내 호텔 리뷰 전체
        response = await adminReviewApi.getOwnerReportedReviews();
      } else {
        // 관리자: 신고 접수된 목록
        response = await adminReviewApi.getAdminReportedReviews();
      }
      setReviews(response.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // [Owner] 관리자에게 신고
  const handleEscalate = async (reviewId) => {
    const reason = prompt("신고 사유를 입력하세요:");
    if (!reason) return;
    try {
      await adminReviewApi.escalateReview(reviewId, reason);
      alert("신고되었습니다.");
      fetchReviews();
    } catch (err) {
      alert("신고 실패");
    }
  };

  // [Admin] 신고 승인 (삭제)
  const handleApprove = async (reviewId) => {
    if (!confirm("신고를 승인하고 리뷰를 삭제하시겠습니까?")) return;
    try {
      await adminReviewApi.approveReport(reviewId);
      alert("처리되었습니다.");
      fetchReviews();
    } catch (err) {
      alert("오류 발생");
    }
  };

  // [Admin] 신고 기각 (유지)
  const handleReject = async (reviewId) => {
    if (!confirm("신고를 기각하시겠습니까? (리뷰 유지)")) return;
    try {
      await adminReviewApi.rejectReport(reviewId);
      alert("기각되었습니다.");
      fetchReviews();
    } catch (err) {
      alert("오류 발생");
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="admin-review-list-page">
      <div className="page-header">
        <h1>{isOwner ? "리뷰 관리 (신고)" : "신고된 리뷰 심사"}</h1>
      </div>
      <AdminReviewTable 
        reviews={reviews}
        isOwner={isOwner}
        onEscalate={handleEscalate}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default AdminReviewListPage;