//Declarando variables.
const player =document.getElementById("player");
const enemigo = document.getElementById("enemigo");
const enemigoDos = document.getElementById("enemigoDos");
let victorias = document.getElementById("victorias");
let bomba = document.getElementById("bomba");
let explosion = document.getElementById("explosion");

//Ejecutando funciones.

enemigo.addEventListener("mouseover", derrota);
bomba.addEventListener("mouseover", explotar);
player.addEventListener("mouseover", sumarPuntos);

//Utilidades básicas del juego 
let puntos = 0;
let tiempo = 40;
let necesarios= 40;
let victoria= 0;
let derrotas = 0;
nivelActual = 1;
//Creando funciones.

function derrota(){
puntos = 0;
tiempo = 30;
necesarios = 40;
derrotas++
alert("You lost.")
location.reload()
document.getElementById("puntos").innerHTML = 'Puntos: <b>' + puntos + "/" + necesarios + "</b>";
}
localStorage.getItem("victoria", victoria);
localStorage.getItem("derrotas", derrotas);

function movimientoBomba(){
    randNumE = Math.round(Math.random()*350);
    randNumX = Math.round(Math.random()*350);
    document.getElementById("bomba").style.marginTop =  randNumE + "px"
    document.getElementById("bomba").style.marginLeft =  randNumX + "px"
}

function movimientoEnemigo(){
    randNumE = Math.round(Math.random()*250);
    randNumX = Math.round(Math.random()*350);
    document.getElementById("enemigo").style.marginTop =  randNumE + "px"
    document.getElementById("enemigo").style.marginRight =  randNumX + "px"
    document.getElementById("enemigoDos").style.marginTop =  randNumE + "px"
    document.getElementById("enemigoDos").style.marginLeft =  randNumX + "px"
}

function sumarPuntos(){
    puntos++;
    document.getElementById("puntos").innerHTML = 'Points: <b>' + puntos + "/" + necesarios + "</b>";
    document.getElementById("tiempo").innerHTML = 'Time:' + tiempo;
    randNum = Math.round(Math.random()*450);
    randNumX = Math.round(Math.random()*450);
    document.getElementById("player").style.marginTop =  randNumX + "px"
    document.getElementById("player").style.marginLeft  =  randNum + "px"    
    actualizarNivel()
 }

 function actualizarNivel(){
    if(puntos>= necesarios && nivelActual ===1){
        nivelDos()
    }

    else if(puntos>=necesarios && nivelActual===2){
        nivelTres()
    }
 }


function explotar()  {
 bomba.style.display = "none"
 explosion.style.display = "block" 
 explosion.style.transition = "1s"
 tiempo -= 5  
 alert("Haz explotado una bomba y perdido 5 segundos.")
 setInterval(() =>{
    explosion.style.display = "none"
 }, 5000)
}


function nivelDos(){ 
        enemigo.style.display = "block"
        puntos--
        tiempo=40;
        puntos = 0;
        necesarios = 60
        victoria++
        document.getElementById("puntos").innerHTML = 'Points:' + puntos;
        nivelActual = 2
        alert("Ganaste")
}
function nivelTres(){
    enemigo.style.display = "block"
    enemigoDos.style.display = "block"
    puntos--
    tiempo=60;
    puntos = 0;
    necesarios = 80
    victoria++
    nivelActual = 3
}

function restarTiempo() {
    document.getElementById("tiempo").innerHTML = 'Time:' + tiempo
    tiempo--
    if(tiempo <=0) {
        alert("You lost..")
        puntos = 0;
        tiempo = 30;
        necesarios = 40;
        location.reload()
        derrotas++
    }
}
victorias.addEventListener("click",() => {
    alert(`Tienes: ${victoria} victorias y ${derrotas} derrotas.`)  
})
setInterval(restarTiempo, 1000)
setInterval(movimientoEnemigo, 450)
setInterval(movimientoBomba, 450)