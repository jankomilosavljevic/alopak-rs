const sliderTrack = document.getElementById("sliderTrack");
const dots = document.querySelectorAll(".slider-dot");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const sliderPanel = document.getElementById("sliderPanel");
const sliderCategory = document.getElementById("sliderCategory");
const sliderTitle = document.getElementById("sliderTitle");
const sliderText = document.getElementById("sliderText");
const sliderLink = document.getElementById("sliderLink");

let currentIndex = 0;
const totalSlides = dots.length;

const slideContent = [
    {
        category: "RUČNI ALATI",
        title: "Ručni alati",
        text: "Alati za zatezanje, sečenje i zatvaranje traka, pogodni za svakodnevnu upotrebu u pakovanju.",
        link: "rucni-alati.html",
        button: "Pogledaj alate"
    },
    {
        category: "SPOJNICE",
        title: "Metalne spojnice",
        text: "Kvalitetne spojnice za sigurno zatvaranje PP i PET traka, namenjene stabilnom pakovanju robe.",
        link: "spojnice.html",
        button: "Pogledaj spojnice"
    },
    {
        category: "PP TRAKE",
        title: "PP trake",
        text: "Ekonomično rešenje za svakodnevno pakovanje lakše i srednje teške robe.",
        link: "pp-trake.html",
        button: "Pogledaj PP trake"
    },
    {
        category: "PET TRAKE",
        title: "PET trake",
        text: "Snažne i izdržljive trake za teže terete, paletizovanu robu i zahtevnije uslove transporta.",
        link: "pet-trake.html",
        button: "Pogledaj PET trake"
    },
    {
        category: "SPOJNICE",
        title: "Žičane spojnice",
        text: "Praktične spojnice za brzo i čvrsto povezivanje traka bez komplikovanog procesa montaže.",
        link: "zicane-spojnice.html",
        button: "Pogledaj proizvod"
    },
    {
        category: "MAŠINE I ALATI",
        title: "Baterijski alat",
        text: "Praktičan baterijski alat za brzo i efikasno vezivanje PP i PET trakom.",
        link: "baterijski-alat.html",
        button: "Pogledaj proizvod"
    }
];

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

function updateSlider() {
    sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach(function (dot) {
        dot.classList.remove("active");
    });

    dots[currentIndex].classList.add("active");

    updatePanel();
}

nextBtn.addEventListener("click", function () {
    currentIndex++;

    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }

    updateSlider();
});

prevBtn.addEventListener("click", function () {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    }

    updateSlider();
});

dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
        currentIndex = Number(dot.dataset.index);
        updateSlider();
    });
});

updatePanel();
