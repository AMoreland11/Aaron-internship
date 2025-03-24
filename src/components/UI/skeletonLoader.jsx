import React from 'react'

const SkeletonLoader = () => {
  return (
    <div className="keen-slider__slide col-lg-3 col-md-6 col-sm-6 col-xs-12" style={{ flex: "0 0 auto", margin: "10px" }}>
    <div className="nft_coll" style={{ padding: "32px", margin: "24px" }}>
      <div className="nft_wrap">
        <div className="skeleton skeleton-img"></div> {/* Skeleton for Image */}
      </div>
      <div className="nft_coll_pp">
        <div className="skeleton skeleton-avatar"></div> {/* Skeleton for Author Image */}
        <div className="skeleton skeleton-checkmark"></div> {/* Skeleton for Checkmark */}
      </div>
      <div className="nft_coll_info">
        <div className="skeleton skeleton-text"></div> {/* Skeleton for Text */}
        <div className="skeleton skeleton-token"></div> {/* Skeleton for Token ID */}
      </div>
    </div>
  </div>
)};

export default SkeletonLoader;
