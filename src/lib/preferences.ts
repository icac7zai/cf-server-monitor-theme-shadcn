export type ThemeMode = 'light' | 'dark' | 'system'
export type ViewMode = 'grid' | 'table' | 'ring'
export type CardStyle = 'default' | 'shine' | 'neon' | 'liquid'
export type BackgroundEffect = 'none' | 'sakura' | 'aurora'

export interface Preferences {
  mode: ThemeMode
  accent: string

  // 卡片
  cardStyle: CardStyle
  view: ViewMode

  // Liquid Glass
  cardOpacity: number
  cardBlur: number
  cardSaturation: number
  cardHighlight: number
  cardBorderOpacity: number

  // 背景
  backgroundEffect: BackgroundEffect

  // Sakura
  sakuraCount: number
  sakuraSpeed: number
  sakuraOpacity: number
}

export const DEFAULT_PREFS: Preferences = {
  mode: 'system',
  accent: '',

  cardStyle: 'default',
  view: 'grid',

  // Liquid Glass 默认值
  cardOpacity: 0.08,
  cardBlur: 24,
  cardSaturation: 150,
  cardHighlight: 0.16,
  cardBorderOpacity: 0.2,

  // 动态背景
  backgroundEffect: 'none',

  // Sakura 默认值
  sakuraCount: 18,
  sakuraSpeed: 1,
  sakuraOpacity: 0.65,
}

const STORAGE_KEY = 'cfsm-prefs'

export function loadPreferences(): Preferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)

    if (!raw) {
      return { ...DEFAULT_PREFS }
    }

    const parsed = JSON.parse(raw) as Partial<Preferences>

    return {
      ...DEFAULT_PREFS,
      ...parsed,
    }
  } catch {
    return { ...DEFAULT_PREFS }
  }
}

export function hasStoredPreferences(): boolean {
  return localStorage.getItem(STORAGE_KEY) !== null
}

export function savePreferences(prefs: Preferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
  } catch {
    /* ignore */
  }
}

export function prefsFromThemeOptions(
  options: Record<string, unknown>
): Partial<Preferences> {
  const out: Partial<Preferences> = {}

  if (typeof options.accent === 'string') {
    out.accent = options.accent
  }

  if (
    options.cardStyle === 'default' ||
    options.cardStyle === 'shine' ||
    options.cardStyle === 'neon' ||
    options.cardStyle === 'liquid'
  ) {
    out.cardStyle = options.cardStyle
  }

  return out
}