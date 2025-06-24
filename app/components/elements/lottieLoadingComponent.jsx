"use client";

import Lottie from "lottie-react";
import lottieAnimation from "./animations/loading.json";

const LottieLoadingComponent = () => {
  return (
    <Lottie
      className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[200px] h-[200px]"
      animationData={lottieAnimation}
    />
  );
};

export default LottieLoadingComponent;
