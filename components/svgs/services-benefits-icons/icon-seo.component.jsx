const IconSEO = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="64"
      height="64"
      {...props}
    >
      <circle
        cx="21"
        cy="21"
        r="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      <line
        x1="35"
        y1="35"
        x2="48"
        y2="48"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <path
        d="M13 27 L18 21 L22 25 L30 15"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31 21 L30 15 L24 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconSEO;
