"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [token, setToken] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setToken(data.token);

      alert("OTP sent to your email");

      setStep(2);
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          otp,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      alert("Password reset successful");

      window.location.href = "/login";
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-green-200">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl shadow-lg">
            🔒
          </div>

          <h1 className="text-3xl font-bold text-green-700 mt-4">
            Forgot Password
          </h1>

          <p className="text-gray-500 text-center mt-2">
            Reset your password securely
          </p>
        </div>

        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="text-sm text-green-700 font-semibold">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 transition-all duration-200 text-white py-3 rounded-xl font-semibold shadow-md"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label className="text-sm text-green-700 font-semibold">
                OTP Code
              </label>

              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="text-sm text-green-700 font-semibold">
                New Password
              </label>

              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              onClick={handleVerifyOTP}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 transition-all duration-200 text-white py-3 rounded-xl font-semibold shadow-md"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}

        <div className="mt-8 text-center">
          <a
            href="/login"
            className="text-green-700 hover:underline text-sm font-medium"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
