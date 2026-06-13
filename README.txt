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
    - showcase.js ............ pokretna traka "Izdvojeni proizvodi" na početnoj
    - prices.js .............. prikaz cene na stranici proizvoda (čita data/prices.json)
- data/prices.json ........... cene proizvoda (menja ih admin); prazno = "Cena na upit"
- admin/ ..................... PHP administracija cena (vidi sekciju CENE I ADMIN)
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
- imgMasinaVezivanje.jpg ..... fotografija mašine za vezivanje (slajder/showcase i stranica
                               proizvoda). Za zamenu samo snimite novu sliku preko ovog
                               fajla (kvadratna, beli background, JPEG).

LOGOI PARTNERA
--------------
U folder images/partneri/ ubacite logoe pod sledećim imenima (PNG, idealno kvadratni):
  oms.png, sabo.png, sabofiliere.png, bongioanni.png, ripack.png, fullstrap.png
Sajt ih automatski prikazuje; dok fajla nema, prikazuje se monogram firme.

CENE I ADMIN (data/prices.json + admin/)
----------------------------------------
- Cene se čuvaju u data/prices.json. Dok proizvod nema uključenu cenu, na sajtu (katalog
  i stranica proizvoda) piše "Cena na upit".
- Izmena cena: otvorite  https://VAŠ-DOMEN/admin/  u browseru.
    * Prvi put: postavljate lozinku (čuva se HEŠIRANA u admin/secret.php – ne čuva se
      otvoreni tekst lozinke).
    * Posle: prijava lozinkom, čekirate "Prikaži cenu" i upišete iznos
      (npr. 1.250,00 din.), pa "Sačuvaj cene". Promene su odmah vidljive na sajtu.
- Zaboravljena lozinka: obrišite admin/secret.php preko FTP-a i ponovo postavite lozinku.
- Dozvole (ArenaHost/cPanel): folderi  data/  i  admin/  moraju biti upisivi (chmod 755),
  da bi PHP mogao da snimi prices.json i secret.php.
- admin/ i data/ se postavljaju na server preko FTP-a kao i ostali fajlovi. Zahteva PHP
  (standardno na ArenaHost hostingu).

KONTAKT
-------
Telefon i email se nalaze u kontakt popupu i footeru
(index.html, oprema.html i u svakoj stranici u proizvodi/ – generator ih upisuje).
