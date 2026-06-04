import { Layers, Sprout, Activity, Ban, Globe, CalendarRange } from "lucide-react"

export default function HowItWorks() {
  const points = [
    {
      title: "Freeze-Dried Technology",
      desc: "Our state-of-the-art low temperature dehydration sublimation extracts moisture while maintaining structural cellular integrity.",
      icon: <Layers className="w-7 h-7 text-[#2F7C1F]" strokeWidth={1.5} />
    },
    {
      title: "100% Natural & Sourced",
      desc: "Pure raw ingredients sourced directly from audited local farmers across active harvests in India.",
      icon: <Sprout className="w-7 h-7 text-[#2F7C1F]" strokeWidth={1.5} />
    },
    {
      title: "Full Nutrient Retention",
      desc: "Preserves up to 98% of natural vitamins, antioxidants, active enzymes, and healthy dietary fiber.",
      icon: <Activity className="w-7 h-7 text-[#2F7C1F]" strokeWidth={1.5} />
    },
    {
      title: "Zero Preservatives",
      desc: "No added sugars, anti-caking agents, synthetic food starch, artificial colorings, or chemicals.",
      icon: <Ban className="w-7 h-7 text-[#2F7C1F]" strokeWidth={1.5} />
    },
    {
      title: "Export Quality Standards",
      desc: "Manufactured in sterile, FSSAI certified facilities meeting international quality benchmarks.",
      icon: <Globe className="w-7 h-7 text-[#2F7C1F]" strokeWidth={1.5} />
    },
    {
      title: "12-Month Shelf Life",
      desc: "Advanced low-moisture packing provides organic preservation for up to a year without refrigeration.",
      icon: <CalendarRange className="w-7 h-7 text-[#2F7C1F]" strokeWidth={1.5} />
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden border-b border-[#1D3B1D]/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* HEADING */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <span className="text-xs font-bold tracking-[2px] text-[#2F7C1F] uppercase block mb-2">
            The Farm2Flake Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1D3B1D] tracking-tight">
            Why Choose Farm2Flake?
          </h2>
          <p className="text-gray-500 mt-4 text-xs sm:text-sm leading-relaxed">
            We lock in nature's absolute best using clean processing standards that fit right into your active healthy lifestyle.
          </p>
        </div>

        {/* WHY CHOOSE CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((item, index) => (
            <div
              key={index}
              className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#1D3B1D]/5 flex flex-col justify-between hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center border border-[#1D3B1D]/5 shadow-sm mb-6">
                  {item.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#111827] leading-snug">
                  {item.title}
                </h3>
                <p className="mt-3 text-gray-500 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}