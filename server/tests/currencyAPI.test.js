import { expect, test } from 'vitest'
import request from 'supertest'
import { app } from '../index'

// Testataan, että valuuttamuunnos onnistuu oikeilla tiedoilla
test('POST /api/convert/amount returns 200', async () => {

  // Lähetetään API:lle valuuttamuunnospyyntö
  const response = await request(app)
    .post('/api/convert/amount')
    .send({
      from: 'EUR',
      to: 'USD',
      amount: 100
    })

  // Tarkistetaan, että tilakoodi on 200
  expect(response.status).toBe(200)

  // Tarkistetaan, että vastauksessa on numero
  expect(typeof response.body.amount).toBe('number')
})

// Testataan, että virheellinen valuuttakoodi aiheuttaa virheen
test('POST /api/convert/amount returns 400', async () => {

  // Lähetetään pyyntö virheellisellä valuuttakoodilla
  const response = await request(app)
    .post('/api/convert/amount')
    .send({
      from: 'INVALID',
      to: 'USD',
      amount: 100
    })

  // Tarkistetaan, että tilakoodi on 400
  expect(response.status).toBe(400)

  // Tarkistetaan, että vastauksessa on virheilmoitus
  expect(response.body).toHaveProperty('error')
})