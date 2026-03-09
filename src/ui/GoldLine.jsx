export function GoldLine({ width = "60px", className = "" }) {
  return (
    <div
      className={`mx-auto ${className}`}
      style={{
        width,
        height: 1,
        background: "linear-gradient(90deg, transparent, #C5A55A, transparent)",
      }}
    />
  );
}
