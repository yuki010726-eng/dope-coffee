/* ---------- 공통 설정: 자료가 생기면 여기만 채우면 됩니다 ---------- */
const SITE = {
  // 가맹문의 접수 주소 (예: 구글 Apps Script 웹앱 URL). 비어 있으면 브라우저에만 임시 저장됩니다.
  FORM_ENDPOINT: '',
  // 푸터 회사 정보 (tel은 모바일 하단 '전화 상담' 버튼에도 쓰입니다)
  footer: { company:'', bizno:'', ceo:'', tel:'', hours:'', mail:'', addr:'' },
  instagram: 'https://www.instagram.com/dopecoffee_official/',
};

const isMo = () => innerWidth <= 1024;
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- 사이트맵: 헤더·모바일 메뉴·푸터가 같이 씁니다 (to가 null이면 '준비 중') ---------- */
const NAV = [
  { label:'브랜드', to:{ home:'story' }, subs:[
    ['브랜드 스토리', { home:'story' }], ['DOPE A MIND', { home:'story' }], ['즐기는 법', null], ['로스터리', null], ['공간', { home:'design' }] ] },
  { label:'가맹 안내', page:'franchise', to:{ fran:0 }, subs:[
    ['창업 경쟁력', { fran:0 }], ['창업 모델', { home:'model' }], ['창업 절차', { fran:1 }], ['창업 비용', { fran:2 }], ['창업 문의', { fran:3 }] ] },
  { label:'메뉴', page:'menu', to:{ menu:'signature' }, subs:[
    ['시그니처', { menu:'signature' }], ['커피', { menu:'coffee' }], ['논커피', { menu:'noncoffee' }], ['티', { menu:'tea' }],
    ['주스·스무디', { menu:'juice' }], ['아이스크림', { menu:'icecream' }] ] },
  { label:'매장 안내', to:{ home:'stores' }, subs:[
    ['매장 찾기', { home:'stores' }], ['점장 이야기', null] ] },
  { label:'소식', to:null, subs:[
    ['공지', null], ['이벤트', null] ] },
];
const PAGE = document.body.dataset.page || 'home';
function linkAttr(to) {
  if (!to) return 'href="#" data-empty';
  if (to.fran !== undefined) return PAGE === 'franchise'
    ? `href="#franTab0${to.fran + 1}" data-fran-go="${to.fran}"` : `href="franchise.html#franTab0${to.fran + 1}"`;
  if (to.menu) return `href="menu.html?cate=${to.menu}"${PAGE === 'menu' ? ` data-cate="${to.menu}"` : ''}`;
  return PAGE === 'home' ? `href="#${to.home}"` : `href="./#${to.home}"`;
}
const homeAttr = PAGE === 'home' ? 'href="#" data-top' : 'href="./"';
const subLinks = subs => subs.map(([t, to]) => `<a ${linkAttr(to)}>${t}</a>`).join('');

document.getElementById('header').innerHTML = `
  <div class="inner">
    <h2><a ${homeAttr} aria-label="도프커피 홈"><img src="img/logo_black.png" alt="dpc dope coffee roasters"></a></h2>
    <ul class="pc">${NAV.map(n => `<li><a ${linkAttr(n.to)}${n.page === PAGE ? ' class="on"' : ''}>${n.label}</a><div class="sub_cate">${subLinks(n.subs)}</div></li>`).join('')}</ul>
    <a class="hd_cta pc" ${linkAttr({ fran:3 })}>가맹 문의</a>
    <button class="eNavFold mobile" aria-label="메뉴 열기" aria-expanded="false"><span></span><span></span><span></span></button>
  </div>`;

document.querySelector('.drawer').innerHTML = `
  <div class="dim"></div>
  <div class="panel">
    <div class="top">
      <img src="img/logo_black.png" alt="dpc dope coffee roasters">
      <button class="close" aria-label="메뉴 닫기"></button>
    </div>
    <nav>${NAV.map(n => `<div>${n.to ? `<a class="grp" ${linkAttr(n.to)}>${n.label}</a>` : `<p>${n.label}</p>`}${subLinks(n.subs)}</div>`).join('')}</nav>
  </div>`;

document.getElementById('footer').innerHTML = `
  <div class="inner_wrap">
    <div class="inner">
      <div class="ft_top">
        <h2><a ${homeAttr} aria-label="도프커피 홈"><img src="img/wordmark_black.png" alt="dope coffee roasters"></a></h2>
        <ul class="ft_contact">
          <li><span>가맹 상담 전화</span><b class="roboto" data-f="tel"></b></li>
          <li><span>상담 시간</span><b data-f="hours"></b></li>
          <li><span>이메일</span><b data-f="mail"></b></li>
        </ul>
      </div>
      <div class="ft_map">${NAV.map(n => `<div><a class="h" ${linkAttr(n.to)}>${n.label}</a>${subLinks(n.subs)}</div>`).join('')}</div>
      <div class="ft_bot">
        <p><i data-f="company"></i><span>대표자 <i data-f="ceo"></i></span><span>사업자 번호 <i data-f="bizno"></i></span><span>주소 <i data-f="addr"></i></span></p>
        <p class="links"><a href="#" data-empty>이용약관</a><a href="#" data-empty>개인정보처리방침</a><a href="${SITE.instagram}" target="_blank" rel="noopener">인스타그램</a></p>
      </div>
    </div>
  </div>`;

/* ---------- 모바일 하단 바 (메인만) ---------- */
const mbar = document.querySelector('.mbar');
if (mbar) mbar.innerHTML = `
  <a ${SITE.footer.tel ? `href="tel:${SITE.footer.tel.replace(/[^\d+]/g, '')}"` : 'href="#" data-empty'}>전화 상담</a>
  <a ${linkAttr({ fran:3 })}>가맹 문의</a>`;

/* ---------- Footer ---------- */
Object.entries(SITE.footer).forEach(([k, v]) => {
  const el = document.querySelector(`[data-f="${k}"]`);
  if (v && el) el.textContent = v;
});

/* ---------- Header hide on scroll down / floating ---------- */
const header = document.getElementById('header');
const floating = document.getElementById('floating');
let lastY = scrollY;
function onScroll() {
  const y = scrollY;
  header.classList.toggle('hide', y > 100 && y > lastY && !document.body.classList.contains('lock'));
  floating.classList.toggle('show', y > 200);
  lastY = y;
}
addEventListener('scroll', onScroll, { passive: true });
addEventListener('load', onScroll);
onScroll();
const toTop = e => { e.preventDefault(); scrollTo({ top: 0, behavior: 'smooth' }); };
document.getElementById('goTop').addEventListener('click', toTop);
document.querySelectorAll('[data-top]').forEach(a => a.addEventListener('click', toTop));

/* ---------- Mobile menu ---------- */
const drawer = document.querySelector('.drawer');
const navBtn = document.querySelector('.eNavFold');
function setDrawer(open) {
  drawer.classList.toggle('open', open);
  drawer.setAttribute('aria-hidden', !open);
  navBtn.setAttribute('aria-expanded', open);
  document.body.classList.toggle('lock', open);
  document.body.style.overflow = open ? 'hidden' : '';
}
navBtn.addEventListener('click', () => setDrawer(true));
drawer.querySelector('.dim').addEventListener('click', () => setDrawer(false));
drawer.querySelector('.close').addEventListener('click', () => setDrawer(false));
drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setDrawer(false)));
addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('open')) setDrawer(false); });

/* ---------- Toast for pages without content ---------- */
const toast = document.querySelector('.toast');
let toastT;
function showToast(msg) { toast.textContent = msg; toast.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove('on'), 2200); }
document.querySelectorAll('[data-empty]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); showToast('준비 중인 페이지입니다'); }));
