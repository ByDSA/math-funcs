import { BoundsObject, BoundType, getBoundsObject, testBounds } from "./Bounds";

describe("test bounds", () => {
  it("0 in [0,2]", () => {
    const n = 0;
    const bounds = "[0,2]";
    const actual = testBounds(n, bounds);

    expect(actual).toBeTruthy();
  } );

  it("2 in [0,2]", () => {
    const n = 2;
    const bounds = "[0,2]";
    const actual = testBounds(n, bounds);

    expect(actual).toBeTruthy();
  } );

  it("1 in [0,2]", () => {
    const n = 1;
    const bounds = "[0,2]";
    const actual = testBounds(n, bounds);

    expect(actual).toBeTruthy();
  } );

  it("-1 in [0,2]", () => {
    const n = -1;
    const bounds = "[0,2]";
    const actual = testBounds(n, bounds);

    expect(actual).toBeFalsy();
  } );

  it("3 in [0,2]", () => {
    const n = 3;
    const bounds = "[0,2]";
    const actual = testBounds(n, bounds);

    expect(actual).toBeFalsy();
  } );

  it("0 in (0,2]", () => {
    const n = 0;
    const bounds = "(0,2]";
    const actual = testBounds(n, bounds);

    expect(actual).toBeFalsy();
  } );

  it("2 in [0,2)", () => {
    const n = -1;
    const bounds = "[0,2)";
    const actual = testBounds(n, bounds);

    expect(actual).toBeFalsy();
  } );

  it("invalid bounds", () => {
    const n = 0;
    const bounds = "0,2)";
    const actual = testBounds(n, bounds);

    expect(actual).toBeFalsy();
  } );
} );

describe("getBoundsObject", () => {
  describe("from string", () => {
    it("[1,2] ", () => {
      const str = "[1,2]";
      const bounds: BoundsObject | null | undefined = getBoundsObject(str);

      expect(bounds).not.toBeUndefined();
      expect(bounds).not.toBeNull();

      if (!bounds)
        return;

      expect(bounds.a).toBe(1);
      expect(bounds.aBound).toBe(BoundType.CLOSED);
      expect(bounds.b).toBe(2);
      expect(bounds.bBound).toBe(BoundType.CLOSED);
    } );

    it("(-10, 23] ", () => {
      const str = "  ( - 10 , 2 3 ]  ";
      const bounds: BoundsObject | null | undefined = getBoundsObject(str);

      expect(bounds).not.toBeUndefined();
      expect(bounds).not.toBeNull();

      if (!bounds)
        return;

      expect(bounds.a).toBe(-10);
      expect(bounds.aBound).toBe(BoundType.OPEN);
      expect(bounds.b).toBe(23);
      expect(bounds.bBound).toBe(BoundType.CLOSED);
    } );

    it("invalid boundsobject", () => {
      const actual = getBoundsObject("-10, 3]");

      expect(actual).toBeNull();
    } );

    it("invalid left bound type", () => {
      const bounds = getBoundsObject("{-10, 3)");

      expect(bounds).toBeNull();
    } );

    it("invalid right bound type", () => {
      const bounds = getBoundsObject("[-10, 3}");

      expect(bounds).toBeNull();
    } );

    it("invalid left bound number", () => {
      const bounds = getBoundsObject("[-, 3]");

      expect(bounds).toBeNull();
    } );
    it("invalid left bound number", () => {
      const bounds = getBoundsObject("[-10, ]");

      expect(bounds).toBeNull();
    } );

    it("invalid parts", () => {
      const bounds = getBoundsObject("-10, 3");

      expect(bounds).toBeNull();
    } );

    it("[-10, 3]", () => {
      const bounds = getBoundsObject("[-10, 3)");

      expect(bounds).not.toBeUndefined();
      expect(bounds).not.toBeNull();

      if (!bounds)
        return;

      expect(bounds.aBound).toBe(BoundType.CLOSED);
      expect(bounds.a).toBe(-10);
      expect(bounds.b).toBe(3);
      expect(bounds.bBound).toBe(BoundType.OPEN);
    } );
  } );

  describe("from aray", () => {
    it("valid array", () => {
      const bounds = getBoundsObject(["[", 10, 20, ")"]);

      expect(bounds).toBeDefined();

      if (!bounds)
        return;

      expect(bounds.aBound).toBe(BoundType.CLOSED);
      expect(bounds.a).toBe(10);
      expect(bounds.b).toBe(20);
      expect(bounds.bBound).toBe(BoundType.OPEN);
    } );

    it("invalid left bound type", () => {
      const bounds = getBoundsObject(["{", 10, 20, ")"]);

      expect(bounds).toBeNull();
    } );

    it("invalid right bound type", () => {
      const bounds = getBoundsObject(["[", 10, 20, "}"]);

      expect(bounds).toBeNull();
    } );
  } );

  it("from any invalid", () => {
    const bounds = getBoundsObject(<any>3);

    expect(bounds).toBeNull();
  } );
} );
