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
test('POST /api/convert/amount returns 400 for invalid currency code', async () => {

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

// Testataan, että puuttuvat valuuttakoodit aiheuttavat virheen
test('POST /api/convert/amount returns 400 when currency codes are missing', async () => {

  // Lähetetään pyyntö ilman valuuttakoodeja
  const response = await request(app)
    .post('/api/convert/amount')
    .send({
      amount: 100
    })

  // Tarkistetaan, että tilakoodi on 400
  expect(response.status).toBe(400)

  // Tarkistetaan oikea virheilmoitus
  expect(response.body).toEqual({
    error: 'Body parameters "from" and "to" are required.'
  })
})

// Testataan, että negatiivinen summa aiheuttaa virheen
test('POST /api/convert/amount returns 400 for negative amount', async () => {

  // Lähetetään pyyntö, jossa summa on negatiivinen
  const response = await request(app)
    .post('/api/convert/amount')
    .send({
      from: 'EUR',
      to: 'USD',
      amount: -100
    })

  // Tarkistetaan, että tilakoodi on 400
  expect(response.status).toBe(400)

  // Tarkistetaan oikea virheilmoitus
  expect(response.body).toEqual({
    error: 'Amount must be greater than zero.'
  })
})