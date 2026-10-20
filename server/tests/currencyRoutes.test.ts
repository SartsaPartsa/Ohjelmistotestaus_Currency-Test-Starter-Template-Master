import { expect, test, vi } from 'vitest'
import express from 'express'
import request from 'supertest'
import router from '../routes/currencyRoutes'

// Korvataan oikea controller testissä
vi.mock('../controllers/currencyController', () => ({
  convertAmount: vi.fn((req, res) => {
    res.status(200).json({ amount: 90 })
  })
}))

// Luodaan testissä käytettävä Express-sovellus
const app = express()

// Sallitaan JSON-muotoiset pyynnöt
app.use(express.json())

// Otetaan valuuttamuunnoksen reitti käyttöön
app.use(router)

// Testataan, että POST-pyyntö toimii oikein
test('POST /convert/amount returns 200', async () => {

  // Lähetetään valuuttamuunnospyyntö
  const response = await request(app)
    .post('/convert/amount')
    .send({
      from: 'EUR',
      to: 'USD',
      amount: 100
    })

  // Tarkistetaan, että tilakoodi on 200
  expect(response.status).toBe(200)

  // Tarkistetaan, että vastauksessa on oikea summa
  expect(response.body).toEqual({ amount: 90 })
})