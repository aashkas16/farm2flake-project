import { Link } from "react-router-dom"
import { Globe, ArrowRight, ShieldCheck, FileSpreadsheet } from "lucide-react"

export default function BulkExport() {
  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden border-y border-[#1D3B1D]/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="bg-[#FAF7F2] rounded-[36px] border border-[#1D3B1D]/5 p-8 md:p-14 lg:p-20 relative overflow-hidden">
          {/* Subtle decorative circles */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#2F7C1F]/5 pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#1D3B1D]/5 pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-14 items-center relative z-10">
            {/* LEFT: TEXT CONTENT */}
            <div>
              <span className="text-xs font-bold tracking-[2px] text-[#2F7C1F] uppercase bg-white border border-[#2F7C1F]/10 px-4 py-1.5 rounded-full inline-block mb-4">
                B2B & Trade Services
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1D3B1D] leading-[1.1] tracking-tight">
                Bulk Orders & Export Partnerships
              </h2>
              <p className="mt-6 text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl">
                Farm2Flake is a premier supplier of premium, dehydrated, and freeze-dried ingredients. We provide bulk raw materials and private-label packaging for:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {[
                  { title: "Global Exporters", desc: "FDA & international export standards" },
                  { title: "Food & Beverage Brands", desc: "For mixes, healthy snacking & cereals" },
                  { title: "Cosmetics & Wellness", desc: "Organic nutrient powder supply" },
                  { title: "Private Label Brands", desc: "Custom end-to-end packaging solutions" }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start bg-white p-4 rounded-2xl border border-black/[0.02]">
                    <div className="w-5 h-5 rounded-full bg-[#2F7C1F]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[#2F7C1F] text-xs">✓</span>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#111827] text-sm sm:text-base">{item.title}</h4>
                      <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: CARD CTA */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1D3B1D]/5 shadow-[0_10px_40px_rgba(29,59,29,0.03)] flex flex-col justify-between h-full">
              <div>
                <h3 className="font-extrabold text-[#1D3B1D] text-xl sm:text-2xl leading-snug">
                  Partner With Us
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm mt-3 leading-relaxed">
                  Connect directly with our commercial team to request lab certifications, technical spec sheets, sample kits, and customized price sheets.
                </p>

                <div className="space-y-3.5 mt-6">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-600">
                    <Globe className="w-5 h-5 text-[#2F7C1F]" />
                    <span>Global shipping logistics & custom clearance</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-600">
                    <ShieldCheck className="w-5 h-5 text-[#2F7C1F]" />
                    <span>Certifications: FSSAI, ISO & Lab Tested reports</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-600">
                    <FileSpreadsheet className="w-5 h-5 text-[#2F7C1F]" />
                    <span>Low Minimum Order Quantities (MOQ)</span>
                  </div>
                </div>
              </div>

              <Link
                to="/contact"
                onClick={() => window.scrollTo(0, 0)}
                className="mt-8 bg-[#1D3B1D] hover:bg-[#2F7C1F] text-[#FAF7F2] py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Request Bulk Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
