import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, BarChart3, CalendarDays, Sparkles } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import OverviewTab from "@/components/dashboard/OverviewTab";
import AnalyticsTab from "@/components/dashboard/AnalyticsTab";
import CalendarTab from "@/components/dashboard/CalendarTab";
import AIAssistantTab from "@/components/dashboard/AIAssistantTab";

const tabs = [
  { id: "overview", label: "Visão geral", icon: LayoutDashboard },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "calendar", label: "Calendário", icon: CalendarDays },
  { id: "ai", label: "Assistente IA", icon: Sparkles },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-2xl font-bold text-foreground">Painel de controle</h1>
          <p className="text-sm text-muted-foreground mt-1">Gerencie seus clientes e acompanhe métricas.</p>
        </motion.div>

        {/* Tabs */}
        <div className="mt-6 flex gap-1 bg-secondary rounded-lg p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon size={15} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mt-6">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "analytics" && <AnalyticsTab />}
          {activeTab === "calendar" && <CalendarTab />}
          {activeTab === "ai" && <AIAssistantTab />}
        </div>
      </main>
    </div>
  );
}
