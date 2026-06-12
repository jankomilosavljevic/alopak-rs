// ALOPAK – pokretna traka sa izdvojenim proizvodima (auto-skrol + prevlačenje)

const showcaseTrack = document.getElementById("showcaseTrack");
const showcaseMarquee = document.querySelector(".showcase-marquee");

if (showcaseTrack && showcaseMarquee && typeof ALOPAK_DATA !== "undefined") {

    // Po jedan proizvod za svaku fotografiju (bez placeholder slika)
    const seenImages = {};
    const picks = ALOPAK_DATA.products.filter(function (p) {
        if (!p.image || p.image.indexOf("Placeholder") !== -1) return false;
        if (seenImages[p.image]) return false;

        seenImages[p.image] = true;
        return true;
    }).slice(0, 10);

    const categoryNames = {};
    ALOPAK_DATA.categories.forEach(function (c) {
        categoryNames[c.id] = c.name;
    });

    function cardHTML(p) {
        return (
            '<a class="showcase-card" href="proizvodi/' + p.id + '.html" draggable="false">' +
            '<span class="showcase-card__media">' +
            '<img src="images/' + p.image + '" alt="" loading="lazy" draggable="false">' +
            "</span>" +
            '<span class="showcase-card__cat">' + (categoryNames[p.cat] || "") + "</span>" +
            "<strong>" + p.name + "</strong>" +
            "</a>"
        );
    }

    const cards = picks.map(cardHTML).join("");

    // Sadržaj dupliran radi neprekidne (beskonačne) trake
    showcaseTrack.innerHTML = cards + cards;

    /* ---- animacija + prevlačenje ---- */

    const AUTO_SPEED = 35; // px u sekundi

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let offset = 0;
    let halfWidth = 0;
    let hovering = false;
    let dragging = false;
    let lastX = 0;
    let dragDistance = 0;
    let lastTime = performance.now();

    function measure() {
        halfWidth = showcaseTrack.scrollWidth / 2;
    }

    measure();
    window.addEventListener("load", measure);
    window.addEventListener("resize", measure);

    function tick(now) {
        const dt = (now - lastTime) / 1000;
        lastTime = now;

        if (!dragging && !hovering && !reducedMotion) {
            offset -= AUTO_SPEED * dt;
        }

        if (halfWidth > 0) {
            // offset uvek u opsegu (-halfWidth, 0] radi beskonačne petlje
            offset = -((((-offset) % halfWidth) + halfWidth) % halfWidth);
        }

        showcaseTrack.style.transform = "translateX(" + offset + "px)";
        requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);

    showcaseMarquee.addEventListener("mouseenter", function () {
        hovering = true;
    });

    showcaseMarquee.addEventListener("mouseleave", function () {
        hovering = false;
    });

    showcaseMarquee.addEventListener("pointerdown", function (event) {
        dragging = true;
        dragDistance = 0;
        lastX = event.clientX;
    });

    showcaseMarquee.addEventListener("pointermove", function (event) {
        if (!dragging) return;

        const dx = event.clientX - lastX;
        lastX = event.clientX;

        offset += dx;
        dragDistance += Math.abs(dx);

        // Pointer hvatamo tek kada prevlačenje stvarno počne,
        // inače bi klik na karticu bio preusmeren na traku
        if (dragDistance > 8 && !showcaseMarquee.hasPointerCapture(event.pointerId)) {
            showcaseMarquee.setPointerCapture(event.pointerId);
        }
    });

    function endDrag() {
        dragging = false;
    }

    showcaseMarquee.addEventListener("pointerup", endDrag);
    showcaseMarquee.addEventListener("pointercancel", endDrag);

    // Posle prevlačenja klik ne sme da otvori proizvod
    showcaseMarquee.addEventListener("click", function (event) {
        if (dragDistance > 8) {
            event.preventDefault();
            event.stopPropagation();
        }
    }, true);
}
