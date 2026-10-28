# Valuuttamuunnin – ohjelmistotestauksen harjoitustyö

Tässä harjoitustyössä testataan yksinkertaista valuuttamuunnossovellusta, joka hakee valuuttakurssit Frankfurter-rajapinnasta.
Harjoitustyössä tutustuin automaattiseen ohjelmistotestaukseen Vitestin ja Supertestin avulla. Testeissä käytetään myös mockausta, stubbausta ja spy-toimintoa.

## Sovelluksen käynnistäminen

Valuuttamuunnossovellus koostuu palvelimesta (backend) ja käyttöliittymästä (frontend). Molemmat käynnistetään erikseen.

### Palvelimen käynnistäminen

Avaa terminaali projektin pääkansiossa ja siirry palvelinkansioon:

```bash
cd server
```

Asenna tarvittavat riippuvuudet:

```bash
npm install
```

Käynnistä palvelin:

```bash
npm run dev
```

Palvelin käynnistyy oletusarvoisesti osoitteeseen http://localhost:3000.

Palvelimen asetukset määritellään server/.env-tiedostossa:

* PORT – palvelimen portti
* FRANKFURTER_API – valuuttakurssipalvelun osoite (valinnainen)

Osoite luetaan `.env`-tiedostosta (`https://api.frankfurter.dev/v1/latest`). Jos osoitetta ei ole määritelty, koodissa käytetään oletusosoitetta https://api.frankfurter.app/latest.

Jätä terminaali auki, jotta palvelin pysyy käynnissä.

### Käyttöliittymän käynnistäminen

Avaa toinen terminaali ja siirry projektin pääkansioon.

Asenna tarvittavat riippuvuudet:

```bash
npm install
```

Käynnistä käyttöliittymä:

```bash
npm run dev
```
Käyttöliittymä käynnistyy yleensä osoitteeseen `http://localhost:5173`.

Avaa osoite selaimessa, jotta pääset käyttämään valuuttamuunninta.

Palvelimen ja käyttöliittymän täytyy olla käynnissä samanaikaisesti, jotta sovellus toimii.

Sovelluksen voi pysäyttää painamalla molemmissa terminaaleissa `Ctrl + C`.

## Testaus

Projektissa käytetään Vitestiä automaattisten testien suorittamiseen ja Supertestiä HTTP-rajapintojen testaamiseen.

Testit sijaitsevat `server/tests`-kansiossa.

Testeissä tarkistetaan valuuttamuuntimen laskentaa, käyttäjän antamia tietoja, palvelimen toimintaa ja erilaisia virhetilanteita.

### Yksikkötestit

Yksikkötesteillä tarkistetaan sovelluksen yksittäisten toimintojen oikeellisuutta.

Testeissä tarkistetaan esimerkiksi:

- Valuuttamuunnoksen laskeminen
- Puuttuvat ja virheelliset valuuttakoodit
- Nollasumman ja virheellisen rahasumman käsittely
- Valuuttakurssin hakeminen
- Rajapinnan virhetilanteet

### Controllerin testaus

Controllerin testeissä tarkistetaan käyttäjän antamien tietojen käsittelyä ja validointia. Testeissä varmistetaan, että puuttuvat tai virheelliset tiedot palauttavat oikean virheilmoituksen ja HTTP-tilakoodin.

Onnistuneen valuuttamuunnoksen testissä tarkistetaan, että controller kutsuu palvelua oikeilla arvoilla ja palauttaa palvelun tuloksen. Erillisessä testissä varmistetaan, että controller välittää palvelulle käyttäjän pyynnössä antamat arvot sellaisinaan. Palvelu korvataan testeissä mockilla, joten controllerin toiminta voidaan testata erillään oikeasta valuuttakurssipalvelusta.


### Mockaus, stubbaus ja spy

Testeissä käytetään mockeja ja stubeja, joiden avulla sovelluksen riippuvuuksia voidaan korvata testauksen ajaksi.

Esimerkiksi service-testeissä oikea valuuttakurssipalvelun API-kutsu korvataan testivastauksella. Näin yksikkötestit eivät ole riippuvaisia ulkoisen palvelun toiminnasta.

Spy-toiminnolla tarkistetaan, että laskentafunktiota kutsutaan oikeilla arvoilla. Spyä käytetään myös palvelimen testeissä seuraamaan, millä portilla `app.listen` kutsutaan.

### HTTP-rajapinnan testaus

HTTP-rajapinnan testaamiseen käytetään Supertestiä.

Reittitesteissä tarkistetaan, että palvelimen reitit toimivat ja palauttavat odotetut vastaukset. Näissä testeissä controllerin toiminta korvataan mockilla.

API-testeissä (`currencyAPI.test.js`) lähetetään HTTP-pyyntöjä palvelinsovellukselle ja tarkistetaan vastaukset.

Testeissä tarkistetaan esimerkiksi:

- Onnistunut valuuttamuunnos
- Virheellinen valuuttakoodi
- Puuttuvat valuuttakoodit
- Negatiivinen rahasumma

API-testeissä ei käytetä mockausta, vaan pyyntö kulkee reitin, controllerin ja palvelun kautta oikeaan Frankfurter-rajapintaan. Siksi API-testit tarvitsevat verkkoyhteyden, eikä onnistuneessa testissä tarkisteta tarkkaa summaa vaan sitä, että vastauksen `amount` on numero.

## Testien suorittaminen

Avaa terminaali projektin pääkansiossa ja siirry palvelinkansioon:

```bash
cd server
```

Asenna tarvittavat riippuvuudet, jos niitä ei ole vielä asennettu:

```bash
npm install
```

Suorita kaikki testit kerran:

```bash
npm run test -- --run
```

Testit voi suorittaa myös komennolla:

```bash
npm run test
```

Tällöin Vitest käynnistyy watch-tilaan ja jää odottamaan tiedostomuutoksia. Testauksen voi lopettaa painamalla `q` tai `Ctrl + C`.

Yksittäisen testitiedoston voi suorittaa esimerkiksi komennolla:

```bash
npm run test -- --run tests/currencyController.test.ts
```

Viimeisimmässä testiajossa kaikki 23 testiä menivät läpi.

## Testikattavuus

Testikattavuutta tarkastellaan Vitestin avulla.

Suorita testit ja muodosta kattavuusraportti komennolla:

```bash
npm run coverage
```

Raportista nähdään, kuinka suuri osa sovelluksen koodista on tullut testatuksi.

Kattavuusraportissa tarkastellaan neljää osa-aluetta:

* Statements – suoritetut lauseet
* Branches – testatut suoritushaarat
* Functions – testatut funktiot
* Lines – suoritetut koodirivit

Viimeisimmässä testiajossa testikattavuus oli:

* Statements – 100 %
* Branches – 100 %
* Functions – 100 %
* Lines – 100 %

Vaikka testikattavuus on 100 %, se ei tarkoita, että kaikki mahdolliset tilanteet olisi testattu.

## Yhteenveto

Harjoitustyössä opin kirjoittamaan ja suorittamaan automaattisia testejä Vitestillä ja Supertestillä.

Testasin valuuttamuuntimen laskentaa, käyttäjän antamien tietojen käsittelyä, API-kutsuja ja erilaisia virhetilanteita. Opin myös käyttämään mockeja, stubeja ja spy-toimintoa sekä tarkastelemaan testikattavuutta.

Harjoitustyön aikana ymmärsin paremmin, miten automaattisilla testeillä voidaan tarkistaa sovelluksen toimintaa ja löytää mahdollisia virheitä.