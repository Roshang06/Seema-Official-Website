import Link from "next/link";

export default function AdminHeader() {

  return (
    <nav className="relative sticky top-0 z-50 bg-white shadow-sm px-8 py-6">
      <div className="flex items-center justify-center">
        {/* Left: Logo + Brand */}
        <div className="flex items-center space-x-4">
          <img
            src="/favicon.ico"
            alt="Seema Tasty Delights logo"
            className="w-10 h-10 sm:w-12 h-12 object-contain"
            loading="lazy"
          />
          <Link href="/" className="flex flex-col leading-none">
            <span
              className="text-2xl font-bold text-gray-800"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Seema
            </span>
            <span className="text-[10px] sm:text-sm font-semibold text-gray-600 -mt-1">
              Tasty Delights
            </span>
          </Link>
        </div>
       </div>
    </nav>
  );
}
