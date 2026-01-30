import { cn } from "@/lib/utils";
import { SectionItem, useActiveSection } from "@/hooks/use-active-section";

export function SectionIndex({ items }: { items: SectionItem[] }) {
  const { activeId } = useActiveSection(items);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[60] hidden lg:block">
      <div className="rounded-2xl border border-border bg-background/70 backdrop-blur-xl px-3 py-3 shadow-sm">
        <div className="flex flex-col gap-2">
          {items.map((item, idx) => {
            const active = item.id === activeId;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors",
                  active ? "bg-primary/10" : "hover:bg-muted/40",
                )}
                aria-current={active ? "true" : undefined}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    active ? "bg-primary" : "bg-muted-foreground/30",
                  )}
                />
                <span
                  className={cn(
                    "text-xs font-medium tracking-wide",
                    active ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {String(idx + 1).padStart(2, "0")} {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
