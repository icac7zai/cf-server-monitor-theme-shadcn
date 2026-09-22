import type React from 'react'

export interface LiquidGlassOptions {
  opacity: number
  blur: number
  saturation: number
  highlight: number
  borderOpacity: number
}

export function getLiquidGlassStyle(
  options: LiquidGlassOptions
): React.CSSProperties {
  return {
    '--liquid-highlight': options.highlight,
    '--liquid-border-opacity': options.borderOpacity,

    backdropFilter: `blur(${options.blur}px) saturate(${options.saturation}%)`,
    WebkitBackdropFilter: `blur(${options.blur}px) saturate(${options.saturation}%)`,

    // 更透明的玻璃底色
    backgroundColor: `color-mix(in srgb, white ${
      Math.round(options.opacity * 70)
    }%, transparent)`,

    borderColor: `color-mix(in srgb, var(--foreground) ${
      Math.round(options.borderOpacity * 100)
    }%, transparent)`,
  } as React.CSSProperties
}

export const LIQUID_GLASS_CLASS =
  'relative overflow-hidden border bg-transparent shadow-[0_8px_32px_rgba(0,0,0,0.10)] ' +
  'before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px ' +
  'before:bg-gradient-to-r before:from-transparent before:via-black/10 before:to-transparent ' +
  'dark:before:via-white/50 ' +
  'after:pointer-events-none after:absolute after:inset-0 ' +
  'after:bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,var(--liquid-highlight)),transparent_35%)]'