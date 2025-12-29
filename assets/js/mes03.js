(() => {
  const CURRENT_MONTH = 3;

  try {
    if (typeof checkMonthAccess === "function") {
      checkMonthAccess(CURRENT_MONTH);
    }
  } catch {}

  document.getElementById("prevMes")?.addEventListener("click", () => {
    window.location.href = "mes02.html";
  });

  document.getElementById("nextMes")?.addEventListener("click", () => {
    if (checkMonthAccess?.(4)) window.location.href = "mes04.html";
  });

  /* ❄️ NEVE */
  function initSnow() {
  const container = document.querySelector(".natal");
  if (!container) return;

  function createSnowflake() {
    const flake = document.createElement("div");
    flake.className = "snowflake";

    flake.style.left = Math.random() * 100 + "%";
    flake.style.animationDuration = 4 + Math.random() * 4 + "s";
    flake.style.opacity = 0.4 + Math.random() * 0.6;
    flake.style.transform = `translateX(${Math.random() * 20 - 10}px)`;

    container.appendChild(flake);

    setTimeout(() => flake.remove(), 9000);
  }

  setInterval(createSnowflake, 120);
}

  /* 🎆 FOGOS */
  function initFireworks() {
    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    }
    resize();
    addEventListener("resize", resize);

    function firework() {
      const x = Math.random()*canvas.width;
      let y = canvas.height;

      const rise = setInterval(() => {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle="gold";
        ctx.beginPath();
        ctx.arc(x,y,3,0,Math.PI*2);
        ctx.fill();
        y -= 12;
        if (y < canvas.height/2) {
          clearInterval(rise);
          explode(x,y);
        }
      },30);
    }

    function explode(x,y) {
      for(let i=0;i<40;i++){
        const a=Math.random()*Math.PI*2;
        const s=Math.random()*4+2;
        let px=x,py=y;
        const id=setInterval(()=>{
          px+=Math.cos(a)*s;
          py+=Math.sin(a)*s;
          ctx.fillStyle=`hsl(${Math.random()*360},100%,60%)`;
          ctx.beginPath();
          ctx.arc(px,py,2,0,Math.PI*2);
          ctx.fill();
        },30);
        setTimeout(()=>clearInterval(id),900);
      }
    }

    setInterval(firework,2000);
  }

  document.addEventListener("DOMContentLoaded", () => {
    initSnow();
    initFireworks();
  });
})();

const text = "Entre luzes, risadas e pequenos detalhes, o Natal ganhou um novo significado.";
const target = document.getElementById("natalTyping");
let index = 0;
let started = false;

function typeText() {
  if (index < text.length) {
    target.textContent += text.charAt(index);
    index++;
    setTimeout(typeText, 45);
  }
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !started) {
      started = true;
      typeText();
    }
  });
}, { threshold: 0.4 });

observer.observe(document.querySelector(".natal"));

function initCarousel(opts = {}) {
  const slidesWrapper = document.querySelector(".slides");
  if (!slidesWrapper) return;

  const slideEls = Array.from(slidesWrapper.querySelectorAll(".slide"));
  if (slideEls.length === 0) return;

  slidesWrapper.style.display = "flex";
  slidesWrapper.style.transition = "transform 0.6s ease";

  slideEls.forEach(s => {
    s.style.flex = "0 0 100%";
  });

  let index = 0;
  const total = slideEls.length;
  let autoplayId = null;
  const autoplayDelay = opts.autoplayDelay || 4500;

  function show(i) {
    index = ((i % total) + total) % total;
    slidesWrapper.style.transform = `translateX(-${index * 100}%)`;
  }

  function next() { show(index + 1); }
  function prev() { show(index - 1); }

  const btnNext = document.getElementById("next");
  const btnPrev = document.getElementById("prev");

  if (btnNext) btnNext.onclick = () => { next(); resetAuto(); };
  if (btnPrev) btnPrev.onclick = () => { prev(); resetAuto(); };

  function startAuto() {
    stopAuto();
    autoplayId = setInterval(next, autoplayDelay);
  }

  function stopAuto() {
    if (autoplayId) clearInterval(autoplayId);
  }

  function resetAuto() {
    stopAuto();
    startAuto();
  }

  show(0);
  startAuto();

  /* swipe */
  let startX = 0;
  let diff = 0;
  let dragging = false;

  slidesWrapper.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    dragging = true;
    stopAuto();
  });

  slidesWrapper.addEventListener("touchmove", e => {
    if (!dragging) return;
    diff = e.touches[0].clientX - startX;
  });

  slidesWrapper.addEventListener("touchend", () => {
    dragging = false;
    if (diff > 50) prev();
    else if (diff < -50) next();
    startAuto();
    diff = 0;
  });
}

function initAudio() {
  const musica = document.getElementById("musica");
  const btnMusica = document.getElementById("music-btn");
  const icon = document.getElementById("icon");

  if (!musica || !btnMusica || !icon) return;

  function sync() {
    if (musica.paused) icon.classList.add("muted");
    else icon.classList.remove("muted");
  }

  btnMusica.addEventListener("click", () => {
    if (musica.paused) {
      musica.play().catch(() => {});
    } else {
      musica.pause();
    }
    sync();
  });

  musica.addEventListener("play", sync);
  musica.addEventListener("pause", sync);

  setTimeout(sync, 50);
}

initAudio();

initCarousel();