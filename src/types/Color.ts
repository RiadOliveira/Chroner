export const COLOR = {
  BLUE: 0,
  INDIGO: 1,
  PURPLE: 2,
  PINK: 3,
  ROSE: 4,
  RED: 5,
  ORANGE: 6,
  AMBER: 7,
  YELLOW: 8,
  GREEN: 9,
  EMERALD: 10,
  TEAL: 11,
} as const;

type ColorMapType = typeof COLOR;
export type ColorValue = ColorMapType[keyof ColorMapType];

export const HEX_COLOR: Record<ColorValue, string> = {
  [COLOR.BLUE]: '#1C94FC',
  [COLOR.INDIGO]: '#6366F1',
  [COLOR.PURPLE]: '#9C44FC',
  [COLOR.PINK]: '#FC5EF0',
  [COLOR.ROSE]: '#F43F5E',
  [COLOR.RED]: '#DC2626',
  [COLOR.ORANGE]: '#F97316',
  [COLOR.AMBER]: '#F59E0B',
  [COLOR.YELLOW]: '#EAB308',
  [COLOR.GREEN]: '#22C55E',
  [COLOR.EMERALD]: '#10B981',
  [COLOR.TEAL]: '#14B8A6',
} as const;
