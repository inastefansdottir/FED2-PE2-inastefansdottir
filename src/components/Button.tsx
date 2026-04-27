import { Link } from "react-router-dom";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "smallPrimary" | "secondary" | "light" | "disabled";
  size?: "big" | "default" | "small";
  to?: string; // for links
}

const base =
  "transition-colors font-body text-background font-semibold rounded-full";

const variants = {
  primary: "bg-primary hover:bg-secondary",
  smallPrimary: "bg-primary hover:bg-accent",
  secondary: "bg-secondary hover:bg-body",
  light: "bg-background text-secondary hover:bg-accent",
  disabled: "bg-primary text-accent",
};

const sizes = {
  big: "px-7 py-3.5 text-xl",
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
