import { Func } from "./Func";

describe("custom function", () => {
  describe("a + 5 * b + 2", () => {
    const f: Func = (a, b) => a + 5 * b + 2;

    it("a=0, b=0", () => {
      expect(f(0, 0)).toBe(2);
    } );

    it("less input values than needed: a=0", () => {
      expect(f(0)).toBe(NaN);
    } );

    it("no input values", () => {
      expect(f()).toBe(NaN);
    } );
    it("more input values than needed: a=0, b=0, c=0", () => {
      expect(f(0, 0, 0)).toBe(2);
    } );

    it("a=2, b=3", () => {
      expect(f(2, 3)).toBe(19);
    } );
  } );

  describe("2", () => {
    const f: Func = () => 2;

    it("a=1, b=2", () => {
      expect(f(1, 2)).toBe(2);
    } );
    it("no input values", () => {
      expect(f()).toBe(2);
    } );
  } );
} );
