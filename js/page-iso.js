/* ---------- 도프커피 이야기·가맹안내 아이소메트릭 그래픽 (그리기 도구는 js/store-iso.js의 DPCIso) ----------
   - svg[data-roaster]     : 드럼 로스터 + 호퍼 + 쿨링 트레이(교반 막대가 돈다) + 생두 자루
   - svg[data-store-city]  : 직영 매장 블록. [data-store-i] 목록에 마우스를 올리면 해당 건물이 솟는다
   - svg[data-plan]        : 메뉴 구성별 카운터 (COFFEE / DESSERT / ICECREAM). 빠진 장비 자리는 점선
   - svg[data-model-plan]  : 가맹 모델 평면 (store / spot / convert)
   - svg[data-store-kit]   : 가맹안내 첫 화면. 매장 패키지가 순서대로 조립된다
   - svg[data-store-map]   : 서울 점지도 위 직영 매장 핀. [data-map-i] 목록에 올리면 핀 강조
   화면에 들어오면 svg에 .in 이 붙는다 */
(() => {
  if (!window.DPCIso) return;
  const { scene, label, COL, SHINE, espresso, grinder, showcase, softServe } = window.DPCIso;
  const C = Math.cos(Math.PI / 6), S = .5;
  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const onView = (el, fn, threshold = .25) => {
    if (REDUCE) { fn(); return; }
    const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { fn(); io.disconnect(); } }, { threshold });
    io.observe(el);
  };
  const SLAT = [['#2E4B74', '#27426A'], ['#223A5C', '#1D3352']];
  const STONE = ['url(#isoStone)', '#E2E0DB', '#D2CFC9'];

  // 누운 원기둥: axis 방향으로 a0→a1, 단면 중심 (c, cz). a1 쪽 끝면이 보인다
  function tube(s, axis, a0, a1, c, cz, r, side, face) {
    const { P, poly, line } = s;
    const ring = a => Array.from({ length: 40 }, (_, i) => {
      const t = i / 40 * Math.PI * 2, u = c + Math.cos(t) * r, z = cz + Math.sin(t) * r;
      return axis === 'x' ? P(a, u, z) : P(u, a, z);
    });
    const b = ring(a0), e = ring(a1), n = axis === 'x' ? [-S, C] : [S, C];
    const d = p => p[0] * n[0] + p[1] * n[1];
    const hi = l => l.reduce((m, p) => (d(p) > d(m) ? p : m)), lo = l => l.reduce((m, p) => (d(p) < d(m) ? p : m));
    poly(b, side, 'stroke="none"');
    poly([hi(b), hi(e), lo(e), lo(b)], side, 'stroke="none"');
    line(hi(b), hi(e), 'stroke="rgba(14,26,48,.25)" stroke-width=".8"');
    line(lo(b), lo(e), 'stroke="rgba(14,26,48,.25)" stroke-width=".8"');
    poly(e, face);
  }
  // 바닥에 눕혀 쓴 글자
  function floorText(s, x, y, z, txt, size, fill, weight = 800) {
    const p = s.P(x, y, z);
    s.add(`<text transform="matrix(${C.toFixed(4)} ${S} ${(-C).toFixed(4)} ${S} ${s.f(p[0])} ${s.f(p[1])})" text-anchor="middle" font-family="Red Hat Display, sans-serif" font-size="${size}" font-weight="${weight}" letter-spacing="2" fill="${fill}">${txt}</text>`);
  }
  // 비어 있는 장비 자리
  function emptySlot(s, x, y, z, w, d, txt) {
    const { P, poly } = s;
    poly([P(x, y, z), P(x + w, y, z), P(x + w, y + d, z), P(x, y + d, z)], 'rgba(14,26,48,.04)', 'stroke="#8E97A3" stroke-width="1" stroke-dasharray="4 4"');
    floorText(s, x + w / 2, y + d / 2 + .08, z, txt, s.U * .32, '#8E97A3', 700);
  }
  // 슬랫 카운터 (길이 L, 깊이 D)
  function counter(s, x, y, L, D, H = 2) {
    const { box, slats, line, P } = s;
    box(x + .1, y + .1, 0, L - .2, D - .2, .2, COL.dark);
    box(x, y, .2, L, D, H - .2, COL.blue);
    slats('y', y + D, x, x + L, .2, H, SLAT[0]);
    slats('x', x + L, y, y + D, .2, H, SLAT[1]);
    box(x - .06, y - .06, H, L + .12, D + .12, .16, STONE);
    line(P(x - .06, y + D + .06, H + .16), P(x + L + .06, y + D + .06, H + .16), SHINE);
  }

  /* ---------- 드럼 로스터 ---------- */
  function roaster(svg) {
    const U = 48, s = scene(svg, U);
    const { P, box, cyl, cone, disc, panel, faceText, line, poly, add, f } = s;
    s.ink = '#FFFFFF'; s.sub = '#B9C0C9';
    const sc = P(1.2, 2.2, 0);
    add(`<ellipse cx="${f(sc[0])}" cy="${f(sc[1] + 10)}" rx="${f(4.2 * U)}" ry="${f(1.2 * U)}" fill="rgba(0,0,0,.35)" filter="url(#isoSoft)"/>`);
    // 굴뚝 (뒤)
    cyl(.4, .3, 1.2, .17, 2.7, 'url(#isoSteelL)', '#AEB6BF');
    cyl(.4, .3, 3.9, .24, .12, '#2E343E', '#4A5260');
    // 받침 캐비닛
    box(0, 0, 0, 2.6, 1.6, 1.2, COL.warm);
    panel('y', 1.6, .08, 2.52, .95, 1.1, '#2E4B74');
    panel('y', 1.6, .2, 1.25, .15, .82, 'rgba(14,26,48,.06)', 'stroke="rgba(14,26,48,.18)" stroke-width=".8"');
    panel('y', 1.6, 1.35, 2.4, .15, .82, 'rgba(14,26,48,.06)', 'stroke="rgba(14,26,48,.18)" stroke-width=".8"');
    for (let i = 0; i < 5; i++) line(P(2.6, .25, .3 + i * .1), P(2.6, 1.3, .3 + i * .1), 'stroke="rgba(14,26,48,.22)" stroke-width="1"');
    // 드럼 + 앞판 + 문
    tube(s, 'y', .1, 1.7, 1.3, 1.95, .68, 'url(#isoSteelL)', '#C3C9D0');
    tube(s, 'y', 1.7, 1.86, 1.3, 1.95, .78, '#16253F', '#22355A');
    disc('y', 1.861, 1.3, 1.95, .52, 'url(#isoSteelT)');
    disc('y', 1.862, 1.3, 2.02, .2, '#4A2E22', 'stroke="#0E1A30" stroke-width="1.2"');
    line(P(1.18, 1.862, 2.1), P(1.24, 1.862, 2.16), 'stroke="rgba(255,255,255,.6)" stroke-width="1.2" stroke-linecap="round"');
    line(P(.95, 1.95, 1.68), P(1.65, 1.95, 1.68), 'stroke="#22272F" stroke-width="4" stroke-linecap="round"');
    box(1.86, 1.86, 2.28, .3, .07, .07, COL.dark);
    // 호퍼 + 원두
    cyl(1.3, .75, 2.58, .12, .22, '#3A414C', '#4A5260');
    cone(1.3, .75, 2.8, .13, .36, .3, '#5A3A28', '#6E4A34');
    cone(1.3, .75, 2.8, .14, .52, .62, 'url(#isoGlass)', 'rgba(255,255,255,.12)', 'stroke="rgba(255,255,255,.85)" stroke-width="1"');
    // 제어반
    box(2.8, .25, 0, .55, 1.0, 2.35, COL.navy);
    panel('y', 1.25, 2.86, 3.29, 1.6, 2.05, '#0E1A30', 'stroke="rgba(255,255,255,.3)" stroke-width=".6"');
    faceText('y', 1.25, 3.07, 1.88, '205°C', U * .11, '#9FE3C1', 700);
    [2.95, 3.2].forEach(u => { disc('y', 1.251, u, 1.25, .1, '#F6F7F9', 'stroke="#0E1A30" stroke-width="1"'); line(P(u, 1.251, 1.25), P(u + .05, 1.251, 1.31), 'stroke="#C9473D" stroke-width="1.1"'); });
    line(P(2.8, 1.25, 2.35), P(3.35, 1.25, 2.35), SHINE);
    // 쿨링 트레이 + 원두 + 교반 막대
    cyl(1.3, 2.95, 0, .26, .74, '#2E343E', '#4A5260');
    cyl(1.3, 2.95, .74, 1.02, .26, 'url(#isoSteelL)', '#5A3A28');
    for (let i = 0; i < 150; i++) {
      const a = i * 2.39996, rr = Math.sqrt((i + .5) / 150) * .92, p = P(1.3 + Math.cos(a) * rr, 2.95 + Math.sin(a) * rr, 1.0);
      add(`<ellipse cx="${f(p[0])}" cy="${f(p[1])}" rx="2.4" ry="1.5" fill="${['#6E4630', '#7E5238', '#5E3A26'][i % 3]}"/>`);
    }
    const hub = P(1.3, 2.95, 1.04);
    add(`<g class="arms"><line class="arm" x1="${f(hub[0])}" y1="${f(hub[1])}" x2="${f(hub[0])}" y2="${f(hub[1])}" stroke="#C3C9D0" stroke-width="3" stroke-linecap="round"/><line class="arm" x1="${f(hub[0])}" y1="${f(hub[1])}" x2="${f(hub[0])}" y2="${f(hub[1])}" stroke="#C3C9D0" stroke-width="3" stroke-linecap="round"/></g>`);
    cyl(1.3, 2.95, 1.0, .08, .14, '#22272F', '#3A414C');
    // 배출 슈트
    poly([P(1.12, 1.86, 1.42), P(1.48, 1.86, 1.42), P(1.6, 2.35, 1.08), P(1.0, 2.35, 1.08)], 'url(#isoSteelT)');
    // 생두 자루
    s.shadow(-1.45, 2.15, 0, .9, .9);
    cone(-1.0, 2.6, 0, .44, .38, .66, '#CDB892', '#BCA67E');
    cone(-1.0, 2.6, .66, .32, .07, .22, '#C2AD86', null);
    [[-.3, 3.3], [-.15, 3.45], [-.4, 3.55], [-.05, 3.25]].forEach(([x, y]) => { const p = P(x, y, 0); add(`<ellipse cx="${f(p[0])}" cy="${f(p[1])}" rx="3" ry="1.8" fill="#9BA86A"/>`); });
    // 김
    const top = P(.4, .3, 4.1);
    [0, 1, 2].forEach(i => add(`<circle class="puff" cx="${f(top[0] + (i - 1) * 6)}" cy="${f(top[1] - 6)}" r="${8 + i * 3}" fill="rgba(255,255,255,.18)" style="--d:${i * .9}s"/>`));
    s.grow(top[0], top[1] - 70);

    const modelBox = s.bounds();
    label(s, [1.3, 1.86, 2.5], [70, -160], 'Drum Roaster', '직화식 드럼 로스터', 'class="lab"');
    label(s, [1.3, .75, 3.4], [80, -40], 'Hopper', '생두 투입 호퍼', 'class="lab"');
    label(s, [2.2, 3.4, 1.0], [140, 30], 'Cooling Tray', '쿨링 트레이', 'class="lab"');
    label(s, [-1.0, 2.6, .8], [20, 130], 'Green Bean', '생두', 'class="lab"');
    s.finish(16);
    const fullBox = svg.getAttribute('viewBox');
    const fit = () => svg.setAttribute('viewBox', innerWidth <= 1024 ? s.viewBox(modelBox, 12) : fullBox);
    fit(); addEventListener('resize', fit);

    // 교반 막대 회전 (보일 때만)
    const arms = [...svg.querySelectorAll('.arm')];
    let t = 0, run = false;
    const tick = () => {
      if (!run) return;
      t += .018;
      arms.forEach((a, i) => {
        const e = P(1.3 + Math.cos(t + i * Math.PI) * .9, 2.95 + Math.sin(t + i * Math.PI) * .9, 1.04);
        a.setAttribute('x2', e[0].toFixed(1)); a.setAttribute('y2', e[1].toFixed(1));
      });
      requestAnimationFrame(tick);
    };
    const place = () => { run = true; tick(); run = !REDUCE; };
    new IntersectionObserver(([en]) => { if (en.isIntersecting && !run) place(); else if (!en.isIntersecting) run = false; }).observe(svg);
    onView(svg, () => svg.classList.add('in'));
  }

  /* ---------- 직영 매장 블록 ---------- */
  function city(svg) {
    const U = 24, s = scene(svg, U);
    const { P, box, panel, faceText, line, add, group, f } = s;
    const names = (typeof STORES !== 'undefined' ? STORES : []).map(st => st.name);
    const N = Math.min(8, names.length || 8), H = [2.3, 1.5, 2.9, 1.9, 1.6, 2.5, 1.3, 2.1];
    const X = i => (i % 4) * 2.6, Y = i => Math.floor(i / 4) * 2.9;
    box(-.7, -.7, -.3, 4 * 2.6 + .5, 2 * 2.9 + .6, .3, COL.gray);
    line(P(-.7, 2.35, 0), P(10.2, 2.35, 0), 'stroke="#FFFFFF" stroke-width="2" stroke-dasharray="10 8"');
    for (let k = 0; k < 4; k++) line(P(k * 2.6 + 2.1, -.7, 0), P(k * 2.6 + 2.1, 5.7, 0), 'stroke="rgba(255,255,255,.6)" stroke-width="1"');
    [...Array(N).keys()].forEach(i => {
      const x = X(i), y = Y(i), w = 1.7, d = 1.7, h = H[i];
      group(`class="bld" data-i="${i}" style="--i:${i}"`, () => {
        s.shadow(x, y, 0, w, d, .08);
        box(x, y, 0, w, d, h, COL.white);
        for (let z = 1.55; z < h - .2; z += .45) {
          panel('y', y + d, x + .2, x + w - .2, z, z + .25, '#D6DCE4');
          panel('x', x + w, y + .25, y + d - .25, z, z + .25, '#C9D0D9');
        }
        panel('y', y + d, x + .15, x + w - .15, .05, .95, '#2A3B5C');
        line(P(x + w * .55, y + d, .05), P(x + w * .55, y + d, .95), 'stroke="rgba(255,255,255,.5)" stroke-width="1"');
        box(x - .02, y + d, .98, w + .04, .22, .1, COL.blue);
        panel('y', y + d, x + .1, x + w - .1, 1.1, 1.42, '#2E4B74');
        faceText('y', y + d, x + w / 2, 1.18, 'dpc', U * .22, '#FFFFFF');
        line(P(x, y + d, h), P(x + w, y + d, h), SHINE);
        const t = P(x + w / 2, y + d / 2, h);
        add(`<g class="tag"><line x1="${f(t[0])}" y1="${f(t[1])}" x2="${f(t[0])}" y2="${f(t[1] - 26)}" stroke="#0E1A30" stroke-width="1"/><rect x="${f(t[0] - 15)}" y="${f(t[1] - 44)}" width="30" height="18" rx="9" fill="#0E1A30"/><text x="${f(t[0])}" y="${f(t[1] - 31)}" text-anchor="middle" font-family="Red Hat Display, sans-serif" font-size="10" font-weight="800" fill="#FFFFFF">${String(i + 1).padStart(2, '0')}</text></g>`);
        s.grow(t[0], t[1] - 50);
      });
    });
    s.finish(14);
    onView(svg, () => svg.classList.add('in'));
    const set = i => svg.querySelectorAll('.bld').forEach(g => g.classList.toggle('hi', +g.dataset.i === i));
    document.addEventListener('mouseover', e => { const li = e.target.closest('[data-store-i]'); set(li ? +li.dataset.storeI : -1); });
  }

  /* ---------- 메뉴 구성별 카운터 ---------- */
  function plan(svg) {
    const on = new Set(svg.dataset.plan.split(/\s+/)), U = 22, s = scene(svg, U), Z = 2.16;
    const { P } = s;
    const sh = P(3.5, 1.4, 0);
    s.add(`<ellipse cx="${s.f(sh[0])}" cy="${s.f(sh[1] + 8)}" rx="${s.f(4.6 * U)}" ry="${s.f(.9 * U)}" fill="rgba(14,26,48,.25)" filter="url(#isoSoft)"/>`);
    counter(s, 0, 0, 7.1, 1.6, Z);
    s.group('class="eqs"', () => {
      if (on.has('DESSERT')) showcase(s, .25, .15, Z + .16); else emptySlot(s, .25, .15, Z + .16, 2.5, 1.25, 'DESSERT');
      espresso(s, 2.95, .2, Z + .16);
      grinder(s, 5.05, .3, Z + .16);
      if (on.has('ICECREAM')) softServe(s, 5.85, .2, Z + .16); else emptySlot(s, 5.85, .2, Z + .16, 1.0, 1.05, 'ICE');
    });
    [P(-.1, -.1, Z + 1.95), P(7.2, -.1, Z + 1.95), P(7.2, 1.8, 0), P(-.1, 1.8, 0)];
    s.finish(10);
    onView(svg, () => svg.classList.add('in'));
  }

  /* ---------- 가맹 모델 평면 ---------- */
  function model(svg) {
    const kind = svg.dataset.modelPlan, U = 24, s = scene(svg, U);
    const { P, box, cyl, panel, faceText, line, group } = s;
    const table = (x, y) => { cyl(x, y, .12, .16, .02, '#9AA2AC', '#C3C9D0'); box(x - .03, y - .03, .14, .06, .06, .62, COL.dark); cyl(x, y, .76, .36, .05, COL.wood[1], COL.wood[0]); };
    const stool = (x, y) => { box(x - .02, y - .02, .12, .04, .04, .4, COL.dark); cyl(x, y, .52, .15, .05, COL.wood[1], COL.wood[0]); };
    if (kind === 'spot') {
      box(0, 0, 0, 7.2, 5.2, .12, ['#ECEEF1', '#D9DDE2', '#C9CED5']);
      for (let i = .9; i < 7.2; i += .9) line(P(i, 0, .12), P(i, 5.2, .12), 'stroke="rgba(14,26,48,.06)"');
      for (let j = .9; j < 5.2; j += .9) line(P(0, j, .12), P(7.2, j, .12), 'stroke="rgba(14,26,48,.06)"');
      ['#E2574C', '#F2B33D', '#5FA8D3', '#8CC084', '#C9B6E0', '#E2574C', '#F2B33D'].forEach((c, i) => {   // 캡슐 토이 기계
        const x = .4 + i * .92;
        box(x, .3, .12, .7, .6, .55, COL.white);
        box(x + .05, .35, .67, .6, .5, .5, ['rgba(236,242,250,.7)', 'rgba(200,216,236,.6)', 'rgba(190,205,225,.6)']);
        cyl(x + .35, .6, 1.17, .28, .12, c, c);
        panel('y', .9, x + .25, x + .45, .3, .45, c);
      });
      box(.3, 2.0, .12, .6, 2.6, 1.4, COL.gray);
      group('class="new"', () => {
        const kx = 2.6, ky = 2.5;
        s.poly([P(kx - .5, ky - .5, .121), P(kx + 2.9, ky - .5, .121), P(kx + 2.9, ky + 2.0, .121), P(kx - .5, ky + 2.0, .121)], 'rgba(46,75,116,.08)', 'stroke="#2E4B74" stroke-width="1.2" stroke-dasharray="5 4"');
        floorText(s, kx + 1.2, ky + 1.75, .121, 'DOPE SPOT', U * .34, '#2E4B74');
        counter(s, kx, ky, 2.4, 1.0, 1.0);
        espresso(s, kx + .2, ky + .05, 1.16);
      });
    } else {
      const old = kind === 'convert';
      const wall = old ? ['#E4E6E9', '#D4D8DD', '#C6CBD2'] : COL.warm;
      box(0, 0, 0, 6.4, 4.8, .12, old ? COL.gray : ['#ECEAE6', '#DCD9D3', '#CFCBC4']);
      box(0, 0, .12, .14, 4.8, 2.3, wall);
      box(.14, 0, .12, 6.26, .14, 2.3, wall);
      panel('y', .141, 4.2, 5.8, .9, 1.9, '#CBD3DD', 'stroke="#FFFFFF" stroke-width="1.4"');
      if (old) {                                                                        // 기존 집기는 그대로 둔다
        box(.14, 2.2, .12, .55, 2.2, .45, ['#C8CCD2', '#B3B9C1', '#A5ACB5']);
        table(2.4, 3.6); stool(1.8, 3.6); stool(3.0, 3.6);
        table(4.6, 3.6); stool(4.0, 3.6); stool(5.2, 3.6);
      } else {
        box(.14, 2.2, .12, .6, 2.3, .45, COL.woodD);
        box(.14, 2.2, .57, .6, 2.3, .06, COL.wood);
        table(2.2, 3.4); stool(1.6, 3.4); stool(2.8, 3.4);
        table(4.4, 3.4); stool(3.8, 3.4); stool(5.0, 3.4);
      }
      group(`class="${old ? 'new' : ''}"`, () => {
        panel('y', .142, 1.0, 3.6, 1.45, 2.05, '#2E4B74');
        faceText('y', .142, 2.3, 1.6, 'dpc', U * .4, '#FFFFFF');
        counter(s, .8, .6, 3.6, 1.0, 1.0);
        espresso(s, 1.1, .65, 1.16);
        grinder(s, 3.3, .7, 1.16);
      });
    }
    s.finish(10);
    onView(svg, () => svg.classList.add('in'));
  }

  /* ---------- 매장 패키지: 바닥 → 벽 → 사인 → 카운터 → 장비 → 좌석 순서로 조립 ---------- */
  function kit(svg) {
    const U = 46, s = scene(svg, U);
    const { P, box, cyl, cone, panel, faceText, line, group, add, f } = s;
    s.ink = '#FFFFFF'; s.sub = '#B9C0C9';
    const step = (d, draw) => group(`class="k" style="--d:${d}s"`, draw);
    const sc = P(3.6, 2.8, 0);
    add(`<ellipse cx="${f(sc[0])}" cy="${f(sc[1] + 14)}" rx="${f(5.4 * U)}" ry="${f(1.6 * U)}" fill="rgba(0,0,0,.4)" filter="url(#isoSoft)"/>`);
    step(0, () => {                                                                      // 바닥
      box(0, 0, 0, 7.2, 5.4, .16, ['#ECEAE6', '#D9D6D0', '#C9C5BE']);
      for (let i = .9; i < 7.2; i += .9) line(P(i, 0, .16), P(i, 5.4, .16), 'stroke="rgba(14,26,48,.07)"');
      for (let j = .9; j < 5.4; j += .9) line(P(0, j, .16), P(7.2, j, .16), 'stroke="rgba(14,26,48,.07)"');
    });
    step(.18, () => {                                                                    // 벽 + 창
      box(0, 0, .16, .16, 5.4, 2.9, COL.warm);
      box(.16, 0, .16, 7.04, .16, 2.9, COL.warm);
      panel('x', .161, 2.9, 4.8, 1.0, 2.35, '#CBD3DD', 'stroke="#FFFFFF" stroke-width="1.4"');
      line(P(.161, 3.85, 1.0), P(.161, 3.85, 2.35), 'stroke="#FFFFFF" stroke-width="1.2"');
    });
    step(.36, () => {                                                                    // 사인 + 메뉴보드
      panel('y', .161, 1.0, 3.4, 2.05, 2.75, '#2E4B74');
      faceText('y', .161, 2.2, 2.25, 'dpc', U * .44, '#FFFFFF');
      panel('y', .161, 3.9, 6.2, 1.55, 2.6, '#16253F', 'stroke="rgba(255,255,255,.25)" stroke-width=".8"');
      [0, 1, 2, 3].forEach(i => line(P(4.15, .161, 2.35 - i * .22), P(5.3 - (i % 2) * .4, .161, 2.35 - i * .22), 'stroke="rgba(255,255,255,.55)" stroke-width="1.6" stroke-linecap="round"'));
    });
    step(.54, () => counter(s, .8, .75, 5.8, 1.1, 1.0));                                // 슬랫 카운터
    step(.72, () => {                                                                    // 장비
      espresso(s, 1.0, .8, 1.16);
      grinder(s, 3.08, .9, 1.16);
      showcase(s, 3.75, .82, 1.16);
    });
    step(.9, () => {                                                                     // 좌석
      box(.16, 2.6, .16, .62, 2.5, .48, COL.woodD);
      box(.16, 2.6, .64, .62, 2.5, .07, COL.wood);
      const table = (x, y) => { cyl(x, y, .16, .2, .02, '#9AA2AC', '#C3C9D0'); box(x - .035, y - .035, .18, .07, .07, .7, COL.dark); cyl(x, y, .88, .42, .06, COL.wood[1], COL.wood[0]); };
      const stool = (x, y) => { box(x - .025, y - .025, .16, .05, .05, .44, COL.dark); cyl(x, y, .6, .17, .06, COL.wood[1], COL.wood[0]); };
      table(2.0, 3.4); stool(2.75, 3.4); table(2.0, 4.6); stool(2.75, 4.6);
      table(4.2, 3.6); stool(3.5, 4.3); stool(4.95, 3.6); table(5.9, 4.4); stool(5.9, 3.65);
      cyl(6.6, .7, .16, .24, .42, '#E1E4E8', '#F4F6F8');
      const lp = P(6.6, .7, .8);
      [[-10, 2, 17, 11, '#58745A'], [9, -5, 15, 10, '#4E6A52'], [0, -15, 13, 10, '#6E8B6A']].forEach(([dx, dy, rx, ry, c]) =>
        add(`<ellipse cx="${f(lp[0] + dx)}" cy="${f(lp[1] + dy)}" rx="${rx}" ry="${ry}" fill="${c}"/>`));
    });
    step(1.08, () => [2.0, 3.8, 5.6].forEach(x => {                                     // 펜던트 조명
      line(P(x, 1.3, 3.06), P(x, 1.3, 2.35), 'stroke="#8E97A3" stroke-width="1"');
      cone(x, 1.3, 2.12, .22, .06, .24, '#16253F', '#2E4B74');
      const g = P(x, 1.3, 2.1);
      add(`<ellipse cx="${f(g[0])}" cy="${f(g[1])}" rx="7" ry="4" fill="#FFF3D6"/>`);
    }));
    const modelBox = s.bounds();
    label(s, [2.2, .16, 2.75], [-160, -150], 'Sign', '브랜드 사인 · 메뉴보드', 'class="lab"');
    label(s, [3.0, 1.85, .7], [-200, 140], 'Slat Counter', '딥블루 슬랫 카운터', 'class="lab"');
    label(s, [2.0, .9, 2.25], [130, -120], 'Machine Set', '에스프레소 · 그라인더 · 쇼케이스', 'class="lab"');
    label(s, [5.9, 4.4, .95], [190, 80], 'Seating', '우드 좌석', 'class="lab"');
    s.finish(16);
    const fullBox = svg.getAttribute('viewBox');
    const fit = () => svg.setAttribute('viewBox', innerWidth <= 1024 ? s.viewBox(modelBox, 10) : fullBox);
    fit(); addEventListener('resize', fit);
    onView(svg, () => svg.classList.add('in'), .2);
  }

  /* ---------- 직영 매장 지도: 서울 점지도 + 한강 + 매장 핀, 상암 DMC는 확대 렌즈 ----------
     서울 경계·한강은 위경도를 단순화한 근사선. 매장 위치는 js/stores-data.js 의 lat·lng */
  function storeMap(svg) {
    const stores = (typeof STORES !== 'undefined' ? STORES : []).map((st, i) => ({ ...st, i })).filter(st => st.lat);
    const K = 17, X = ln => (ln - 126.755) * 88.2 * K, Y = la => (37.725 - la) * 111 * K, pt = ([la, ln]) => [X(ln), Y(la)];
    const SEOUL = [[37.585, 126.765], [37.603, 126.795], [37.640, 126.858], [37.656, 126.900], [37.676, 126.934], [37.700, 126.985], [37.716, 127.025], [37.690, 127.090],
      [37.640, 127.115], [37.600, 127.110], [37.576, 127.122], [37.556, 127.146], [37.561, 127.180], [37.530, 127.182], [37.500, 127.160], [37.466, 127.141], [37.455, 127.100],
      [37.445, 127.062], [37.430, 127.040], [37.436, 126.990], [37.441, 126.950], [37.430, 126.900], [37.470, 126.870], [37.490, 126.826], [37.515, 126.800], [37.545, 126.790], [37.560, 126.770]].map(pt);
    const HAN = [[37.603, 126.790], [37.578, 126.832], [37.566, 126.864], [37.551, 126.890], [37.540, 126.910], [37.531, 126.934], [37.526, 126.955], [37.519, 126.975],
      [37.514, 126.996], [37.519, 127.016], [37.528, 127.040], [37.534, 127.064], [37.529, 127.086], [37.540, 127.106], [37.549, 127.126], [37.561, 127.152]].map(pt);
    const W = X(127.19), H = Y(37.42), f = v => v.toFixed(1);
    const inside = (x, y) => {
      let c = false;
      for (let i = 0, j = SEOUL.length - 1; i < SEOUL.length; j = i++) {
        const [xi, yi] = SEOUL[i], [xj, yj] = SEOUL[j];
        if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
      }
      return c;
    };
    // 부드러운 곡선 (Catmull-Rom → 베지어)
    const smooth = (p, close) => {
      const n = p.length, g = i => p[close ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
      let d = `M${f(p[0][0])},${f(p[0][1])}`;
      for (let i = 0; i < (close ? n : n - 1); i++) {
        const a = g(i - 1), b = g(i), c = g(i + 1), e = g(i + 2);
        d += `C${f(b[0] + (c[0] - a[0]) / 6)},${f(b[1] + (c[1] - a[1]) / 6)} ${f(c[0] - (e[0] - b[0]) / 6)},${f(c[1] - (e[1] - b[1]) / 6)} ${f(c[0])},${f(c[1])}`;
      }
      return d + (close ? 'Z' : '');
    };
    let h = `<path d="${smooth(SEOUL, true)}" fill="rgba(255,255,255,.6)" stroke="#AEB6BF" stroke-width="1" stroke-dasharray="3 5"/>`;
    for (let x = 6; x < W; x += .85 * K) for (let y = 6; y < H; y += .85 * K)
      if (inside(x, y)) h += `<circle class="dot" cx="${f(x)}" cy="${f(y)}" r="1.7" style="--d:${(x / W * .9).toFixed(2)}s"/>`;
    h += `<path class="river" d="${smooth(HAN)}" pathLength="1" fill="none" stroke="#BCCADB" stroke-width="${f(.95 * K)}" stroke-linecap="round" stroke-linejoin="round"/>`;
    const tx = (la, ln, t, cls = 'area') => { const [x, y] = pt([la, ln]); return `<text class="${cls}" x="${f(x)}" y="${f(y)}">${t}</text>`; };
    h += tx(37.522, 126.92, 'HAN RIVER', 'riv');
    h += tx(37.625, 127.0, 'SEOUL', 'big');
    // 클러스터: 상암 DMC 반경 1.5km 안의 매장은 렌즈 안에서 펼친다
    const C0 = [37.5787, 126.8911], L0 = [37.57874, 126.89112], near = st => Math.hypot((st.lat - C0[0]) * 111, (st.lng - C0[1]) * 88.2) < 1.5;
    // 번호표는 위 → 오른쪽 → 왼쪽 → 아래 중 다른 번호표·핀과 겹치지 않는 자리에 단다
    const placed = [];
    const hit = (tx, ty) => placed.some(([px, py, kind]) => kind === 'tag' ? Math.abs(px - tx) < 33 && Math.abs(py - ty) < 21 : Math.abs(px - tx) < 23 && Math.abs(py - ty) < 17);
    const pin = (x, y, st, r = 7) => {
      const no = String(st.i + 1).padStart(2, '0');
      const spots = [[x, y - r - 17], [x + r + 20, y], [x - r - 20, y], [x, y + r + 17]];
      const [tx, ty] = spots.find(([sx, sy]) => !hit(sx, sy)) || spots[0];
      placed.push([x, y, 'pin'], [tx, ty, 'tag']);
      return `<g class="pin" data-i="${st.i}" style="--i:${st.i}"><circle class="pulse" cx="${f(x)}" cy="${f(y)}" r="${r}"/><circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="#0E1A30"/><circle cx="${f(x)}" cy="${f(y)}" r="${r * .36}" fill="#fff"/>` +
        `<g class="tip"><rect x="${f(tx - 15)}" y="${f(ty - 9)}" width="30" height="18" rx="9" fill="#0E1A30"/><text x="${f(tx)}" y="${f(ty + 3.5)}">${no}</text></g></g>`;
    };
    stores.filter(st => !near(st)).forEach(st => { const [x, y] = pt([st.lat, st.lng]); h += pin(x, y, st); });
    const cluster = stores.filter(near), [cx, cy] = pt(C0);
    const LX = X(126.835), LY = Y(37.672), LR = 124, Z = 150;                          // 렌즈 위치·반지름·확대(px/km)
    h += `<line x1="${f(cx)}" y1="${f(cy)}" x2="${f(LX + LR * .62)}" y2="${f(LY + LR * .78)}" stroke="#0E1A30" stroke-width="1" stroke-dasharray="3 4"/>`;
    h += `<circle cx="${f(cx)}" cy="${f(cy)}" r="16" fill="rgba(14,26,48,.08)" stroke="#0E1A30" stroke-width="1"/>`;
    h += `<g class="lens"><clipPath id="mapLens"><circle cx="${f(LX)}" cy="${f(LY)}" r="${LR}"/></clipPath><circle cx="${f(LX)}" cy="${f(LY)}" r="${LR}" fill="#FFFFFF" stroke="#0E1A30" stroke-width="1.2"/><g clip-path="url(#mapLens)">`;
    for (let k = -4; k <= 4; k++) h += `<line x1="${f(LX + k * 26)}" y1="${f(LY - LR)}" x2="${f(LX + k * 26)}" y2="${f(LY + LR)}" stroke="#EEF0F3"/><line x1="${f(LX - LR)}" y1="${f(LY + k * 26)}" x2="${f(LX + LR)}" y2="${f(LY + k * 26)}" stroke="#EEF0F3"/>`;
    placed.length = 0;
    cluster.forEach(st => { const x = LX + (st.lng - L0[1]) * 88.2 * Z, y = LY - (st.lat - L0[0]) * 111 * Z; h += pin(x, y, st, 6); });
    h += `</g><text class="lens-t" x="${f(LX)}" y="${f(LY + LR + 22)}">SANGAM DMC · ${String(cluster.length).padStart(2, '0')}</text></g>`;
    svg.setAttribute('viewBox', `0 0 ${f(W)} ${f(H + 10)}`);
    svg.innerHTML = h;
    onView(svg, () => svg.classList.add('in'), .25);
    const set = i => svg.querySelectorAll('.pin').forEach(g => g.classList.toggle('hi', +g.dataset.i === i));
    document.addEventListener('mouseover', e => { const li = e.target.closest('[data-map-i]'); set(li ? +li.dataset.mapI : -1); });
  }

  document.querySelectorAll('svg[data-roaster]').forEach(roaster);
  document.querySelectorAll('svg[data-store-kit]').forEach(kit);
  document.querySelectorAll('svg[data-store-map]').forEach(storeMap);
  document.querySelectorAll('svg[data-store-city]').forEach(city);
  document.querySelectorAll('svg[data-plan]').forEach(plan);
  document.querySelectorAll('svg[data-model-plan]').forEach(model);
})();
