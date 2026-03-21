import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marina Costa",
    role: "Head de Vendas — Nexa Digital",
    text: "Reduzimos em 40% o tempo de follow-up com clientes. O LO Core virou peça central da nossa operação.",
    rating: 5,
    initials: "MC",
  },
  {
    name: "Thiago Rennó",
    role: "Fundador — TechBridge",
    text: "Testamos 4 CRMs antes. Nenhum era tão rápido de adotar quanto o LO Core. Em 1 semana o time inteiro estava usando.",
    rating: 5,
    initials: "TR",
  },
  {
    name: "Camila Duarte",
    role: "Gerente Comercial — Pragma Labs",
    text: "Os relatórios de conversão mudaram a forma como fazemos forecast. Dado limpo, visualização clara.",
    rating: 5,
    initials: "CD",
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="testimonials" className="section-padding-sm relative" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Depoimentos</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
            Quem usa, recomenda
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-xl bg-surface border border-border/50"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
