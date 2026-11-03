/* ---------- 매장 데이터: 메인 '매장 안내', 브랜드 페이지, 가맹안내 지도가 같이 씁니다 ----------
   name: 매장명 / img: 사진 / addr: 주소 / lat·lng: 지도 핀 위치(주소 기준 근사치, 정확한 좌표로 바꿔도 됩니다) */
const STORES = [
  { name:'상암 본점',     img:'img/store_sangam.jpg',    addr:'서울특별시 마포구 월드컵북로54길 17 사보이시티 A동 1층', lat:37.5801, lng:126.8899 },
  { name:'상암 IT점',     img:'img/store_sangam_it.jpg', addr:'서울특별시 마포구 월드컵북로 434 114호', lat:37.5787, lng:126.8889 },
  { name:'이안점',        img:'img/store_ian.jpg',       addr:'서울특별시 마포구 월드컵북로 361 이안오피스텔2단지 1층 111호', lat:37.5752, lng:126.8966 },
  { name:'우리기술점',    img:'img/store_woori.jpg',     addr:'서울특별시 마포구 월드컵북로56길 9 우리기술빌딩 1층 102호', lat:37.5818, lng:126.8884 },
  { name:'DDMC점',        img:'img/store_ddmc.jpg',      addr:'서울특별시 마포구 매봉산로 75 지하1층 B107-19호', lat:37.5779, lng:126.8918 },
  { name:'마곡점',        img:'img/store_magok.jpg',     addr:'서울특별시 강서구 마곡중앙8로5길 63 마곡디엠프라자1차 1층', lat:37.5602, lng:126.8335 },
  { name:'을지로입구역점', img:'img/store_euljiro.jpg',  addr:'서울특별시 중구 남대문로9길 10 1층', lat:37.5663, lng:126.9815 },
  { name:'종로점',        img:'img/store_jongno.jpg',    addr:'서울특별시 종로구 종로16길 11 1층', lat:37.5698, lng:126.9878 },
];
