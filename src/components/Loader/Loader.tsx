export const Loader = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="194px"
      height="194px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        r="0"
        fill="none"
        stroke="#4669f0"
        strokeWidth="7"
      >
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1.3157894736842106s"
          values="0;19"
          keyTimes="0;1"
          keySplines="0 0.2 0.8 1"
          calcMode="spline"
          begin="0s"
        ></animate>
        <animate
          attributeName="opacity"
          repeatCount="indefinite"
          dur="1.3157894736842106s"
          values="1;0"
          keyTimes="0;1"
          keySplines="0.2 0 0.8 1"
          calcMode="spline"
          begin="0s"
        ></animate>
      </circle>
      <circle
        cx="50"
        cy="50"
        r="0"
        fill="none"
        stroke="#546fbe"
        strokeWidth="7"
      >
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1.3157894736842106s"
          values="0;19"
          keyTimes="0;1"
          keySplines="0 0.2 0.8 1"
          calcMode="spline"
          begin="-0.6578947368421053s"
        ></animate>
        <animate
          attributeName="opacity"
          repeatCount="indefinite"
          dur="1.3157894736842106s"
          values="1;0"
          keyTimes="0;1"
          keySplines="0.2 0 0.8 1"
          calcMode="spline"
          begin="-0.6578947368421053s"
        ></animate>
      </circle>
    </svg>
  );
};
