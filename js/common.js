/* ---------- 공통 설정: 자료가 생기면 여기만 채우면 됩니다 ---------- */
const SITE = {
  // 가맹문의 접수 주소 (예: 구글 Apps Script 웹앱 URL). 비어 있으면 브라우저에만 임시 저장됩니다.
  FORM_ENDPOINT: '',
  // 푸터 회사 정보
  footer: { company:'', bizno:'', ceo:'', tel:'', mail:'', addr:'' },
};

const isMo = () => innerWidth <= 1024;
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

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
