// ==UserScript==
// @name         JPYC Stabilizer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      https://nuko973663.github.io/JPYCstabilizer/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    localStorage.setItem("lowerThreshold", 0.01);
    localStorage.setItem("upperThreshold", 10000);
    let a = 0;
    let b = 0;
    let p1 = parseFloat(localStorage.getItem("p1")) || 150;
    let p2 = parseFloat(localStorage.getItem("p2")) || 0;
    let p3 = parseFloat(localStorage.getItem("p3")) || 10;
    localStorage.setItem("p1", p1);
    localStorage.setItem("p2", p2);
    localStorage.setItem("p3", p3);
    setInterval(function(){
        let r = parseFloat(document.getElementById("jpyusd").innerText);
        if(!isNaN(r) && r != 0 && r != 100){
            if(r != a){
                a = r;
                document.getElementById("swapLowerThreshold").value = r * (10000 - p1 + p2) / 10000;
                document.getElementById("swapUpperThreshold").value = r * (10000 + p1 + p2) / 10000;
                document.getElementById("submitOption").click();
            }
        }
        r = Math.min(parseFloat(document.getElementById("rate").innerText.split("/")[0]), parseFloat(document.getElementById("rate").innerText.split("/")[1]));
        if(!isNaN(r) && r != 0){
            if(r < parseFloat(document.getElementById("swapLowerThreshold").value)){
                b--;
                if(b <= -20){
                    b = 0;
                    if(p2 >= p3 - p1){
                        a = 0;
                        p2 -= p3;
                        localStorage.setItem("p1", p1);
                        localStorage.setItem("p2", p2);
                        localStorage.setItem("p3", p3);
                    }
                }
            }
        }
        r = Math.max(parseFloat(document.getElementById("rate").innerText.split("/")[0]), parseFloat(document.getElementById("rate").innerText.split("/")[1]));
        if(!isNaN(r) && r != 0){
            if(r > parseFloat(document.getElementById("swapUpperThreshold").value)){
                b++;
                if(b >= 20){
                    b = 0;
                    if(p2 <= p1 - p3){
                        a = 0;
                        p2 += p3;
                        localStorage.setItem("p1", p1);
                        localStorage.setItem("p2", p2);
                        localStorage.setItem("p3", p3);
                    }
                }
            }
        }
    }, 1000);
})();
