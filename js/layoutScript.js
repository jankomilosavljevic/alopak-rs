const siteHeader = document.querySelector(".site-header");

function updateHeaderHeight() {
    if (!siteHeader) return;

    const headerHeight = siteHeader.offsetHeight;
    document.documentElement.style.setProperty(
        "--header-height",
        `${headerHeight}px`
    );
}

updateHeaderHeight();

window.addEventListener("resize", updateHeaderHeight);
window.addEventListener("load", updateHeaderHeight);

if (siteHeader) {
    const headerObserver = new ResizeObserver(updateHeaderHeight);
    headerObserver.observe(siteHeader);
}
