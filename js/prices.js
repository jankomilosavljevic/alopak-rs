// ALOPAK – prikaz cene na stranici proizvoda.
// Cene se učitavaju iz data/prices.json (menja ih admin). Ako fajl ne postoji
// ili cena nije uključena, ostaje podrazumevano "Cena na upit".
(function () {
    var valEl = document.querySelector("[data-price-value]");
    if (!valEl) return;

    var id = (location.pathname.split("/").pop() || "").replace(".html", "");

    fetch("../data/prices.json", { cache: "no-store" })
        .then(function (r) { return r.ok ? r.json() : {}; })
        .then(function (map) {
            var e = map[id];
            if (e && e.show && e.price) {
                valEl.textContent = e.price;
                valEl.classList.remove("is-upit");
            }
        })
        .catch(function () { /* tiho: ostaje "Cena na upit" */ });
})();
