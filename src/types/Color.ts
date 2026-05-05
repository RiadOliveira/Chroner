export const COLOR = {
  BLUE: 0,
  CYAN: 1,
  TEAL: 2,
  GREEN: 3,
  LIME: 4,
  YELLOW: 5,
  ORANGE: 6,
  RED: 7,
  ROSE: 8,
  PINK: 9,
  PURPLE: 10,
  INDIGO: 11,
} as const;

type ColorMapType = typeof COLOR;
export type ColorValue = ColorMapType[keyof ColorMapType];

export const HEX_COLOR: Record<ColorValue, string> = {
  [COLOR.BLUE]: '#1C94FC',
  [COLOR.CYAN]: '#06B6D4',
  [COLOR.TEAL]: '#14B8A6',
  [COLOR.GREEN]: '#2CC55D',
  [COLOR.LIME]: '#84CC16',
  [COLOR.YELLOW]: '#F2BD09',
  [COLOR.ORANGE]: '#FB4935',
  [COLOR.RED]: '#F71118',
  [COLOR.ROSE]: '#F43F5E',
  [COLOR.PINK]: '#FC5EF0',
  [COLOR.PURPLE]: '#9C44FC',
  [COLOR.INDIGO]: '#4F46E5',
} as const;
