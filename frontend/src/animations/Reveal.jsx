import { motion } from "framer-motion"

import { useInView } from "react-intersection-observer"

import {
  fadeUp
} from "./variants"

export default function Reveal({

  children,

  variant = fadeUp,

  duration,

  delay = 0,

  className = ""

}) {

  const [ref, inView] = useInView({

    triggerOnce: true,

    threshold: 0.12

  })



  return (

    <motion.div
      ref={ref}
      variants={variant}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{

        duration: duration || 0.8,

        delay

      }}
      className={className}
    >

      {children}

    </motion.div>

  )

}