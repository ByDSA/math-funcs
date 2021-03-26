import { Func } from "./Func";

export default function polynomial(...coeffs: number[]): Func {
  const degree = coeffs.length - 1;

  if (degree < 0)
    return () => undefined;

  if (degree === 0)
    return () => coeffs[0];

  // Horner's Scheme
  return (x: number): number => {
    const n = degree;
    let acc = 0;

    for (let i = 0; i <= n; i++)
      acc = acc * x + coeffs[i];

    return acc;
  };
}
