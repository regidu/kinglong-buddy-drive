import { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
  compact?: boolean;
}

const ServiceCard = ({ icon, title, description, onClick, className = "", compact = false }: ServiceCardProps) => {
  if (compact) {
    return (
      <button
        onClick={onClick}
        className={`flex flex-col items-center gap-2 p-3 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-surface-hover transition-all duration-200 text-center group ${className}`}
      >
        <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center text-white shadow-[var(--shadow-gold)]">
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-xs font-semibold text-card-foreground group-hover:text-primary transition-colors leading-tight">{title}</h3>
          <p className="text-[10px] text-muted-foreground truncate">{description}</p>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-surface-hover transition-all duration-200 text-left group ${className}`}
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center text-white shadow-[var(--shadow-gold)]">
        {icon}
      </div>
      <div className="min-w-0">
        <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-sm text-muted-foreground truncate">{description}</p>
      </div>
    </button>
  );
};

export default ServiceCard;
