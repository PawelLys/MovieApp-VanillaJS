// Sticky nav
window.addEventListener('scroll', () => {
    let heightY = document.querySelector(`.movie-intro`).offsetTop * .9;

    if(this.oldScroll < scrollY && scrollY > heightY)
        document.querySelector(`.header__nav`).classList.add(`sticky`);
    else document.querySelector(`.header__nav`).classList.remove(`sticky`);
    this.oldScroll = scrollY;
});


// Smooth scrolling
document.querySelector(`.header__main__btn-start`).addEventListener(`click`, runScroll);

function runScroll() {
    const destination = document.querySelector(`.movie-app`).offsetTop * .96;
    scrollTo(document.documentElement, destination, 50);
}

// Smooth scrolling 2nd button
document.querySelector(`.header__main__btn-last`).addEventListener(`click`, runScroll2);

function runScroll2() {
    const destination = document.querySelector(`.shop`).offsetTop * 0.98;
    scrollTo(document.documentElement, destination, 70);
}

// Funkcja scrollTo
function scrollTo(element, to, duration) {
    if (duration <= 0) return;
    let difference = to - element.scrollTop;
    let perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}
