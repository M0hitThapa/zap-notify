import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  contentClassName?: string;
}

export const Card = ({
  className,
  children,
  contentClassName,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(
        "relative bg-gray-50 text-card-foreground rounded-md",
        className
      )}
      {...props}
    >
      <div className={cn("relative z-10 p-6", contentClassName)}>
        {children}
      </div>
    </div>
  );
};
