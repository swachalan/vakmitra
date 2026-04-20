import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(value) {
        if (target >= 100) {
          setDisplay(Math.floor(value).toLocaleString("en-IN"));
        } else {
          setDisplay(value.toFixed(1));
        }
      },
    });
    return () => controls.stop();
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}

const metrics = [
  { value: 12000000, prefix: "", suffix: "+", label: "Calls Made", display: "1.2Cr" },
  { value: 98.3, prefix: "", suffix: "%", label: "Uptime" },
  { value: 20, prefix: "", suffix: "+", label: "Languages" },
  { value: 3, prefix: "", suffix: " Min", label: "Setup Time" },
];

export function MetricsSection() {
  return (
    <section className="bg-dark-section py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {metrics.map((metric) => (
            <motion.div
              key={metric.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-display text-3xl font-bold text-dark-section-foreground sm:text-4xl lg:text-5xl">
                {metric.display ? (
                  <AnimatedCounter target={120} suffix="Lakh+" />
                ) : (
                  <AnimatedCounter target={metric.value} suffix={metric.suffix} prefix={metric.prefix} />
                )}
              </p>
              <p className="mt-2 text-sm text-dark-section-foreground/60">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
