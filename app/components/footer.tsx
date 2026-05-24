import Image from "next/image";
import PLSP from "../../public/plsp.png";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8 mt-16">
      <div className="container mx-auto px-4 text-center space-y-4">
        <Image
          src={PLSP}
          alt="PLSP Logo"
          className="mx-auto h-14 w-14 rounded-full object-cover"
        />

        <h2 className="text-lg font-semibold text-white">
          PLSP Feedback Portal
        </h2>

        <p className="text-sm text-gray-400">
          Pamantasan ng Lungsod ng San Pablo • San Pablo City, Laguna
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300">
          <Link href="/complaints" className="hover:text-white cursor-pointer">
            Submit Concern
          </Link>
          <Link href="/track-ticket" className="hover:text-white cursor-pointer">
            Track Ticket
          </Link>
          <Link href="/about" className="hover:text-white cursor-pointer">
            About
          </Link>
          <Link href="/faqs" className="hover:text-white cursor-pointer">
            FAQs
          </Link>
        </div>

        <p className="text-xs text-gray-500 pt-4">
          © 2026 PLSP. All rights reserved.
        </p>
      </div>
    </footer>
  );
}