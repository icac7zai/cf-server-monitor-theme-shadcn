import * as React from 'react'

interface DynamicBackgroundProps {
  effect: 'none' | 'sakura' | 'aurora'
  sakuraCount: number
  sakuraSpeed: number
  sakuraOpacity: number
}

interface Petal {
  id: number
  left: number
  size: number
  duration: number
  delay: number
  drift: number
  rotate: number
}

export function DynamicBackground({
  effect,
  sakuraCount,
  sakuraSpeed,
  sakuraOpacity,
}: DynamicBackgroundProps) {
  const petals = React.useMemo<Petal[]>(() => {
    return Array.from({ length: sakuraCount }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      size: 8 + Math.random() * 10,
      duration: (8 + Math.random() * 8) / sakuraSpeed,
      delay: Math.random() * -16,
      drift: -80 + Math.random() * 160,
      rotate: Math.random() * 360,
    }))
  }, [sakuraCount, sakuraSpeed])

  if (effect === 'none') {
    return null
  }

  if (effect === 'aurora') {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-background" />

      <div className="absolute -left-[15%] -top-[20%] h-[70vh] w-[70vw] rounded-full bg-cyan-400/10 blur-[110px] animate-[aurora-drift-1_18s_ease-in-out_infinite_alternate]" />

      <div className="absolute -right-[15%] top-[10%] h-[65vh] w-[65vw] rounded-full bg-violet-400/10 blur-[110px] animate-[aurora-drift-2_22s_ease-in-out_infinite_alternate]" />

      <div className="absolute bottom-[-20%] left-[20%] h-[60vh] w-[60vw] rounded-full bg-blue-400/10 blur-[120px] animate-[aurora-drift-3_26s_ease-in-out_infinite_alternate]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_55%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.04),transparent_55%)]" />

      <style>
        {`
          @keyframes aurora-drift-1 {
            0% {
              transform: translate3d(-4%, -2%, 0) scale(1);
            }
            100% {
              transform: translate3d(10%, 8%, 0) scale(1.15);
            }
          }

          @keyframes aurora-drift-2 {
            0% {
              transform: translate3d(4%, 2%, 0) scale(1);
            }
            100% {
              transform: translate3d(-12%, 10%, 0) scale(1.12);
            }
          }

          @keyframes aurora-drift-3 {
            0% {
              transform: translate3d(-6%, 4%, 0) scale(1);
            }
            100% {
              transform: translate3d(8%, -8%, 0) scale(1.18);
            }
          }
        `}
      </style>
    </div>
  )
}

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="absolute -top-10 block rounded-[70%_30%_70%_30%] bg-pink-300/80 blur-[0.2px] dark:bg-pink-200/70"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size * 0.7}px`,
            opacity: sakuraOpacity,
            transform: `rotate(${petal.rotate}deg)`,
            animation: `sakura-fall ${petal.duration}s linear ${petal.delay}s infinite`,
            ['--sakura-drift' as string]: `${petal.drift}px`,
          }}
        />
      ))}

      <style>
        {`
          @keyframes sakura-fall {
            0% {
              transform: translate3d(0, -10vh, 0) rotate(0deg);
            }

            50% {
              transform: translate3d(var(--sakura-drift), 50vh, 0) rotate(180deg);
            }

            100% {
              transform: translate3d(calc(var(--sakura-drift) * -0.5), 115vh, 0) rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  )
}