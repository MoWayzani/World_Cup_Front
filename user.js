const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

// header container
ScrollReveal().reveal(".header__container p", {
  ...scrollRevealOption,
});

ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
  delay: 500,
});

// about container
ScrollReveal().reveal(".about__image img", {
  ...scrollRevealOption,
  origin: "left",
});

ScrollReveal().reveal(".about__content .section__subheader", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".about__content .section__header", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".about__content .section__description", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".about__btn", {
  ...scrollRevealOption,
  delay: 2000,
});

// room container
ScrollReveal().reveal(".room__card", {
  ...scrollRevealOption,
  interval: 500,
});

// service container
ScrollReveal().reveal(".service__list li", {
  ...scrollRevealOption,
  interval: 500,
  origin: "right",
});
const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

const kickOffWorldCupDate = new Date('2026-11-21 07:00:00')

function zeroLeft (number) {
    return String(number).padStart(2, '0')
}

function diffKickOffDateWorldCup () {
    const currentDate = new Date().getTime()
    return kickOffWorldCupDate.getTime() - currentDate
}

function setCountDown (element, value) {
    document.querySelector(`.${element}`).innerHTML = value
}

function diffDay (diff) {
    return Math.floor(diff / day)
}

function diffHour (diff) {
    const round = Math.floor(diff % day / hour)
    return zeroLeft(round)
}

function diffMinute (diff) {
    const round = Math.floor(diff % hour / minute)
    return zeroLeft(round)
}

function diffSecond (diff) {
    const round = Math.floor(diff % minute / second)
    return zeroLeft(round)
}

function countDown () {
    const diff = diffKickOffDateWorldCup()

    setCountDown('days', diffDay(diff))
    setCountDown('hours', diffHour(diff))
    setCountDown('minutes', diffMinute(diff))
    setCountDown('seconds', diffSecond(diff))
}

window.load = setInterval(countDown, 1000)