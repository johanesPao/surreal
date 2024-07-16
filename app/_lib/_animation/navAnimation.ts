const transition = {
  duration: 0.5,
  ease: "linear",
  type: "tween",
};

export const opacity = {
  initial: {
    opacity: 0,
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.35,
    },
  },
  closed: {
    opacity: 0,
    transition: {
      duration: 0.35,
    },
  },
};

export const height = {
  initial: {
    height: 0,
  },
  enter: {
    height: "auto",
    transition,
  },
  exit: {
    height: 0,
    transition,
  },
};
