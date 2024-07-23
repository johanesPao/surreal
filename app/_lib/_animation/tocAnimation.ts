const transition = {
  duration: 0.5,
  ease: "linear",
  type: "tween",
};

export const height = {
  initial: {
    height: 0,
  },
  open: {
    height: "auto",
    transition,
  },
  close: {
    height: 0,
    transition,
  },
};
