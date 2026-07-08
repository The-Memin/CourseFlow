import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function SuccessCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className="rounded-lg border bg-card/80 p-8 shadow-xl backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: 0.2,
          type: "spring",
          stiffness: 180,
        }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10"
      >
        <CheckCircle2 className="h-10 w-10 text-green-500" />
      </motion.div>

      <h2 className="mt-6 text-center text-2xl font-bold">
        Account created!
      </h2>

      <p className="mt-2 text-center text-muted-foreground">
        Welcome aboard.
      </p>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{
          duration: 1.2,
          ease: "easeInOut",
        }}
        className="mx-auto mt-8 h-1 max-w-[220px] rounded-full bg-primary"
      />

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Preparing your dashboard...
      </p>
    </motion.div>
  );
}