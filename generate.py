# -*- coding: utf-8 -*-
"""ALOPAK – generator stranica proizvoda + products.js (jedan izvor podataka)."""
import json, html

CATEGORIES = [
    {"id": "pet-trake",       "name": "PET trake"},
    {"id": "pp-trake",        "name": "PP trake"},
    {"id": "spojnice-kopce",  "name": "Spojnice i kopče"},
    {"id": "alati",           "name": "Alati za vezanje"},
    {"id": "baterijski-alati","name": "Baterijski alati"},
    {"id": "masine",          "name": "Mašine za pakovanje"},
]

PET_DESC = ("PET traka je savremena zamena za čeličnu traku – izuzetno čvrsta, otporna na UV zračenje, "
            "vlagu i temperaturne promene, a pritom bezbednija za rukovanje jer nema oštrih ivica. "
            "Zadržava zategnutost tokom transporta i amortizuje udarce, što je čini idealnom za "
            "paletizovanu robu, građevinski materijal, drvnu građu, ciglu i blok, kao i metalne profile.")

PP_DESC = ("PP (polipropilenska) traka je ekonomično i pouzdano rešenje za svakodnevno vezivanje i "
           "pakovanje lakše i srednje teške robe. Laka je za rukovanje, kompatibilna sa ručnim alatima, "
           "poluautomatskim i automatskim mašinama, i dostupna u namotajima prilagođenim različitim "
           "sistemima pakovanja.")

def pet(w, t, l, sid, auto_note=""):
    name = f"PET traka {w}×{t}mm" + (f" / {l}m" if l else "")
    return {
        "id": sid, "cat": "pet-trake", "name": name,
        "image": "imgPETRolna.jpg",
        "short": f"Poliesterska traka širine {w}mm za zahtevnije terete i transport.",
        "desc": PET_DESC + (" " + auto_note if auto_note else ""),
        "specs": [
            ("Materijal", "Poliester (PET)"),
            ("Širina", f"{w} mm"),
            ("Debljina", f"{t} mm"),
            ("Dužina namotaja", f"{l} m" if l else "Na upit"),
            ("Jezgro (kotur)", "Ø 406 mm"),
            ("Boja", "Zelena"),
            ("Način spajanja", "Žičane kopče ili frikciono varenje (baterijski alat)"),
        ],
    }

def pp(w, t, l, sid, machine=False):
    name = f"PP traka {w}×{t}mm / {l}m"
    img = "imgAutomPP.jpg" if machine else "imgPPRolna.jpg"
    extra = (" Ovaj namotaj je prilagođen radu na poluautomatskim i automatskim mašinama za vezivanje."
             if machine else " Pogodna za ručno vezivanje uz kombinovane alate i metalne spojnice.")
    return {
        "id": sid, "cat": "pp-trake", "name": name,
        "image": img,
        "short": f"Polipropilenska traka širine {w}mm za svakodnevno pakovanje.",
        "desc": PP_DESC + extra,
        "specs": [
            ("Materijal", "Polipropilen (PP)"),
            ("Širina", f"{w} mm"),
            ("Debljina", f"{t} mm"),
            ("Dužina namotaja", f"{l} m"),
            ("Boja", "Crna"),
            ("Primena", "Mašinsko vezivanje" if machine else "Ručno i mašinsko vezivanje"),
        ],
    }

PRODUCTS = [
    pet("9", "0,6", "3600", "pet-traka-9x06"),
    pet("12", "0,6", "2500", "pet-traka-12x06"),
    pet("12", "0,7", "2000", "pet-traka-12x07"),
    pet("15,5", "0,7", "1500", "pet-traka-155x07"),
    pet("19", "1,0", None, "pet-traka-19x10"),
    pp("12", "0,7", "2000", "pp-traka-12x07"),
    pp("16", "0,7", "1800", "pp-traka-16x07"),
    pp("9", "0,5", "4000", "pp-traka-9x05", machine=True),
    pp("12", "0,55", "3000", "pp-traka-12x055", machine=True),
    {
        "id": "spojnice-pp-12", "cat": "spojnice-kopce",
        "name": "Spojnice za PP traku 12mm",
        "image": "imgMetalne.jpg",
        "short": "Metalne spojnice za sigurno zatvaranje PP trake širine 12mm.",
        "desc": ("Metalne spojnice za PP traku širine 12mm obezbeđuju čvrst i pouzdan spoj pri ručnom "
                 "vezivanju. Nazubljena unutrašnja površina sprečava proklizavanje trake i pod većim "
                 "opterećenjem. Koriste se u kombinaciji sa kombinovanim alatima za zatezanje i "
                 "zatvaranje, a pakuju se u kutije pogodne za skladištenje i svakodnevnu upotrebu."),
        "specs": [
            ("Namena", "PP traka širine 12 mm"),
            ("Materijal", "Čelik"),
            ("Tip", "Otvorena spojnica (klema)"),
            ("Način upotrebe", "Kombinovani alat za PP traku 12 mm"),
        ],
    },
    {
        "id": "spojnice-pp-16", "cat": "spojnice-kopce",
        "name": "Spojnice za PP traku 16mm",
        "image": "imgMetalne.jpg",
        "short": "Metalne spojnice za sigurno zatvaranje PP trake širine 16mm.",
        "desc": ("Metalne spojnice za PP traku širine 16mm namenjene su pakovanju srednje teške robe gde "
                 "je potreban širi i nosiviji spoj. Nazubljena površina obezbeđuje stabilno prianjanje, "
                 "a spojnica se zatvara kombinovanim alatom u jednom potezu. Pouzdano rešenje za "
                 "svakodnevni rad u magacinu i proizvodnji."),
        "specs": [
            ("Namena", "PP traka širine 16 mm"),
            ("Materijal", "Čelik"),
            ("Tip", "Otvorena spojnica (klema)"),
            ("Način upotrebe", "Kombinovani alat za PP traku 16 mm"),
        ],
    },
    {
        "id": "kopce-pet-16", "cat": "spojnice-kopce",
        "name": "Kopče za PET traku 16mm, fosfatizovane",
        "image": "imgZicne_fosfat.jpg",
        "short": "Fosfatizovane žičane kopče za PET traku širine do 16mm.",
        "desc": ("Žičane kopče sa fosfatnom zaštitom namenjene su vezivanju PET trakom širine do 16mm. "
                 "Fosfatizovana (crna, mat) površina povećava trenje između kopče i trake, čime spoj "
                 "zadržava zategnutost znatno bolje nego kod pocinkovanih kopči, i pruža dodatnu zaštitu "
                 "od korozije. Idealne za teže terete, građevinski materijal i situacije gde se traka "
                 "naknadno dodatno zateže."),
        "specs": [
            ("Namena", "PET traka širine 16 mm"),
            ("Materijal", "Čelična žica"),
            ("Površinska zaštita", "Fosfatizovano (crno, mat)"),
            ("Prednost", "Veće trenje i sigurniji spoj u odnosu na pocinkovane kopče"),
            ("Način upotrebe", "Zatezač za PET i CORD traku"),
        ],
    },
    {
        "id": "kombinovani-alat-pp-12", "cat": "alati",
        "name": "Kombinovani alat za PP traku 12mm",
        "image": "imgMasina.jpg",
        "short": "Ručni alat za zatezanje, zatvaranje i sečenje PP trake 12mm.",
        "desc": ("Kombinovani ručni alat objedinjuje tri operacije u jednom uređaju: zatezanje trake, "
                 "zatvaranje metalne spojnice i sečenje viška trake. Robustan i jednostavan za upotrebu, "
                 "namenjen je svakodnevnom radu sa PP trakom širine 12mm. Ne zahteva struju ni "
                 "kompresovani vazduh – idealan za magacine, otpremu i terenski rad."),
        "specs": [
            ("Namena", "PP traka širine 12 mm"),
            ("Funkcije", "Zatezanje, zatvaranje spojnice, sečenje"),
            ("Spajanje", "Metalne spojnice 12 mm"),
            ("Pogon", "Ručni"),
        ],
    },
    {
        "id": "kombinovani-alat-pp-16", "cat": "alati",
        "name": "Kombinovani alat za PP traku 16mm",
        "image": "imgMasina.jpg",
        "short": "Ručni alat za zatezanje, zatvaranje i sečenje PP trake 16mm.",
        "desc": ("Kombinovani ručni alat za PP traku širine 16mm – zatezanje, zatvaranje spojnice i "
                 "sečenje u jednom alatu. Pojačana konstrukcija prilagođena je široj traci i pakovanju "
                 "srednje teške robe. Pouzdan izbor za intenzivnu svakodnevnu upotrebu bez potrebe za "
                 "spoljnim izvorom energije."),
        "specs": [
            ("Namena", "PP traka širine 16 mm"),
            ("Funkcije", "Zatezanje, zatvaranje spojnice, sečenje"),
            ("Spajanje", "Metalne spojnice 16 mm"),
            ("Pogon", "Ručni"),
        ],
    },
    {
        "id": "zatezac-pet-cord", "cat": "alati",
        "name": "Zatezač za PET i CORD traku 9–19mm",
        "image": "imgMasina.jpg",
        "short": "Ručni zatezač za PET i CORD (tekstilnu) traku širine 9 do 19mm.",
        "desc": ("Ručni zatezač namenjen radu sa PET i CORD (tekstilnom) trakom širine od 9 do 19mm. "
                 "Omogućava snažno i kontrolisano zatezanje trake oko tereta, nakon čega se spoj "
                 "obezbeđuje žičanom kopčom. Univerzalan raspon širina čini ga praktičnim rešenjem za "
                 "firme koje koriste više dimenzija trake."),
        "specs": [
            ("Namena", "PET i CORD traka"),
            ("Raspon širina", "9 – 19 mm"),
            ("Spajanje", "Žičane kopče"),
            ("Pogon", "Ručni"),
        ],
    },
    {
        "id": "baterijski-alat-poluautomatski", "cat": "baterijski-alati",
        "name": "Poluautomatski baterijski alat za PP i PET traku",
        "image": "imgBaterijskiAlat.jpg",
        "short": "Baterijski alat sa poluautomatskim ciklusom vezivanja PP i PET trakom.",
        "desc": ("Poluautomatski baterijski alat zateže, vari (frikciono) i seče PP i PET traku bez "
                 "spojnica i kopči. Operater kontroliše početak svake operacije, što daje precizno "
                 "vezivanje i kod nepravilnih paketa. Litijum-jonska baterija obezbeđuje veliki broj "
                 "ciklusa po punjenju, a frikciono varenje stvara spoj velike nosivosti – brže, čistije "
                 "i ekonomičnije od rada sa kopčama."),
        "specs": [
            ("Namena", "PP i PET traka"),
            ("Režim rada", "Poluautomatski (zatezanje na komandu)"),
            ("Spajanje", "Frikciono varenje – bez spojnica"),
            ("Napajanje", "Litijum-jonska baterija"),
            ("Funkcije", "Zatezanje, varenje, sečenje"),
        ],
    },
    {
        "id": "baterijski-alat-automatski", "cat": "baterijski-alati",
        "name": "Automatski baterijski alat za PP i PET traku",
        "image": "imgBaterijskiAlat.jpg",
        "short": "Potpuno automatski ciklus: zatezanje, varenje i sečenje jednim pritiskom.",
        "desc": ("Automatski baterijski alat izvršava ceo ciklus – zatezanje, frikciono varenje i "
                 "sečenje trake – jednim pritiskom na taster. Podesiva sila zatezanja i vreme varenja "
                 "omogućavaju ponovljiv, ujednačen kvalitet spoja na svakom paketu. Najbrže rešenje za "
                 "veliki obim pakovanja PP i PET trakom, bez spojnica i bez fizičkog napora."),
        "specs": [
            ("Namena", "PP i PET traka"),
            ("Režim rada", "Automatski (ceo ciklus jednim tasterom)"),
            ("Podešavanja", "Sila zatezanja i vreme varenja"),
            ("Spajanje", "Frikciono varenje – bez spojnica"),
            ("Napajanje", "Litijum-jonska baterija"),
            ("Funkcije", "Zatezanje, varenje, sečenje"),
        ],
    },
    {
        "id": "masine-za-vezanje", "cat": "masine",
        "name": "Poluautomatske i automatske mašine za vezanje PP i PET trakom",
        "image": "imgMasinaPlaceholder.jpg",
        "short": "Stone i prolazne mašine za vezivanje paketa PP i PET trakom.",
        "desc": ("Nudimo poluautomatske i automatske mašine za vezivanje paketa PP i PET trakom – od "
                 "stonih mašina za manje serije do automatskih sistema sa ramom za integraciju u "
                 "pakerske linije. Mašine zatežu, vare i seku traku u sekundama, uz podesivu silu "
                 "zatezanja prema vrsti robe. U saradnji sa našim evropskim partnerima obezbeđujemo "
                 "izbor modela, puštanje u rad, obuku i servis. Kontaktirajte nas za konfiguraciju "
                 "prema vašoj proizvodnji."),
        "specs": [
            ("Namena", "PP i PET traka"),
            ("Izvedbe", "Poluautomatske (stone) i automatske (sa ramom)"),
            ("Spajanje", "Termičko / frikciono varenje"),
            ("Integracija", "Samostalni rad ili u pakerskoj liniji"),
            ("Podrška", "Isporuka, puštanje u rad, obuka i servis"),
        ],
    },
]

CAT_NAME = {c["id"]: c["name"] for c in CATEGORIES}

PAGE_TMPL = """<!DOCTYPE html>
<html lang="sr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | ALOPAK</title>
    <meta name="description" content="{short}">
    <link rel="stylesheet" href="../css/global.css">
    <link rel="stylesheet" href="../css/navbar.css">
    <link rel="stylesheet" href="../css/products.css">
    <link rel="stylesheet" href="../css/contact-popup.css">
</head>

<body class="subpage">

{header}

    <main class="page-scroll page-scroll--subpage" id="pageScroll">

        <nav class="breadcrumbs" aria-label="Putanja">
            <a href="../index.html">Početna</a>
            <span aria-hidden="true">/</span>
            <a href="../oprema.html">Oprema</a>
            <span aria-hidden="true">/</span>
            <a href="../oprema.html?kat={cat}">{cat_name}</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{title}</span>
        </nav>

        <article class="product-detail">
            <div class="product-detail__media">
                <img src="../images/{image}" alt="{title}">
            </div>

            <div class="product-detail__info">
                <span class="product-detail__category">{cat_name}</span>
                <h1>{title}</h1>
                <p class="product-detail__desc">{desc}</p>

                <h2 class="product-detail__specs-title">Specifikacija</h2>
                <table class="product-detail__specs">
                    <tbody>
{spec_rows}
                    </tbody>
                </table>

                <div class="product-detail__actions">
                    <a href="#" class="section-btn" data-contact-popup>Pošaljite upit</a>
                    <a href="../oprema.html?kat={cat}" class="product-detail__back">&#8592; Nazad na {cat_name}</a>
                </div>
            </div>
        </article>

        <section class="related" aria-label="Slični proizvodi">
            <h2>Iz iste kategorije</h2>
            <div class="related__grid">
{related_cards}
            </div>
        </section>

{footer}
    </main>

{contact_modal}

    <script src="../js/navbarScript.js"></script>
    <script src="../js/contactPopup.js"></script>
</body>

</html>
"""

def nav_header(prefix):
    cat_links = "\n".join(
        f'                            <li><a href="{prefix}oprema.html?kat={c["id"]}">{c["name"]}</a></li>'
        for c in CATEGORIES
    )
    return f"""    <header class="site-header">
        <div class="header-inner">

            <a href="{prefix}index.html" class="logo-wrap" aria-label="ALOPAK – početna">
                <img src="{prefix}images/alopak_logo.png" alt="ALOPAK" class="logo-img">
            </a>

            <button class="burger-btn" id="burgerBtn" aria-label="Otvori meni" aria-expanded="false" aria-controls="navMenu">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <nav class="nav-holder" aria-label="Glavna navigacija">
                <ul class="nav-menu" id="navMenu">

                    <li class="nav-item">
                        <a href="{prefix}index.html" class="nav-link">Početna</a>
                    </li>

                    <li class="nav-item has-dropdown">
                        <a class="nav-link dropdown-toggle" href="{prefix}oprema.html" aria-haspopup="true" aria-expanded="false">Oprema</a>
                        <ul class="dropdown-menu">
                            <li><a href="{prefix}oprema.html" class="dropdown-link--all">Svi proizvodi</a></li>
{cat_links}
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a href="{prefix}index.html#partneri" class="nav-link">Partneri</a>
                    </li>

                    <li class="nav-item">
                        <a href="#" class="nav-link contact-btn" data-contact-popup>Kontakt</a>
                    </li>

                </ul>
            </nav>

        </div>
    </header>"""

def footer_html(prefix):
    return f"""        <footer class="site-footer">
            <div class="site-footer__inner">
                <div class="site-footer__brand">
                    <img src="{prefix}images/alopak_logo.png" alt="ALOPAK">
                    <p>Oprema i materijali za vezivanje i pakovanje – PP i PET trake, spojnice, alati i mašine.</p>
                </div>
                <div class="site-footer__col">
                    <h3>Navigacija</h3>
                    <a href="{prefix}index.html">Početna</a>
                    <a href="{prefix}oprema.html">Oprema</a>
                    <a href="{prefix}index.html#partneri">Partneri</a>
                </div>
                <div class="site-footer__col">
                    <h3>Kontakt</h3>
                    <a href="tel:+38163226459">+381 63 226 459</a>
                    <a href="mailto:alopakrs@gmail.com">alopakrs@gmail.com</a>
                </div>
            </div>
            <div class="site-footer__bottom">© {{year}} ALOPAK. Sva prava zadržana.</div>
        </footer>""".replace("{year}", "2026")

CONTACT_MODAL = """    <div class="contact-modal" id="contactModal" aria-hidden="true">
        <div class="contact-modal__backdrop" data-contact-close></div>

        <div class="contact-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="contactModalTitle"
            tabindex="-1">
            <button class="contact-modal__close" type="button" aria-label="Zatvori popup" data-contact-close>
                &times;
            </button>

            <div class="contact-modal__header">
                <span class="contact-modal__label">ALOPAK</span>
                <h2 id="contactModalTitle">Kontakt podaci</h2>
                <p>Tu smo za ponude, tehnička pitanja i izbor opreme za vaše pakovanje.</p>
            </div>

            <div class="contact-modal__grid">
                <a class="contact-modal__item" href="tel:+38163226459">
                    <span class="contact-modal__icon">&#9742;</span>
                    <span>
                        <strong>Telefon</strong>
                        <small>+381 63 226 459</small>
                    </span>
                </a>

                <a class="contact-modal__item" href="mailto:alopakrs@gmail.com">
                    <span class="contact-modal__icon">&#9993;</span>
                    <span>
                        <strong>Email</strong>
                        <small>alopakrs@gmail.com</small>
                    </span>
                </a>
            </div>
        </div>
    </div>"""

def related_cards(prod):
    same = [p for p in PRODUCTS if p["cat"] == prod["cat"] and p["id"] != prod["id"]][:3]
    if not same:
        same = [p for p in PRODUCTS if p["id"] != prod["id"]][:3]
    cards = []
    for p in same:
        cards.append(f"""                <a href="{p['id']}.html" class="product-card">
                    <div class="product-card__media"><img src="../images/{p['image']}" alt="" loading="lazy"></div>
                    <div class="product-card__body">
                        <span class="product-card__cat">{CAT_NAME[p['cat']]}</span>
                        <h3>{html.escape(p['name'])}</h3>
                        <span class="product-card__link">Detaljnije</span>
                    </div>
                </a>""")
    return "\n".join(cards)

def main():
    # 1) products.js
    js_data = {
        "categories": CATEGORIES,
        "products": [
            {"id": p["id"], "cat": p["cat"], "name": p["name"], "image": p["image"], "short": p["short"]}
            for p in PRODUCTS
        ],
    }
    with open("js/products.js", "w", encoding="utf-8") as f:
        f.write("// ALOPAK – podaci o proizvodima (generisano iz generate.py)\n")
        f.write("const ALOPAK_DATA = ")
        f.write(json.dumps(js_data, ensure_ascii=False, indent=2))
        f.write(";\n")

    # 2) product pages
    header = nav_header("../")
    footer = footer_html("../")
    for p in PRODUCTS:
        rows = "\n".join(
            f"                        <tr><th scope=\"row\">{k}</th><td>{v}</td></tr>"
            for k, v in p["specs"]
        )
        page = PAGE_TMPL.format(
            title=html.escape(p["name"]), short=html.escape(p["short"]),
            desc=html.escape(p["desc"]), image=p["image"],
            cat=p["cat"], cat_name=CAT_NAME[p["cat"]],
            spec_rows=rows, related_cards=related_cards(p),
            header=header, footer=footer, contact_modal=CONTACT_MODAL,
        )
        with open(f"proizvodi/{p['id']}.html", "w", encoding="utf-8") as f:
            f.write(page)

    # 3) shared header/footer snippets for manual pages
    with open("/tmp/header_root.html", "w", encoding="utf-8") as f:
        f.write(nav_header(""))
    with open("/tmp/footer_root.html", "w", encoding="utf-8") as f:
        f.write(footer_html(""))
    print(f"OK: {len(PRODUCTS)} stranica proizvoda + js/products.js")

if __name__ == "__main__":
    main()
