import polynomial from "./Polynomial";

describe("x²+2x+3", () => {
  const p = polynomial(1, 2, 3);

  it("x=2", () => {
    const y = p(2);

    expect(y).toBe(11);
  } );
  it("x=0", () => {
    const y = p(0);

    expect(y).toBe(3);
  } );

  it("x=-3", () => {
    const y = p(-3);

    expect(y).toBe(6);
  } );
} );

describe("empty", () => {
  const p = polynomial();

  it("x=2", () => {
    const y = p(2);

    expect(y).toBeUndefined();
  } );
} );

describe("constant: 3", () => {
  const p = polynomial(3);

  it("x=2", () => {
    const y = p(2);

    expect(y).toBe(3);
  } );

  it("x=undefined", () => {
    const y = p();

    expect(y).toBe(3);
  } );
} );
