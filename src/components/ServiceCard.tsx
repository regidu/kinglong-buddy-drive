import { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
}

const ServiceCard = ({ icon, title, description, onClick, className = "" }: ServiceCardProps) => (
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

export default ServiceCard;
