export function IpBanner() {
  return (
    <div className="mb-8 border border-primary/20 bg-primary/5 rounded p-4">
      <p className="text-primary text-sm font-medium mb-1">Anonymized</p>
      <p className="text-muted-foreground text-xs leading-relaxed">
        Implementation details have been anonymized to protect intellectual
        property. The methodology, metrics, and results are real. For the full
        technical breakdown, reach out at{" "}
        <a
          href="mailto:tomas@omnimetrix.io"
          className="text-primary underline underline-offset-2"
        >
          tomas@omnimetrix.io
        </a>
        .
      </p>
    </div>
  );
}
