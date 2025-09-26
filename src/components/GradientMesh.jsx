export default function GradientMesh({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 ${className}`}>
      {/* soft mesh */}
      <div className="absolute -top-24 -left-24 w-[38rem] h-[38rem] rounded-full blur-3xl opacity-40 dark:opacity-25"
           style={{ background: "radial-gradient(closest-side, rgba(16,185,129,.55), transparent 70%)" }} />
      <div className="absolute top-1/3 -right-10 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-35 dark:opacity-20"
           style={{ background: "radial-gradient(closest-side, rgba(59,130,246,.45), transparent 70%)" }} />
      <div className="absolute bottom-0 left-1/4 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-35 dark:opacity-20"
           style={{ background: "radial-gradient(closest-side, rgba(236,72,153,.45), transparent 70%)" }} />
    </div>
  );
}
