!function(e){function n(c){if(t[c])return t[c].exports;var o=t[c]={i:c,l:!1,exports:{}};return e[c].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var t={};n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,c){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:c})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=2)}([function(e,n,t){"use strict";function c(e,n){m.decodeAudioData(e,function(e){switch(n){case 0:q=e;break;case 1:E=e}console.log("Sample loaded")},function(e){console.log("Error decoding file",e)})}function o(e,n){var t=new window.XMLHttpRequest;t.open("GET",e,!0),t.responseType="arraybuffer",t.onload=function(e){c(this.response,n)},t.send()}function r(e){x=m.createBufferSource(),x.buffer=q,x.loop=!1,x.connect(m.destination),x.start(e)}function a(e){x=m.createBufferSource(),x.buffer=E,x.loop=!1,x.connect(m.destination),x.start(e)}function u(e){v=e.target.value,M.value=v,y=60/v,k=0}function i(e){L=e.target.value,w.innerHTML="";for(var n=0;n<L;n++)w.innerHTML+='<input type="checkbox" id="beatAccents['+n+']" name="beatAccents[]" value="'+n+'" class="beat-accent__checkbox js-accent-checkbox" '+(1===S[n]?" checked":"")+">",w.innerHTML+='<label for="beatAccents['+n+']" class="beat-accent__label"><span class="visually-hidden">Beat '+(n+1)+"</span></label>"}function s(e){if("input"===e.target.tagName.toLowerCase()){document.querySelectorAll(".js-accent-checkbox").forEach(function(e){l(e.value,e.checked?1:0)})}}function l(e,n){S[e]=n}function d(){!1===g?(g=!0,k=0,T=m.currentTime,p(),_.innerHTML="Stop",h.style.display="block"):(g=!1,window.clearTimeout(j),_.innerHTML="Start",h.style.display="none")}function f(){T+=y,k++}function p(){for(;T<m.currentTime+.05;)b(k,T),f();j=window.setTimeout(p,25)}function b(e,n){1===S[k%L]?(r(n),h.classList.add("accent")):(a(n),h.classList.remove("accent")),h.innerHTML=k%L+1}var m=new window.AudioContext,v=100,y=.6,h=document.querySelector(".js-beat-number"),w=document.querySelector(".js-beat-accents"),L=4,g=!1,S=[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],k=0,T=0,j=0,x=null,q=null,E=null,M=document.querySelector(".js-tempo-input");M.addEventListener("change",u,!1),document.querySelector(".js-tempo-select").addEventListener("change",u,!1),document.querySelector(".js-beats-input").addEventListener("change",i,!1);var _=document.querySelector(".js-start-button");_.addEventListener("click",d,!1),document.querySelector(".js-beat-accents").addEventListener("click",s,!1),function(){o("../samples/click_high.wav",0),o("../samples/click_low.wav",1)}()},function(e,n){},function(e,n,t){t(1),e.exports=t(0)}]);