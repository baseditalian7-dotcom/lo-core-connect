import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">LO</span>
            </div>
            <span className="font-semibold text-foreground">Core</span>
          </Link>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Recursos</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Planos</a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">Depoimentos</a>
          </div>

          <p className="text-xs text-muted-foreground">
            © 2026 LO Core. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
