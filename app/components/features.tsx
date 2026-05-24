import FeaturesUtils from "../util/featuresUtils";
import { featuresContent } from "../shared/utils/featuresContent";

export default function FeaturesPage() {
  return (
    <section className=" bg-white to-green-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <div className="w-20 h-1 bg-green-600 mx-auto rounded-full mb-6" />

          <h1 className="text-4xl md:text-5xl font-bold text-green-950 mb-5 tracking-tight">
            Built for Trust and Safety
          </h1>

          <p className="text-lg text-green-900/70 max-w-2xl mx-auto leading-relaxed">
            Everything you need to feel heard, protected, and supported at PLSP.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresContent.map((feature) => (
            <FeaturesUtils
              key={feature.id}
              header={feature.header}
              subheader={feature.subheader}
            />
          ))}
        </div>

      </div>
    </section>
  );
}