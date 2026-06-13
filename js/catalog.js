// ALOPAK – katalog opreme: filteri po kategoriji + pretraga
(function () {
    if (typeof ALOPAK_DATA === "undefined") return;

    const grid = document.getElementById("catalogGrid");
    const filtersHolder = document.getElementById("catalogFilters");
    const searchInput = document.getElementById("catalogSearch");
    const countLabel = document.getElementById("catalogCount");

    if (!grid || !filtersHolder || !searchInput) return;

    const catName = {};
    ALOPAK_DATA.categories.forEach(function (c) {
        catName[c.id] = c.name;
    });

    let activeCat = "sve";
    let query = "";
    let priceMap = {};

    /* Cena iz data/prices.json; ako nije uključena -> "Cena na upit" */
    function priceInfo(id) {
        const e = priceMap[id];
        if (e && e.show && e.price) {
            return { text: e.price, upit: false };
        }
        return { text: "Cena na upit", upit: true };
    }

    /* Filter dugmad iz podataka */
    ALOPAK_DATA.categories.forEach(function (c) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "filter-pill";
        btn.dataset.cat = c.id;
        btn.textContent = c.name;
        filtersHolder.appendChild(btn);
    });

    /* Normalizacija teksta: bez dijakritika, mala slova, zarez -> tačka */
    function normalize(text) {
        return text
            .toLowerCase()
            .replace(/,/g, ".")
            .replace(/š/g, "s").replace(/đ/g, "dj").replace(/č/g, "c")
            .replace(/ć/g, "c").replace(/ž/g, "z")
            .replace(/×/g, "x");
    }

    function matches(product) {
        if (activeCat !== "sve" && product.cat !== activeCat) return false;
        if (!query) return true;

        const haystack = normalize(
            product.name + " " + product.short + " " + catName[product.cat]
        );

        return normalize(query)
            .split(/\s+/)
            .filter(Boolean)
            .every(function (word) {
                return haystack.indexOf(word) !== -1;
            });
    }

    function cardHTML(p) {
        const pi = priceInfo(p.id);
        return (
            '<a href="proizvodi/' + p.id + '.html" class="product-card">' +
            '<div class="product-card__media"><img src="images/' + p.image + '" alt="" loading="lazy"></div>' +
            '<div class="product-card__body">' +
            '<span class="product-card__cat">' + catName[p.cat] + "</span>" +
            "<h3>" + p.name + "</h3>" +
            "<p>" + p.short + "</p>" +
            '<span class="product-card__price' + (pi.upit ? " is-upit" : "") + '">' + pi.text + "</span>" +
            '<span class="product-card__link">Detaljnije</span>' +
            "</div></a>"
        );
    }

    function render() {
        const visible = ALOPAK_DATA.products.filter(matches);

        if (visible.length === 0) {
            grid.innerHTML =
                '<div class="catalog-empty">' +
                "<strong>Nema rezultata</strong>" +
                "Pokušajte sa drugim pojmom ili izaberite drugu kategoriju." +
                "</div>";
        } else {
            grid.innerHTML = visible.map(cardHTML).join("");
        }

        if (countLabel) {
            countLabel.textContent =
                "Prikazano: " + visible.length + " od " + ALOPAK_DATA.products.length + " proizvoda";
        }
    }

    function setCategory(cat) {
        activeCat = cat;

        filtersHolder.querySelectorAll(".filter-pill").forEach(function (b) {
            b.classList.toggle("active", b.dataset.cat === cat);
        });

        const url = new URL(window.location);
        if (cat === "sve") {
            url.searchParams.delete("kat");
        } else {
            url.searchParams.set("kat", cat);
        }
        window.history.replaceState({}, "", url);

        render();
    }

    filtersHolder.addEventListener("click", function (event) {
        const btn = event.target.closest(".filter-pill");
        if (btn) setCategory(btn.dataset.cat);
    });

    searchInput.addEventListener("input", function () {
        query = searchInput.value.trim();
        render();
    });

    function start() {
        /* ?kat= iz URL-a (linkovi iz navigacije) */
        const params = new URLSearchParams(window.location.search);
        const fromUrl = params.get("kat");
        if (fromUrl && catName[fromUrl]) {
            setCategory(fromUrl);
        } else {
            render();
        }
    }

    /* Prvo učitaj cene, pa prikaži katalog (radi i ako fajl ne postoji) */
    fetch("data/prices.json", { cache: "no-store" })
        .then(function (r) { return r.ok ? r.json() : {}; })
        .then(function (m) { priceMap = m || {}; })
        .catch(function () { /* nema cena -> sve "Cena na upit" */ })
        .then(start);
})();
