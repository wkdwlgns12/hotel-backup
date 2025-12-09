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
        // [사업자] 신고된 내 호텔 리뷰 목록 (또는 전체 리뷰)
        response = await adminReviewApi.getOwnerReportedReviews();
      } else {
        // [관리자] 사업자가 신고하여 넘어온 리뷰 목록
        response = await adminReviewApi.getAdminReportedReviews();
      }
      setReviews(response.data || []);
    } catch (err) {
      console.error("리뷰 로딩 실패", err);
    } finally {
      setLoading(false);
    }
  };

  // [사업자] 관리자에게 신고 (Escalate)
  const handleEscalate = async (reviewId) => {
    const reason = prompt("신고 사유를 입력해주세요:");
    if (!reason) return;
    try {
      await adminReviewApi.escalateReview(reviewId, reason);
      alert("관리자에게 신고 접수되었습니다.");
      fetchReviews();
    } catch (err) {
      alert("신고 실패: " + (err.response?.data?.message || err.message));
    }
  };

  // [관리자] 신고 승인 -> 리뷰 삭제됨
  const handleApproveReport = async (reviewId) => {
    if (!confirm("신고를 승인하고 리뷰를 삭제하시겠습니까?")) return;
    try {
      await adminReviewApi.approveReport(reviewId);
      alert("리뷰가 삭제되었습니다.");
      fetchReviews();
    } catch (err) {
      alert("처리 실패");
    }
  };

  // [관리자] 신고 거절 -> 리뷰 유지됨
  const handleRejectReport = async (reviewId) => {
    if (!confirm("신고를 거절하시겠습니까? (리뷰는 유지됩니다)")) return;
    try {
      await adminReviewApi.rejectReport(reviewId);
      alert("신고가 거절되었습니다.");
      fetchReviews();
    } catch (err) {
      alert("처리 실패");
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
        onApprove={handleApproveReport}
        onReject={handleRejectReport}
      />
    </div>
  );
};

export default AdminReviewListPage;