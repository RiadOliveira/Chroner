export const COLOR = {
  BLUE: 0,
  INDIGO: 1,
  PURPLE: 2,
  PINK: 3,
  FUCHSIA: 4,
  RED: 5,
  BROWN: 6,
  ORANGE: 7,
  YELLOW: 8,
  LIME: 9,
  GREEN: 10,
  TEAL: 11,
} as const;

type ColorMapType = typeof COLOR;
export type ColorValue = ColorMapType[keyof ColorMapType];

export const HEX_COLOR: Record<ColorValue, string> = {
  [COLOR.BLUE]: '#1C94FC',
  [COLOR.INDIGO]: '#6366F1',
  [COLOR.PURPLE]: '#9C44FC',
  [COLOR.PINK]: '#FC5EF0',
  [COLOR.FUCHSIA]: '#F0177E',
  [COLOR.RED]: '#DC2626',
  [COLOR.BROWN]: '#B45309',
  [COLOR.ORANGE]: '#F97316',
  [COLOR.YELLOW]: '#EAB308',
  [COLOR.LIME]: '#84CC16',
  [COLOR.GREEN]: '#22C55E',
  [COLOR.TEAL]: '#14B8A6',
} as const;
