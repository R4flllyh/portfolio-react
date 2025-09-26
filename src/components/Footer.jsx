export default function Footer() {
  return (
    <footer className="border-t border-white/40 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
        <div>© {new Date().getFullYear()} Muhammad Rafly Hidayahtullah — All rights reserved.</div>
        <div className="flex items-center gap-4">
          <a className="hover:opacity-70" href="#">GitHub</a>
          <a className="hover:opacity-70" href="#">LinkedIn</a>
          <a className="hover:opacity-70" href="#">Email</a>
        </div>
      </div>
    </footer>
  );
}
