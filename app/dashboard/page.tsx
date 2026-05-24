"use client";

import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useRouter } from "next/navigation";
import { Submission } from "../types/submission";
import { statusStyle } from "../util/statsstyle";
export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [responses, setResponses] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me", {
          credentials: "include",
        });

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
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch("/api/dashboard", {
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setSubmissions(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const logout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    router.push("/login");
  };

  const updateStatus = async (id: number, status: Submission["status"]) => {
    try {
      const res = await fetch("/api/dashboard", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          submission_id: id,
          status,
        }),
      });

      if (!res.ok) {
        console.error("Failed to update status");
        return;
      }

      fetchDashboard();
    } catch (error) {
      console.error(error);
    }
  };

  const sendResponse = async (id: number) => {
    try {
      await fetch("/api/dashboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          submission_id: id,
          admin_response: responses[id],
        }),
      });

      fetchDashboard();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSubmission = async (id: number) => {
    try {
      await fetch("/api/dashboard", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          submission_id: id,
        }),
      });

      fetchDashboard();
    } catch (error) {
      console.error(error);
    }
  };

  const statusCount = submissions.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const pieData = [
    ["Status", "Count"],
    ["Pending", statusCount.pending || 0],
    ["Reviewed", statusCount.reviewed || 0],
    ["Resolved", statusCount.resolved || 0],
  ];

  const userCount = submissions.reduce(
    (acc, item) => {
      acc[item.username] = (acc[item.username] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const barData = [["User", "Submissions"], ...Object.entries(userCount)];

  const isImage = (url: string) => url?.match(/\.(jpg|jpeg|png|webp|gif)$/i);

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-900">
            Welcome, {user?.username || "Admin"}
          </h1>

          <p className="text-green-700">Manage submissions efficiently</p>
        </div>

        <button
          onClick={logout}
          className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="mb-6 rounded-xl border border-green-200 bg-white p-4">
        <h2 className="mb-4 font-semibold text-green-800">
          Analytics Dashboard
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Chart
            chartType="PieChart"
            data={pieData}
            options={{
              title: "Submission Status",
              colors: ["#facc15", "#3b82f6", "#22c55e"],
              backgroundColor: "transparent",
            }}
            width="100%"
            height="300px"
          />

          <Chart
            chartType="BarChart"
            data={barData}
            options={{
              title: "Submissions per User",
              backgroundColor: "transparent",
              legend: {
                position: "none",
              },
            }}
            width="100%"
            height="300px"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-green-100 bg-white shadow-lg">
        <table className="w-full text-sm">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Concern</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Attachment</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Response</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {submissions.map((item) => (
              <tr
                key={item.submission_id}
                className="border-b transition hover:bg-green-50"
              >
                <td className="p-3 font-medium text-green-800">
                  {item.username}
                </td>

                <td className="p-3">{item.concern}</td>

                {/* DESCRIPTION */}
                <td className="max-w-xs truncate p-3 text-gray-600">
                  {item.description}
                </td>

                <td className="p-3">
                  {item.attachment_url ? (
                    isImage(item.attachment_url) ? (
                      <img
                        src={item.attachment_url}
                        className="h-12 w-12 cursor-pointer rounded border object-cover hover:scale-105"
                        onClick={() =>
                          window.open(item.attachment_url, "_blank")
                        }
                      />
                    ) : (
                      <a
                        href={item.attachment_url}
                        target="_blank"
                        className="text-xs text-green-700 underline"
                      >
                        Open
                      </a>
                    )
                  ) : (
                    <span className="text-xs text-gray-400">No file</span>
                  )}
                </td>

                <td className="p-3">
                  <div className="flex flex-col gap-2">
                    <span
                      className={`w-fit rounded-full px-2 py-1 text-xs font-semibold ${statusStyle(item.status)}`}
                    >
                      {item.status}
                    </span>

                    <div className="flex flex-wrap gap-1">
                      <button
                        onClick={() =>
                          updateStatus(item.submission_id, "pending")
                        }
                        className="rounded bg-yellow-500 px-2 py-1 text-xs text-white"
                      >
                        Pending
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(item.submission_id, "reviewed")
                        }
                        className="rounded bg-blue-600 px-2 py-1 text-xs text-white"
                      >
                        Reviewed
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(item.submission_id, "resolved")
                        }
                        className="rounded bg-green-600 px-2 py-1 text-xs text-white"
                      >
                        Resolved
                      </button>
                    </div>
                  </div>
                </td>

                <td className="p-3">
                  <div className="flex flex-col gap-2">
                    <input
                      value={responses[item.submission_id] || ""}
                      onChange={(e) =>
                        setResponses({
                          ...responses,
                          [item.submission_id]: e.target.value,
                        })
                      }
                      placeholder="Write response..."
                      className="rounded border px-2 py-1 text-xs"
                    />

                    <button
                      onClick={() => sendResponse(item.submission_id)}
                      className="rounded bg-emerald-600 px-2 py-1 text-xs text-white"
                    >
                      Send
                    </button>

                    {item.admin_response && (
                      <p className="text-xs text-green-700">
                        {item.admin_response}
                      </p>
                    )}
                  </div>
                </td>

                <td className="p-3">
                  <button
                    onClick={() => deleteSubmission(item.submission_id)}
                    className="rounded bg-gray-800 px-3 py-1 text-xs text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
