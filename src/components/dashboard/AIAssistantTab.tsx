import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestions = [
  "Quais clientes estão inativos há mais de 30 dias?",
  "Gere um resumo das métricas deste mês",
  "Sugira estratégias para converter leads em clientes",
  "Quais os melhores horários para contato?",
];

// Simulated responses for demo purposes
const fakeResponses: Record<string, string> = {
  default: "Entendi! Como assistente de CRM, posso ajudar com análise de clientes, métricas, estratégias de conversão e muito mais. O que gostaria de saber?",
  inativos: "📊 **Clientes inativos (30+ dias):**\n\n• **Diego Alves** — CloudPeak — último contato há 45 dias\n• Status: Perdido — Recomendo uma campanha de reengajamento\n\n💡 **Sugestão:** Envie um email personalizado com novidades do produto para reativar o relacionamento.",
  resumo: "📈 **Resumo do mês:**\n\n• **Total de clientes:** 6\n• **Ativos:** 3 (50%)\n• **Leads:** 2 (33.3%)\n• **Perdidos:** 1 (16.7%)\n• **Taxa de conversão:** 50%\n\n✅ Performance está dentro do esperado. Foque nos 2 leads para aumentar a conversão.",
  estrategias: "🎯 **Estratégias de conversão:**\n\n1. **Follow-up em 48h** — Leads que não recebem contato rápido perdem 60% de interesse\n2. **Demo personalizada** — Mostre casos de uso específicos do setor do lead\n3. **Oferta limitada** — Crie urgência com desconto de primeiro mês\n4. **Social proof** — Compartilhe cases de empresas similares\n\n📌 Priorize: Bruno Mendes (AgileDev) e Elena Souza (PixelCraft)",
  horarios: "⏰ **Melhores horários para contato:**\n\n• **Terça a Quinta:** 10h–12h (maior taxa de resposta)\n• **Segunda:** 14h–16h (após alinhamentos internos)\n• **Sexta:** Evitar após 15h\n\n📊 Dados baseados nas interações da semana: pico de atividade na sexta (63 interações) e quarta (52).",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("inativ")) return fakeResponses.inativos;
  if (lower.includes("resumo") || lower.includes("métric")) return fakeResponses.resumo;
  if (lower.includes("estratégia") || lower.includes("converter") || lower.includes("conversão")) return fakeResponses.estrategias;
  if (lower.includes("horário") || lower.includes("contato")) return fakeResponses.horarios;
  return fakeResponses.default;
}

export default function AIAssistantTab() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: text.trim(), timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = getResponse(text);
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: response, timestamp: new Date() },
      ]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] rounded-xl bg-card border border-border/50 overflow-hidden">
      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full text-center py-12"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles size={24} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Assistente IA</h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">
              Pergunte sobre seus clientes, métricas, estratégias de conversão ou qualquer dúvida sobre seu CRM.
            </p>
            <div className="grid sm:grid-cols-2 gap-2 w-full max-w-lg">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-left text-xs p-3 rounded-lg border border-border/50 bg-secondary/50 text-muted-foreground hover:text-foreground hover:border-border transition-all duration-200 active:scale-[0.97]"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot size={14} className="text-primary" />
                </div>
              )}
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-secondary text-foreground rounded-bl-md"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                  <User size={14} className="text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 items-center">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Bot size={14} className="text-primary" />
            </div>
            <div className="bg-secondary px-4 py-3 rounded-2xl rounded-bl-md">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border/50 p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pergunte algo sobre seus clientes..."
            className="bg-secondary border-border"
            disabled={isTyping}
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isTyping} className="shrink-0">
            <Send size={16} />
          </Button>
        </form>
      </div>
    </div>
  );
}
