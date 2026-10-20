import { expect, test, vi, afterEach } from 'vitest'
import { convert } from '../services/currencyService'

// Palautetaan alkuperäinen fetch jokaisen testin jälkeen
afterEach(() => {
  vi.unstubAllGlobals()
})

// Testataan, että valuuttamuunnos onnistuu
test('Converts currency successfully', async () => {

  // Korvataan oikea API-kutsu testivastauksella
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      rates: { USD: 0.9 }
    })
  }))

  // Muunnetaan 100 euroa dollareiksi
  const result = await convert('EUR', 'USD', 100)

  // Tarkistetaan, että tulos on 90
  expect(result).toEqual({ amount: 90 })
})

// Testataan, että API-kutsun epäonnistuminen aiheuttaa virheen
test('Returns error when API request fails', async () => {

  // Korvataan API-kutsu epäonnistuneella vastauksella
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: false
  }))

  // Tarkistetaan, että palautetaan oikea virheilmoitus
  await expect(convert('EUR', 'USD', 100))
    .rejects.toThrow('Error retrieving exchange rate.')
})

// Testataan, että puuttuva valuuttakurssi aiheuttaa virheen
test('Returns error when exchange rate is missing', async () => {

  // Luodaan API-vastaus, josta valuuttakurssi puuttuu
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      rates: {}
    })
  }))

  // Tarkistetaan, että palautetaan oikea virheilmoitus
  await expect(convert('EUR', 'USD', 100))
    .rejects.toThrow('Exchange rate is not a number.')
})