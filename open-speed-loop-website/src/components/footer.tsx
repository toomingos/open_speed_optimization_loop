import Link from "next/link";

const PRODUCT_LINKS = [
  { href: "/docs/getting-started", label: "Documentation" },
  { href: "/case-studies", label: "Case Studies" },
  {
    href: "https://skills.sh/toomingos/open_speed_optimization_loop/speed-loop",
    label: "Agent Skill",
    external: true,
  },
];

const PROJECT_LINKS = [
  {
    href: "https://github.com/toomingos/open_speed_optimization_loop",
    label: "GitHub",
    external: true,
  },
  {
    href: "https://github.com/toomingos/open_speed_optimization_loop/issues",
    label: "Issues",
    external: true,
  },
  {
    href: "https://github.com/toomingos/open_speed_optimization_loop/blob/main/LICENSE",
    label: "License",
    external: true,
  },
];

function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-[95rem] mx-auto px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-pixel-square text-sm tracking-[0.1em]">
              OSOL
            </Link>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed max-w-[240px]">
              A reusable speed optimization framework for AI agents.
            </p>
          </div>

          {/* Product */}
          <div>
            <p className="font-pixel-square text-[10px] tracking-widest text-muted-foreground mb-4">
              PRODUCT
            </p>
            <ul className="space-y-2.5 text-xs">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} external={link.external}>
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Project */}
          <div>
            <p className="font-pixel-square text-[10px] tracking-widest text-muted-foreground mb-4">
              PROJECT
            </p>
            <ul className="space-y-2.5 text-xs">
              {PROJECT_LINKS.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} external={link.external}>
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-pixel-square text-[10px] tracking-widest text-muted-foreground mb-4">
              CONTACT
            </p>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="mailto:tomas@omnimetrix.io"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  tomas@omnimetrix.io
                </a>
              </li>
              <li>
                <a
                  href="https://omnimetrix.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Omnimetrix
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-muted-foreground">
            Built by{" "}
            <a
              href="https://omnimetrix.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
            >
              Omnimetrix
            </a>
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/toomingos/open_speed_optimization_loop"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <title>GitHub</title>
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
