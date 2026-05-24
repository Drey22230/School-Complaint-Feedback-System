export default function howitworksUtils({ id,header, subheader }: { id: number; header: string; subheader: string }) {
    return (
         <div className="bg-green-50/70 border border-green-100 rounded-3xl p-8 transition-all duration-300 hover:bg-green-50">
            <div className="w-14 h-14 rounded-full bg-green-600 text-white flex items-center justify-center text-lg font-bold mb-6">
              {id}
            </div>

            <h3 className="text-2xl font-semibold text-green-950 mb-4">
              {header}
            </h3>

            <p className="text-green-900/70 leading-relaxed">
              {subheader}
            </p>
          </div>
    );
}