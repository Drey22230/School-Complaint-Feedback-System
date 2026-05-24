"use client";

import { useEffect, useState } from "react";

import Header from "../components/complaintscom/header";
import Sidebar from "../components/complaintscom/sidebarcom";
import { User } from "../types/user";
import PLSP from "../../public/plsp.png";
import Logo from "../../public/logo.png";

export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);

  useEffect(() => {
    if (!user?.user_id) return;

    const fetchSubmissions = async () => {
      try {
        const res = await fetch(`/api/userdashboard?user_id=${user.user_id}`);

        const data = await res.json();

        if (res.ok) {
          setSubmissions(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubmissions();
  }, [user]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me");

        if (!res.ok) {
          window.location.href = "/login";
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const total = submissions.length;

  const pending = submissions.filter(
    (item: any) => item.status === "pending",
  ).length;

  const reviewed = submissions.filter(
    (item: any) => item.status === "reviewed",
  ).length;

  const resolved = submissions.filter(
    (item: any) => item.status === "resolved",
  ).length;

  return (
    <div className="min-h-screen flex bg-slate-100">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        plsp={PLSP}
      />

      <div className="flex-1 lg:pl-64">
        <Header
          title="Complaints"
          subtitle="Student Complaint Management System"
          logo={Logo}
          plsp={PLSP}
          username={user?.username || "Loading..."}
          openSidebar={() => setSidebarOpen(true)}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="space-y-3">
            {submissions.length > 0 ? (
              submissions.map((item: any) => (
                <div
                  key={item.submission_id}
                  className="border rounded-lg p-4 bg-slate-50"
                >
                  <p className="font-semibold text-emerald-700">
                    {item.concern}
                  </p>

                  <p className="text-sm text-slate-600">{item.description}</p>

                  <p className="text-xs text-slate-400 mt-1">
                    Status: {item.status}
                  </p>

                  <p className="text-xs text-slate-400">
                    Date: {item.created_at}
                  </p>

                  {item.admin_response ? (
                    <div className="mt-2 p-2 bg-emerald-50 border border-emerald-200 rounded">
                      <p className="text-xs font-semibold text-emerald-700">
                        Admin Response:
                      </p>
                      <p className="text-sm text-emerald-800">
                        {item.admin_response}
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 mt-2">
                      No admin response yet.
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-slate-500">No submissions yet.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
