import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Apparition douce à l'entrée dans l'écran ; désactivée si l'utilisateur préfère moins d'animations. */
export default function Reveal({ children, delay = 0, y = 24, className = "", as = "div", ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;
  if (reduce) return React.createElement(as, { className, ...rest }, children);
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
