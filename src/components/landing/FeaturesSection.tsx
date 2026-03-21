import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, BarChart3, Search, Shield, Smartphone, Globe } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Gestão de clientes",
    description: "CRUD completo com status, filtros e busca. Organize leads, ativos e perdidos em um só lugar.",
  },
  {
    icon: BarChart3,
    title: "Métricas em tempo real",
    description: "Acompanhe taxa de conversão, total de clientes e performance do funil de vendas.",
  },
  {
    icon: Search,
    title: "Busca inteligente",
    description: "Encontre qualquer cliente em segundos com filtros avançados por nome, empresa ou status.",
  },
  {
    icon: Shield,
    title: "Segurança robusta",
    description: "Autenticação com JWT, proteção de rotas e dados criptografados. Seus dados seguros.",
  },
  {
    icon: Smartphone,
    title: "100% responsivo",
    description: "Acesse de qualquer dispositivo. Interface adaptada para desktop, tablet e celular.",
  },
  {
    icon: Globe,
    title: "Multilíngue",
    description: "Suporte a Português, Inglês e Espanhol. Alcance global para sua operação.",
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="features" className="section-padding relative" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Recursos</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            Tudo o que você precisa para escalar
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Ferramentas poderosas para transformar seu processo de vendas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group p-6 rounded-xl bg-surface border border-border/50 hover:border-primary/20 hover:glow-sm transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <feature.icon size={20} className="text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
