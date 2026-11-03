/* ---------- 메뉴 데이터: 메인 '대표 메뉴'와 menu.html이 같이 씁니다 ----------
   name: 메뉴명 / img: 사진 (비어 있으면 빈 썸네일) / desc: 설명 (없으면 이름만 표시)
   카테고리 순서·이름을 바꾸면 메뉴 페이지 탭도 같이 바뀝니다. */
const MENU = [
  { key:'signature', label:'시그니처', items:[
    { name:'도프초코',   img:'img/menu_dope_choco.jpg',  desc:'소스와 파우더가 들어가지 않은 100% 초콜릿을 녹여 만든 꾸덕하고 진한 초코' },
    { name:'도프피치',   img:'img/menu/dope_peach.jpg',  desc:'복숭아청 + 우유거품 + 화이트 2샷' },
    { name:'도프오렌지', img:'img/menu_dope_orange.jpg', desc:'오렌지청 + 우유거품 + 화이트 2샷' },
    { name:'도프베리',   img:'img/menu/dope_berry.jpg',  desc:'딸기청 + 우유거품 + 레드 2샷' },
  ]},
  { key:'coffee', label:'커피', items:[
    { name:'블랙',          img:'img/menu_black.jpg',       desc:'진한 고소함이 길게 남는 블렌드' },
    { name:'화이트',        img:'img/menu_white.jpg',       desc:'견과류의 고소함이 부드럽게 느껴지는 블렌드' },
    { name:'레드',          img:'img/menu_red.jpg',         desc:'베리류 과일향과 기분 좋은 산미가 느껴지는 블렌드' },
    { name:'디카페인',      img:'img/menu_decaf.jpg',       desc:'흑설탕의 단맛이 느껴지는 밸런스 있는 디카페인' },
    { name:'블랙 라떼',     img:'img/menu_black_latte.jpg', desc:'1A급 신선한 우유에 블랙 원두 2샷이 들어간 고소한 라떼' },
    { name:'화이트 라떼',   img:'img/menu_white_latte.jpg', desc:'1A급 신선한 우유에 화이트 원두 2샷이 들어간 밸런스 좋은 라떼' },
    { name:'레드 라떼',     img:'img/menu_red_latte.jpg',   desc:'1A급 신선한 우유에 레드 원두 2샷이 들어간 달콤하고 산뜻한 라떼' },
    { name:'디카페인 라떼', img:'img/menu_decaf_latte.jpg', desc:'1A급 신선한 우유에 블랙 디카페인 2샷이 들어간 고소한 라떼' },
    { name:'카푸치노',      img:'img/menu/cappuccino.jpg' },
    { name:'콜드브루',      img:'img/menu/cold_brew.jpg' },
    { name:'아이스크림라떼', img:'img/menu/icecream_latte.jpg' },
    { name:'토피넛라떼',    img:'img/menu/toffeenut_latte.jpg' },
  ]},
  { key:'noncoffee', label:'논커피', items:[
    { name:'밤라떼',         img:'img/menu/chestnut_latte.jpg' },
    { name:'이천쌀라떼',     img:'img/menu/rice_latte.jpg' },
    { name:'피스타치오라떼', img:'img/menu/pistachio_latte.jpg' },
    { name:'흑임자라떼',     img:'img/menu/blacksesame_latte.jpg' },
    { name:'일반식혜',       img:'img/menu/sikhye.jpg' },
  ]},
  { key:'tea', label:'티', items:[
    { name:'청귤티',     img:'img/menu/greentangerine_tea.jpg' },
    { name:'말차레몬티', img:'img/menu/matcha_lemon_tea.jpg' },
    { name:'매실티',     img:'img/menu/plum_tea.jpg' },
    { name:'오미자티',   img:'img/menu/omija_tea.jpg' },
    { name:'오미자차',   img:'img/menu/omija_tea_hot.jpg' },
    { name:'레몬생강차', img:'img/menu/lemon_ginger_tea.jpg' },
    { name:'대추차',     img:'img/menu/jujube_tea.jpg' },
  ]},
  { key:'juice', label:'주스·스무디', items:[
    { name:'사과오렌지주스', img:'img/menu/apple_orange_juice.jpg' },
    { name:'수박주스',       img:'img/menu/watermelon_juice.jpg' },
    { name:'식혜스무디',     img:'img/menu/sikhye_smoothie.jpg' },
  ]},
  { key:'icecream', label:'아이스크림', items:[
    { name:'아이스크림 딸기쉘', img:'img/menu/icecream_strawberry.jpg' },
    { name:'아이스크림 망고쉘', img:'img/menu/icecream_mango.jpg' },
    { name:'아이스크림 초코쉘', img:'img/menu/icecream_choco.jpg' },
    { name:'아이스크림 흑임자', img:'img/menu/icecream_blacksesame.jpg' },
    { name:'요거트 딸기쉘',     img:'img/menu/yogurt_strawberry.jpg' },
    { name:'요거트 망고쉘',     img:'img/menu/yogurt_mango.jpg' },
    { name:'요거트 초코쉘',     img:'img/menu/yogurt_choco.jpg' },
  ]},
];
