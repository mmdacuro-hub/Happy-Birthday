/* ============ EDIT THESE ============ */
var CFG = {
  code: "110805",          // Her birthday, MMDDYYYY
  name: "My Love",           // Her name or nickname
  from: "Forever yours mawin",     // How you sign off

  letter: [
    "Happy Birthday byyy!! First of all, I want you to know how thankful I am that you came into my life. Out of all the people I could have met, I'm so lucky that I met you. You have become one of the most special part of my life. Thank you for making my ordinary days feel special. Thank you for your smiles, your laughter, your hugs, and even the little things you do without realizing how much they mean to me. You make me happy in ways that words can never fully explain. I know that we are not perfect, and there may be days when things are not easy, but I want you to know that I will always choose to understand you, support you, and grow with you. I don't promise that every day will be perfect, but I promise to keep doing my best to make you feel loved and appreciated. I wish you happiness, good health, peace of mind, and everything your heart has been wishing for. I hope you never forget how beautiful, important, and loved you are. You deserve all the good things life has to offer. I hope we get to celebrate many more birthdays together, create more memories, visit more places, laugh at silly things, and experience more beautiful moments. I look forward to everything that is still waiting for us. Happy birthday once again, my lablab. Thank you for being you. I love you more than words can explain, and I am always grateful to have you in my life. "
  ],

  photos: [
  {src:"photos/us1.jpg",caption:"😘",emoji:"💗"},
  {src:"photos/us2.jpg",caption:"🥰",emoji:"🌷"},
  {src:"photos/us3.jpg",caption:"😍",emoji:"💕"},
  {src:"photos/us4.jpg",caption:"😜",emoji:"🌅"},
  {src:"photos/us5.jpg",caption:"💘",emoji:"💞"},
  {src:"photos/us6.jpg",caption:"❤️‍🩹",emoji:"🥰"},
  {src:"photos/us7.jpg",caption:"💑",emoji:"🍰"},
  {src:"photos/us8.jpg",caption:"💞",emoji:"❤️"},
  {src:"photos/us9.jpg",caption:"💗",emoji:"✨"},
  {src:"photos/us10.jpg",caption:"😘",emoji:"❤️"},
  {src:"photos/us11.jpg",caption:"💞",emoji:"❤️"},
  {src:"photos/us12.jpg",caption:"😍",emoji:"❤️"},
  {src:"photos/us13.jpg",caption:"💞",emoji:"❤️"},
  {src:"photos/us15.jpg",caption:"💑",emoji:"❤️"},
  {src:"photos/us16.jpg",caption:"🥰",emoji:"❤️"},
  {src:"photos/us17.jpg",caption:"❤️‍🩹",emoji:"❤️"}
  ],

  youtubeId: "XTxlCZExaAg"
};
/* ================================== */

var $ = function(s){return document.querySelector(s)};
var views = document.querySelectorAll(".view");

/* floating hearts */
(function(){
  var h = $("#hearts"), e = ["💗","💖","🌸","✨","💕","🎈"];

  for(var i=0;i<20;i++){
    var s = document.createElement("span");
    s.textContent = e[i%e.length];
    s.style.left = Math.random()*100+"%";
    s.style.fontSize = (14+Math.random()*22)+"px";
    s.style.animationDuration = (9+Math.random()*10)+"s";
    s.style.animationDelay = (-Math.random()*14)+"s";
    h.appendChild(s);
  }
})();

function show(id){
  stopSong();
  views.forEach(function(v){
    v.classList.toggle("active",v.id===id);
  });
  window.scrollTo(0,0);
}

document.addEventListener("click",function(e){
  var b = e.target.closest("[data-go]");
  if(b) show(b.dataset.go);
});

/* confetti */
function confetti(){
  var e = ["🎉","💖","🌸","✨","🎈","💕"];

  for(var i=0;i<28;i++){
    var s = document.createElement("span");
    s.className = "cf";
    s.textContent = e[i%e.length];
    s.style.left = "50%";
    s.style.top = "45%";
    s.style.setProperty("--x",(Math.random()*700-350)+"px");
    s.style.setProperty("--y",(Math.random()*600-380)+"px");
    document.body.appendChild(s);

    setTimeout(function(x){
      x.remove();
    }.bind(null,s),1700);
  }
}

/* gate */
var code = $("#code");

code.addEventListener("input",function(){
  code.value = code.value.replace(/\D/g,"").slice(0,8);
  if(code.value.length===8) check();
});

code.addEventListener("keydown",function(e){
  if(e.key==="Enter") check();
});

$("#go").addEventListener("click",check);

function check(){
  if(code.value===CFG.code){
    $("#msg").textContent = "Yes! Welcome, birthday girl 🎉";
    confetti();
    $("#hb").textContent = "Happy Birthday, "+CFG.name+"! 🎂";

    setTimeout(function(){
      show("menu");
    },1300);

  }else{
    $("#msg").textContent = "Not quite, my love 💗 try again";
    code.classList.remove("shake");
    void code.offsetWidth;
    code.classList.add("shake");
  }
}

/* letter */
$("#env").addEventListener("click",function(){
  $("#env").style.display = "none";
  $("#envhint").style.display = "none";

  var p = $("#paper");
  p.style.display = "block";

  p.innerHTML =
    '<div class="to">Dear '+CFG.name+',</div>' +
    CFG.letter.map(function(t){
      return "<p>"+t+"</p>";
    }).join("") +
    '<p class="sign">'+CFG.from+' 💗</p>';

  p.querySelectorAll("p").forEach(function(el,i){
    setTimeout(function(){
      el.classList.add("show");
    },500+i*1100);
  });

  confetti();
});

/* photos */
var grid = $("#grid"), lb = $("#lb");

function photoHTML(p){
  return '<div class="ph">'+
    (p.src ? '<img alt="'+p.caption+'" src="'+p.src+'">' : p.emoji)+
    '</div>'+p.caption;
}

CFG.photos.forEach(function(p){
  var b = document.createElement("button");
  b.className = "pol";
  b.innerHTML = photoHTML(p);

  b.addEventListener("click",function(){
    lb.innerHTML = '<div class="pol">'+photoHTML(p)+'</div>';
    lb.classList.add("on");
  });

  grid.appendChild(b);
});

lb.addEventListener("click",function(){
  lb.classList.remove("on");
});

/* YouTube Birthday Song */
var playing = false;

function setUI(on){
  playing = on;

  $("#disc").classList.toggle("on",on);
  $("#eq").classList.toggle("on",on);

  $("#play").textContent = on ? "❚❚ Stop" : "▶ Play";
}

function startSong(){

  var player = document.createElement("iframe");

  player.id = "youtubePlayer";
  player.width = "100%";
  player.height = "180";

  player.src =
    "https://www.youtube.com/embed/" +
    CFG.youtubeId +
    "?autoplay=1";

  player.allow = "autoplay; encrypted-media";
  player.allowFullscreen = true;

  $("#ytPlayer").innerHTML = "";
  $("#ytPlayer").appendChild(player);

  setUI(true);
}

function stopSong(){
  $("#ytPlayer").innerHTML = "";
  setUI(false);
}

$("#play").addEventListener("click",function(){
  playing ? stopSong() : startSong();
});

/* theme toggle */
$("#theme").addEventListener("click",function(){
  var r = document.documentElement;
  var dark = r.dataset.theme ?
    r.dataset.theme==="dark" :
    matchMedia("(prefers-color-scheme: dark)").matches;

  r.dataset.theme = dark ? "light" : "dark";
  $("#theme").textContent = dark ? "🌙" : "☀️";
});