export interface Layout {
  id: string,
  name: string,
  components: LayoutComponent[]
}

export interface LayoutComponent {
  type: "button" | "slider" | "thumbstick",
  position: {
    left?: number,
    top?: number,
    right?: number,
    bottom?: number
  },
  height?: number,
  width?: number
}

export interface ButtonLayoutCmp extends LayoutComponent {
  label: string,
  channel: number,
  toggle: boolean,
}

export interface ThumbstickLayoutCmp extends LayoutComponent {
  diameter: number,
  channelX: number,
  channelY: number
}

export interface SliderLayoutCmp extends LayoutComponent {
  channel: number,
  min: number,
  max: number,
  default: number,
  sticky: boolean
}

export interface Coordinates {
  x: number, y: number
}

export interface Bus {
  boolean: BusBooleanChannels
  number: BusNumberChannels
}

export interface BusBooleanChannels extends Array<boolean> {
  0: boolean,
  1: boolean,
  2: boolean,
  3: boolean,
  4: boolean,
  5: boolean,
  6: boolean,
  7: boolean,
  8: boolean,
  9: boolean,
  10: boolean,
  11: boolean,
  12: boolean,
  13: boolean,
  14: boolean,
  15: boolean,
  16: boolean,
  17: boolean,
  18: boolean,
  19: boolean,
  20: boolean,
  21: boolean,
  22: boolean,
  23: boolean,
  24: boolean,
  25: boolean,
  26: boolean,
  27: boolean,
  28: boolean,
  29: boolean,
  30: boolean,
  31: boolean
}

export interface BusNumberChannels extends Array<number> {
  0: number,
  1: number,
  2: number,
  3: number,
  4: number,
  5: number,
  6: number,
  7: number,
  8: number,
  9: number,
  10: number,
  11: number,
  12: number,
  13: number,
  14: number,
  15: number,
  16: number,
  17: number,
  18: number,
  19: number,
  20: number,
  21: number,
  22: number,
  23: number,
  24: number,
  25: number,
  26: number,
  27: number,
  28: number,
  29: number,
  30: number,
  31: number
}