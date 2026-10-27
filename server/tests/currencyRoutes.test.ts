import { beforeEach, expect, test, vi } from 'vitest'
import express from 'express'
import request from 'supertest'
import router from '../routes/currencyRoutes'
import { convertAmount } from '../controllers/currencyController'

// Korvataan oikea controller testissä mock-funktiolla
vi.mock('../controllers/currencyController', () => ({
  convertAmount: vi.fn()
}))

// Nollataan mockit ennen jokaista testiä
beforeEach(() => {
  vi.resetAllMocks()
})

// Luodaan testissä käytettävä Express-sovellus
const app = express()

// Sallitaan JSON-muotoiset pyynnöt
app.use(express.json())

// Otetaan valuuttamuunnoksen reitti käyttöön /api-osoitteessa
app.use('/api', router)

// Testataan, että POST-pyyntö toimii oikein
test('POST /api/convert/amount returns 200', async () => {

  // Määritetään controller palauttamaan onnistunut vastaus
  vi.mocked(convertAmount).mockImplementation(async (req, res) => {
    res.status(200).json({ amount: 90 })
  })

  // Lähetetään valuuttamuunnospyyntö
  const response = await request(app)
    .post('/api/convert/amount')
    .send({
      from: 'EUR',
      to: 'USD',
      amount: 100
    })

  // Tarkistetaan, että tilakoodi on 200
  expect(response.status).toBe(200)

  // Tarkistetaan, että vastauksessa on oikea summa
  expect(response.body).toEqual({ amount: 90 })

  // Tarkistetaan, että controlleria kutsuttiin kerran
  expect(convertAmount).toHaveBeenCalledTimes(1)
})

// Testataan, että virheellinen valuuttakoodi palauttaa virheen
test('POST /api/convert/amount returns 400 for invalid currency code', async () => {

  // Määritetään controller palauttamaan virheilmoitus
  vi.mocked(convertAmount).mockImplementation(async (req, res) => {
    res.status(400).json({
      error: 'Currency codes must be 3-letter ISO abbreviations (e.g., USD, EUR).'
    })
  })

  // Lähetetään pyyntö, jossa valuuttakoodi on virheellinen
  const response = await request(app)
    .post('/api/convert/amount')
    .send({
      from: 'EURO',
      to: 'USD',
      amount: 100
    })

  // Tarkistetaan, että tilakoodi on 400
  expect(response.status).toBe(400)

  // Tarkistetaan, että vastauksessa on oikea virheilmoitus
  expect(response.body).toEqual({
    error: 'Currency codes must be 3-letter ISO abbreviations (e.g., USD, EUR).'
  })

  // Tarkistetaan, että controlleria kutsuttiin kerran
  expect(convertAmount).toHaveBeenCalledTimes(1)
})