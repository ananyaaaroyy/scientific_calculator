const display = document.getElementById("display");
const history = document.getElementById("history");
const buttons = document.querySelectorAll("button");

let cur = "";
let hist = [];

function update(){ display.textContent = cur || "0"; }

buttons.forEach(b=>{
  b.onclick = ()=>{
    const v = b.textContent;

    if(v==="C"){cur="";hist=[];history.textContent="";}
    else if(v==="="){
      try{
        const res = eval(cur).toString();
        hist.unshift(cur+" = "+res);
        hist = hist.slice(0,5);
        history.textContent = hist[0];
        cur = res;
      }catch{cur="Error";}
    }
    else if(v==="√"){ cur = Math.sqrt(eval(cur)).toString(); }
    else if(v==="x²"){ cur = Math.pow(eval(cur),2).toString(); }
    else if(v==="sin"){ cur = Math.sin(eval(cur)).toString(); }
    else if(v==="cos"){ cur = Math.cos(eval(cur)).toString(); }
    else if(v==="tan"){ cur = Math.tan(eval(cur)).toString(); }
    else if(v==="π"){ cur += Math.PI.toString(); }
    else if(v==="%"){ cur = (eval(cur)/100).toString(); }
    else{ cur += v; }

    update();
  }
});