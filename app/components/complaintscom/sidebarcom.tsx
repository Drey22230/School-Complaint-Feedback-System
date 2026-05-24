"use client";

import Image from "next/image";
import { SidebarProps } from "../../types/SB";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  plsp,
}: SidebarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-green-700 text-white
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex items-center gap-3 p-5 border-b border-green-600">
          <Image
            src={plsp}
            alt="PLSP"
            className="w-10 h-10 bg-white p-1 rounded-full"
          />

          <div>
            <h1 className="font-bold">PLSP</h1>
            <p className="text-xs text-green-100">System</p>
          </div>
        </div>

        <nav className="mt-5 flex flex-col">
          <Link className="px-5 py-3 hover:bg-green-600" href="/userdashboard">
            Dashboard
          </Link>

          <Link className="px-5 py-3 hover:bg-green-600" href="/complaints">
            Complaints
          </Link>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-green-600">
          <button
            onClick={handleLogout}
            className="w-full bg-white text-green-700 py-2 rounded hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
