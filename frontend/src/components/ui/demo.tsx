import { AnimatedThemeToggleButton } from "@/components/ui/animated-theme-toggle-button"
import { AnimatedThemeToggle } from "@/components/ui/animated-theme-toggle"

export default function ThemeTransitionDemo() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10 bg-background text-foreground transition-colors p-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Theme Transition &amp; Toggle Playground</h1>
        <p className="text-sm text-muted-foreground">
          Test horizontal &amp; vertical view transition reveals, plus animated SVG path-length morphing
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8">
        <div className="flex flex-col items-center p-6 rounded-3xl border border-border bg-card shadow-sm w-64">
          <AnimatedThemeToggle className="size-11 rounded-2xl" />
          <span className="mt-4 text-xs font-semibold text-foreground">SolarSwitch Toggle</span>
          <span className="text-[11px] text-muted-foreground">SVG Path Morph Animation</span>
        </div>

        <div className="flex flex-col items-center p-6 rounded-3xl border border-border bg-card shadow-sm w-64">
          <AnimatedThemeToggleButton type="vertical" />
          <span className="mt-4 text-xs font-semibold text-foreground">Vertical Curtain Reveal</span>
          <span className="text-[11px] text-muted-foreground">inset(0 50% 0 50%)</span>
        </div>

        <div className="flex flex-col items-center p-6 rounded-3xl border border-border bg-card shadow-sm w-64">
          <AnimatedThemeToggleButton type="horizontal" />
          <span className="mt-4 text-xs font-semibold text-foreground">Horizontal Curtain Reveal</span>
          <span className="text-[11px] text-muted-foreground">inset(50% 0 50% 0)</span>
        </div>
      </div>
    </div>
  )
}
