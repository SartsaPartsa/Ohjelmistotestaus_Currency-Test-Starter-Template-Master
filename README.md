## Testaus

Projektissa käytetään Vitestiä automaattiseen ohjelmistotestaukseen.

Testit sijaitsevat `server/tests`-kansiossa. Testauksessa tarkistetaan valuuttamuuntimen laskentaa, syötteiden käsittelyä, palvelimen toimintaa ja virhetilanteita.

### Yksikkötestit

Yksikkötesteillä tarkistetaan sovelluksen yksittäisiä toimintoja.

Testeissä tarkistetaan esimerkiksi:

- Valuuttamuunnoksen laskeminen
- Puuttuvien valuuttakoodien käsittely
- Virheellisten valuuttakoodien käsittely
- Nollasumman käsittely
- Virheellisen rahasumman käsittely
- Valuuttakurssin hakeminen
- Rajapinnasta palautuvien virheiden käsittely

### Controllerin testaus

Controllerin testeissä tarkistetaan käyttäjän antamien tietojen
käsittelyä ja validointia.

Testeissä tarkistetaan sekä onnistuneita tilanteita että
virheellisiä syötteitä.

### HTTP-reittien testaus

HTTP-reittien testeissä tarkistetaan, että palvelimen reitit
toimivat ja palauttavat odotetut vastaukset.

Testeissä käytetään mockeja, joilla simuloidaan controllerin
vastauksia. Tämän vuoksi reittitestit eivät yksin tarkista
varsinaista syötteiden validointia.

### Mockien käyttö

Testeissä käytetään mockeja, joiden avulla voidaan korvata
sovelluksen riippuvuuksia testauksen ajaksi.

Näin yksittäisiä toimintoja voidaan testata ilman oikeita
pyyntöjä ulkoiseen rajapintaan.

### Käyttöliittymän testaus

Projektissa on myös Playwright-testaukseen liittyviä asetuksia
ja testitiedosto.

Playwright-testitiedosto on kuitenkin vielä tyhjä, joten
käyttöliittymälle ei ole toteutettu automaattisia
Playwright-testejä.


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
npm run test
```

Yksittäisen testitiedoston voi suorittaa esimerkiksi komennolla:

```bash
npm run test -- tests/currencyController.test.ts
```

Viimeisimmässä testiajossa kaikki 20 testiä menivät läpi.

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

Viimeisimmässä testiajossa testikattavuus oli:

- Statements – 100 %
- Branches – 100 %
- Functions – 100 %
- Lines – 100 %

Vaikka testikattavuus on 100 %, se ei tarkoita, että kaikki
mahdolliset tilanteet olisi testattu.

Testikattavuuden avulla voidaan seurata, kuinka kattavasti automaattiset testit suorittavat sovelluksen koodia.

## Yhteenveto

Harjoitustyössä tutustuin automaattiseen ohjelmistotestaukseen ja testien kirjoittamiseen Vitestillä.

Testien avulla tarkistin valuuttamuuntimen toimintaa erilaisissa tilanteissa. Samalla opin käyttämään mockeja, testaamaan rajapinnan vastauksia ja tarkastelemaan testikattavuutta.

Harjoitustyö auttoi ymmärtämään, miten automaattiset testit voivat helpottaa virheiden löytämistä ja varmistaa sovelluksen toimintaa.