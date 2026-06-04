import { motion, AnimatePresence } from "framer-motion"

export default function Preloader({ loading }) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1]
            }
          }}
          className="fixed inset-0 z-[999999] bg-[#1D3B1D] flex items-center justify-center overflow-hidden"
        >
          {/* CONTENT CONTAINER */}
          <div className="relative flex flex-col items-center justify-center p-6 text-center">
            {/* BRAND NAME TEXT - TYPOGRAPHY ONLY */}
            <motion.h1
              initial={{ opacity: 0, letterSpacing: "0.15em", y: 10 }}
              animate={{ opacity: 1, letterSpacing: "0.35em", y: 0 }}
              transition={{ 
                duration: 1.5, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white uppercase select-none leading-none"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Farm2Flake
            </motion.h1>
            
            {/* BRAND TAGLINE */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-6 text-[#FAF7F2]/60 text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Pure. Organic. Dehydrated.
            </motion.p>

            {/* PROGRESS LOADING BAR */}
            <div className="w-[140px] sm:w-[200px] h-[2px] bg-[#FAF7F2]/20 rounded-full mt-8 overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.7, ease: "easeInOut" }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}