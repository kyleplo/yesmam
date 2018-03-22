var result;
var speech = (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition);
var msg = ["Do you like waffles?","Can I chop your head off?","What does the fox say?","Is it muffin time?","Are you going to say 'yes, mam'?","Am I annoying?","Do you like me?","Do you hate me?","Do you like cats?","Can I eat you?","Are you delicious?","Are you stupid?","Do I have to turn on my mic?","Do you like dogs?","Is this a yes or no question?","What do you call a question without an answer?","Are you a stupid chicken?","Are you Siri?"];
var stuff = {"are":"Arrr!!! I'm a pirate!!","yes":"No, mam!","easter":"Eggs! I love eggs!","apple":"No, android!","christmas":"No, easter!","duck":"Quack, make way for ducklings!","can":"Goats eat cans, not me!","sir":"No, sir, you are mam!","speech":"window dot webkit speech recognition","turn":"Turn on yo mic!","skip":"#no-mic","microsoft":"window dot MS speech recognition","fruit":"Speech rhymes with peach!","pirate":"You can't do much!","emojis":"😃🐻🍔⚽🌇💡🔣","rest api":"Use this url with query params: q: question, a: answer, c: continue url (optional), t: disable try again button (optional)","civil":"No, civil!","tired":"Arr!! I'm a tired pirate!","more emojis":"😂💕♟✨🐦😪🔥 https://emojipedia.org/","time":"It's muffin time!","muffin":"No, actually it's 12:30.","android":"hi","eggs":"Eggs: They don't have legs","question without an answer":"...","chicken":"Hmm, am I?","siri":"Hey Siri, can you answer this for me?"};
var stopKey = 9999;
var focusKey = 9999;
var breakKey = 9999;
var p;
window.addEventListener("load",function (){
var url = new URL(location.href);
if(url.searchParams.get("q") && url.searchParams.get("a")){
api(url.searchParams.get("q"),url.searchParams.get("a"),url.searchParams.get("c"),url.searchParams.get("t"));
return false;
};
if(window.speech && !location.hash){
console.log("Has speech recognition");
document.getElementById("text").innerHTML = "Turn on mic!<br><a style='font-size: 50%' href='./index.html#no-mic' onclick='location.reload()'>Skip</a>";
document.title = "Turn on mic!";
var r = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
r.start();
stopKey = setTimeout(function (){
document.getElementById("text").innerHTML = "Enable yo mic!<br><a style='font-size: 50%' href='javascript:void(0);' onclick='location.reload()'>Try Again</a><br><a style='font-size: 50%' href='./index.html#no-mic' onclick='location.reload()'>Use without mic</a>";
document.title = "Enable yo mic!";
},4000)
document.getElementById("text").innerHTML = "...";
document.title = "Recording...";
r.onresult = function (e){
result = e.results[0][0].transcript;
speak();
}
}else{
console.warn("No speech recognition");
if('speechSynthesis' in window){
document.getElementById("text").innerHTML = "...";
document.title = "What do you say?";
document.getElementById("text").innerHTML = "<span contenteditable='true' id='question' style='outline: none'>" + msg[Math.floor(Math.random() * msg.length)] + "</span><br><span style='font-size: 50%;color: grey'>(click to edit, wait to continue)</span>";
focusKey = setTimeout(function (){result = document.getElementById("question").innerHTML;speak();},3000);
document.getElementById("question").addEventListener("focus",function (){clearTimeout(focusKey)});
document.getElementById("question").addEventListener("blur",function (){result = document.getElementById("question").innerHTML;speak();});
}else{
console.error("No speech");
document.getElementById("text").innerHTML = "Unsupported browser :(";
document.title = "Unsupported browser :(";
}
}
});
function speak(){
clearTimeout(stopKey);
document.getElementById("text").innerHTML = result;
document.title = result;
var msg = new SpeechSynthesisUtterance(result);
msg.onend = function (){
var s = Object.keys(stuff);
p = "Yes, mam!";
for(var i = 0;i < s.length;i++){
if(result.toLowerCase().indexOf(s[i]) > -1){p = stuff[s[i]]}
};
breakKey = setTimeout(function (){after()},5000);
after();
};
window.speechSynthesis.speak(msg);
}
function after(){
if(breakKey === "done"){return false;};
clearTimeout(breakKey);
breakKey = "done";
var x = new SpeechSynthesisUtterance(p);
window.speechSynthesis.speak(x);
document.getElementById("text").innerHTML = p;
document.title = p;
setTimeout(function (){
document.getElementById("text").innerHTML += "<br><a style='font-size: 75%' onclick='location.reload()' href='javascript:void(0);'>Try again!</a>";
},1500)
}
function api(q,a,c,t){
history.replaceState({q: q,a: a,c: c}, "", "?");
document.getElementById("text").innerHTML = q;
document.title = q;
var msg = new SpeechSynthesisUtterance(q);
msg.onend = function (){
var x = new SpeechSynthesisUtterance(a);
window.speechSynthesis.speak(x);
document.getElementById("text").innerHTML = a;
document.title = a;
setTimeout(function (){
if(c){document.getElementById("text").innerHTML += "<br><a style='font-size: 50%' target='_blank' href='" + c + "'>Continue</a>"};
if(!t){document.getElementById("text").innerHTML += "<br><a style='font-size: 50%' onclick='location.search = ``;' href='javascript:void(0);'>Try again!</a>"};
document.getElementById("text").innerHTML += "<br><span style='font-size: 50%'>YesMam  by <a href='https://kyleplo.com'>kyleplo</a></span>";
},1500)
};
window.speechSynthesis.speak(msg);
}
