const IconCheckCircle = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m8 12.5l3 3l5-6"
        />
        <circle cx="12" cy="12" r="10" />
      </g>
    </svg>
  );
};

export default IconCheckCircle;