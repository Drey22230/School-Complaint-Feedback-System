import howitworksUtils from "@/app/util/howitworksUtils";
import { howitworksContent } from "../shared/utils/howitworksContent";
export default function HowItWorks() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="w-20 h-1 bg-green-600 rounded-full mx-auto mb-6" />

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-green-950 mb-5">
            How It Works
          </h2>

          <p className="text-lg text-green-900/70 max-w-2xl mx-auto leading-relaxed">
            A simple and transparent process designed to ensure every concern is
            heard, reviewed, and resolved properly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {howitworksContent.map((item) => (
            <div key={item.id}>{howitworksUtils(item)}</div>
          ))} 
        </div>
      </div>
    </section>
  );
}