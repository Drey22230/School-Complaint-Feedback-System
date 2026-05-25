"use client";
import Image from "next/image";
import Plsp from "../../public/plsp.png";
import Logo from "../../public/logo.png";
import Link from "next/link";
import { UserLogin } from "../../types/userlogin";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const [loading,setLoadig] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handlelogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Wrong credentials");
      return;
    }

    const role = data.user?.role;

    if (!role) {
      alert("No role found");
      return;
    }

    if (role === "admin") {
      router.push("/dashboard");
    } else {
      router.push("/userdashboard");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center  from-blue-100 to-gray-200 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <div className="flex flex-col items-center gap-2 mb-6">
          <Image src={Plsp} alt="PLSP Logo" width={70} height={70} priority />
          <Image src={Logo} alt="Logo" width={50} height={50} priority />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handlelogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Loging..." : "Login"}
          </button>
        </form>

        <div className="flex justify-between text-sm mt-5">
          <Link href="/register" className="text-blue-600 hover:underline">
            Create account
          </Link>

          <Link
            href="/forgot-password"
            className="text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}
