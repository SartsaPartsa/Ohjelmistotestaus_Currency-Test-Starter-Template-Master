import { expect, test } from 'vitest'
import { calculateConversion } from '../utils/convert'

// Testataan, että valuuttamuunnos toimii oikein
test('Calculates conversion', () => {
  // 10 * 0.9 = 9
  expect(calculateConversion(10, 0.9)).toBe(9)
})