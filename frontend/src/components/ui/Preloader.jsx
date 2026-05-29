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
              duration: 1
            }
          }}
          className="fixed inset-0 z-[999999] bg-[#f7f6f2] flex items-center justify-center overflow-hidden"
        >

          {/* BACKGROUND GLOW */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-[500px] h-[500px] rounded-full bg-[#7da05a] blur-3xl"
          />



          {/* CONTENT */}
          <div className="relative z-10 flex flex-col items-center">

            {/* LOGO */}
            <motion.img
              src="/logo.png"
              alt="Farm2Flake"
              initial={{
                opacity: 0,
                scale: 0.7,
                rotate: -8
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                y: [0, -10, 0]
              }}
              transition={{
                duration: 1.5,
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="w-[120px] sm:w-[150px] drop-shadow-2xl"
            />



            {/* TEXT */}
            <motion.h1
              initial={{
                opacity: 0,
                y: 30
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.5,
                duration: 1
              }}
              className="mt-6 text-[34px] sm:text-[48px] font-bold text-[#275227] tracking-wide"
            >

              Farm2Flake

            </motion.h1>



            {/* TAGLINE */}
            <motion.p
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                delay: 1
              }}
              className="mt-3 text-[#5f7a5f] text-sm sm:text-base tracking-[3px] uppercase"
            >

              Rich Fruits. Real Goodness.

            </motion.p>



            {/* LOADING BAR */}
            <div className="mt-10 w-[220px] h-[5px] bg-[#dfe7d7] rounded-full overflow-hidden">

              <motion.div
                initial={{
                  x: "-100%"
                }}
                animate={{
                  x: "100%"
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-[40%] h-full bg-[#275227] rounded-full"
              />

            </div>

          </div>

        </motion.div>

      )}

    </AnimatePresence>

  )

}