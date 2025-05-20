
import React from "react";
import { cn } from "@/lib/utils";

export interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  icon?: React.ReactNode;
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, label, error, success, icon, id, ...props }, ref) => {
    const inputId = id || Math.random().toString(36).substring(2, 9);
    const isInvalid = !!error;
    const isValid = !!success;
    
    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={inputId}
            className={cn(
              "block text-sm font-medium",
              isInvalid ? "text-destructive" : 
              isValid ? "text-green-600" : 
              "text-gray-700"
            )}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <input
            id={inputId}
            className={cn(
              "w-full px-4 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2",
              isInvalid 
                ? "border-destructive focus:ring-destructive/50" 
                : isValid
                ? "border-green-500 focus:ring-green-500/50"
                : "border-input focus:ring-primary/50 focus:border-transparent",
              icon && "pl-10",
              props.disabled && "bg-muted cursor-not-allowed",
              className
            )}
            ref={ref}
            {...props}
          />
          
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {icon}
            </span>
          )}
        </div>
        
        {error && <p className="text-xs text-destructive">{error}</p>}
        {success && <p className="text-xs text-green-600">{success}</p>}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export { CustomInput };
