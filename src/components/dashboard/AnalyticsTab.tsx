import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign } from "lucide-react";

const monthlyData = [
  { month: "Jan", clientes: 12, leads: 18, perdidos: 3, receita: 2400 },
  { month: "Fev", clientes: 19, leads: 24, perdidos: 5, receita: 3800 },
  { month: "Mar", clientes: 27, leads: 31, perdidos: 4, receita: 5200 },
  { month: "Abr", clientes: 34, leads: 28, perdidos: 6, receita: 6100 },
  { month: "Mai", clientes: 42, leads: 35, perdidos: 3, receita: 7800 },
  { month: "Jun", clientes: 48, leads: 41, perdidos: 7, receita: 8900 },
  { month: "Jul", clientes: 53, leads: 38, perdidos: 5, receita: 9400 },
  { month: "Ago", clientes: 61, leads: 45, perdidos: 4, receita: 11200 },
  { month: "Set", clientes: 67, leads: 52, perdidos: 8, receita: 12800 },
  { month: "Out", clientes: 74, leads: 48, perdidos: 6, receita: 14100 },
  { month: "Nov", clientes: 82, leads: 56, perdidos: 5, receita: 15600 },
  { month: "Dez", clientes: 91, leads: 63, perdidos: 7, receita: 17200 },
];

const statusDistribution = [
  { name: "Ativos", value: 91, color: "hsl(152, 68%, 50%)" },
  { name: "Leads", value: 63, color: "hsl(45, 93%, 58%)" },
  { name: "Perdidos", value: 7, color: "hsl(0, 72%, 55%)" },
];

const weeklyActivity = [
  { day: "Seg", interacoes: 34 },
  { day: "Ter", interacoes: 47 },
  { day: "Qua", interacoes: 52 },
  { day: "Qui", interacoes: 41 },
  { day: "Sex", interacoes: 63 },
  { day: "Sáb", interacoes: 18 },
  { day: "Dom", interacoes: 9 },
];

const kpis = [
  { label: "Receita mensal", value: "R$ 17.200", change: "+12.3%", up: true, icon: DollarSign },
  { label: "Novos clientes", value: "91", change: "+8.7%", up: true, icon: Users },
  { label: "Taxa de churn", value: "4.2%", change: "-1.1%", up: false, icon: TrendingDown },
  { label: "Ticket médio", value: "R$ 189", change: "+3.4%", up: true, icon: TrendingUp },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-card border border-border/50 rounded-lg px-3 py-2 shadow-lg">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-xs font-medium" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
};

export default function AnalyticsTab() {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="p-5 rounded-xl bg-card border border-border/50"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground">{kpi.label}</span>
              <kpi.icon size={16} className="text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground tabular-nums">{kpi.value}</div>
            <span className={`text-xs font-medium mt-1 inline-block ${kpi.up ? "text-emerald-400" : "text-red-400"}`}>
              {kpi.change}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Area chart - crescimento */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 p-5 rounded-xl bg-card border border-border/50"
        >
          <h3 className="text-sm font-semibold text-foreground mb-1">Crescimento de clientes</h3>
          <p className="text-xs text-muted-foreground mb-4">Evolução mensal ao longo do ano</p>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="gradClientes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(152, 68%, 50%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(152, 68%, 50%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(45, 93%, 58%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(45, 93%, 58%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 14%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: "hsl(215, 12%, 50%)" }} />
              <Area type="monotone" dataKey="clientes" name="Clientes" stroke="hsl(152, 68%, 50%)" fill="url(#gradClientes)" strokeWidth={2} />
              <Area type="monotone" dataKey="leads" name="Leads" stroke="hsl(45, 93%, 58%)" fill="url(#gradLeads)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="p-5 rounded-xl bg-card border border-border/50"
        >
          <h3 className="text-sm font-semibold text-foreground mb-1">Distribuição</h3>
          <p className="text-xs text-muted-foreground mb-4">Status dos clientes</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                dataKey="value"
                strokeWidth={0}
              >
                {statusDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {statusDistribution.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                <span className="text-xs text-muted-foreground">{s.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Charts row 2 */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-5 rounded-xl bg-card border border-border/50"
        >
          <h3 className="text-sm font-semibold text-foreground mb-1">Receita mensal</h3>
          <p className="text-xs text-muted-foreground mb-4">Faturamento ao longo do ano (R$)</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 14%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="receita" name="Receita" fill="hsl(152, 68%, 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Weekly activity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="p-5 rounded-xl bg-card border border-border/50"
        >
          <h3 className="text-sm font-semibold text-foreground mb-1">Atividade semanal</h3>
          <p className="text-xs text-muted-foreground mb-4">Interações por dia da semana</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 14%)" />
              <XAxis dataKey="day" tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="interacoes" name="Interações" fill="hsl(210, 70%, 55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
