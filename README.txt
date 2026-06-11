ALOPAK – sajt (verzija 2.0)
============================================

STRUKTURA
---------
- index.html ................. početna (slajder, pregled proizvoda, partneri, footer)
- oprema.html ................ katalog opreme: pretraga + filteri po kategoriji
- proizvodi/*.html ........... 18 pojedinačnih stranica proizvoda (opis + specifikacija)
- css/ ....................... global, navbar, slider, products, contact-popup
- js/
    - products.js ............ podaci o proizvodima (generisani)
    - catalog.js ............. logika pretrage i filtera na oprema.html
    - navbarScript.js ........ burger meni + harmonika dropdown (mobilni)
    - sliderScript.js ........ slajder na početnoj
    - layoutScript.js ........ visina header-a
    - contactPopup.js ........ kontakt popup
- generate.py ................ generator: menja podatke o proizvodima na JEDNOM mestu
                               i pravi products.js + sve stranice u proizvodi/
                               (pokretanje: python3 generate.py)

LINKOVANJE KATEGORIJA
---------------------
oprema.html?kat=pet-trake        oprema.html?kat=pp-trake
oprema.html?kat=spojnice-kopce   oprema.html?kat=alati
oprema.html?kat=baterijski-alati oprema.html?kat=masine

SLIKE
-----
- Sve slike su optimizovane za web (ceo folder ~1,5 MB umesto 26 MB).
- imgZicne_fosfat.jpg ........ kopče OBRAĐENE u fosfatizovanu (crnu) varijantu,
                               po zahtevu klijenta. Original je zamenjen i na slajderu (img1.jpg).
- imgPETRolna.jpg / imgPPRolna.jpg ... PET i PP rolne ujednačene veličine (zahtev klijenta).
- imgMasinaPlaceholder.jpg ... privremena slika za mašine za pakovanje –
                               kada dobijete pravu fotografiju, samo je snimite
                               preko ovog fajla (1000x1000, JPEG).

LOGOI PARTNERA
--------------
U folder images/partneri/ ubacite logoe pod sledećim imenima (PNG, idealno kvadratni):
  oms.png, sabo.png, sabofiliere.png, bongioanni.png, ripack.png, fullstrap.png
Sajt ih automatski prikazuje; dok fajla nema, prikazuje se monogram firme.

KONTAKT
-------
Telefon i email se nalaze u kontakt popupu i footeru
(index.html, oprema.html i u svakoj stranici u proizvodi/ – generator ih upisuje).
