export interface ThemePalette {
  name: string;
  id: string;
  colors: {
    [key: string]: string;
  };
}

export const THEMES: ThemePalette[] = [
  {
    id: 'blue',
    name: 'Default',
    colors: {
      'primary-50': '#eff6ff',
      'primary-100': '#dbeafe',
      'primary-200': '#bfdbfe',
      'primary-300': '#93c5fd',
      'primary-400': '#60a5fa',
      'primary-500': '#3b82f6',
      'primary-600': '#2563eb',
      'primary-700': '#1d4ed8',
      'primary-800': '#1e40af',
      'primary-900': '#1e3a8a',
    }
  },
  {
    id: 'green',
    name: 'Emerald',
    colors: {
        'primary-50': '#ecfdf5',
        'primary-100': '#d1fae5',
        'primary-200': '#a7f3d0',
        'primary-300': '#6ee7b7',
        'primary-400': '#34d399',
        'primary-500': '#10b981',
        'primary-600': '#059669',
        'primary-700': '#047857',
        'primary-800': '#065f46',
        'primary-900': '#064e3b',
    }
  },
  {
    id: 'purple',
    name: 'Amethyst',
    colors: {
      'primary-50': '#f5f3ff',
      'primary-100': '#ede9fe',
      'primary-200': '#ddd6fe',
      'primary-300': '#c4b5fd',
      'primary-400': '#a78bfa',
      'primary-500': '#8b5cf6',
      'primary-600': '#7c3aed',
      'primary-700': '#6d28d9',
      'primary-800': '#5b21b6',
      'primary-900': '#4c1d95',
    }
  },
  {
    id: 'slate',
    name: 'Slate',
    colors: {
      'primary-50': '#f8fafc',
      'primary-100': '#f1f5f9',
      'primary-200': '#e2e8f0',
      'primary-300': '#cbd5e1',
      'primary-400': '#94a3b8',
      'primary-500': '#64748b',
      'primary-600': '#475569',
      'primary-700': '#334155',
      'primary-800': '#1e293b',
      'primary-900': '#0f172a',
    }
  },
  {
    id: 'rose',
    name: 'Rose',
    colors: {
      'primary-50': '#fff1f2',
      'primary-100': '#ffe4e6',
      'primary-200': '#fecdd3',
      'primary-300': '#fda4af',
      'primary-400': '#fb7185',
      'primary-500': '#f43f5e',
      'primary-600': '#e11d48',
      'primary-700': '#be123c',
      'primary-800': '#9f1239',
      'primary-900': '#881337',
    }
  },
  {
    id: 'amber',
    name: 'Amber',
    colors: {
      'primary-50': '#fffbeb',
      'primary-100': '#fef3c7',
      'primary-200': '#fde68a',
      'primary-300': '#fcd34d',
      'primary-400': '#fbbf24',
      'primary-500': '#f59e0b',
      'primary-600': '#d97706',
      'primary-700': '#b45309',
      'primary-800': '#92400e',
      'primary-900': '#78350f',
    }
  },
  {
    id: 'teal',
    name: 'Teal',
    colors: {
      'primary-50': '#f0fdfa',
      'primary-100': '#ccfbf1',
      'primary-200': '#99f6e4',
      'primary-300': '#5eead4',
      'primary-400': '#2dd4bf',
      'primary-500': '#14b8a6',
      'primary-600': '#0d9488',
      'primary-700': '#0f766e',
      'primary-800': '#115e59',
      'primary-900': '#134e4a',
    }
  },
  {
    id: 'fuchsia',
    name: 'Fuchsia',
    colors: {
      'primary-50': '#fdf4ff',
      'primary-100': '#fae8ff',
      'primary-200': '#f5d0fe',
      'primary-300': '#f0abfc',
      'primary-400': '#e879f9',
      'primary-500': '#d946ef',
      'primary-600': '#c026d3',
      'primary-700': '#a21caf',
      'primary-800': '#86198f',
      'primary-900': '#701a75',
    }
  }
];

export const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return '';
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `${r} ${g} ${b}`;
};