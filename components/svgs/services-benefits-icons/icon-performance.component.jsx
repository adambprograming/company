const IconPerformance = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 36"
      width="64"
      height="64"
      {...props}
    >
      <path
        d="M8 32a24 24 0 0 1 48 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />


      <line
        x1="16"
        y1="32"
        x2="12"
        y2="32"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="32"
        y1="16"
        x2="32"
        y2="12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="48"
        y1="32"
        x2="52"
        y2="32"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <line
        x1="32"
        y1="32"
        x2="46"
        y2="22"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <circle cx="32" cy="32" r="3" fill="currentColor" />
    </svg>
  );
};

export default IconPerformance;
