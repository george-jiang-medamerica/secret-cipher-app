// Mathematical constants for cipher generation
export const PI_DIGITS = '31415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679';
export const E_DIGITS = '27182818284590452353602874713526624977572470936999595749669676277240766303535475945713821785251664274';
export const GOLDEN_RATIO_DIGITS = '16180339887498948420458683436563811772030917980576286213544862270526046281890244970720720418939113748';
export const SQRT2_DIGITS = '14142135623730950488016887242096980785696718753769480731766797379907324784621070388503875343276415727';

// Fibonacci sequence (first 100 numbers)
export const FIBONACCI_SEQUENCE = [
  1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765,
  10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229, 832040, 1346269,
  2178309, 3524578, 5702887, 9227465, 14930352, 24157817, 39088169, 63245986, 102334155
];

// Prime numbers (first 100)
export const PRIME_NUMBERS = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173,
  179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281
];

export interface MathConstant {
  name: string;
  symbol: string;
  description: string;
  digits: string;
  icon: string;
}

export const MATH_CONSTANTS: MathConstant[] = [
  {
    name: 'Pi',
    symbol: 'π',
    description: 'The ratio of a circle\'s circumference to its diameter',
    digits: PI_DIGITS,
    icon: '🥧', // Pie emoji for Pi
  },
  {
    name: 'Euler\'s Number',
    symbol: 'e',
    description: 'The base of natural logarithms',
    digits: E_DIGITS,
    icon: '📈',
  },
  {
    name: 'Golden Ratio',
    symbol: 'φ',
    description: 'The divine proportion found in nature and art',
    digits: GOLDEN_RATIO_DIGITS,
    icon: '🌻',
  },
  {
    name: 'Square Root of 2',
    symbol: '√2',
    description: 'The diagonal of a unit square',
    digits: SQRT2_DIGITS,
    icon: '📐',
  },
];

// Function to generate a cipher mapping from a mathematical constant
export function generateMathCipherMapping(digits: string): Record<string, string> {
  const mapping: Record<string, string> = {};
  // Include uppercase, lowercase, numbers, spaces, and punctuation
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,!?\'"';

  for (let i = 0; i < alphabet.length; i++) {
    // Use modulo to wrap around if we run out of digits
    mapping[alphabet[i]] = digits[i % digits.length];
  }

  return mapping;
}
