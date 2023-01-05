//Declarando variables.
const player =document.getElementById("player");
const enemigo = document.getElementById("enemigo");
let victorias = document.getElementById("victorias");
let bomba = document.getElementById("bomba");
let explosion = document.getElementById("explosion");

//Ejecutando funciones.

enemigo.addEventListener("mouseover", derrota);
bomba.addEventListener("mouseover", explotar);
player.addEventListener("mouseover", sumarPuntos);

//Utilidades básicas del juego 
puntos = 0;
tiempo = 40;
necesarios= 30;
victoria= 0;
derrotas = 0;
//Creando funciones.

function derrota(){
puntos = 0;
tiempo = 40;
necesarios = 30;
derrotas++
alert("You lost.")
enemigo.style.display = "none"
document.getElementById("puntos").innerHTML = 'Puntos: <b>' + puntos + "/" + necesarios + "</b>";
}

function movimientoBomba(){
    randNumE = Math.round(Math.random()*250);
    document.getElementById("bomba").style.marginTop =  randNumE + "px"
    document.getElementById("bomba").style.marginRight =  randNumE + "px"
}

function movimientoEnemigo(){
    randNumE = Math.round(Math.random()*250);
    document.getElementById("enemigo").style.marginTop =  randNumE + "px"
    document.getElementById("enemigo").style.marginRight =  randNumE + "px"
}

function sumarPuntos(){
    puntos++;
    document.getElementById("puntos").innerHTML = 'Points: <b>' + puntos + "/" + necesarios + "</b>";
    document.getElementById("tiempo").innerHTML = 'Time:' + tiempo;
    randNum = Math.round(Math.random()*450);
    document.getElementById("player").style.marginTop =  randNum + "px"
    document.getElementById("player").style.marginLeft  =  randNum + "px"
    nivelDos()
}


function explotar()  {
 bomba.style.display = "none"
 explosion.style.display = "block" 
 tiempo -= 5  
 alert("Haz explotado una bomba y perdido 5 segundos.")
}



function nivelDos(){ 
    if(puntos>= necesarios) {
        enemigo.style.display = "block"
        puntos--
        tiempo=40;
        puntos = 0;
        necesarios = 60
        victoria++
        document.getElementById("puntos").innerHTML = 'Points:' + puntos;
        alert("You won.")  
    }

    
}

function restarTiempo() {

    document.getElementById("tiempo").innerHTML = 'Time:' + tiempo
    tiempo--
    if(tiempo === 0) {
        alert("You lost..")
        puntos = 0;
        tiempo = 40;
        necesarios = 30;
        derrotas++
    }
}

victorias.addEventListener("click",() => {
    alert("Do you won " + victoria + " And you lost " + derrotas)  
})

setInterval(movimientoEnemigo, 450)
setInterval(restarTiempo, 1000)
setInterval(movimientoBomba, 450)

