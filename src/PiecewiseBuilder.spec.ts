import Builder from "./PiecewiseBuilder";

describe("not real piecewise", () => {
  const f = new Builder().addPart((x) => x)
    .buildFunc();

  it("-50", () => {
    const n = -50;
    const actual = f(n);
    const expected = n;

    expect(actual).toBe(expected);
  } );

  it("0", () => {
    const n = 0;
    const actual = f(n);
    const expected = n;

    expect(actual).toBe(expected);
  } );

  it("50", () => {
    const n = 50;
    const actual = f(n);
    const expected = n;

    expect(actual).toBe(expected);
  } );
} );

describe("x in [-10, 10), x² in [10, 20)", () => {
  const f = new Builder()
    .addPart((x) => x, "[-10, 10)")
    .addPart((x) => x * x, "[10, 20)")
    .buildFunc();

  it("-50", () => {
    const n = -50;
    const actual = f(n);

    expect(actual).toBeUndefined();
  } );

  it("-5", () => {
    const n = -5;
    const actual = f(n);
    const expected = n;

    expect(actual).toBe(expected);
  } );

  it("5", () => {
    const n = 5;
    const actual = f(n);
    const expected = n;

    expect(actual).toBe(expected);
  } );

  it("10", () => {
    const n = 10;
    const actual = f(n);
    const expected = n * n;

    expect(actual).toBe(expected);
  } );

  it("15", () => {
    const n = 15;
    const actual = f(n);
    const expected = n * n;

    expect(actual).toBe(expected);
  } );

  it("20", () => {
    const n = 20;
    const actual = f(n);

    expect(actual).toBeUndefined();
  } );
} );

it("invalid bounds", () => {
  expect(() => {
    new Builder().addPart((x) => x, "-10, 10)")
      .buildFunc();
  } ).toThrowError();
} );
