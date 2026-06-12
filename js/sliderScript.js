const slider = document.querySelector(".slider");
const sliderTrack = document.getElementById("sliderTrack");
const dots = document.querySelectorAll(".slider-dot");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const sliderPanel = document.getElementById("sliderPanel");
const sliderCategory = document.getElementById("sliderCategory");
const sliderTitle = document.getElementById("sliderTitle");
const sliderText = document.getElementById("sliderText");
const sliderLink = document.getElementById("sliderLink");

const slideContent = [
    {
        category: "SPOJNICE I KOPČE",
        title: "Spojnice i kopče",
        text: "Fosfatizovane žičane kopče i metalne spojnice za siguran spoj PP i PET traka.",
        link: "oprema.html?kat=spojnice-kopce",
        button: "Pogledaj ponudu"
    },
    {
        category: "PP TRAKE",
        title: "PP trake",
        text: "Ekonomično rešenje za svakodnevno pakovanje lakše i srednje teške robe.",
        link: "oprema.html?kat=pp-trake",
        button: "Pogledaj ponudu"
    },
    {
        category: "PET TRAKE",
        title: "PET trake",
        text: "Snažne i izdržljive trake za teže terete, paletizovanu robu i zahtevnije uslove transporta.",
        link: "oprema.html?kat=pet-trake",
        button: "Pogledaj ponudu"
    },
    {
        category: "BATERIJSKI ALATI",
        title: "Baterijski alati",
        text: "Poluautomatski i automatski alati za brzo vezivanje PP i PET trakom bez spojnica.",
        link: "oprema.html?kat=baterijski-alati",
        button: "Pogledaj ponudu"
    },
    {
        category: "ALATI ZA VEZANJE",
        title: "Ručni alati",
        text: "Kombinovani alati i zatezači za zatezanje, sečenje i zatvaranje traka.",
        link: "oprema.html?kat=alati",
        button: "Pogledaj ponudu"
    }
];

const slides = sliderTrack
    ? Array.from(sliderTrack.querySelectorAll(".slider-item"))
    : [];

const totalSlides = slides.length;

let currentIndex = 0;

function updatePanel() {
    const content = slideContent[currentIndex];

    if (!content || !sliderPanel) return;

    sliderPanel.classList.add("is-changing");

    setTimeout(function () {
        sliderCategory.textContent = content.category;
        sliderTitle.textContent = content.title;
        sliderText.textContent = content.text;
        sliderLink.href = content.link;
        sliderLink.textContent = content.button;

        sliderPanel.classList.remove("is-changing");
    }, 120);
}

function render() {
    slides.forEach(function (slide, i) {
        slide.classList.toggle("active", i === currentIndex);
    });

    dots.forEach(function (dot, i) {
        dot.classList.toggle("active", i === currentIndex);
    });

    updatePanel();
}

function goTo(index) {
    if (totalSlides === 0) return;

    currentIndex = ((index % totalSlides) + totalSlides) % totalSlides;
    render();
}

if (nextBtn) {
    nextBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        goTo(currentIndex + 1);
    });
}

if (prevBtn) {
    prevBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        goTo(currentIndex - 1);
    });
}

dots.forEach(function (dot) {
    dot.addEventListener("click", function (event) {
        event.stopPropagation();
        goTo(Number(dot.dataset.index));
    });
});

/* TOUCH / SWIPE ZA TELEFON */

let touchStartX = 0;
let touchStartY = 0;
let swipeActive = false;

if (slider) {
    slider.addEventListener("touchstart", function (event) {
        const touchedControl = event.target.closest(
            ".slider-btn, .slider-dot, .slider-panel-btn"
        );

        if (touchedControl) {
            swipeActive = false;
            return;
        }

        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
        swipeActive = true;
    }, { passive: true });

    slider.addEventListener("touchend", function (event) {
        if (!swipeActive) return;

        swipeActive = false;

        const diffX = event.changedTouches[0].clientX - touchStartX;
        const diffY = event.changedTouches[0].clientY - touchStartY;
        const swipeLimit = 50;

        if (Math.abs(diffX) <= Math.abs(diffY)) return;

        if (diffX < -swipeLimit) {
            goTo(currentIndex + 1);
        } else if (diffX > swipeLimit) {
            goTo(currentIndex - 1);
        }
    });
}

render();
