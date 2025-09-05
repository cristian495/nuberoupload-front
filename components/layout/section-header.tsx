"use client";

interface SectionHeaderProps {
  title: string;
  description?: string;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export default function SectionHeader({ 
  title, 
  description, 
  subtitle, 
  action, 
  className = "" 
}: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between mb-8 ${className}`}>
      <div>
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
        {subtitle && <div className="mt-1">{subtitle}</div>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}