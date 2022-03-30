<template>
  <svg
    class="c-loading"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="50"
      cy="50"
      r="48"
      fill="none"
      strokeWidth="4"
      strokeMiterlimit="10"
      stroke="currentColor"
    ></circle>
    <line
      strokeLinecap="round"
      strokeWidth="4"
      strokeMiterlimit="10"
      stroke="currentColor"
      x1="50"
      y1="50"
      x2="85"
      y2="50.5"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 50 50"
        to="360 50 50"
        dur="2s"
        repeatCount="indefinite"
      ></animateTransform>
    </line>
    <line
      strokeLinecap="round"
      strokeWidth="4"
      strokeMiterlimit="10"
      stroke="currentColor"
      x1="50"
      y1="50"
      x2="49.5"
      y2="74"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 50 50"
        to="360 50 50"
        dur="15s"
        repeatCount="indefinite"
      ></animateTransform>
    </line>
  </svg>
</template>
