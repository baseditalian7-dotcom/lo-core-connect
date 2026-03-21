import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function DashboardHeader() {
  return (
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
  );
}
