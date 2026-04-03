export const COLOR = {
  GRAY: 0,
  RED: 1,
  BLUE: 2,
  GREEN: 3,
  YELLOW: 4,
  PURPLE: 5,
  PINK: 6,
  ORANGE: 7,
} as const;

type ColorMapType = typeof COLOR;
export type ColorValue = ColorMapType[keyof ColorMapType];

export const HEX_COLOR: Record<ColorValue, string> = {
  [COLOR.GRAY]: '#BDCBDE',
  [COLOR.RED]: '#F71118',
  [COLOR.BLUE]: '#1C94FC',
  [COLOR.GREEN]: '#2CC55D',
  [COLOR.YELLOW]: '#F2BD09',
  [COLOR.PURPLE]: '#9C44FC',
  [COLOR.PINK]: '#FC5EF0',
  [COLOR.ORANGE]: '#FB4935',
} as const;
