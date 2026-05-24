"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ComplaintForm {
  concern: string;
  description: string;
  attachment: File | null;
}

interface User {
  user_id: number;
  username: string;
}

export default function Complaints() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const [formData, setFormData] = useState<ComplaintForm>({
    concern: "",
    description: "",
    attachment: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me");

        if (!res.ok) {
          router.push("/login");
          return;
        }

        const data = await res.json();

        setUser(data);
      } catch (error) {
        console.error(error);
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("concern", formData.concern);
      data.append("description", formData.description);

      if (formData.attachment) {
        data.append("attachment", formData.attachment);
      }

      const response = await fetch("/api/complaints", {
        method: "POST",
        body: data,
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      alert("Complaint submitted successfully!");

      setFormData({
        concern: "",
        description: "",
        attachment: null,
      });
    } catch (error) {
      console.error(error);

      alert("Failed to submit complaint");
    } finally {
      setLoading(false);
    }
  }

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const target = e.target;

    if (target instanceof HTMLInputElement && target.type === "file") {
      setFormData((prev) => ({
        ...prev,
        attachment: target.files?.[0] || null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-green-200 bg-white shadow-2xl">
        <div className="bg-green-600 p-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Complaint Submission
          </h1>

          <p className="mt-2 text-green-100">
            Submit your concern securely and track its status
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-6 p-8"
        >
          <div>
            <label className="mb-2 block text-sm font-semibold text-green-800">
              Concern
            </label>

            <input
              type="text"
              name="concern"
              value={formData.concern}
              onChange={handleInputChange}
              required
              maxLength={100}
              placeholder="Enter your concern"
              className="w-full rounded-xl border border-green-300 px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-green-800">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={5}
              placeholder="Describe your complaint..."
              className="w-full resize-none rounded-xl border border-green-300 px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-green-800">
              Attachment (Optional)
            </label>

            <input
              type="file"
              name="attachment"
              onChange={handleInputChange}
              className="w-full rounded-lg border border-green-200 p-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-600 py-3 font-bold text-white transition hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>
      </div>
    </div>
  );
}
