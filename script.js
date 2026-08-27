const cultures=[
["🪕","Aceh","Tari Saman, musik tradisional, dan warisan budaya yang kuat."],
["🏠","Sumatera Barat","Rumah Gadang dan kekayaan tradisi Minangkabau."],
["🎶","DKI Jakarta","Ondel-ondel dan budaya Betawi yang ikonik."],
["🧵","Jawa Tengah","Batik, wayang, gamelan, dan beragam tradisi Jawa."],
["🩰","Bali","Tari tradisional, pura, seni ukir, dan upacara adat."],
["🏝️","Sulawesi Selatan","Budaya Bugis-Makassar dan kapal Pinisi yang legendaris."],
["🪶","Papua","Keragaman suku, seni, dan tradisi dari tanah Papua."],
["🎨","Maluku","Musik, tarian, dan tradisi kepulauan yang kaya."]
];
document.getElementById("cultureGrid").innerHTML=cultures.map(c=>`<article class="culture"><div class="emoji">${c[0]}</div><h3>${c[1]}</h3><p>${c[2]}</p></article>`).join("");

const target=new Date("2027-08-17T00:00:00+07:00");
function tick(){let d=Math.max(0,target-Date.now()),s=Math.floor(d/1000);let vals=[Math.floor(s/86400),Math.floor(s%86400/3600),Math.floor(s%3600/60),s%60],ids=["days","hours","minutes","seconds"];ids.forEach((id,i)=>document.getElementById(id).textContent=String(vals[i]).padStart(i?2:3,"0"))}
tick();setInterval(tick,1000);

const questions=[
{q:"Kapan Indonesia memperingati Hari Kemerdekaan?",a:["17 Agustus","28 Oktober","10 November","1 Juni"],c:0},
{q:"Semboyan nasional Indonesia adalah...",a:["Tut Wuri Handayani","Bhinneka Tunggal Ika","Merdeka atau Mati","Indonesia Raya"],c:1},
{q:"Candi Borobudur berada di provinsi...",a:["Jawa Barat","Jawa Tengah","Jawa Timur","DIY"],c:1},
{q:"Rumah adat Minangkabau dikenal sebagai...",a:["Joglo","Honai","Rumah Gadang","Tongkonan"],c:2},
{q:"Warna bendera Indonesia adalah...",a:["Merah Putih","Merah Biru","Putih Hijau","Merah Kuning"],c:0}
];
let qi=-1,score=0,answered=false;const area=document.getElementById("quizArea"),next=document.getElementById("nextQuiz");
function renderQuiz(){if(qi>=questions.length){area.innerHTML=`<div class="quiz-result">🎉 Selesai! Skormu: <b>${score}/${questions.length}</b><br>Terus belajar dan bangga menjadi bagian dari Indonesia!<div class="score-save"><input type="text" maxlength="20" placeholder="Nama kamu" class="score-name"><button class="btn primary save-score-btn" data-category="quiz" data-score="${score}">Simpan ke Leaderboard</button></div></div>`;next.textContent="Main Lagi";qi=-1;score=0;return}let x=questions[qi];area.innerHTML=`<div class="question">${qi+1}. ${x.q}</div><div class="answers">${x.a.map((a,i)=>`<button class="answer" data-i="${i}">${String.fromCharCode(65+i)}. ${a}</button>`).join("")}</div>`;answered=false;document.querySelectorAll(".answer").forEach(b=>b.onclick=()=>{if(answered)return;answered=true;let i=+b.dataset.i,all=document.querySelectorAll(".answer");all.forEach((el,n)=>{el.disabled=true;if(n===x.c)el.classList.add("correct")});if(i===x.c)score++;else all[i].classList.add("wrong")})}
next.onclick=()=>{qi++;renderQuiz()};

const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});document.querySelectorAll(".reveal").forEach(x=>obs.observe(x));
const topBtn=document.getElementById("topBtn");window.addEventListener("scroll",()=>topBtn.classList.toggle("show",scrollY>500));topBtn.onclick=()=>scrollTo({top:0,behavior:"smooth"});
document.getElementById("menuBtn").onclick=()=>document.getElementById("navLinks").classList.toggle("open");
document.querySelectorAll("#navLinks a").forEach(a=>a.onclick=()=>document.getElementById("navLinks").classList.remove("open"));
window.addEventListener("load",()=>{setTimeout(()=>document.getElementById("loading").style.display="none",350)});
