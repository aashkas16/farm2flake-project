import { Award, ShieldCheck, Ban, Compass } from "lucide-react"

export default function TrustBadges() {
  const badges = [
    {
      title: "FSSAI Certified",
      desc: "Meets premium food safety compliance",
      icon: <Award className="w-8 h-8 text-[#2F7C1F]" strokeWidth={1.5} />,
      badge: "100% Secure Audited"
    },
    {
      title: "Lab Tested",
      desc: "Audited for chemical purity & safety",
      icon: <ShieldCheck className="w-8 h-8 text-[#2F7C1F]" strokeWidth={1.5} />,
      badge: "Certified Clean"
    },
    {
      title: "No Preservatives",
      desc: "Pure active dehydrated ingredients",
      icon: <Ban className="w-8 h-8 text-[#2F7C1F]" strokeWidth={1.5} />,
      badge: "Zero Additives"
    },
    {
      title: "Made In India",
      desc: "Direct local sourcing from farms",
      icon: <Compass className="w-8 h-8 text-[#2F7C1F]" strokeWidth={1.5} />,
      badge: "Export Quality"
    }
  ]

  return (
    <section className="bg-[#FAF7F2] py-10 border-b border-[#1D3B1D]/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 border border-[#1D3B1D]/5 shadow-[0_4px_20px_rgba(29,59,29,0.02)] flex items-start gap-4 hover:-translate-y-0.5 transition-transform duration-300"
            >
              <div className="p-3 bg-[#FAF7F2] rounded-2xl shrink-0">
                {item.icon}
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-bold tracking-wider text-[#2F7C1F] uppercase bg-[#FAF7F2] px-2 py-0.5 rounded-full inline-block mb-1.5">
                  {item.badge}
                </span>
                <h4 className="font-extrabold text-[#111827] text-base leading-tight">
                  {item.title}
                </h4>
                <p className="text-gray-500 text-xs sm:text-sm mt-1 leading-relaxed">
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
