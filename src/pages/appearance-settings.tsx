import { ArrowLeft, RotateCcw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { DynamicBackground } from '@/components/dynamic-background'
import { useApp } from '@/hooks/use-app'
import { DEFAULT_PREFS } from '@/lib/preferences'
import {
  getLiquidGlassStyle,
  LIQUID_GLASS_CLASS,
} from '@/lib/liquid-glass'

export function AppearanceSettings() {
  const navigate = useNavigate()
  const { prefs, setPref } = useApp()

  const liquidGlassStyle =
    prefs.cardStyle === 'liquid'
      ? getLiquidGlassStyle({
          opacity: prefs.cardOpacity,
          blur: prefs.cardBlur,
          saturation: prefs.cardSaturation,
          highlight: prefs.cardHighlight,
          borderOpacity: prefs.cardBorderOpacity,
        })
      : undefined

  const liquidGlassClass =
    prefs.cardStyle === 'liquid'
      ? LIQUID_GLASS_CLASS
      : ''

  const sectionClass = `
    rounded-2xl border p-5 shadow-xs
    ${
      prefs.cardStyle === 'liquid'
        ? liquidGlassClass
        : 'bg-card'
    }
  `

  const reset = () => {
    setPref('mode', DEFAULT_PREFS.mode)
    setPref('accent', DEFAULT_PREFS.accent)

    setPref('cardStyle', DEFAULT_PREFS.cardStyle)
    setPref('view', DEFAULT_PREFS.view)

    setPref('cardOpacity', DEFAULT_PREFS.cardOpacity)
    setPref('cardBlur', DEFAULT_PREFS.cardBlur)
    setPref('cardSaturation', DEFAULT_PREFS.cardSaturation)
    setPref('cardHighlight', DEFAULT_PREFS.cardHighlight)
    setPref(
      'cardBorderOpacity',
      DEFAULT_PREFS.cardBorderOpacity
    )

    setPref(
      'backgroundEffect',
      DEFAULT_PREFS.backgroundEffect
    )

    setPref('sakuraCount', DEFAULT_PREFS.sakuraCount)
    setPref('sakuraSpeed', DEFAULT_PREFS.sakuraSpeed)
    setPref('sakuraOpacity', DEFAULT_PREFS.sakuraOpacity)
  }

  return (
    <>
      <DynamicBackground
        effect={prefs.backgroundEffect}
        sakuraCount={prefs.sakuraCount}
        sakuraSpeed={prefs.sakuraSpeed}
        sakuraOpacity={prefs.sakuraOpacity}
      />

      <div className="relative z-10 min-h-screen">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          {/* 顶部 Header */}
          <header
            style={liquidGlassStyle}
            className={`
              mb-6 flex items-center justify-between gap-4
              rounded-2xl border px-5 py-4 shadow-xs
              ${
                prefs.cardStyle === 'liquid'
                  ? liquidGlassClass
                  : 'bg-card'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex size-9 items-center justify-center rounded-lg border bg-background/50 transition-colors hover:bg-accent"
                aria-label="返回"
                title="返回"
              >
                <ArrowLeft className="size-4" />
              </button>

              <div>
                <h1 className="text-lg font-semibold">
                  外观设置
                </h1>
                <p className="text-xs text-muted-foreground">
                  自定义监控面板的主题、卡片和背景效果
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-lg border bg-background/50 px-3 py-2 text-sm transition-colors hover:bg-accent"
            >
              <RotateCcw className="size-4" />
              <span className="hidden sm:inline">
                恢复默认
              </span>
            </button>
          </header>

          <div className="space-y-5">
            {/* Theme */}
            <section
              style={liquidGlassStyle}
              className={sectionClass}
            >
              <div className="mb-5">
                <h2 className="text-base font-semibold">
                  主题
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  选择网站的整体明暗模式和主题色。
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ['light', '浅色', '明亮主题'],
                  ['dark', '深色', '深色主题'],
                  ['system', '跟随系统', '自动匹配系统'],
                ].map(([value, title, description]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      setPref(
                        'mode',
                        value as 'light' | 'dark' | 'system'
                      )
                    }
                    className={`
                      rounded-xl border p-4 text-left transition-all
                      ${
                        prefs.mode === value
                          ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                          : 'bg-background/30 hover:bg-accent'
                      }
                    `}
                  >
                    <div className="text-sm font-medium">
                      {title}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {description}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-5">
                <div className="mb-3 text-sm font-medium">
                  主题色
                </div>

                <div className="flex flex-wrap gap-3">
                  {[
                    ['', '默认'],
                    ['blue', '蓝色'],
                    ['violet', '紫色'],
                    ['emerald', '绿色'],
                    ['rose', '玫红'],
                    ['amber', '琥珀'],
                    ['orange', '橙色'],
                    ['teal', '青色'],
                  ].map(([value, label]) => (
                    <button
                      key={value || 'default'}
                      type="button"
                      onClick={() => setPref('accent', value)}
                      className={`
                        rounded-lg border px-3 py-2 text-xs
                        transition-all
                        ${
                          prefs.accent === value
                            ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                            : 'bg-background/30 hover:bg-accent'
                        }
                      `}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Card Style */}
            <section
              style={liquidGlassStyle}
              className={sectionClass}
            >
              <div className="mb-5">
                <h2 className="text-base font-semibold">
                  卡片样式
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  设置服务器节点卡片和面板组件的视觉风格。
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    value: 'default',
                    title: 'Default',
                    description: '简洁默认',
                  },
                  {
                    value: 'shine',
                    title: 'Shine',
                    description: '高光扫过',
                  },
                  {
                    value: 'neon',
                    title: 'Neon',
                    description: '霓虹发光',
                  },
                  {
                    value: 'liquid',
                    title: 'Liquid Glass',
                    description: '液态玻璃',
                  },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() =>
                      setPref(
                        'cardStyle',
                        item.value as
                          | 'default'
                          | 'shine'
                          | 'neon'
                          | 'liquid'
                      )
                    }
                    className={`
                      rounded-xl border p-4 text-left transition-all
                      ${
                        prefs.cardStyle === item.value
                          ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                          : 'bg-background/30 hover:bg-accent'
                      }
                    `}
                  >
                    <div className="text-sm font-medium">
                      {item.title}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {item.description}
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Node View */}
            <section
              style={liquidGlassStyle}
              className={sectionClass}
            >
              <div className="mb-5">
                <h2 className="text-base font-semibold">
                  节点视图
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  选择首页服务器节点的显示方式。
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ['grid', '网格', '标准卡片网格'],
                  ['table', '表格', '紧凑数据表格'],
                  ['ring', '环形', '环形数据卡片'],
                ].map(([value, title, description]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      setPref(
                        'view',
                        value as 'grid' | 'table' | 'ring'
                      )
                    }
                    className={`
                      rounded-xl border p-4 text-left transition-all
                      ${
                        prefs.view === value
                          ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                          : 'bg-background/30 hover:bg-accent'
                      }
                    `}
                  >
                    <div className="text-sm font-medium">
                      {title}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {description}
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Liquid Glass */}
            {prefs.cardStyle === 'liquid' && (
              <section
                style={liquidGlassStyle}
                className={sectionClass}
              >
                <div className="mb-5">
                  <h2 className="text-base font-semibold">
                    Liquid Glass
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    调整液态玻璃的透明度、模糊和高光效果。
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Opacity */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="card-opacity"
                        className="text-sm font-medium"
                      >
                        透明度
                      </label>
                      <span className="text-xs text-muted-foreground">
                        {Math.round(
                          prefs.cardOpacity * 100
                        )}
                        %
                      </span>
                    </div>

                    <input
                      id="card-opacity"
                      type="range"
                      min="0.02"
                      max="0.20"
                      step="0.01"
                      value={prefs.cardOpacity}
                      onChange={(event) =>
                        setPref(
                          'cardOpacity',
                          Number(event.target.value)
                        )
                      }
                      className="w-full"
                    />
                  </div>

                  {/* Blur */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="card-blur"
                        className="text-sm font-medium"
                      >
                        背景模糊
                      </label>
                      <span className="text-xs text-muted-foreground">
                        {prefs.cardBlur}px
                      </span>
                    </div>

                    <input
                      id="card-blur"
                      type="range"
                      min="8"
                      max="40"
                      step="1"
                      value={prefs.cardBlur}
                      onChange={(event) =>
                        setPref(
                          'cardBlur',
                          Number(event.target.value)
                        )
                      }
                      className="w-full"
                    />
                  </div>

                  {/* Saturation */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="card-saturation"
                        className="text-sm font-medium"
                      >
                        饱和度
                      </label>
                      <span className="text-xs text-muted-foreground">
                        {prefs.cardSaturation}%
                      </span>
                    </div>

                    <input
                      id="card-saturation"
                      type="range"
                      min="100"
                      max="200"
                      step="5"
                      value={prefs.cardSaturation}
                      onChange={(event) =>
                        setPref(
                          'cardSaturation',
                          Number(event.target.value)
                        )
                      }
                      className="w-full"
                    />
                  </div>

                  {/* Highlight */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="card-highlight"
                        className="text-sm font-medium"
                      >
                        高光强度
                      </label>
                      <span className="text-xs text-muted-foreground">
                        {Math.round(
                          prefs.cardHighlight * 100
                        )}
                        %
                      </span>
                    </div>

                    <input
                      id="card-highlight"
                      type="range"
                      min="0"
                      max="0.30"
                      step="0.01"
                      value={prefs.cardHighlight}
                      onChange={(event) =>
                        setPref(
                          'cardHighlight',
                          Number(event.target.value)
                        )
                      }
                      className="w-full"
                    />
                  </div>

                  {/* Border */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="card-border-opacity"
                        className="text-sm font-medium"
                      >
                        边框透明度
                      </label>
                      <span className="text-xs text-muted-foreground">
                        {Math.round(
                          prefs.cardBorderOpacity * 100
                        )}
                        %
                      </span>
                    </div>

                    <input
                      id="card-border-opacity"
                      type="range"
                      min="0.05"
                      max="0.40"
                      step="0.01"
                      value={prefs.cardBorderOpacity}
                      onChange={(event) =>
                        setPref(
                          'cardBorderOpacity',
                          Number(event.target.value)
                        )
                      }
                      className="w-full"
                    />
                  </div>
                </div>

                {/* 实时预览 */}
                <div className="mt-8">
                  <div className="mb-3">
                    <h3 className="text-sm font-semibold">
                      实时预览
                    </h3>

                    <p className="mt-1 text-xs text-muted-foreground">
                      拖动上面的参数，可以实时查看 Liquid Glass 效果。
                    </p>
                  </div>

                  <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-cyan-400/20 via-background to-violet-400/20 p-6">
                    <div
                      style={liquidGlassStyle}
                      className={`${LIQUID_GLASS_CLASS} relative rounded-2xl p-6`}
                    >
                      <div className="relative z-10">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-base font-semibold">
                              Liquid Glass
                            </div>

                            <div className="mt-1 text-xs text-muted-foreground">
                              Server Node Preview
                            </div>
                          </div>

                          <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-500">
                            在线
                          </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                          <div className="rounded-xl bg-foreground/5 p-3">
                            <div className="text-[11px] text-muted-foreground">
                              CPU
                            </div>
                            <div className="mt-1 text-sm font-semibold">
                              23%
                            </div>
                          </div>

                          <div className="rounded-xl bg-foreground/5 p-3">
                            <div className="text-[11px] text-muted-foreground">
                              内存
                            </div>
                            <div className="mt-1 text-sm font-semibold">
                              48%
                            </div>
                          </div>

                          <div className="rounded-xl bg-foreground/5 p-3">
                            <div className="text-[11px] text-muted-foreground">
                              延迟
                            </div>
                            <div className="mt-1 text-sm font-semibold">
                              32 ms
                            </div>
                          </div>

                          <div className="rounded-xl bg-foreground/5 p-3">
                            <div className="text-[11px] text-muted-foreground">
                              速率
                            </div>
                            <div className="mt-1 text-sm font-semibold">
                              18.4 MB/s
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Dynamic Background */}
            <section
              style={liquidGlassStyle}
              className={sectionClass}
            >
              <div className="mb-5">
                <h2 className="text-base font-semibold">
                  动态背景
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  设置网站背景动画效果。
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ['none', '无', '使用普通背景'],
                  ['sakura', '樱花', '樱花飘落效果'],
                  ['aurora', '极光', '动态极光效果'],
                ].map(([value, title, description]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      setPref(
                        'backgroundEffect',
                        value as
                          | 'none'
                          | 'sakura'
                          | 'aurora'
                      )
                    }
                    className={`
                      rounded-xl border p-4 text-left transition-all
                      ${
                        prefs.backgroundEffect === value
                          ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                          : 'bg-background/30 hover:bg-accent'
                      }
                    `}
                  >
                    <div className="text-sm font-medium">
                      {title}
                    </div>

                    <div className="mt-1 text-xs text-muted-foreground">
                      {description}
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Sakura */}
            {prefs.backgroundEffect === 'sakura' && (
              <section
                style={liquidGlassStyle}
                className={sectionClass}
              >
                <div className="mb-5">
                  <h2 className="text-base font-semibold">
                    樱花效果
                  </h2>

                  <p className="mt-1 text-xs text-muted-foreground">
                    调整樱花数量、下落速度和透明度。
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Count */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="sakura-count"
                        className="text-sm font-medium"
                      >
                        数量
                      </label>

                      <span className="text-xs text-muted-foreground">
                        {prefs.sakuraCount}
                      </span>
                    </div>

                    <input
                      id="sakura-count"
                      type="range"
                      min="5"
                      max="50"
                      step="1"
                      value={prefs.sakuraCount}
                      onChange={(event) =>
                        setPref(
                          'sakuraCount',
                          Number(event.target.value)
                        )
                      }
                      className="w-full"
                    />
                  </div>

                  {/* Speed */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="sakura-speed"
                        className="text-sm font-medium"
                      >
                        速度
                      </label>

                      <span className="text-xs text-muted-foreground">
                        {prefs.sakuraSpeed.toFixed(1)}x
                      </span>
                    </div>

                    <input
                      id="sakura-speed"
                      type="range"
                      min="0.3"
                      max="3"
                      step="0.1"
                      value={prefs.sakuraSpeed}
                      onChange={(event) =>
                        setPref(
                          'sakuraSpeed',
                          Number(event.target.value)
                        )
                      }
                      className="w-full"
                    />
                  </div>

                  {/* Opacity */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="sakura-opacity"
                        className="text-sm font-medium"
                      >
                        透明度
                      </label>

                      <span className="text-xs text-muted-foreground">
                        {Math.round(
                          prefs.sakuraOpacity * 100
                        )}
                        %
                      </span>
                    </div>

                    <input
                      id="sakura-opacity"
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.05"
                      value={prefs.sakuraOpacity}
                      onChange={(event) =>
                        setPref(
                          'sakuraOpacity',
                          Number(event.target.value)
                        )
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  )
}