export const COLOR = {
  GRAY: 0,
  RED: 1,
  BLUE: 2,
  GREEN: 3,
  YELLOW: 4,
  PURPLE: 5,
  CYAN: 6,
  ORANGE: 7,
} as const;

type ColorMapType = typeof COLOR;
export type ColorValue = ColorMapType[keyof ColorMapType];

export const HEX_COLOR: Record<ColorValue, string> = {
  [COLOR.GRAY]: '#9E9E9E',
  [COLOR.RED]: '#F44336',
  [COLOR.BLUE]: '#2196F3',
  [COLOR.GREEN]: '#4CAF50',
  [COLOR.YELLOW]: '#FFEB3B',
  [COLOR.PURPLE]: '#9C27B0',
  [COLOR.CYAN]: '#00BCD4',
  [COLOR.ORANGE]: '#FF9800',
} as const;
