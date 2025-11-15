export function AuraXLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white"
      >
        <ellipse
          cx="16"
          cy="16"
          rx="10"
          ry="3"
          stroke="currentColor"
          strokeWidth="1.5"
          transform="rotate(30 16 16)"
        />
        <path
          d="M13 21L16 11L19 21"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.5 17.5H17.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h1 className="text-2xl font-bold text-white tracking-wider">AuraX</h1>
    </div>
  );
}
