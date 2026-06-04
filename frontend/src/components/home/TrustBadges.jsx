import React from "react"

const FssaiLogo = () => (
  <svg viewBox="0 0 120 120" className="w-20 h-20" xmlns="http://www.w3.org/2000/svg">
    {/* Outer gold/green seal */}
    <circle cx="60" cy="60" r="54" fill="none" stroke="#2F7C1F" strokeWidth="2" strokeDasharray="3 1" />
    <circle cx="60" cy="60" r="50" fill="#FFFFFF" stroke="#D1FAE5" strokeWidth="1.5" />
    {/* Leaf pattern */}
    <path d="M60 16 C63 22 57 26 60 30 C63 26 57 22 60 16" fill="#2F7C1F" />
    {/* fssai Typography */}
    <g transform="translate(24, 60)">
      {/* fss */}
      <text x="0" y="0" fontFamily="system-ui, -apple-system, sans-serif" fontSize="22" fontWeight="900" fill="#0C4DA2" letterSpacing="-0.5">fss</text>
      {/* a */}
      <text x="31" y="0" fontFamily="system-ui, -apple-system, sans-serif" fontSize="22" fontWeight="900" fill="#E31E24" letterSpacing="-0.5">a</text>
      {/* i */}
      <text x="44" y="0" fontFamily="system-ui, -apple-system, sans-serif" fontSize="22" fontWeight="900" fill="#F7931E" letterSpacing="-0.5">i</text>
      {/* Leaf dot on the 'i' */}
      <path d="M47 -14 C51 -18 48 -22 51 -24 C53 -22 50 -18 51 -14 Z" fill="#2F7C1F" />
    </g>
    {/* Ribbon/Banner below */}
    <rect x="25" y="72" width="70" height="12" rx="6" fill="#2F7C1F" />
    <text x="60" y="80" fontFamily="system-ui, -apple-system, sans-serif" fontSize="7" fontWeight="bold" fill="#FFFFFF" textAnchor="middle" letterSpacing="1">CERTIFIED</text>
    <text x="60" y="98" fontFamily="system-ui, -apple-system, sans-serif" fontSize="5.5" fontWeight="bold" fill="#6B7280" textAnchor="middle" letterSpacing="0.5">LIC. NO. 100200000000</text>
  </svg>
)

const LabTestedLogo = () => (
  <svg viewBox="0 0 120 120" className="w-20 h-20" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="54" fill="none" stroke="#2F7C1F" strokeWidth="2" strokeDasharray="3 1" />
    <circle cx="60" cy="60" r="50" fill="#FFFFFF" stroke="#D1FAE5" strokeWidth="1.5" />
    {/* Flask icon with bubbles */}
    <g transform="translate(45, 25)">
      <path d="M10 2 L20 2 M15 2 L15 10 M10 10 L20 10 M6 28 L24 28 M6 28 L11 14 L11 10 L19 10 L19 14 L24 28" fill="none" stroke="#2F7C1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 24 L22 24" stroke="#2F7C1F" strokeWidth="1.5" />
      <circle cx="12" cy="18" r="1.5" fill="#2F7C1F" />
      <circle cx="18" cy="16" r="1.2" fill="#2F7C1F" />
      <circle cx="15" cy="21" r="1.5" fill="#2F7C1F" />
    </g>
    <rect x="25" y="72" width="70" height="12" rx="6" fill="#2F7C1F" />
    <text x="60" y="80" fontFamily="system-ui, -apple-system, sans-serif" fontSize="7" fontWeight="bold" fill="#FFFFFF" textAnchor="middle" letterSpacing="1">LAB TESTED</text>
    <text x="60" y="98" fontFamily="system-ui, -apple-system, sans-serif" fontSize="5.5" fontWeight="bold" fill="#6B7280" textAnchor="middle" letterSpacing="0.5">100% PURE &amp; SAFE</text>
  </svg>
)

const NoPreservativesLogo = () => (
  <svg viewBox="0 0 120 120" className="w-20 h-20" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="54" fill="none" stroke="#2F7C1F" strokeWidth="2" strokeDasharray="3 1" />
    <circle cx="60" cy="60" r="50" fill="#FFFFFF" stroke="#D1FAE5" strokeWidth="1.5" />
    {/* Leaf or Ban icon */}
    <g transform="translate(45, 25)">
      <circle cx="15" cy="15" r="13" fill="none" stroke="#2F7C1F" strokeWidth="2.5" />
      <line x1="6" y1="6" x2="24" y2="24" stroke="#2F7C1F" strokeWidth="2.5" />
      <path d="M12 22 C14 17 21 13 23 11 C21 17 15 21 12 22 Z" fill="#2F7C1F" />
    </g>
    <rect x="25" y="72" width="70" height="12" rx="6" fill="#2F7C1F" />
    <text x="60" y="80" fontFamily="system-ui, -apple-system, sans-serif" fontSize="6.5" fontWeight="bold" fill="#FFFFFF" textAnchor="middle" letterSpacing="0.5">NO PRESERVATIVES</text>
    <text x="60" y="98" fontFamily="system-ui, -apple-system, sans-serif" fontSize="5.5" fontWeight="bold" fill="#6B7280" textAnchor="middle" letterSpacing="0.5">ZERO ADDED CHEMICALS</text>
  </svg>
)

const MadeInIndiaLogo = () => (
  <svg viewBox="0 0 120 120" className="w-20 h-20" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="54" fill="none" stroke="#2F7C1F" strokeWidth="2" strokeDasharray="3 1" />
    <circle cx="60" cy="60" r="50" fill="#FFFFFF" stroke="#D1FAE5" strokeWidth="1.5" />
    {/* Stylized Tricolor emblem */}
    <g transform="translate(45, 25)">
      <circle cx="15" cy="15" r="14" fill="none" stroke="#2F7C1F" strokeWidth="2" />
      {/* Saffron band */}
      <path d="M2 10 Q15 6 28 10 L28 2 Q15 -2 2 2 Z" fill="#FF9933" />
      {/* White middle band */}
      <path d="M2 15 Q15 11 28 15 L28 9 Q15 5 2 9 Z" fill="#FFFFFF" />
      {/* Green band */}
      <path d="M2 20 Q15 16 28 20 L28 14 Q15 10 2 14 Z" fill="#138808" />
      {/* Ashoka Chakra */}
      <circle cx="15" cy="12" r="2.5" fill="none" stroke="#000080" strokeWidth="0.5" />
      <circle cx="15" cy="12" r="0.5" fill="#000080" />
    </g>
    <rect x="25" y="72" width="70" height="12" rx="6" fill="#2F7C1F" />
    <text x="60" y="80" fontFamily="system-ui, -apple-system, sans-serif" fontSize="7" fontWeight="bold" fill="#FFFFFF" textAnchor="middle" letterSpacing="1">MADE IN INDIA</text>
    <text x="60" y="98" fontFamily="system-ui, -apple-system, sans-serif" fontSize="5.5" fontWeight="bold" fill="#6B7280" textAnchor="middle" letterSpacing="0.5">LOCALLY SOURCED FARMS</text>
  </svg>
)

export default function TrustBadges() {
  const badges = [
    {
      title: "FSSAI Certified",
      desc: "Meets premium food safety compliance",
      icon: <FssaiLogo />
    },
    {
      title: "Lab Tested",
      desc: "Audited for chemical purity & safety",
      icon: <LabTestedLogo />
    },
    {
      title: "No Preservatives",
      desc: "Pure active dehydrated ingredients",
      icon: <NoPreservativesLogo />
    },
    {
      title: "Made In India",
      desc: "Direct local sourcing from farms",
      icon: <MadeInIndiaLogo />
    }
  ]

  return (
    <section className="bg-[#FAF7F2] py-12 sm:py-16 border-b border-[#1D3B1D]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 justify-center">
          {badges.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1D3B1D]/5 shadow-[0_8px_30px_rgba(29,59,29,0.03)] flex flex-col items-center text-center justify-between min-h-[240px] sm:min-h-[260px] hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex-1 flex items-center justify-center p-2 mb-4">
                {item.icon}
              </div>
              <div className="w-full">
                <h4 className="font-black text-[#1D3B1D] text-sm sm:text-lg leading-tight mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-500 text-[10px] sm:text-xs leading-normal max-w-[200px] mx-auto">
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
