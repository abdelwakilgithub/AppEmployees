import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/9131-loading-green.json";
function ActivityIndicator({ visible = false }) {
  if (!visible) return null;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
}

export default ActivityIndicator;
