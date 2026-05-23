import { Link } from "react-router-dom";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "smallPrimary" | "secondary" | "light" | "error";
  size?: "big" | "default" | "small";
  to?: string; // for links
}

const base =
  "transition-colors font-body text-background font-semibold rounded-full disabled:text-accent/70 disabled:cursor-not-allowed";

const variants = {
  primary: "bg-primary hover:bg-secondary",
  smallPrimary: "bg-primary hover:text-secondary hover:bg-accent",
  secondary: "bg-secondary hover:bg-body disabled:hover:bg-secondary",
  light: "bg-background text-secondary hover:bg-accent",
  error: "bg-error hover:bg-secondary",
};

const sizes = {
  big: "px-7 py-3 text-xl",
  default: "px-6 py-3",
  small: "px-5 py-2.5 text-sm",
};

export function Button({
  variant = "primary",
  size = "default",
  className = "",
  children,
  to,
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
