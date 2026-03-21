import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  Users, TrendingUp, UserCheck, UserX, Search, Plus, MoreHorizontal, LogOut,
} from "lucide-react";

type ClientStatus = "lead" | "ativo" | "perdido";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: ClientStatus;
}

const mockClients: Client[] = [
  { id: "1", name: "Ana Ferreira", email: "ana@techsol.com", phone: "(11) 98765-4321", company: "TechSol", status: "ativo" },
  { id: "2", name: "Bruno Mendes", email: "bruno@agiledev.io", phone: "(21) 91234-5678", company: "AgileDev", status: "lead" },
  { id: "3", name: "Carla Nunes", email: "carla@dataflow.co", phone: "(31) 99876-5432", company: "DataFlow", status: "ativo" },
  { id: "4", name: "Diego Alves", email: "diego@cloudpeak.com", phone: "(41) 92345-6789", company: "CloudPeak", status: "perdido" },
  { id: "5", name: "Elena Souza", email: "elena@pixelcraft.br", phone: "(51) 93456-7890", company: "PixelCraft", status: "lead" },
  { id: "6", name: "Felipe Ramos", email: "felipe@nexgen.io", phone: "(61) 94567-8901", company: "NexGen", status: "ativo" },
];

const statusConfig: Record<ClientStatus, { label: string; className: string }> = {
  lead: { label: "Lead", className: "bg-amber-500/10 text-amber-400" },
  ativo: { label: "Ativo", className: "bg-emerald-500/10 text-emerald-400" },
  perdido: { label: "Perdido", className: "bg-red-500/10 text-red-400" },
};

export default function Dashboard() {
  const [clients] = useState<Client[]>(mockClients);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<ClientStatus | "all">("all");

  const filtered = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalClients = clients.length;
  const activeClients = clients.filter((c) => c.status === "ativo").length;
  const leads = clients.filter((c) => c.status === "lead").length;
  const conversion = totalClients > 0 ? ((activeClients / totalClients) * 100).toFixed(1) : "0";

  const stats = [
    { label: "Total de clientes", value: totalClients, icon: Users, color: "text-primary" },
    { label: "Clientes ativos", value: activeClients, icon: UserCheck, color: "text-emerald-400" },
    { label: "Leads", value: leads, icon: TrendingUp, color: "text-amber-400" },
    { label: "Taxa de conversão", value: `${conversion}%`, icon: UserX, color: "text-blue-400" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar / Top bar */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">LO</span>
            </div>
            <span className="font-semibold text-foreground">Core</span>
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">Dashboard</span>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <LogOut size={16} />
              Sair
            </Link>
          </Button>
        </div>
      </header>

      <main className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-2xl font-bold text-foreground">Painel de controle</h1>
          <p className="text-sm text-muted-foreground mt-1">Gerencie seus clientes e acompanhe métricas.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              className="p-5 rounded-xl bg-surface border border-border/50"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground">{stat.label}</span>
                <stat.icon size={16} className={stat.color} />
              </div>
              <div className="text-2xl font-bold text-foreground tabular-nums">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar clientes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-secondary border-border w-64"
              />
            </div>
            <div className="flex gap-1 bg-secondary rounded-lg p-1">
              {(["all", "lead", "ativo", "perdido"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                    filterStatus === s
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s === "all" ? "Todos" : statusConfig[s].label}
                </button>
              ))}
            </div>
          </div>
          <Button variant="hero" size="sm">
            <Plus size={16} />
            Novo cliente
          </Button>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 rounded-xl border border-border/50 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-surface text-xs text-muted-foreground uppercase tracking-wider">
                  <th className="text-left py-3 px-4 font-medium">Nome</th>
                  <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Email</th>
                  <th className="text-left py-3 px-4 font-medium hidden lg:table-cell">Telefone</th>
                  <th className="text-left py-3 px-4 font-medium">Empresa</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((client) => (
                  <tr key={client.id} className="border-t border-border/30 hover:bg-surface-hover transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary shrink-0">
                          {client.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <span className="text-sm font-medium text-foreground">{client.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground hidden md:table-cell">{client.email}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground hidden lg:table-cell">{client.phone}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{client.company}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[client.status].className}`}>
                        {statusConfig[client.status].label}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-muted-foreground hover:text-foreground transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-sm text-muted-foreground">
                      Nenhum cliente encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
