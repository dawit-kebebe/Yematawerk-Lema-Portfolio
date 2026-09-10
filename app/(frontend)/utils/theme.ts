export interface ColorShades {
  primary50: string;
  primary100: string;
  primary200: string;
  primary300: string;
  primary400: string;
  primary500: string;
  primary600: string;
  primary700: string;
  primary800: string;
  primary900: string;
  primary950: string;
}

export const PRESET_THEMES: Record<string, ColorShades> = {
  orange: {
    primary50: '#fef4ee',
    primary100: '#fde7d7',
    primary200: '#fbcaad',
    primary300: '#f7a67a',
    primary400: '#f37744',
    primary500: '#ef4c16',
    primary600: '#e13a15',
    primary700: '#ba2914',
    primary800: '#942318',
    primary900: '#781f16',
    primary950: '#410c09',
  },
  emerald: {
    primary50: '#ebfef6',
    primary100: '#cefde6',
    primary200: '#a2f8d3',
    primary300: '#66efbc',
    primary400: '#29dea1',
    primary500: '#05c48a',
    primary600: '#00a073',
    primary700: '#00805f',
    primary800: '#006a4f',
    primary900: '#015340',
    primary950: '#002f25',
  },
  blue: {
    primary50: '#eff6ff',
    primary100: '#dbeafe',
    primary200: '#bfdbfe',
    primary300: '#93c5fd',
    primary400: '#60a5fa',
    primary500: '#3b82f6',
    primary600: '#2563eb',
    primary700: '#1d4ed8',
    primary800: '#1e40af',
    primary900: '#1e3a8a',
    primary950: '#172554',
  },
  purple: {
    primary50: '#faf5ff',
    primary100: '#f3e8ff',
    primary200: '#e9d5ff',
    primary300: '#d8b4fe',
    primary400: '#c084fc',
    primary500: '#a855f7',
    primary600: '#9333ea',
    primary700: '#7e22ce',
    primary800: '#6b21a8',
    primary900: '#581c87',
    primary950: '#3b0764',
  },
  rose: {
    primary50: '#fff1f2',
    primary100: '#ffe4e6',
    primary200: '#fecdd3',
    primary300: '#fda4af',
    primary400: '#fb7185',
    primary500: '#f43f5e',
    primary600: '#e11d48',
    primary700: '#be123c',
    primary800: '#9f1239',
    primary900: '#881337',
    primary950: '#4c0519',
  },
  amber: {
    primary50: '#fffbeb',
    primary100: '#fef3c7',
    primary200: '#fde68a',
    primary300: '#fcd34d',
    primary400: '#fbbf24',
    primary500: '#f59e0b',
    primary600: '#d97706',
    primary700: '#b45309',
    primary800: '#92400e',
    primary900: '#78350f',
    primary950: '#451a03',
  },
  teal: {
    primary50: '#f0fdfa',
    primary100: '#ccfbf1',
    primary200: '#99f6e4',
    primary300: '#5eead4',
    primary400: '#2dd4bf',
    primary500: '#14b8a6',
    primary600: '#0d9488',
    primary700: '#0f766e',
    primary800: '#115e59',
    primary900: '#134e4a',
    primary950: '#042f2e',
  },
};

export interface CMSColorThemeConfig {
  preset?: string | null;
  customShades?: Partial<ColorShades> | null;
}

export function getThemeShades(config?: CMSColorThemeConfig | null): ColorShades {
  const preset = config?.preset || 'orange';
  const defaultShades = PRESET_THEMES.orange;

  if (preset === 'custom' && config?.customShades) {
    return {
      primary50: config.customShades.primary50 || defaultShades.primary50,
      primary100: config.customShades.primary100 || defaultShades.primary100,
      primary200: config.customShades.primary200 || defaultShades.primary200,
      primary300: config.customShades.primary300 || defaultShades.primary300,
      primary400: config.customShades.primary400 || defaultShades.primary400,
      primary500: config.customShades.primary500 || defaultShades.primary500,
      primary600: config.customShades.primary600 || defaultShades.primary600,
      primary700: config.customShades.primary700 || defaultShades.primary700,
      primary800: config.customShades.primary800 || defaultShades.primary800,
      primary900: config.customShades.primary900 || defaultShades.primary900,
      primary950: config.customShades.primary950 || defaultShades.primary950,
    };
  }

  return PRESET_THEMES[preset] || defaultShades;
}

export function getThemeCSS(config?: CMSColorThemeConfig | null): string {
  const shades = getThemeShades(config);

  return `:root {
  --color-primary-50: ${shades.primary50};
  --color-primary-100: ${shades.primary100};
  --color-primary-200: ${shades.primary200};
  --color-primary-300: ${shades.primary300};
  --color-primary-400: ${shades.primary400};
  --color-primary-500: ${shades.primary500};
  --color-primary-600: ${shades.primary600};
  --color-primary-700: ${shades.primary700};
  --color-primary-800: ${shades.primary800};
  --color-primary-900: ${shades.primary900};
  --color-primary-950: ${shades.primary950};
}`;
}
