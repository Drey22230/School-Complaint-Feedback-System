import Image from "next/image";
import Logo from "../../public/logo.png";
import Plsp from "../../public/plsp.png";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-3 sm:gap-5 group">
          <Image
            src={Logo}
            alt="Logo"
            height={56}
            priority
            className="object-contain transition duration-300 group-hover:scale-105"
          />

          <div className="w-px h-8 sm:h-12 bg-green-200" />

          <Image
            src={Plsp}
            alt="PLSP Logo"
            height={56}
            priority
            className="object-contain transition duration-300 group-hover:scale-105"
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">

          <Link
            href="/login"
            className="px-3 sm:px-5 py-2 text-xs sm:text-sm font-medium rounded-full border border-green-200 text-green-900 hover:bg-green-50 hover:border-green-400 transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium text-white rounded-full bg-green-600 hover:bg-green-700 transition shadow-md"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}