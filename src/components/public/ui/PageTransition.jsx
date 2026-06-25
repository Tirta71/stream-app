import { motion, useReducedMotion } from "motion/react";

function PageTransition({ children, className = "" }) {
  const shouldReduceMotion = useReducedMotion();
  const pageTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.5, ease: [0.22, 1, 0.36, 1] };
  const pageVariants = shouldReduceMotion
    ? {
        animate: { opacity: 1 },
        initial: { opacity: 1 },
      }
    : {
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        initial: { opacity: 0, y: 12, filter: "blur(6px)" },
      };

  return (
    <motion.main
      animate="animate"
      className={className}
      initial="initial"
      transition={pageTransition}
      variants={pageVariants}
    >
      {children}
    </motion.main>
  );
}

export default PageTransition;
