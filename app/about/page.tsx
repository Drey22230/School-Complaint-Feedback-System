export default function About() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">

        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          About PLSP Student Complaint System
        </h1>

        <p className="text-lg text-gray-600 text-center mb-12">
          A transparent and secure platform for students to voice concerns,
          submit complaints, and help improve PLSP services.
        </p>

        <div className="space-y-10">

          <div className="p-6 border rounded-xl shadow-sm bg-gray-50">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              Our Mission
            </h2>
            <p className="text-gray-600">
              To provide a safe, accessible, and transparent system where every
              student concern is heard, tracked, and resolved fairly.
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow-sm bg-gray-50">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              Why This System Exists
            </h2>
            <p className="text-gray-600">
              Many concerns go unreported or unresolved. This system ensures
              accountability through tracking, SLA response times, and verified resolutions.
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow-sm bg-gray-50">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              What You Can Do Here
            </h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Submit complaints anonymously or with identity</li>
              <li>Track your complaint status in real-time</li>
              <li>Upload evidence like images or documents</li>
              <li>Rate the resolution process</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}