import Image from "next/image";
import { HeaderProps } from "../../types/CH";
export default function Header({
  title,
  subtitle,
  logo,
  plsp,
  username,
  openSidebar,
}: HeaderProps) {
  return (
    <header className="fix top-0 z-30 bg-white border-b border-green-100 shadow-sm px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={openSidebar}
          className="lg:hidden text-2xl text-green-700"
          aria-label="Open sidebar"
        >
          ☰
        </button>
        <div className="hidden sm:flex bg-green-50 p-2 rounded-full">
          <Image
            src={plsp}
            alt="PLSP Logo"
            className="w-12 h-12 object-contain"
          />
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-700">
            {title}
          </h1>

          <p className="text-xs sm:text-sm text-green-500">{subtitle}</p>
        </div>
      </div>

      <div className="hidden md:block">
        <Image
          src={logo}
          alt="Main Logo"
          className="h-16 lg:h-20 w-auto object-contain"
        />
      </div>

      <div className="flex items-center gap-3 bg-green-50 border border-green-200 px-3 sm:px-4 py-2">
        <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
          U
        </div>

        <div className="hidden sm:block">
          <p className="text-xs text-green-500">Welcome</p>

          <h1 className="text-sm sm:text-base font-semibold text-green-700">
            {username}
          </h1>
        </div>
      </div>
    </header>
  );
}
