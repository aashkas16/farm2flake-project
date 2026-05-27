export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

export const fadeLeft = {
  hidden: {
    opacity: 0,
    x: 60
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

export const fadeRight = {
  hidden: {
    opacity: 0,
    x: -60
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.9
  },

  visible: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

export const staggerContainer = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.12
    }
  }
}

export const floatingAnimation = {
  animate: {
    y: [0, -12, 0],

    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export const buttonHover = {
  whileHover: {
    scale: 1.04,
    y: -2
  },

  whileTap: {
    scale: 0.97
  },

  transition: {
    type: "spring",
    stiffness: 300
  }
}

export const navbarAnimation = {
  hidden: {
    y: -80,
    opacity: 0
  },

  visible: {
    y: 0,
    opacity: 1,

    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

export const pageTransition = {
  initial: {
    opacity: 0,
    y: 20
  },

  animate: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },

  exit: {
    opacity: 0,
    y: -20,

    transition: {
      duration: 0.4
    }
  }
}