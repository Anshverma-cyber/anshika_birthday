var sf = new Snowflakes({ color: "#ffd700", minSize: 20 });

// Name from URL: ?name=Gaurav
var url = new URL(window.location.href);
var name = url.searchParams.get("name") || "Anshika";
name = name.trim() || "Anshika";

document.getElementById("name").textContent = name;
document.getElementById("nae").textContent = name;
document.getElementById("opening-name").textContent = name;
document.getElementById("final-name").textContent = name;

$(".main").hide();

// Start the experience and music after the user interaction.
$("#play").click(function () {
    $(".loader").fadeOut(900);
    $(".main").fadeIn(900);
    sf.destroy();
    $("html, body").animate({ scrollTop: 0 }, 100);
    var audio = $(".song")[0];
    audio.play().catch(function () {});
    startConfetti();
});

new Typed("#typed", {
    stringsElement: "#typed-strings",
    typeSpeed: 35,
    backSpeed: 12,
    backDelay: 1100,
    loop: true
});

// Memories slideshow
var memories = [
    { src: "img/memory-1.jpg", title: "A special moment ❤️", text: "A memory worth keeping close." },
    { src: "img/memory-2.jpg", title: "Good company ✨", text: "Some moments are better when shared." },
    { src: "img/memory-3.jpg", title: "Sweet celebration 🎂", text: "A little celebration and a lot of smiles." },
    { src: "img/memory-4.jpg", title: "Amazing people 💕", text: "Good people, good food, great memories." },
    { src: "img/memory-5.jpg", title: "Unforgettable day 🌊", text: "One more beautiful memory to remember." }
];
var current = 0;
var photo = document.getElementById("memoryPhoto");
var number = document.getElementById("memoryNumber");
var title = document.getElementById("memoryTitle");
var text = document.getElementById("memoryText");
var dots = document.getElementById("dots");

memories.forEach(function (_, i) {
    var dot = document.createElement("button");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", "Go to photo " + (i + 1));
    dot.addEventListener("click", function () { showMemory(i); });
    dots.appendChild(dot);
});

function showMemory(index) {
    current = (index + memories.length) % memories.length;
    photo.classList.add("changing");
    setTimeout(function () {
        var item = memories[current];
        photo.src = item.src;
        photo.alt = item.title;
        number.textContent = String(current + 1).padStart(2, "0") + " / " + String(memories.length).padStart(2, "0");
        title.textContent = item.title;
        text.textContent = item.text;
        document.querySelectorAll(".dot").forEach(function (dot, i) { dot.classList.toggle("active", i === current); });
        photo.onload = function () { photo.classList.remove("changing"); };
        setTimeout(function () { photo.classList.remove("changing"); }, 400);
    }, 180);
}

document.getElementById("prevPhoto").addEventListener("click", function () { showMemory(current - 1); resetSlideshow(); });
document.getElementById("nextPhoto").addEventListener("click", function () { showMemory(current + 1); resetSlideshow(); });
var slideshow = setInterval(function () { showMemory(current + 1); }, 4500);
function resetSlideshow() {
    clearInterval(slideshow);
    slideshow = setInterval(function () { showMemory(current + 1); }, 4500);
}

// Personal message typewriter
var message = "May this year bring you more reasons to smile, more adventures to remember, and plenty of moments that make you genuinely happy. Keep being exactly who you are. ❤️";
var messageEl = document.getElementById("personalMessage");
var messageStarted = false;
function typeMessage() {
    if (messageStarted) return;
    messageStarted = true;
    var i = 0;
    function tick() {
        if (i < message.length) {
            messageEl.textContent += message.charAt(i++);
            setTimeout(tick, 28);
        }
    }
    tick();
}
var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) { if (entry.isIntersecting) typeMessage(); });
}, { threshold: 0.35 });
observer.observe(document.querySelector(".message-section"));

// Final reveal
$("#lastThing").click(function () {
    $(this).fadeOut(250);
    $(".wait-text").text("Okay... THIS is the last thing. 🎉");
    $("#finalReveal").fadeIn(600);
    burstConfetti();
});

// Lightweight confetti burst
function startConfetti() {
    var canvas = document.getElementById("confetti");
    var ctx = canvas.getContext("2d");
    var pieces = [];
    function resize() { canvas.width = window.innerWidth * devicePixelRatio; canvas.height = window.innerHeight * devicePixelRatio; }
    resize(); window.addEventListener("resize", resize);
    for (var i = 0; i < 70; i++) pieces.push(makePiece(true));
    var end = Date.now() + 5000;
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(function (p) { p.y += p.speed; p.x += Math.sin(p.y / 25) * .6; p.r += p.spin; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.color; ctx.fillRect(-3 * devicePixelRatio, -5 * devicePixelRatio, 6 * devicePixelRatio, 10 * devicePixelRatio); ctx.restore(); });
        if (Date.now() < end) requestAnimationFrame(draw); else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    draw();
    function makePiece(randomY) { return { x: Math.random() * canvas.width, y: randomY ? Math.random() * canvas.height : -20, speed: (2 + Math.random() * 4) * devicePixelRatio, r: Math.random() * 6, spin: -.08 + Math.random() * .16, color: ["#df0049", "#00a6e8", "#ffd200", "#7c4dff", "#00c98d"][Math.floor(Math.random()*5)] }; }
}
function burstConfetti() { startConfetti(); }
