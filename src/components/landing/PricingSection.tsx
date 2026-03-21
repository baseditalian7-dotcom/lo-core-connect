import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

type BillingCycle = "monthly" | "annual" | "lifetime";
type Currency = "brl" | "usd" | "eur";

const plans = [
  {
    name: "Starter",
    description: "Para freelancers e pequenos times",
    prices: {
      monthly: { brl: "R$ 8", usd: "$9", eur: "€8" },
      annual: { brl: "R$ 80", usd: "$90", eur: "€80" },
      lifetime: { brl: "R$ 250", usd: "$290", eur: "€250" },
    },
    features: ["Até 100 clientes", "1 usuário", "Relatórios básicos", "Suporte por email"],
    highlight: false,
  },
  {
    name: "Pro",
    description: "Para times em crescimento",
    prices: {
      monthly: { brl: "R$ 25", usd: "$29", eur: "€25" },
      annual: { brl: "R$ 250", usd: "$290", eur: "€250" },
      lifetime: { brl: "R$ 1.000", usd: "$1,200", eur: "€1,000" },
    },
    features: ["Clientes ilimitados", "5 usuários", "Relatórios avançados", "API access", "Suporte prioritário"],
    highlight: true,
  },
  {
    name: "Business",
    description: "Para empresas consolidadas",
    prices: {
      monthly: { brl: "R$ 99", usd: "$99", eur: "€89" },
      annual: { brl: "R$ 5.000", usd: "$990", eur: "€890" },
      lifetime: { brl: "R$ 10.000", usd: "$5,000", eur: "€4,500" },
    },
    features: ["Tudo do Pro", "Usuários ilimitados", "SSO / SAML", "SLA garantido", "Gerente dedicado", "White label"],
    highlight: false,
  },
];

const cycleLabels: Record<BillingCycle, string> = {
  monthly: "Mensal",
  annual: "Anual",
  lifetime: "Lifetime",
};

const currencyLabels: Record<Currency, string> = {
  brl: "R$",
  usd: "US$",
  eur: "€",
};

export default function PricingSection() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const [currency, setCurrency] = useState<Currency>("brl");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="pricing" className="section-padding relative" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Planos</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
            Preço justo, resultado real
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Escolha o plano ideal para o tamanho do seu negócio.
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex rounded-lg bg-secondary p-1 gap-1">
            {(Object.keys(cycleLabels) as BillingCycle[]).map((key) => (
              <button
                key={key}
                onClick={() => setCycle(key)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  cycle === key
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cycleLabels[key]}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative rounded-xl p-6 md:p-8 border transition-all duration-300 ${
                plan.highlight
                  ? "border-primary/40 bg-surface glow-md scale-[1.02]"
                  : "border-border/50 bg-surface hover:border-border"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                  Mais popular
                </div>
              )}
              <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>

              <div className="mt-6 mb-6">
                <span className="text-3xl md:text-4xl font-bold text-foreground tabular-nums">
                  {plan.prices[cycle].brl}
                </span>
                {cycle !== "lifetime" && (
                  <span className="text-muted-foreground text-sm ml-1">
                    /{cycle === "monthly" ? "mês" : "ano"}
                  </span>
                )}
              </div>

              <Button
                variant={plan.highlight ? "hero" : "hero-outline"}
                className="w-full"
                size="lg"
                asChild
              >
                <Link to="/signup">Começar agora</Link>
              </Button>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check size={16} className="text-primary mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
