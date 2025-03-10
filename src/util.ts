function getScroll(w: Window) {
  let ret = w.pageXOffset;
  const method = 'scrollLeft';
  if (typeof ret !== 'number') {
    const d = w.document;
    // ie6,7,8 standard mode
    ret = d.documentElement[method];
    if (typeof ret !== 'number') {
      // quirks mode
      ret = d.body[method];
    }
  }
  return ret;
}

function getClientPosition(elem: HTMLElement) {
  let x: number;
  let y: number;
  const doc = elem.ownerDocument;
  const { body } = doc;
  const docElem = doc && doc.documentElement;
  const box = elem.getBoundingClientRect();
  x = box.left;
  y = box.top;
  x -= docElem.clientLeft || body.clientLeft || 0;
  y -= docElem.clientTop || body.clientTop || 0;
  return {
    left: x,
    top: y,
  };
}

export function getOffsetLeft(el: HTMLElement) {
  const pos = getClientPosition(el);
  const doc = el.ownerDocument;
  // Only IE use `parentWindow`
  const w: Window = doc.defaultView || (doc as any).parentWindow;
  pos.left += getScroll(w);
  return pos.left;
}

export const getBoundingClientRect = (element: HTMLElement) => {
  return element.getBoundingClientRect();
};

function getDecimalPrecision(value: number) {
  const decimalPart = value.toString().split('.')[1];
  return decimalPart ? decimalPart.length : 0;
}

export function roundValueToPrecision(value: number, precision: number) {
  if (value == null) {
    return value;
  }

  const nearest = Math.round(value / precision) * precision;
  return Number(nearest.toFixed(getDecimalPrecision(precision)));
}

export function clamp(
  val: number,
  min: number = Number.MIN_SAFE_INTEGER,
  max: number = Number.MAX_SAFE_INTEGER,
): number {
  return Math.max(min, Math.min(val, max));
}
