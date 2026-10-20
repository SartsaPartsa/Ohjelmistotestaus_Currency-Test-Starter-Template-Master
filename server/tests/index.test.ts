import { afterEach, expect, test, vi } from 'vitest'

// Määritetään Express-moduulin tyyppi
type ExpressModule = typeof import('express') & {
  default: typeof import('express')
}

// Korvataan Express testissä
vi.mock('express', async (importOriginal) => {

  // Haetaan alkuperäinen Express-moduuli
  const original = await importOriginal<ExpressModule>()

  // Luodaan Express-funktio, jossa alkuperäiset toiminnot säilyvät
  const mockedExpress = Object.assign(
    () => {

      // Luodaan oikea Express-sovellus
      const app = original.default()

      // Seurataan listen-metodia ja estetään palvelimen käynnistyminen
      vi.spyOn(app, 'listen').mockReturnValue(
        {} as ReturnType<typeof app.listen>
      )

      return app
    },

    // Säilytetään Expressin toiminnot, esimerkiksi json()
    original.default
  )

  return {
    ...original,
    default: mockedExpress
  }
})

// Palautetaan ympäristömuuttujat ja mockit testien jälkeen
afterEach(() => {
  vi.unstubAllEnvs()
  vi.resetModules()
  vi.restoreAllMocks()
})

// Testataan, että palvelin käyttää oletusporttia 3000
test('Uses default port 3000', async () => {

  // Poistetaan PORT-ympäristömuuttuja testin ajaksi
  vi.stubEnv('PORT', '')

  // Ladataan index.ts uudelleen
  const { app } = await import('../index')

  // Tarkistetaan, että palvelin käyttää oletusporttia
  expect(app.listen).toHaveBeenCalledWith(3000, expect.any(Function))
})

// Testataan, että palvelin käyttää ympäristömuuttujassa määriteltyä porttia
test('Uses port from environment variable', async () => {

  // Määritetään testissä käytettävä portti
  vi.stubEnv('PORT', '4000')

  // Ladataan index.ts uudelleen
  const { app } = await import('../index')

  // Tarkistetaan, että palvelin käyttää porttia 4000
  expect(app.listen).toHaveBeenCalledWith('4000', expect.any(Function))
})