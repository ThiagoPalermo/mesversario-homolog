(() => {
    const CURRENT_MONTH = 3;

    // 1. Verificação de Acesso
    try {
        if (typeof checkMonthAccess === "function") {
            checkMonthAccess(CURRENT_MONTH);
        }
    } catch (e) {
        console.error("Erro ao verificar acesso:", e);
    }

    // 2. Navegação entre meses
    document.getElementById("prevMes")?.addEventListener("click", () => {
        window.location.href = "mes02.html";
    });

    document.getElementById("nextMes")?.addEventListener("click", () => {
        if (typeof checkMonthAccess === "function") {
            if (checkMonthAccess(4)) window.location.href = "mes04.html";
        } else {
            window.location.href = "mes04.html";
        }
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
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        const section = document.querySelector(".ano-novo");

        function resize() {
            canvas.width = section.clientWidth;
            canvas.height = section.clientHeight;
        }
        resize();
        window.addEventListener("resize", resize);

        const particles = [];

        function createFirework() {
            const x = Math.random() * canvas.width;
            const y = canvas.height;
            particles.push({
                x, y,
                vy: -8 - Math.random() * 2,
                exploded: false
            });
        }

        function explode(x, y) {
            for (let i = 0; i < 40; i++) {
                particles.push({
                    x, y,
                    vx: Math.cos(i) * (Math.random() * 2.5),
                    vy: Math.sin(i) * (Math.random() * 2.5),
                    life: 60,
                    color: `hsl(${Math.random() * 360}, 100%, 60%)`,
                    exploded: true
                });
            }
        }

        function animate() {
          //  ctx.fillStyle = "rgba(0,0,0,0.2)";
          //  ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                if (!p.exploded) {
                    p.y += p.vy;
                    ctx.fillStyle = "gold";
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
                    ctx.fill();

                    if (p.y < canvas.height * 0.4) {
                        p.exploded = true;
                        explode(p.x, p.y);
                        particles.splice(i, 1);
                    }
                } else {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.life--;
                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                    ctx.fill();
                    if (p.life <= 0) particles.splice(i, 1);
                }
            }
            requestAnimationFrame(animate);
        }
        setInterval(createFirework, 1500);
        animate();
    }

    /* ⌨️ DIGITAÇÃO */
    function initTyping() {
        const text = "Entre luzes, risadas e pequenos detalhes, o Natal ganhou um novo significado.";
        const target = document.getElementById("natalTyping");
        if (!target) return;

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
    }

    /* 🎡 CARROSSEL */
    function initCarousel() {
        const slidesWrapper = document.querySelector(".slides");
        const btnNext = document.getElementById("next");
        const btnPrev = document.getElementById("prev");
        if (!slidesWrapper) return;

        let index = 0;
        const slides = slidesWrapper.querySelectorAll(".slide");
        const total = slides.length;

        function show(i) {
            index = (i + total) % total;
            slidesWrapper.style.transform = `translateX(-${index * 100}%)`;
        }

        btnNext.onclick = () => show(index + 1);
        btnPrev.onclick = () => show(index - 1);

        // Auto-play
        setInterval(() => show(index + 1), 5000);
    }

    /* 🎵 ÁUDIO */
    function initAudio() {
        const musica = document.getElementById("musica");
        const btnMusica = document.getElementById("music-btn");
        const icon = document.getElementById("icon");

        if (!musica || !btnMusica || !icon) return;

        const sync = () => {
            icon.classList.toggle("muted", musica.paused);
        };

        btnMusica.onclick = () => {
            musica.paused ? musica.play() : musica.pause();
            sync();
        };

        musica.onplay = sync;
        musica.onpause = sync;
    }

    // Inicializa tudo ao carregar
    initSnow();
    initFireworks();
    initTyping();
    initCarousel();
    initAudio();

})();