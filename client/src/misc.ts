import type { Layout, ThumbstickLayoutCmp, SliderLayoutCmp, ButtonLayoutCmp, LayoutComponent, Coordinates } from './typings';

let available_layouts: { [key: string]: Layout } = {
  '0': {
    id: '0',
    name: '1 Axis, 2 Pedals',
    components: [
      {
        type: "thumbstick",
        position: {
          bottom: 3,
          left: 3
        },
        diameter: 22,

        channelX: 1,
        channelY: 2
      } as ThumbstickLayoutCmp,
      {
        type: "slider",
        position:  {
          bottom: 5,
          right: 3
        },
        width: 15,
        height: 60,

        channel: 3,

        min: 0,
        max: 1,
        default: 0,
        sticky: false

      } as SliderLayoutCmp,
      {
        type: "slider",
        position:  {
          bottom: 5,
          right: 21
        },
        width: 15,
        height: 60,

        channel: 4,

        min: 0,
        max: 1,
        default: 0,
        sticky: false

      } as SliderLayoutCmp,
      {
        type: "button",
        position:  {
          bottom: 13,
          left: 28
        },
        width: 10,
        height: 10,

        channel: 1,
        label: "1",

        toggle: false

      } as ButtonLayoutCmp,
      {
        type: "button",
        position:  {
          bottom: 13,
          left: 39
        },
        width: 10,
        height: 10,

        channel: 2,
        label: "2",

        toggle: false

      } as ButtonLayoutCmp,
      {
        type: "button",
        position:  {
          bottom: 13,
          right: 40
        },
        width: 10,
        height: 10,

        channel: 3,
        label: "3",

        toggle: false

      } as ButtonLayoutCmp,
      {
        type: "button",
        position:  {
          bottom: 2,
          left: 28
        },
        width: 10,
        height: 10,

        channel: 4,
        label: "4",

        toggle: false

      } as ButtonLayoutCmp,
      {
        type: "button",
        position:  {
          bottom: 2,
          left: 39
        },
        width: 10,
        height: 10,

        channel: 5,
        label: "5",

        toggle: false

      } as ButtonLayoutCmp,
      {
        type: "button",
        position:  {
          bottom: 2,
          right: 40
        },
        width: 10,
        height: 10,

        channel: 5,
        label: "6",

        toggle: false

      } as ButtonLayoutCmp
    ]
  }
};

function getPositionCss(component: LayoutComponent, useVw?: boolean): string {
  const position = component.position
  let css = '';

  if(position.bottom) css += `bottom:${position.bottom}${useVw ? 'vw' : 'vh'};`;
  else css += `top:${position.top}${useVw ? 'vw' : 'vh'}`;

  if(position.right) css += `right:${position.right}vw;`;
  else css += `left:${position.left}vw`;

  return css;
}

function getDistance(p1: Coordinates, p2: Coordinates): number {
  return Math.sqrt( ((p2.x-p1.x)**2) + ((p2.y-p1.y)**2) );
}

function subCoordinates(p1: Coordinates, p2: Coordinates): Coordinates {
  return {
    x: p1.x - p2.x,
    y: p1.y - p2.y
  }
}

function limitPosition(center: Coordinates, target: Coordinates, radius: number): Coordinates {
  const distance = getDistance(center, target);

  if(distance > radius) {
    const ratio = distance/radius;
    return {
      x: center.x + ((target.x - center.x)/ratio),
      y: center.y + ((target.y - center.y)/ratio)
    }
  }

  return target;

}

function vhToPx(vh: number): number {
  return vh * window.innerHeight;
}

export {
  available_layouts,
  getPositionCss,
  getDistance,
  limitPosition,
  subCoordinates,
  vhToPx
}