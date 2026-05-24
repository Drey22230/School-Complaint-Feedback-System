import HeaderSubheader from "../types/featuresTypes";

export default function FeaturesUtils({
  header,
  subheader,
}: HeaderSubheader) {
  return (
    <div className="p-6 rounded-2xl border border-green-100 bg-green-50/70 hover:bg-green-50 transition-all duration-300">
      
      <div className="w-12 h-1 bg-green-600 rounded-full mb-4" />

      <h3 className="text-xl font-semibold mb-3 text-green-900">
        {header}
      </h3>

      <p className="text-green-800/80 leading-relaxed">
        {subheader}
      </p>
    </div>
  );
}