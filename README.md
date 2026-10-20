# Valuuttamuuntimen ohjelmistotestaus

## Projektin kuvaus

Tämä projekti on toteutettu osana ohjelmistotestauksen opintojaksoa. Harjoitustyössä testataan valmista valuuttamuunninsovellusta, joka muuntaa rahasummia eri valuuttojen välillä.

Sovelluksessa käyttäjä voi valita lähtövaluutan, kohdevaluutan ja muunnettavan summan. Sovellus hakee valuuttakurssin ulkoisesta rajapinnasta ja laskee muunnetun summan.

Harjoitustyön tavoitteena on tutustua ohjelmistotestauksen eri menetelmiin, kirjoittaa automaattisia testejä ja tarkastella testikattavuutta.

## Käytetyt teknologiat

Projektissa käytetään seuraavia teknologioita:

- TypeScript ja JavaScript
- React
- Node.js
- Express
- Vitest
- Vite

Valuuttakurssit haetaan Frankfurter-rajapinnasta.

## Projektin rakenne

Sovellus koostuu käyttöliittymästä ja palvelimesta.

Käyttöliittymä on toteutettu Reactilla. Palvelin on toteutettu Expressillä, ja se käsittelee valuuttamuunnokseen liittyvät pyynnöt.

Palvelimen keskeiset tiedostot:

- `server/index.ts` – palvelimen käynnistäminen ja reittien määrittäminen
- `server/routes/currencyRoutes.ts` – rajapinnan reitit
- `server/controllers/currencyController.ts` – pyyntöjen käsittely ja syötteiden tarkistaminen
- `server/services/currencyService.ts` – valuuttakurssien hakeminen ja muunnoksen suorittaminen
- `server/utils/convert.ts` – muunnettavan summan laskeminen

Automaattiset testit sijaitsevat `server/tests`-kansiossa.

## Testaus

Harjoitustyössä on toteutettu automaattisia testejä Vitestillä.

Testauksessa tarkistetaan valuuttamuuntimen toimintaa sekä onnistuneissa että virheellisissä tilanteissa.

### Yksikkötestit

Yksikkötesteillä tarkistetaan sovelluksen yksittäisten toimintojen oikeellisuutta.

Testeissä tarkistetaan esimerkiksi:

- Valuuttamuunnoksen laskeminen
- Kelvollisten ja virheellisten syötteiden käsittely
- Puuttuvien valuuttakoodien käsittely
- Virheellisten rahasummien käsittely
- Valuuttakurssin hakemisen onnistuminen
- Rajapinnasta palautuvien virheiden käsittely

### Rajapintatestit

Rajapintatesteillä tarkistetaan palvelimen toiminta HTTP-pyyntöjen avulla.

Testeissä tarkistetaan esimerkiksi:

- Onnistunut valuuttamuunnos
- Virheelliset valuuttakoodit
- Puuttuvat pakolliset tiedot
- Negatiivisen rahasumman käsittely
- HTTP-vastausten tilakoodit

### Mockien käyttö

Osassa testeistä käytetään mockeja, joiden avulla voidaan korvata sovelluksen riippuvuuksia testin ajaksi.

Näin yksittäisiä toimintoja voidaan testata ilman, että jokaisessa testissä tarvitsee tehdä oikeita pyyntöjä ulkoiseen rajapintaan.

## Testien suorittaminen

Siirry ensin projektin palvelinkansioon:

```bash
cd server
```

Asenna tarvittavat riippuvuudet:

```bash
npm install
```

Suorita kaikki testit:

```bash
npx vitest run
```

Yksittäisen testitiedoston voi suorittaa esimerkiksi komennolla:

```bash
npx vitest run tests/currencyController.test.ts
```

## Testikattavuus

Testikattavuutta tarkastellaan Vitestin avulla.

Suorita testit ja muodosta kattavuusraportti komennolla:

```bash
npm run coverage
```

Raportista nähdään, kuinka suuri osa sovelluksen koodista ja sen eri suoritushaaroista on tullut testatuksi.

Kattavuusraportissa tarkastellaan seuraavia osa-alueita:

- Statements – suoritetut lauseet
- Branches – testatut suoritushaarat
- Functions – testatut funktiot
- Lines – suoritetut koodirivit

Testikattavuuden avulla voidaan tunnistaa kohtia, joihin tarvitaan vielä lisää testejä.

## Yhteenveto

Harjoitustyössä tutustuin automaattiseen ohjelmistotestaukseen ja testien kirjoittamiseen Vitestillä.

Testien avulla tarkistin valuuttamuuntimen toimintaa erilaisissa tilanteissa. Samalla opin käyttämään mockeja, testaamaan rajapinnan vastauksia ja tarkastelemaan testikattavuutta.

Harjoitustyö auttoi ymmärtämään, miten automaattiset testit voivat helpottaa virheiden löytämistä ja varmistaa sovelluksen toimintaa.