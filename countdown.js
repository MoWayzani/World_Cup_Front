// script.js
function countdown() {
    const countToDate = new Date('June 11, 2026 00:00:00').getTime();
    const now = new Date().getTime();
    const difference = countToDate - now;

    const seconds = 1000;
    const minutes = seconds * 60;
    const hours = minutes * 60;
    const days = hours * 24;
    const years = days * 365.25; // Average considering leap years

    document.getElementById('year').innerText = Math.floor(difference / years);
    document.getElementById('day').innerText = Math.floor((difference % years) / days);
    document.getElementById('hour').innerText = Math.floor((difference % days) / hours);
    document.getElementById('minute').innerText = Math.floor((difference % hours) / minutes);
    document.getElementById('second').innerText = Math.floor((difference % minutes) / seconds);

    setTimeout(countdown, 1000);
}

window.onload = countdown;
