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

    setInterval(() => {
      const flake = document.createElement("div");
      flake.style.cssText = `
        position:absolute;
        top:-10px;
        left:${Math.random()*100}%;
        width:${Math.random()*4+2}px;
        height:${Math.random()*4+2}px;
        background:white;
        border-radius:50%;
        opacity:${Math.random()};
        animation: snowFall ${6+Math.random()*4}s linear;
      `;
      container.appendChild(flake);
      setTimeout(() => flake.remove(), 10000);
    }, 120);
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