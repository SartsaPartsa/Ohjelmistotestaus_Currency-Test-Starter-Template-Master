import { expect, test, vi } from 'vitest'
import { convertAmount } from '../controllers/currencyController'
import type { Request, Response } from 'express'
import { convert } from '../services/currencyService'

// Korvataan oikea valuuttamuunnos testissä
vi.mock('../services/currencyService', () => ({
  convert: vi.fn()
}))

// Testataan, että puuttuvista valuuttakoodeista tulee virheilmoitus
test('Returns error when currency codes are missing', async () => {

  // Luodaan pyyntö, jossa valuuttakoodit puuttuvat
  const req = {
    body: { amount: 100 }
  } as Request

  // Luodaan vastauksen testaamiseen tarvittavat toiminnot
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn()
  } as unknown as Response

  // Suoritetaan testattava funktio
  await convertAmount(req, res)

  // Tarkistetaan, että tilakoodi on 400
  expect(res.status).toHaveBeenCalledWith(400)

  // Tarkistetaan oikea virheilmoitus
  expect(res.json).toHaveBeenCalledWith({
    error: 'Body parameters "from" and "to" are required.'
  })
})

// Testataan, että summa ei saa olla nolla
test('Returns error when amount is zero', async () => {

  // Luodaan pyyntö, jossa summa on 0
  const req = {
    body: { from: 'EUR', to: 'USD', amount: 0 }
  } as Request

  // Luodaan vastauksen testaamiseen tarvittavat toiminnot
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn()
  } as unknown as Response

  // Suoritetaan testattava funktio
  await convertAmount(req, res)

  // Tarkistetaan, että tilakoodi on 400
  expect(res.status).toHaveBeenCalledWith(400)

  // Tarkistetaan oikea virheilmoitus
  expect(res.json).toHaveBeenCalledWith({
    error: 'Amount must be greater than zero.'
  })
})

// Testataan, että virheellinen valuuttakoodi aiheuttaa virheilmoituksen
test('Returns error for invalid currency code', async () => {

  // Luodaan pyyntö, jossa valuuttakoodi on liian pitkä
  const req = {
    body: { from: 'EURO', to: 'USD', amount: 100 }
  } as Request

  // Luodaan vastauksen testaamiseen tarvittavat toiminnot
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn()
  } as unknown as Response

  // Suoritetaan testattava funktio
  await convertAmount(req, res)

  // Tarkistetaan, että tilakoodi on 400
  expect(res.status).toHaveBeenCalledWith(400)

  // Tarkistetaan oikea virheilmoitus
  expect(res.json).toHaveBeenCalledWith({
    error: 'Currency codes must be 3-letter ISO abbreviations (e.g., USD, EUR).'
  })
})

// Testataan, että valuuttamuunnos onnistuu oikeilla tiedoilla
test('Converts currency successfully', async () => {

  // Määritetään testissä käytettävä valuuttamuunnoksen tulos
  vi.mocked(convert).mockResolvedValue({ amount: 90 })

  // Luodaan pyyntö, jossa kaikki tiedot ovat oikein
  const req = {
    body: { from: 'EUR', to: 'USD', amount: 100 }
  } as Request

  // Luodaan vastauksen testaamiseen tarvittavat toiminnot
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn()
  } as unknown as Response

  // Suoritetaan testattava funktio
  await convertAmount(req, res)

  // Tarkistetaan, että tilakoodi on 200
  expect(res.status).toHaveBeenCalledWith(200)

  // Tarkistetaan, että palautettu summa on 90
  expect(res.json).toHaveBeenCalledWith({
    amount: 90
  })
})