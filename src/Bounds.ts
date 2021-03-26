/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-shadow
export enum BoundType {
  OPEN = 1,
  CLOSED = 2,
}

export type BoundsObject = {
  aBound: BoundType;
  a: number;
  bBound: BoundType;
  b: number;
};

type BoundsArray = [aBoundStr: string, a: number, b: number, bBoundStr: string];

export type Bounds = BoundsArray | BoundsObject | string;

function boundsStr(str: string): BoundsObject | null {
  const parts = splitStringBounds(str);

  if (!parts)
    return null;

  const [aBoundStr, aStr, bStr, bBoundStr] = parts;

  return boundsArray(aBoundStr, +aStr, +bStr, bBoundStr);
}

function boundsArray(...array: BoundsArray): BoundsObject | null {
  const [aBoundStr, a, b, bBoundStr] = array;
  const aBound = strBoundToBound(aBoundStr);
  const bBound = strBoundToBound(bBoundStr);

  if (aBound === null || bBound === null)
    return null;

  return {
    a,
    b,
    aBound,
    bBound,
  };
}

export function testBounds(n: number, bounds: Bounds): boolean {
  const boundsObject = getBoundsObject(bounds);

  if (!boundsObject)
    return false;

  const leftBound = (n > boundsObject.a && boundsObject.aBound === BoundType.OPEN)
    || (n >= boundsObject.a && boundsObject.aBound === BoundType.CLOSED);
  const rightBound = (n < boundsObject.b && boundsObject.bBound === BoundType.OPEN)
    || (n <= boundsObject.b && boundsObject.bBound === BoundType.CLOSED);

  return leftBound && rightBound;
}

// eslint-disable-next-line consistent-return
export function getBoundsObject(bounds: Bounds): BoundsObject | null {
  // eslint-disable-next-line default-case
  switch (getBoundsType(bounds)) {
    case "string":
      return boundsStr(<string>bounds);
    case "BoundsArray":
      return boundsArray(...(<BoundsArray>bounds));
    case "BoundsObject":
      return <BoundsObject>bounds;
    default:
      return null;
  }
}

function getBoundsType(bounds: Bounds): string | null {
  if (typeof bounds === "string")
    return "string";

  if ((bounds as BoundsArray).length === 4)
    return "BoundsArray";

  const boundsAsObject = bounds as BoundsObject;

  if (boundsAsObject.a !== undefined
    && boundsAsObject.aBound !== undefined
    && boundsAsObject.b !== undefined
    && boundsAsObject.bBound !== undefined
  )
    return "BoundsObject";

  return null;
}

function splitStringBounds(str: string): string[] | null {
  const strWithoutSpaces = str.replace(/ /g, "");
  const [aBoundStr, remainingStr] = getABoundStr(strWithoutSpaces);

  if (!aBoundStr)
    return null;

  const [aStr, remainingStr2] = getNumStr(remainingStr);

  if (!aStr || Number.isNaN(+aStr))
    return null;

  const remainingStr3 = remainingStr2.substr(1);

  const [bStr, remainingStr4] = getNumStr(remainingStr3);

  if (!bStr || Number.isNaN(+bStr))
    return null;

  const [bBoundStr] = getABoundStr(remainingStr4);

  if (!bBoundStr)
    return null;

  return [aBoundStr, aStr, bStr, bBoundStr];
}

function getABoundStr(str: string): string[] {
  const aBoundStr = strBoundToBound(str[0]) !== null ? str[0] : "";
  const remainingStr = aBoundStr ? str.substr(1) : str;

  return [aBoundStr, remainingStr];
}

function getNumStr(str: string): string[] {
  let aBoundStr = "";
  let remainingStr = str;

  for (let i = 0; i < remainingStr.length; i++) {
    if (Number.isNaN(+remainingStr[i]) && remainingStr[i] !== "-") {
      aBoundStr = remainingStr.substr(0, i);
      remainingStr = remainingStr.substr(i);
      break;
    }
  }

  return [aBoundStr, remainingStr];
}

function strBoundToBound(strBound: string): BoundType | null {
  switch (strBound) {
    case "[":
    case "]":
      return BoundType.CLOSED;
    case "(":
    case ")":
      return BoundType.OPEN;
    default:
      return null;
  }
}
