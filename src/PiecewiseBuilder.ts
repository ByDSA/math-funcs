import { Bounds, BoundsObject, getBoundsObject, testBounds } from "./Bounds";
import { Func } from "./Func";

export default class PiecewiseBuilder {
  private content: [f: Func, bounds: BoundsObject | null][] = [];

  addPart(f: Func, bounds?: Bounds): PiecewiseBuilder {
    if (bounds) {
      const boundsObject = getBoundsObject(bounds);

      if (!boundsObject)
        throw new Error("Invalid Bounds value");

      this.content.push([f, boundsObject]);
    } else
      this.content.push([f, null]);

    return this;
  }

  buildFunc(): Func {
    return (x: number) => {
      const f = this.getFuncByNum(x);

      if (f === null)
        return undefined;

      return f(x);
    };
  }

  private getFuncByNum(n: number): Func | null {
    // eslint-disable-next-line no-restricted-syntax
    for (const line of this.content) {
      if (!line[1] || testBounds(n, line[1]))
        return line[0];
    }

    return null;
  }
}
