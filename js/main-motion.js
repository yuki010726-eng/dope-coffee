/* ---------- 페이지 모션 (메인·도프커피 이야기·가맹안내 공통) ----------
   - [data-lines]   : 제목을 <br> 단위 줄로 나눠 아래에서 차례로 올라오게
   - [data-letters] : 글자 단위로 나눠 첫 화면에서 한 자씩 솟아오르게
   - .rv / [data-rv] / [data-clip] / [data-stagger] : 화면에 들어올 때 나타남 (.in)
   - [data-count]   : 화면에 들어오면 data-from 에서 목표 숫자까지 올라감 (자리수는 글자 길이 유지)
   - [data-drift]   : 스크롤 진행도(--drift 0~1)에 따라 가로로 흐름
   - [data-scrub]   : 요소가 화면을 지나는 진행도(--p 0~1). 안쪽 [data-step]은 진행도를 넘으면 .on
   - [data-hscroll] : 세로 스크롤을 가로 이동(--x)으로 바꾸는 고정 구간 (1024px 초과에서만)
   - .hero          : 스크롤에 따라 사진 확대·글자 시차 (--hp)
   - [data-pin]     : 고정 구간 진행도에 따라 재료 층이 벌어지고 현재 층 강조 */
(() => {
  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ease = t => 1 - Math.pow(1 - t, 3);
  const wide = () => innerWidth > 1024;

  document.querySelectorAll('[data-lines]').forEach(el => {
    el.innerHTML = el.innerHTML.split(/<br\s*\/?>/i)
      .map((t, i) => `<span class="ln"><span style="--i:${i}">${t.trim()}</span></span>`).join('');
  });
  document.querySelectorAll('[data-letters]').forEach(el => {
    el.innerHTML = [...el.textContent].map((ch, i) => `<span style="--i:${i}">${ch === ' ' ? '&nbsp;' : ch}</span>`).join('');
  });
  document.querySelectorAll('[data-stagger]').forEach(el => [...el.children].forEach((c, i) => c.style.setProperty('--i', i)));

  // 숫자 올라가기
  const count = el => {
    const to = +el.dataset.count, from = +(el.dataset.from || 0), len = el.textContent.trim().length, t0 = performance.now();
    const pad = v => String(Math.round(v)).padStart(len, '0');
    if (REDUCE) { el.textContent = pad(to); return; }
    const tick = now => {
      const k = ease(clamp((now - t0) / 1600));
      el.textContent = pad(from + (to - from) * k);
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const targets = document.querySelectorAll('.rv, [data-rv], [data-lines], [data-clip], [data-stagger], [data-letters], [data-count]');
  const show = el => { el.classList.add('in'); if (el.dataset.count) count(el); };
  if (REDUCE) targets.forEach(show);
  else {
    const io = new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting) { show(en.target); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -10% 0px' });
    targets.forEach(el => io.observe(el));
  }

  const hero = document.querySelector('.hero');
  const drifts = [...document.querySelectorAll('[data-drift]')];
  const scrubs = [...document.querySelectorAll('[data-scrub]')];
  const hscrolls = [...document.querySelectorAll('[data-hscroll]')];
  const pin = document.querySelector('[data-pin]');
  const layerSvg = pin?.querySelector('svg');
  const mats = pin ? [...pin.querySelectorAll('[data-mat]')] : [];

  function frame() {
    ticking = false;
    const vh = innerHeight;
    if (hero) hero.style.setProperty('--hp', clamp(scrollY / hero.offsetHeight).toFixed(3));
    drifts.forEach(el => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--drift', clamp((vh - r.top) / (vh + r.height)).toFixed(3));
    });
    scrubs.forEach(el => {
      const r = el.getBoundingClientRect();
      const p = REDUCE ? 1 : clamp((vh * .78 - r.top) / Math.max(1, r.height));
      el.style.setProperty('--p', p.toFixed(3));
      const steps = el.querySelectorAll('[data-step]');
      steps.forEach((s, i) => s.classList.toggle('on', p >= (i + .35) / steps.length));
    });
    hscrolls.forEach(el => {
      const track = el.querySelector('.track');
      if (!track) return;
      if (!wide() || REDUCE) { track.style.removeProperty('--x'); return; }
      const r = el.getBoundingClientRect();
      const p = clamp(-r.top / Math.max(1, r.height - vh));
      track.style.setProperty('--x', `${(-(track.scrollWidth - innerWidth) * p).toFixed(1)}px`);
      el.style.setProperty('--p', p.toFixed(3));
    });
    if (pin && layerSvg) {
      let open = 1, active = -1;
      if (wide() && !REDUCE) {
        const r = pin.getBoundingClientRect();
        const p = clamp(-r.top / Math.max(1, r.height - vh));
        open = ease(clamp(p / .42));
        if (p > .42) active = 4 - Math.min(4, Math.floor((p - .42) / .116));
      }
      layerSvg.style.setProperty('--open', open.toFixed(3));
      layerSvg.querySelectorAll('.layer').forEach(g => g.classList.toggle('dim', active >= 0 && +g.dataset.layer !== active));
      mats.forEach(m => m.classList.toggle('on', active < 0 || +m.dataset.mat === active));
    }
  }
  // 가로 스크롤 구간 높이 = 트랙 길이만큼
  const sizeH = () => hscrolls.forEach(el => {
    const track = el.querySelector('.track');
    el.style.height = wide() && !REDUCE && track ? `${track.scrollWidth - innerWidth + innerHeight}px` : '';
  });
  let ticking = false;
  const request = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  addEventListener('scroll', request, { passive: true });
  addEventListener('resize', () => { sizeH(); request(); });
  addEventListener('load', () => { sizeH(); request(); });
  sizeH();
  frame();
})();
