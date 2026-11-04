/* ---------- 도프커피 아이소메트릭 그래픽 ----------
   재료는 공간기획 제안서 SPACE CONCEPT 기준: 웜화이트, 딥블루, 라이트그레이, 그레이 애쉬 우드, 스테인리스
   - svg[data-store-builder] : 부품이 점선을 따라 조립되는 L자 카운터 + 메뉴 구성([data-mod] aria-pressed)에 맞춰 떨어지는 장비
   - svg[data-space-layers]  : 다섯 재료 층. CSS 변수 --open(0~1)에 따라 층 사이가 벌어진다
   좌표: x = 카운터 길이 방향, y = 손님 쪽(+y 면이 정면), z = 높이. 뒤(작은 x+y)에서 앞으로, 아래에서 위로 그린다 */
(() => {
  const C = Math.cos(Math.PI / 6), S = .5;
  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const COL = {
    warm: ['#F6F5F2', '#E7E5E0', '#D7D4CE'],          // 윗면, +y 면, +x 면
    gray: ['#E4E6E9', '#CED2D7', '#BDC2C9'],
    blue: ['#3E5F92', '#2E4B74', '#223A5C'],
    navy: ['#2A3B5C', '#16253F', '#0E1A30'],
    wood: ['#DDD3C6', '#C4B8A8', '#AC9F8F'],
    woodD: ['#B9A58C', '#9C886F', '#86735C'],
    steel: ['url(#isoSteelT)', 'url(#isoSteelL)', 'url(#isoSteelR)'],
    dark: ['#4A5260', '#2E343E', '#22272F'],
    white: ['#FFFFFF', '#EEF0F2', '#E1E4E8'],
    bread: ['#EAC58C', '#D9AE6E', '#C69858'],
  };
  const DEFS = `<defs>
    <linearGradient id="isoSteelT" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FBFCFD"/><stop offset=".55" stop-color="#DCE1E6"/><stop offset="1" stop-color="#BCC3CB"/></linearGradient>
    <linearGradient id="isoSteelL" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#EEF1F4"/><stop offset=".35" stop-color="#CDD3D9"/><stop offset=".7" stop-color="#E3E7EB"/><stop offset="1" stop-color="#AEB6BF"/></linearGradient>
    <linearGradient id="isoSteelR" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#A2AAB4"/><stop offset=".6" stop-color="#8C95A0"/><stop offset="1" stop-color="#78818C"/></linearGradient>
    <linearGradient id="isoGlass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(236,242,250,.55)"/><stop offset="1" stop-color="rgba(196,212,232,.32)"/></linearGradient>
    <linearGradient id="isoStone" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FAFAF8"/><stop offset="1" stop-color="#ECEAE6"/></linearGradient>
    <filter id="isoSoft" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="22"/></filter>
    <filter id="isoAO" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3"/></filter>
    <filter id="isoShadow" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="9"/></filter>
    <linearGradient id="isoPipe" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8E97A3"/><stop offset=".3" stop-color="#F6F8FA"/><stop offset=".55" stop-color="#C9CFD6"/><stop offset="1" stop-color="#6F7884"/></linearGradient>
    <linearGradient id="isoPipeD" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2E343E"/><stop offset=".35" stop-color="#5A6270"/><stop offset="1" stop-color="#1B1F26"/></linearGradient>
    <linearGradient id="isoDrum" x1="0" y1="0" x2=".5" y2="1"><stop offset="0" stop-color="#7C8590"/><stop offset=".22" stop-color="#F6F8FA"/><stop offset=".42" stop-color="#DCE1E6"/><stop offset=".78" stop-color="#A3ABB5"/><stop offset="1" stop-color="#6B7480"/></linearGradient>
    <radialGradient id="isoDiscR" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".45" stop-color="#D5DAE0"/><stop offset="1" stop-color="#8E97A3"/></radialGradient>
    <linearGradient id="isoWarmF" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F3F1ED"/><stop offset="1" stop-color="#D9D5CE"/></linearGradient>
    <linearGradient id="isoWarmR" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#D8D4CD"/><stop offset="1" stop-color="#B5B0A8"/></linearGradient>
    <linearGradient id="isoNavyF" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2E4166"/><stop offset="1" stop-color="#111D34"/></linearGradient>
    <linearGradient id="isoNavyRing" x1="0" y1="0" x2=".5" y2="1"><stop offset="0" stop-color="#4A6A9C"/><stop offset=".45" stop-color="#16253F"/><stop offset="1" stop-color="#0B1528"/></linearGradient>
    <linearGradient id="isoSack" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#E6D8B6"/><stop offset=".5" stop-color="#CDB892"/><stop offset="1" stop-color="#9F8B65"/></linearGradient>
    <radialGradient id="isoGlow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#3E5F92" stop-opacity=".5"/><stop offset="1" stop-color="#3E5F92" stop-opacity="0"/></radialGradient>
  </defs>`;
  const SHINE = 'stroke="rgba(255,255,255,.95)" stroke-width="1" stroke-linecap="round"';

  function scene(svg, U) {
    const parts = [], b = { x0: 1e9, y0: 1e9, x1: -1e9, y1: -1e9 };
    const grow = (x, y) => { b.x0 = Math.min(b.x0, x); b.x1 = Math.max(b.x1, x); b.y0 = Math.min(b.y0, y); b.y1 = Math.max(b.y1, y); };
    const P = (x, y, z) => { const p = [(x - y) * C * U, (x + y) * S * U - z * U]; grow(...p); return p; };
    const V = (dx, dy, dz) => [(dx - dy) * C * U, (dx + dy) * S * U - dz * U];        // 이동량(경계에 넣지 않음)
    const f = v => v.toFixed(1);
    const pts = list => list.map(p => `${f(p[0])},${f(p[1])}`).join(' ');
    let target = null;
    const add = html => (target ? target.push(html) : parts.push(html));
    const edge = 'stroke="rgba(14,26,48,.16)" stroke-width=".6" stroke-linejoin="round"';
    const poly = (list, fill, extra = edge) => add(`<polygon points="${pts(list)}" fill="${fill}" ${extra}/>`);
    function box(x, y, z, w, d, h, c, extra = edge) {
      poly([P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h)], c[1], extra);
      poly([P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x + w, y, z + h)], c[2], extra);
      poly([P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)], c[0], extra);
    }
    // 원뿔대(아래 반지름 r0, 위 r1). r0 = r1이면 원기둥
    function cone(cx, cy, z, r0, r1, h, side, top, extra = edge) {
      const t = P(cx, cy, z + h), bt = P(cx, cy, z), k = U * Math.SQRT2;
      const bx = r0 * C * k, by = r0 * S * k, tx = r1 * C * k, ty = r1 * S * k;
      grow(t[0] - tx, t[1] - ty); grow(t[0] + tx, t[1] + ty); grow(bt[0] - bx, bt[1] + by); grow(bt[0] + bx, bt[1] + by);
      add(`<path d="M${f(t[0] - tx)},${f(t[1])}L${f(bt[0] - bx)},${f(bt[1])}A${f(bx)},${f(by)} 0 0 0 ${f(bt[0] + bx)},${f(bt[1])}L${f(t[0] + tx)},${f(t[1])}Z" fill="${side}" ${extra}/>`);
      if (top) add(`<ellipse cx="${f(t[0])}" cy="${f(t[1])}" rx="${f(tx)}" ry="${f(ty)}" fill="${top}" ${extra}/>`);
    }
    const cyl = (cx, cy, z, r, h, side, top, extra) => cone(cx, cy, z, r, r, h, side, top, extra);
    // 세로면 위의 원: axis 'y' → y = at 면(정면), 'x' → x = at 면(옆면)
    function disc(axis, at, u, zc, r, fill, extra = edge) {
      const q = [];
      for (let i = 0; i < 28; i++) {
        const a = i / 28 * Math.PI * 2, uu = u + Math.cos(a) * r, zz = zc + Math.sin(a) * r;
        q.push(axis === 'y' ? P(uu, at, zz) : P(at, uu, zz));
      }
      poly(q, fill, extra);
    }
    // 세로면에 붙은 사각 패널
    const panel = (axis, at, u0, u1, z0, z1, fill, extra = 'stroke="none"') => poly(axis === 'y'
      ? [P(u0, at, z0), P(u1, at, z0), P(u1, at, z1), P(u0, at, z1)]
      : [P(at, u0, z0), P(at, u1, z0), P(at, u1, z1), P(at, u0, z1)], fill, extra);
    // 세로면에 기울여 쓴 글자
    function faceText(axis, at, u, z, txt, size, fill, weight = 800, spacing = 0) {
      const p = axis === 'y' ? P(u, at, z) : P(at, u, z), m = axis === 'y' ? `${C.toFixed(4)} ${S}` : `${C.toFixed(4)} ${-S}`;
      add(`<text transform="matrix(${m} 0 1 ${f(p[0])} ${f(p[1])})" text-anchor="middle" font-family="Red Hat Display, sans-serif" font-size="${f(size)}" font-weight="${weight}" letter-spacing="${spacing}" fill="${fill}">${txt}</text>`);
    }
    const line = (a, c, attrs) => add(`<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(c[0])}" y2="${f(c[1])}" ${attrs}/>`);
    // 바닥 접지 그림자
    const shadow = (x, y, z, w, d, g = .05) => poly([P(x - g, y - g, z), P(x + w + g, y - g, z), P(x + w + g, y + d + g, z), P(x - g, y + d + g, z)], 'rgba(14,26,48,.34)', 'filter="url(#isoAO)"');
    // 세로 슬랫: y = at 평면(정면) 또는 x = at 평면(옆면)에 번갈아 칠한 띠
    function slats(axis, at, from, to, z0, z1, colors, step = .17) {
      for (let u = from, k = 0; u < to - .001; u += step, k++) panel(axis, at, u, Math.min(to, u + step), z0, z1, colors[k % 2]);
    }
    function group(attrs, draw) {
      const prev = target; target = [];
      draw();
      const html = `<g ${attrs}>${target.join('')}</g>`;
      target = prev; add(html);
    }
    const bounds = () => ({ ...b });
    const viewBox = (bx, pad) => `${f(bx.x0 - pad)} ${f(bx.y0 - pad)} ${f(bx.x1 - bx.x0 + pad * 2)} ${f(bx.y1 - bx.y0 + pad * 2)}`;
    function finish(pad) { svg.setAttribute('viewBox', viewBox(b, pad)); svg.innerHTML = DEFS + parts.join(''); }
    return { U, P, V, poly, box, cone, cyl, disc, panel, faceText, line, shadow, slats, group, add, grow, bounds, viewBox, finish, f };
  }

  /* ---------- 장비 ---------- */
  // 2그룹 에스프레소 머신: 컵 워머, 딥블루 패널(압력계 2·로고), 그룹헤드 + 포터필터, 스팀 완드, 물받이
  function espresso(s, ox, oy, oz) {
    const { U, P, box, cone, cyl, disc, panel, faceText, line, shadow } = s;
    const W = 2, D = .75, FY = oy + D, TZ = oz + 1.06;
    shadow(ox, oy, oz, W, D + .32);
    box(ox + .05, oy + .05, oz, W - .1, D - .1, .06, COL.dark);
    box(ox, oy, oz + .06, W, D, 1.0, COL.steel);
    for (let i = 0; i < 5; i++) line(P(ox + W, oy + .14, oz + .28 + i * .09), P(ox + W, oy + .6, oz + .28 + i * .09), 'stroke="rgba(14,26,48,.28)" stroke-width="1.1"');
    panel('y', FY, ox + .06, ox + W - .06, oz + .72, oz + 1.0, '#2E4B74');
    panel('y', FY, ox + .06, ox + W - .06, oz + .99, oz + 1.0, 'rgba(255,255,255,.5)');
    [.34, W - .34].forEach(u => {
      disc('y', FY, ox + u, oz + .86, .095, '#2A3B5C', 'stroke="none"');
      disc('y', FY, ox + u, oz + .86, .075, '#F6F7F9', 'stroke="none"');
      line(P(ox + u, FY, oz + .86), P(ox + u + .045, FY, oz + .91), 'stroke="#C9473D" stroke-width="1.1" stroke-linecap="round"');
    });
    faceText('y', FY, ox + W / 2, oz + .8, 'dpc', U * .2, '#FFFFFF');
    // 컵 워머: 뒤 레일 → 엎어 둔 컵 → 앞 레일
    const rail = (a, c) => line(P(...a), P(...c), 'stroke="#8E97A3" stroke-width="1.5" stroke-linecap="round"');
    rail([ox + .08, oy + .08, TZ + .1], [ox + W - .08, oy + .08, TZ + .1]);
    rail([ox + .08, oy + .08, TZ + .1], [ox + .08, oy + D - .08, TZ + .1]);
    [[.38, .26], [.72, .26], [1.06, .26], [1.4, .26], [.55, .52], [.89, .52], [1.23, .52], [1.57, .52]]
      .forEach(([x, y]) => cone(ox + x, oy + y, TZ, .1, .075, .13, '#FFFFFF', '#E9ECEF'));
    rail([ox + .08, oy + D - .08, TZ + .1], [ox + W - .08, oy + D - .08, TZ + .1]);
    rail([ox + W - .08, oy + .08, TZ + .1], [ox + W - .08, oy + D - .08, TZ + .1]);
    // 물받이
    box(ox + .1, FY, oz + .06, W - .2, .32, .1, COL.dark);
    for (let u = .16; u < W - .12; u += .08) line(P(ox + u, FY + .03, oz + .16), P(ox + u, FY + .29, oz + .16), 'stroke="#5D6573" stroke-width="1"');
    // 그룹헤드: 잔 → 추출 줄기 → 바스켓 → 헤드 → 손잡이
    [.55, W - .55].forEach(g => {
      const x = ox + g;
      cyl(x, FY + .16, oz + .16, .085, .14, '#FFFFFF', '#EEF0F2');
      cyl(x, FY + .16, oz + .3, .066, .001, '#7A4A2C', '#9B6440', 'stroke="none"');
      line(P(x, FY + .14, oz + .48), P(x, FY + .16, oz + .31), 'stroke="#7A4A2C" stroke-width="1.3"');
      cyl(x, FY + .14, oz + .48, .12, .1, '#3A414C', '#4A5260');
      box(x - .15, FY, oz + .58, .3, .22, .16, COL.steel);
      cyl(x, FY + .11, oz + .74, .1, .05, '#C3C9D0', '#E7EAEE');
      box(x - .035, FY + .24, oz + .5, .07, .44, .07, COL.navy);
      cyl(x, FY + .68, oz + .5, .045, .07, '#16253F', '#2A3B5C');
    });
    // 스팀 완드 + 노브
    [[.13, -.05], [W - .13, .05]].forEach(([u, dx]) => {
      cyl(ox + u, FY + .04, oz + .66, .05, .1, '#22272F', '#3A414C');
      const a = P(ox + u, FY + .06, oz + .64), c = P(ox + u + dx, FY + .34, oz + .2);
      line(a, c, 'stroke="#8E97A3" stroke-width="3.2" stroke-linecap="round"');
      line(a, c, SHINE);
    });
    line(P(ox, FY, oz + 1.06), P(ox + W, FY, oz + 1.06), SHINE);
    line(P(ox + W, FY, oz + .06), P(ox + W, FY, oz + 1.06), 'stroke="rgba(255,255,255,.7)" stroke-width="1"');
  }

  // 그라인더: 받침·몸체(딥네이비)·거치대·원두가 담긴 유리 호퍼
  function grinder(s, ox, oy, oz) {
    const { U, box, cyl, cone, faceText, shadow } = s;
    const cx = ox + .25, cy = oy + .22;
    shadow(ox, oy, oz, .5, .6);
    box(ox, oy, oz, .5, .58, .08, COL.dark);
    box(ox + .05, oy + .02, oz + .08, .4, .4, .64, COL.navy);
    faceText('y', oy + .42, cx, oz + .6, 'dpc', U * .12, '#FFFFFF');
    box(ox + .12, oy + .42, oz + .25, .26, .12, .03, COL.dark);
    box(ox + .18, oy + .42, oz + .36, .14, .1, .1, COL.steel);
    cyl(cx, cy, oz + .72, .1, .08, '#3A414C', '#4A5260');
    cone(cx, cy, oz + .8, .09, .17, .24, '#5A3A28', '#6E4A34');
    cone(cx, cy, oz + .8, .1, .24, .5, 'url(#isoGlass)', null, 'stroke="rgba(255,255,255,.9)" stroke-width="1"');
    cyl(cx, cy, oz + 1.3, .25, .06, '#22272F', '#3A414C');
  }

  // 케이크: 스펀지 + 크림 + 장식
  function cake(s, cx, cy, z, r, h, kind) {
    const { P, cyl, add, f, U } = s;
    const K = {
      straw: { sp: '#EBD3A8', cr: '#FBF8F2', top: '#FFFFFF', dot: '#D2393C' },
      choco: { sp: '#5B3A2E', cr: '#4A2E24', top: '#6B4434', dot: '#F4EDE4' },
      cheese: { sp: '#F3E2B8', cr: '#EFD9A4', top: '#C9883F', dot: null },
    }[kind];
    cyl(cx, cy, z, r, h * .5, K.sp, K.sp);
    cyl(cx, cy, z + h * .5, r, h * .5, K.cr, K.top);
    if (!K.dot) return;
    for (let i = 0; i < 8; i++) {
      const a = i / 8 * Math.PI * 2, p = P(cx + Math.cos(a) * r * .68, cy + Math.sin(a) * r * .68, z + h);
      add(`<circle cx="${f(p[0])}" cy="${f(p[1] - U * .025)}" r="${f(U * .04)}" fill="${K.dot}"/>`);
    }
  }

  // 디저트 쇼케이스: 하부장 + 우드 띠 + 케이크 3단 + 유리 선반(타르트·마카롱) + 경사 유리 + 우드 상판
  function showcase(s, ox, oy, oz) {
    const { U, P, box, cyl, poly, faceText, line, shadow } = s;
    const W = 2.5, D = 1.25, FY = oy + D, SL = .4;
    shadow(ox, oy, oz, W, D);
    box(ox, oy, oz, W, D, .32, COL.white);
    faceText('y', FY, ox + W / 2, oz + .21, 'DESSERT', U * .11, '#2E4B74', 700, 3);
    box(ox, oy, oz + .32, W, D, .05, COL.wood);
    const fz = oz + .37;
    cake(s, ox + .5, oy + .66, fz, .27, .3, 'straw');
    cake(s, ox + 1.25, oy + .66, fz, .27, .3, 'choco');
    cake(s, ox + 2.0, oy + .66, fz, .27, .3, 'cheese');
    box(ox + .06, oy + .06, fz + .5, W - .12, D - SL - .2, .025, ['rgba(255,255,255,.8)', 'rgba(214,224,236,.8)', 'rgba(196,208,222,.8)']);
    const sz = fz + .525;
    [.45, 1.25, 2.05].forEach(x => {                                              // 타르트
      cyl(ox + x, oy + .32, sz, .17, .07, '#D9A866', '#EBC78F');
      cyl(ox + x, oy + .32, sz + .07, .12, .02, '#C83D4A', x === 1.25 ? '#F2B33D' : '#D44A57', 'stroke="none"');
    });
    ['#F2B8C2', '#BFD8B5', '#F4DE9A', '#C9B6E0', '#F2B8C2', '#A9C7E6', '#F4DE9A', '#BFD8B5', '#C9B6E0', '#A9C7E6']   // 마카롱
      .forEach((c, i) => {
        const x = ox + .3 + i * .21, y = oy + .62;
        cyl(x, y, sz, .07, .035, c, c);
        cyl(x, y, sz + .035, .06, .015, '#FFFDF7', '#FFFDF7', 'stroke="none"');
        cyl(x, y, sz + .05, .07, .035, c, c);
      });
    const back = oy + .04, gz0 = fz, gz1 = oz + 1.32, glass = 'stroke="rgba(255,255,255,.95)" stroke-width="1.2" stroke-linejoin="round"';
    poly([P(ox + W, back, gz0), P(ox + W, FY, gz0), P(ox + W, FY - SL, gz1), P(ox + W, back, gz1)], 'url(#isoGlass)', glass);
    poly([P(ox, FY, gz0), P(ox + W, FY, gz0), P(ox + W, FY - SL, gz1), P(ox, FY - SL, gz1)], 'url(#isoGlass)', glass);
    [[.3, .55], [.75, .85]].forEach(([a, b]) => {                                  // 유리 반사
      const k = .62;
      poly([P(ox + W * a, FY, gz0), P(ox + W * a + .12, FY, gz0), P(ox + W * a + .12 + .5, FY - SL * k, gz0 + (gz1 - gz0) * k), P(ox + W * a + .5, FY - SL * k, gz0 + (gz1 - gz0) * k)], 'rgba(255,255,255,.32)', 'stroke="none"');
      poly([P(ox + W * b, FY, gz0), P(ox + W * b + .04, FY, gz0), P(ox + W * b + .3, FY - SL * .4, gz0 + (gz1 - gz0) * .4), P(ox + W * b + .26, FY - SL * .4, gz0 + (gz1 - gz0) * .4)], 'rgba(255,255,255,.4)', 'stroke="none"');
    });
    box(ox - .02, back - .02, gz1, W + .04, D - SL - .02, .07, COL.wood);
    line(P(ox + .06, FY - SL - .02, gz1 - .03), P(ox + W - .06, FY - SL - .02, gz1 - .03), 'stroke="#FFF7DF" stroke-width="2" stroke-linecap="round"');
  }

  // 파니니 그릴: 뒤 경첩으로 열린 뚜껑(안쪽 홈) + 굽는 중인 샌드위치
  function panini(s, ox, oy, oz) {
    const { P, box, disc, line, poly, shadow } = s;
    const W = .8, D = .7, FY = oy + D;
    shadow(ox, oy, oz, W, D);
    box(ox, oy, oz, W, D, .2, COL.steel);
    disc('y', FY, ox + .18, oz + .1, .05, '#22272F', 'stroke="none"');
    disc('y', FY, ox + .62, oz + .1, .05, '#22272F', 'stroke="none"');
    disc('y', FY, ox + .4, oz + .1, .022, '#E2574C', 'stroke="none"');
    box(ox + .05, oy + .05, oz + .2, W - .1, D - .1, .04, COL.dark);
    for (let u = .1; u < W - .07; u += .07) line(P(ox + u, oy + .07, oz + .24), P(ox + u, FY - .07, oz + .24), 'stroke="#646C79" stroke-width="1"');
    const a = 66 * Math.PI / 180, L = .64, yh = oy + .03, zh = oz + .29, T = .09;
    const Q = (x, t, n = 0) => P(x, yh + t * Math.cos(a) - n * Math.sin(a), zh + t * Math.sin(a) + n * Math.cos(a));
    const x0 = ox + .03, x1 = ox + W - .03;
    poly([Q(x0, 0), Q(x1, 0), Q(x1, L), Q(x0, L)], '#2E343E');
    for (let x = x0 + .07; x < x1 - .04; x += .07) line(Q(x, .04), Q(x, L - .04), 'stroke="#646C79" stroke-width="1"');
    poly([Q(x1, 0), Q(x1, L), Q(x1, L, T), Q(x1, 0, T)], 'url(#isoSteelR)');
    poly([Q(x0, L), Q(x1, L), Q(x1, L, T), Q(x0, L, T)], 'url(#isoSteelT)');
    line(Q(x0 + .12, L + .07, T * .5), Q(x1 - .12, L + .07, T * .5), 'stroke="#22272F" stroke-width="4" stroke-linecap="round"');
    // 샌드위치: 빵 → 채소 → 빵(그릴 자국)
    box(ox + .18, oy + .22, oz + .24, .44, .34, .05, COL.bread);
    box(ox + .17, oy + .21, oz + .29, .46, .36, .025, ['#8DB35F', '#6F9447', '#5E7E3C']);
    box(ox + .18, oy + .22, oz + .315, .44, .34, .06, COL.bread);
    for (let i = 0; i < 4; i++) line(P(ox + .24 + i * .1, oy + .24, oz + .375), P(ox + .24 + i * .1, oy + .54, oz + .375), 'stroke="#8A5A2B" stroke-width="1.6" stroke-linecap="round"');
  }

  // 소프트 아이스크림 머신: 몸체 + 상단 호퍼(뚜껑 2) + 딥블루 패널(디스플레이) + 디스펜서 헤드(레버 3) + 콘
  function softServe(s, ox, oy, oz) {
    const { U, P, box, cyl, cone, panel, faceText, line, shadow } = s;
    const W = 1.0, D = .75, FY = oy + D;
    shadow(ox, oy, oz, W, D + .3);
    box(ox, oy, oz, W, D, 1.3, COL.steel);
    for (let i = 0; i < 6; i++) line(P(ox + W, oy + .14, oz + .22 + i * .08), P(ox + W, oy + .6, oz + .22 + i * .08), 'stroke="rgba(14,26,48,.28)" stroke-width="1.1"');
    box(ox, oy, oz + 1.3, W, D, .42, COL.steel);
    panel('y', FY, ox + .07, ox + W - .07, oz + 1.37, oz + 1.66, '#2E4B74');
    panel('y', FY, ox + .13, ox + .45, oz + 1.45, oz + 1.59, '#0E1A30');
    faceText('y', FY, ox + .29, oz + 1.48, '-4°C', U * .085, '#9FE3C1', 700);
    faceText('y', FY, ox + .7, oz + 1.46, 'dpc', U * .14, '#FFFFFF');
    cyl(ox + .28, oy + .36, oz + 1.72, .17, .05, '#C3C9D0', '#EDF0F3');
    cyl(ox + .72, oy + .36, oz + 1.72, .17, .05, '#C3C9D0', '#EDF0F3');
    line(P(ox, FY, oz + 1.72), P(ox + W, FY, oz + 1.72), SHINE);
    box(ox + .15, FY, oz + .06, .7, .28, .06, COL.dark);
    for (let u = .2; u < .82; u += .07) line(P(ox + u, FY + .03, oz + .12), P(ox + u, FY + .25, oz + .12), 'stroke="#5D6573" stroke-width="1"');
    const cx = ox + .5, cy = FY + .15;
    cone(cx, cy, oz + .12, .015, .075, .22, '#D9A35E', '#C88F4D');
    cyl(cx, cy, oz + .34, .085, .05, '#FFFDF8', '#FFFFFF');
    cyl(cx, cy, oz + .39, .066, .05, '#FBF6EC', '#FFFFFF');
    cyl(cx, cy, oz + .44, .046, .04, '#FBF6EC', '#FFFFFF');
    cone(cx, cy, oz + .48, .03, .004, .06, '#FFFFFF', null);
    [.28, .5, .72].forEach(u => cone(ox + u, FY + .12, oz + .55, .035, .055, .08, '#B9C0C8', '#DADFE4'));
    box(ox + .14, FY, oz + .63, .72, .22, .3, COL.steel);
    line(P(ox + .14, FY + .22, oz + .93), P(ox + .86, FY + .22, oz + .93), SHINE);
    [.28, .5, .72].forEach(u => {
      box(ox + u - .025, FY + .15, oz + .93, .05, .05, .22, COL.dark);
      cyl(ox + u, FY + .175, oz + 1.15, .05, .07, '#2E4B74', '#3E5F92');
    });
  }

  // 지시선 이름표 (RD 레퍼런스처럼 DPC_이름 + 한글)
  function label(s, at, off, en, ko, attrs, no = '') {
    const { P, add, grow, f } = s;
    const a = P(...at), t = [a[0] + off[0], a[1] + off[1]], left = off[0] < 0, w = 215;
    const tx = t[0] + (left ? -12 : 12), anchor = left ? 'end' : 'start';
    s.group(attrs, () => {
      const ink = s.ink || '#0E1A30';
      add(`<circle cx="${f(a[0])}" cy="${f(a[1])}" r="3.5" fill="${ink}"/>`);
      add(`<circle class="ping" cx="${f(a[0])}" cy="${f(a[1])}" r="3.5" fill="none" stroke="${ink}" stroke-width="1.2"/>`);
      add(`<polyline points="${f(a[0])},${f(a[1])} ${f(t[0])},${f(t[1])} ${f(t[0] + (left ? -6 : 6))},${f(t[1])}" fill="none" stroke="${ink}" stroke-width=".9"/>`);
      add(`<text x="${f(tx)}" y="${f(t[1] - 4)}" text-anchor="${anchor}" font-family="Red Hat Display, sans-serif" font-size="15" font-weight="700" fill="${s.ink || '#0E1A30'}">${no ? no + '  ' : ''}DPC_${en}</text>`);
      add(`<text x="${f(tx)}" y="${f(t[1] + 15)}" text-anchor="${anchor}" font-family="Pretendard, sans-serif" font-size="13.5" font-weight="500" fill="${s.sub || '#5B6474'}">${ko}</text>`);
    });
    grow(tx + (left ? -w : w), t[1] - 20); grow(tx, t[1] + 22);
  }

  /* ---------- L자 카운터 + 메뉴 구성 장비 ---------- */
  const Z = 2.16;
  const EQUIP = {
    COFFEE: { no: '01', en: 'Espresso Machine', ko: '에스프레소 머신 · 그라인더', at: [5.3, .45, Z + 1.2], off: [60, -150] },
    DESSERT: { no: '02', en: 'Dessert Showcase', ko: '디저트 쇼케이스', at: [1.6, .7, Z + 1.39], off: [-170, -80] },
    SANDWICH: { no: '03', en: 'Panini Grill', ko: '샌드위치 그릴', at: [3.6, .55, Z + .85], off: [10, -235] },
    ICECREAM: { no: '04', en: 'Soft Serve', ko: '소프트 아이스크림 머신', at: [8.1, 2.6, Z + 1.77], off: [120, -60] },
  };
  const FIXED = [
    { en: 'Counter L-Shape', ko: '딥블루 슬랫 카운터', at: [2.2, 1.7, .9], off: [-110, 130] },
    { en: 'Top Warm White', ko: '웜화이트 상판', at: [8.9, 4.0, 2.1], off: [120, 70] },
  ];

  function builder(svg) {
    const U = 44, s = scene(svg, U);
    const { P, V, box, cyl, line, slats, panel, faceText, group, add, f } = s;
    const SL = ['#2E4B74', '#27426A'], SR = ['#223A5C', '#1D3352'];   // 슬랫 정면 / 옆면

    // 바닥 그림자: L자 카운터 바닥 윤곽 그대로. 오른쪽 뒤로 번지는 그림자 + 바로 밑 접지 그림자
    const foot = (g, dx, dy) => [[-g, -g], [9 + g, -g], [9 + g, 4.6 + g], [7.3 - g, 4.6 + g], [7.3 - g, 1.7 + g], [-g, 1.7 + g]].map(([x, y]) => P(x + dx, y + dy, 0));
    s.poly(foot(.3, .55, -.2), 'rgba(14,26,48,.34)', 'filter="url(#isoShadow)"');
    s.poly(foot(.06, 0, 0), 'rgba(14,26,48,.5)', 'filter="url(#isoAO)"');

    // 분해 상태 점선 가이드: 제자리 꼭짓점 → 떨어져 있는 꼭짓점
    const guides = [];
    const guideFor = (corners, o) => corners.forEach(c => { const a = P(...c), v = V(...o); guides.push([a, [a[0] + v[0], a[1] + v[1]]]); });
    guideFor([[0, 1.7, .22], [9, 0, .22]], [0, 0, -1.4]);
    guideFor([[0, 1.7, 2], [7.3, 1.7, 2]], [0, 2.6, 0]);
    guideFor([[9, 4.6, 2], [9, 1.7, .22]], [2.8, 1.2, 0]);
    guideFor([[0, 1.8, 2.16], [9.1, 4.7, 2.16]], [0, 0, 3]);
    group('class="guides"', () => guides.forEach(([a, c]) => line(a, c, 'stroke="#5B6474" stroke-width=".9" stroke-dasharray="4 5"')));

    // 조립 부품: 처음엔 o만큼 떨어져 있다가 .assembled에서 제자리로
    const part = (o, delay, draw) => {
      const [tx, ty] = V(...o);
      group(`class="part" style="--tx:${f(tx)}px;--ty:${f(ty)}px;--d:${delay}s"`, draw);
    };
    part([0, 0, -1.4], 0, () => {                                          // 받침
      box(.14, .14, 0, 8.72, 1.42, .22, COL.dark);
      box(7.44, 1.56, 0, 1.42, 2.9, .22, COL.dark);
    });
    part([-2.6, 0, 0], .12, () => {                                        // 몸체 + 옆면 슬랫
      box(0, 0, .22, 9, 1.7, 1.78, COL.blue);
      slats('x', 9, 0, 1.7, .22, 2, SR);
    });
    part([0, 2.6, 0], .24, () => {                                         // 정면 슬랫 패널 + 로고 판
      slats('y', 1.7, 0, 7.3, .22, 2, SL);
      box(0, 1.7, 1.86, 7.3, .04, .14, COL.white, 'stroke="none"');
      panel('y', 1.705, .7, 1.9, .95, 1.4, '#F6F5F2', 'stroke="rgba(14,26,48,.2)" stroke-width=".6"');
      faceText('y', 1.705, 1.3, 1.08, 'dpc', U * .26, '#0E1A30');
    });
    part([2.8, 1.2, 0], .36, () => {                                       // 꺾인 쪽
      box(7.3, 1.7, .22, 1.7, 2.9, 1.78, COL.blue);
      slats('y', 4.6, 7.3, 9, .22, 2, SL);
      slats('x', 9, 1.7, 4.6, .22, 2, SR);
    });
    part([0, 0, 3], .5, () => {                                            // 상판
      box(-.08, -.08, 2, 9.16, 1.86, .16, ['url(#isoStone)', '#E2E0DB', '#D2CFC9']);
      box(7.22, 1.78, 2, 1.86, 2.9, .16, ['url(#isoStone)', '#E2E0DB', '#D2CFC9']);
      line(P(-.08, 1.78, 2.16), P(7.22, 1.78, 2.16), SHINE);
      line(P(7.22, 4.68, 2.16), P(9.08, 4.68, 2.16), SHINE);
    });

    // 장비 뒤에 놓이는 소품: 컵 타워
    group('class="fixed"', () => {
      s.shadow(8.68, 1.74, Z, .32, .32);
      [0, 1, 2, 3].forEach(i => s.cone(8.84, 1.9, Z + i * .17, .13, .16, .15, '#FFFFFF', '#EEF0F2'));
    });

    // 장비: 점선 가이드를 따라 떨어진다
    const eq = (k, top, draw) => group(`class="eq" data-eq="${k}"`, () => {
      const a = P(...top);
      add(`<line class="drop" x1="${f(a[0])}" y1="${f(a[1] - 170)}" x2="${f(a[0])}" y2="${f(a[1])}" stroke="#0E1A30" stroke-width="1" stroke-dasharray="3 5"/>`);
      group('class="body"', draw);
    });
    eq('DESSERT', [1.7, .8, Z + 1.4], () => showcase(s, .4, .2, Z));
    eq('SANDWICH', [3.6, .5, Z + .95], () => panini(s, 3.2, .45, Z));
    eq('COFFEE', [5.3, .55, Z + 1.25], () => { espresso(s, 4.25, .2, Z); grinder(s, 6.55, .32, Z); });
    eq('ICECREAM', [8.1, 2.6, Z + 1.8], () => softServe(s, 7.6, 2.2, Z));

    // 장비 앞에 놓이는 소품: 포스, 화분
    group('class="fixed"', () => {
      s.shadow(7.55, 3.95, Z, .55, .45);
      box(7.55, 3.95, Z, .55, .45, .08, COL.dark);
      box(7.62, 4.0, Z + .08, .4, .06, .38, COL.navy);
      panel('y', 4.061, 7.66, 7.98, Z + .14, Z + .42, '#3E5F92');
      s.shadow(8.38, 4.05, Z, .36, .36);
      cyl(8.56, 4.23, Z, .18, .3, '#E1E4E8', '#F4F6F8');
      const lp = P(8.56, 4.23, Z + .52);
      [[-9, 2, 15, 10, '#58745A'], [8, -4, 13, 9, '#4E6A52'], [0, -13, 11, 9, '#6E8B6A'], [3, 6, 12, 8, '#5F7D5E']].forEach(([dx, dy, rx, ry, c]) =>
        add(`<ellipse cx="${f(lp[0] + dx)}" cy="${f(lp[1] + dy)}" rx="${rx}" ry="${ry}" fill="${c}"/>`));
    });

    const modelBox = s.bounds();
    FIXED.forEach(l => label(s, l.at, l.off, l.en, l.ko, 'class="lab fixed-lab"'));
    Object.entries(EQUIP).forEach(([k, e]) => label(s, e.at, e.off, e.en, e.ko, `class="lab" data-eq="${k}"`, e.no));
    s.finish(18);
    const fullBox = svg.getAttribute('viewBox');
    const fit = () => svg.setAttribute('viewBox', innerWidth <= 1024 ? s.viewBox(modelBox, 14) : fullBox);
    fit(); addEventListener('resize', fit);

    // 메뉴 구성 → 장비
    const sync = () => {
      const on = new Set([...document.querySelectorAll('[data-mod]')].filter(bt => bt.getAttribute('aria-pressed') === 'true').map(bt => bt.dataset.mod));
      svg.querySelectorAll('[data-eq]').forEach(g => g.classList.toggle('on', on.has(g.dataset.eq)));
      document.querySelectorAll('[data-eq-count]').forEach(n => { n.textContent = String(on.size).padStart(2, '0'); });
    };
    sync();
    const mo = new MutationObserver(sync);
    document.querySelectorAll('[data-mod]').forEach(bt => mo.observe(bt, { attributes: true, attributeFilter: ['aria-pressed'] }));

    // 화면에 들어오면 조립 → 장비 내려놓기
    const start = () => { svg.classList.add('assembled'); setTimeout(() => svg.classList.add('ready'), REDUCE ? 0 : 1300); };
    if (REDUCE) { start(); return; }
    const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { start(); io.disconnect(); } }, { threshold: .3 });
    io.observe(svg);
  }

  /* ---------- 공간 재료 분해도 (층 사이는 --open으로 벌어짐) ---------- */
  function layers(svg) {
    const U = 30, s = scene(svg, U);
    const { P, box, cyl, line, panel, slats, faceText, group, add, f } = s;
    const W = 6.4, D = 4.4, GAP = 3.7, T = .14, TIGHT = .5;
    const z = i => i * GAP;
    const plate = ['rgba(255,255,255,.07)', 'rgba(255,255,255,.04)', 'rgba(255,255,255,.03)'];
    const plateEdge = 'stroke="rgba(185,192,201,.5)" stroke-width=".8"';
    group('class="guides"', () => {
      [[0, D], [W, D], [W, 0]].forEach(([x, y]) => line(P(x, y, 0), P(x, y, z(4) + 1.2), 'stroke="rgba(185,192,201,.45)" stroke-width="1" stroke-dasharray="3 5"'));
    });
    const LEG = ['#C3C9D0', '#9AA2AC', '#7C8590'];
    const stool = (x, y, b) => { cyl(x, y, b, .2, .03, '#9AA2AC', '#C3C9D0'); box(x - .03, y - .03, b + .03, .06, .06, .62, LEG); cyl(x, y, b + .65, .2, .07, COL.wood[1], COL.wood[0]); };
    const table = (x, y, b) => { cyl(x, y, b, .32, .03, '#9AA2AC', '#C3C9D0'); box(x - .04, y - .04, b + .03, .08, .08, .9, LEG); cyl(x, y, b + .93, .55, .07, COL.wood[1], COL.wood[0]); };
    const LAYERS = [
      () => {                                                                     // 01 웜화이트: 바닥·벽·창·문
        const b = z(0) + T;
        box(0, 0, z(0), W, D, T, COL.warm);
        box(0, 0, b, .18, D, 1.5, COL.warm);
        box(.18, 0, b, W - .18, .18, 1.5, COL.warm);
        panel('y', .181, 1.3, 3.6, b + .45, b + 1.2, '#CBD3DD', 'stroke="#FFFFFF" stroke-width="1.4"');
        line(P(2.45, .181, b + .45), P(2.45, .181, b + 1.2), 'stroke="#FFFFFF" stroke-width="1.2"');
        panel('x', .181, 2.7, 3.6, b, b + 1.15, '#D7D4CE', 'stroke="#FFFFFF" stroke-width="1.2"');
        panel('y', .181, 4.2, 5.8, b, b + .06, '#D7D4CE');
      },
      () => {                                                                     // 02 딥블루: 슬랫 카운터·사인·백월
        const b = z(1) + T;
        box(0, 0, z(1), W, D, T, plate, plateEdge);
        box(.02, 2.0, b, .1, 1.8, 1.4, COL.blue);
        panel('y', .02, 1.6, 4.0, b + .95, b + 1.45, '#2E4B74', 'stroke="rgba(255,255,255,.35)" stroke-width=".8"');
        faceText('y', .02, 2.8, b + 1.1, 'dpc', U * .32, '#FFFFFF');
        box(1, .6, b, 4.2, 1.1, .92, COL.blue);
        slats('y', 1.7, 1, 5.2, b + .04, b + .92, ['#2E4B74', '#27426A'], .2);
        slats('x', 5.2, .6, 1.7, b + .04, b + .92, ['#223A5C', '#1D3352'], .2);
        box(.96, .56, b + .92, 4.28, 1.18, .08, COL.warm);
      },
      () => {                                                                     // 03 라이트그레이: 바닥 타일
        box(0, 0, z(2), W, D, T, COL.gray);
        for (let i = .8; i < W; i += .8) line(P(i, 0, z(2) + T), P(i, D, z(2) + T), 'stroke="rgba(14,26,48,.1)"');
        for (let j = .8; j < D; j += .8) line(P(0, j, z(2) + T), P(W, j, z(2) + T), 'stroke="rgba(14,26,48,.1)"');
      },
      () => {                                                                     // 04 그레이 애쉬 우드: 벤치·테이블·스툴
        const b = z(3) + T;
        box(0, 0, z(3), W, D, T, plate, plateEdge);
        box(.25, 1.6, b, .7, 2.5, .5, COL.woodD);
        box(.25, 1.6, b + .5, .7, 2.5, .08, COL.wood);
        table(2.0, 2.4, b); table(2.0, 3.7, b);
        stool(3.0, 2.4, b); stool(3.0, 3.7, b);
        box(4.0, 1.0, b, 1.9, .9, .06, COL.dark);
        box(4.05, 1.05, b + .06, 1.8, .8, .78, COL.woodD);
        box(4.0, 1.0, b + .84, 1.9, .9, .08, COL.wood);
        stool(4.4, 2.35, b); stool(5.4, 2.35, b);
      },
      () => {                                                                     // 05 스테인리스: 작업대·싱크·에스프레소 머신·그라인더
        const b = z(4) + T;
        box(0, 0, z(4), W, D, T, plate, plateEdge);
        box(.6, .3, b, 5.2, 1.2, .62, COL.steel);
        panel('y', 1.5, .7, 5.7, b + .3, b + .32, 'rgba(14,26,48,.18)');
        const t = b + .62;
        box(4.0, .45, t - .02, 1.1, .8, .02, COL.dark);
        cyl(4.55, .5, t, .04, .45, '#AEB6BF', '#DCE1E6');
        line(P(4.55, .5, t + .45), P(4.55, .8, t + .4), 'stroke="#AEB6BF" stroke-width="2.4" stroke-linecap="round"');
        espresso(s, 1.0, .35, t);
        grinder(s, 3.2, .45, t);
      },
    ];
    LAYERS.forEach((draw, i) => {
      const k = (GAP - TIGHT) * i * U;                            // 닫혔을 때 아래로 내려오는 거리
      group(`class="layer" data-layer="${i}" style="--k:${f(k)}px"`, () => {
        draw();
        const p = P(W, 0, z(i));
        add(`<line x1="${f(p[0] + 8)}" y1="${f(p[1])}" x2="${f(p[0] + 30)}" y2="${f(p[1])}" stroke="rgba(255,255,255,.55)"/>`);
        add(`<text x="${f(p[0] + 36)}" y="${f(p[1] + 5)}" font-family="Red Hat Display, sans-serif" font-size="15" font-weight="700" fill="#FFFFFF">0${i + 1}</text>`);
        s.grow(p[0] + 60, p[1]);
      });
    });
    s.finish(20);
  }

  // 다른 페이지 그래픽(js/page-iso.js)이 같은 그리기 도구를 쓰도록 공개
  window.DPCIso = { scene, label, COL, SHINE, espresso, grinder, showcase, panini, softServe };

  document.querySelectorAll('svg[data-store-builder]').forEach(builder);
  document.querySelectorAll('svg[data-space-layers]').forEach(layers);
})();
