import Link from "next/link";
import Image from "next/image";
import HeroImage from "../../public/hero.png";

export default function Hero() {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 text-center md:text-left">

        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-xl text-green-950">
            Your concerns shape a better PLSP.
          </h1>

          <p className="text-lg text-green-900/70 mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed">
            Submit complaints and feedback directly to the right department.
            Every report is tracked, assigned, and resolved with full
            transparency.
          </p>

          <Link
            href="/login"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition shadow-md"
          >
            Submit a Complaint
          </Link>
        </div>

        <div className="flex-1 flex justify-center">
          <Image
            src={HeroImage}
            alt="Students submitting feedback"
            className="rounded-xl shadow-lg w-full h-auto max-w-2xl lg:max-w-3xl"
            priority
          />
        </div>

      </div>
    </div>
  );
}