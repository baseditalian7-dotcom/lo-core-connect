import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Clock, MapPin, User } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: "reuniao" | "follow-up" | "demo" | "ligacao";
  client: string;
  location?: string;
}

const typeConfig: Record<Event["type"], { label: string; className: string }> = {
  reuniao: { label: "Reunião", className: "bg-primary/10 text-primary border-primary/20" },
  "follow-up": { label: "Follow-up", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  demo: { label: "Demo", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  ligacao: { label: "Ligação", className: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
};

const today = new Date();
const mockEvents: Event[] = [
  { id: "1", title: "Apresentação do plano Pro", date: today, time: "09:00", type: "demo", client: "Ana Ferreira", location: "Google Meet" },
  { id: "2", title: "Alinhamento mensal", date: today, time: "11:30", type: "reuniao", client: "Carla Nunes", location: "Zoom" },
  { id: "3", title: "Retorno proposta comercial", date: today, time: "14:00", type: "follow-up", client: "Bruno Mendes" },
  { id: "4", title: "Qualificação de lead", date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1), time: "10:00", type: "ligacao", client: "Elena Souza" },
  { id: "5", title: "Onboarding novo cliente", date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1), time: "15:00", type: "reuniao", client: "Felipe Ramos", location: "Presencial" },
  { id: "6", title: "Demo plataforma", date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2), time: "09:30", type: "demo", client: "Diego Alves", location: "Teams" },
  { id: "7", title: "Check-in trimestral", date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3), time: "16:00", type: "follow-up", client: "Ana Ferreira" },
];

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export default function CalendarTab() {
  const [selected, setSelected] = useState<Date>(today);

  const eventsForDay = mockEvents.filter((e) => isSameDay(e.date, selected));
  const daysWithEvents = mockEvents.map((e) => e.date);

  const formatDate = (d: Date) =>
    d.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="grid lg:grid-cols-[340px_1fr] gap-6">
      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl bg-card border border-border/50 p-4"
      >
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(d) => d && setSelected(d)}
          className={cn("p-3 pointer-events-auto")}
          modifiers={{ hasEvent: daysWithEvents }}
          modifiersClassNames={{ hasEvent: "border border-primary/40 rounded-md" }}
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(typeConfig).map(([key, cfg]) => (
            <span key={key} className={`text-[10px] px-2 py-0.5 rounded-full border ${cfg.className}`}>
              {cfg.label}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Events list */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-3"
      >
        <div>
          <h3 className="text-sm font-semibold text-foreground capitalize">{formatDate(selected)}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {eventsForDay.length} {eventsForDay.length === 1 ? "evento" : "eventos"} agendados
          </p>
        </div>

        {eventsForDay.length === 0 ? (
          <div className="rounded-xl bg-card border border-border/50 p-8 text-center">
            <p className="text-sm text-muted-foreground">Nenhum evento neste dia.</p>
            <p className="text-xs text-muted-foreground mt-1">Selecione outro dia no calendário.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {eventsForDay.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl bg-card border border-border/50 p-4 hover:border-border transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${typeConfig[event.type].className}`}>
                        {typeConfig[event.type].label}
                      </span>
                      <h4 className="text-sm font-medium text-foreground">{event.title}</h4>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock size={12} /> {event.time}</span>
                      <span className="flex items-center gap-1"><User size={12} /> {event.client}</span>
                      {event.location && (
                        <span className="flex items-center gap-1"><MapPin size={12} /> {event.location}</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
