let soundPoint = document.getElementById("soundPoint");
const player = document.getElementById("player");
const enemigo = document.getElementById("enemigo");
const enemigoDos = document.getElementById("enemigoDos");
let victorias = document.getElementById("victorias");
let bomba = document.getElementById("bomba");
let explosion = document.getElementById("explosion");
let soundExplosion = document.getElementById("soundExplosion");
let bombaVisible = false;


// Variables para puntajes y estadísticas
let puntos = 0;
let tiempo = 40;
let necesarios = 40;
let victoria = localStorage.getItem("victoria")
  ? parseInt(localStorage.getItem("victoria"))
  : 0;
let derrotas = localStorage.getItem("derrotas")
  ? parseInt(localStorage.getItem("derrotas"))
  : 0;
let nivelActual = 1;

// Guardar estadísticas en localStorage
function guardarEstadisticas() {
  localStorage.setItem("victoria", victoria);
  localStorage.setItem("derrotas", derrotas);
}

if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
  player.addEventListener("click", () => {
    reproducirSonido();
    sumarPuntos();
  });
} else {
  player.addEventListener("mouseover", () => {
    reproducirSonido();
    sumarPuntos();
  });

  // Funciones del juego
  function derrota() {
    puntos = 0;
    tiempo = 40;
    necesarios = 40;
    enemigo.style.display = "none";
    enemigoDos.style.display = "none";
    bomba.style.display = "none";
    derrotas++;
    Swal.fire({
      title: "PERDISTE",
      icon: "error",
      confirmButtonText: "OKEY",
    }).then((result) => {
      if (result.isConfirmed) {
        guardarEstadisticas();
        nivelActual = 1;
        location.reload();
      }
    });

    document.getElementById("puntos").innerHTML =
      "Puntos: <b>" + puntos + "/" + necesarios + "</b>";
  }

  //Movimiento de la BOMBA
  function movimientoBomba() {
    randNumE = Math.round(Math.random() * 350);
    randNumX = Math.round(Math.random() * 350);
    document.getElementById("bomba").style.marginTop = randNumE + "px";
    document.getElementById("bomba").style.marginLeft = randNumX + "px";
    //Movimiento MOBILE
    if (window.innerWidth <= 560) {
      randNumE = Math.round(Math.random() * 400);
      randNumX = Math.round(Math.random() * 260);
      document.getElementById("bomba").style.marginBottom = randNumE + "px";
      document.getElementById("bomba").style.marginRight = randNumX + "px";
    }
  }

  //Movimiento del enemigo.
  function movimientoEnemigo() {
    randNumE1 = Math.round(Math.random() * 350);
    randNumX1 = Math.round(Math.random() * 350);
    randNumE2 = Math.round(Math.random() * 350);
    randNumX2 = Math.round(Math.random() * 350);
    document.getElementById("enemigo").style.marginTop = randNumE1 + "px";
    document.getElementById("enemigo").style.marginLeft = randNumX1 + "px";
    document.getElementById("enemigoDos").style.marginTop = randNumE2 + "px";
    document.getElementById("enemigoDos").style.marginLeft = randNumX2 + "px";
    //Movimiento MOBILE
    if (window.innerWidth <= 560) {
      randNumE1 = Math.round(Math.random() * 400);
      randNumX1 = Math.round(Math.random() * 400);
      randNumE2 = Math.round(Math.random() * 230);
      randNumX2 = Math.round(Math.random() * 230);
      document.getElementById("enemigo").style.marginBottom = randNumE1 + "px";
      document.getElementById("enemigo").style.marginRight = randNumX1 + "px";
      document.getElementById("enemigoDos").style.marginBottom =
        randNumE2 + "px";
      document.getElementById("enemigoDos").style.marginRight =
        randNumX2 + "px";
    }
 };

    function movimientoBomba() {
      randNumE = Math.round(Math.random() * 350);
      randNumX = Math.round(Math.random() * 350);
      document.getElementById("bomba").style.marginTop = randNumE + "px";
      document.getElementById("bomba").style.marginLeft = randNumX + "px";
    }

    function reproducirSonido() {
      if (!soundPoint.paused) {
        soundPoint.currentTime = 0; // Reinicia el sonido
      }
      soundPoint.play();
    }

    //Movimiento PLAYER
    function sumarPuntos() {
      puntos++;
      document.getElementById("puntos").innerHTML =
        "Points: <b>" + puntos + "/" + necesarios + "</b>";
      document.getElementById("tiempo").innerHTML = "Time:" + tiempo;

      randNum = Math.round(Math.random() * 450);
      randNumX = Math.round(Math.random() * 450);
      document.getElementById("player").style.marginTop = randNumX + "px";
      document.getElementById("player").style.marginLeft = randNum + "px";

      //Movimiento MOBILE
      if (window.innerWidth <= 560) {
        randNum = Math.round(Math.random() * 230);
        randNumX = Math.round(Math.random() * 230);
        document.getElementById("player").style.marginBottom = randNumX + "px";
        document.getElementById("player").style.marginRight = randNum + "px";
      }
      actualizarNivel();
      if (tiempo <= 30 && !bombaVisible) {
        bomba.style.display = "block";
        bombaVisible = true;
      }
      randNum = Math.round(Math.random() * 450);
      randNumX = Math.round(Math.random() * 450);
      document.getElementById("player").style.marginTop = randNumX + "px";
      document.getElementById("player").style.marginLeft = randNum + "px";
      actualizarNivel();
    }

    function actualizarNivel() {
      if (puntos >= necesarios && nivelActual === 1) {
        nivelDos();
      } else if (puntos >= necesarios && nivelActual === 2) {
        nivelTres();
      }
    }

    function nivelDos() {
      enemigo.style.display = "block";
      puntos--;
      tiempo = 40;
      puntos = 0;
      necesarios = 60;
      victoria++;
      document.getElementById("puntos").innerHTML = "Points:" + puntos;
      nivelActual = 2;
      alert("Ganaste");
    }
    function nivelTres() {
      enemigo.style.display = "block";
      enemigoDos.style.display = "block";
      puntos--;
      tiempo = 60;
      puntos = 0;
      necesarios = 80;
      victoria++;
      nivelActual = 3;
    }

    function actualizarNivel() {
      if (puntos >= necesarios && nivelActual === 1) {
        nivelDos();
      } else if (puntos >= necesarios && nivelActual === 2) {
        nivelTres();
      }
    }

    function explotar() {
      soundExplosion.play();
      bomba.style.display = "none";
      explosion.style.transition = "opacity 1s"; // Transición.
      explosion.classList.add("visible");
      tiempo -= 5;
      setTimeout(() => {
        explosion.classList.remove("visible"); // Oculta después de 1 segundos
      }, 1000);
    }

    function nivelDos() {
      tiempo = NaN;
      document.getElementById("puntos").innerHTML = "Points:" + puntos;
      Swal.fire({
        title: "GANASTE",
        icon: "sucess",
        confirmButtonText: "Siguiente nivel",
        background: "linear-gradient(to right, #4caf50, #8bc34a)",
      }).then((result) => {
        if (result.isConfirmed) {
          enemigo.style.display = "block";
          puntos = 0; // Reinicia los puntos al iniciar el nivel 2
          document.getElementById("puntos").innerHTML = "Points: " + puntos; // Actualiza inmediatamente la interfaz
          tiempo = 40;
          necesarios = 60;
          victoria++;
          nivelActual = 2;
        }
      });
    }

    function nivelTres() {
      enemigo.style.display = "block";
      enemigoDos.style.display = "block";
      puntos = 0; // Reinicia los puntos al iniciar el nivel 2
      document.getElementById("puntos").innerHTML = "Points: " + puntos; // Actualiza inmediatamente la interfaz
      tiempo = 60;
      necesarios = 80;
      victoria++;
      nivelActual = 3;
      alert("Ganaste");
    }

    function restarTiempo() {
      document.getElementById("tiempo").innerHTML = "Time:" + tiempo;
      tiempo--;
      if (tiempo === 0) {
        tiempo = NaN;
        Swal.fire({
          title: "PERDISTE",
          icon: "error",
          confirmButtonText: "OKEY",
        }).then((result) => {
          if (result.isConfirmed) {
            puntos = 0;
            tiempo = 30;
            necesarios = 40;
            location.reload();
            derrotas++;
            guardarEstadisticas();
          }
        });
      }
    }

    victorias.addEventListener("click", () => {
      alert(`Tienes: ${victoria} victorias y ${derrotas} derrotas.`);
    });

    // Actualizar las estadísticas cada vez que el juego termina
    setInterval(restarTiempo, 1000);
    setInterval(movimientoEnemigo, 450);
    setInterval(movimientoBomba, 450);

    document.getElementById("tiempo").innerHTML = "Time:" + tiempo;
    tiempo--;
    if (tiempo <= 0) {
      alert("You lost..");
      puntos = 0;
      tiempo = 30;
      necesarios = 40;
      location.reload();
      derrotas++;
    }
  }
  victorias.addEventListener("click", () => {
    alert(`Tienes: ${victoria} victorias y ${derrotas} derrotas.`);
  });
  
  // Ejecutando funciones
enemigo.addEventListener("mouseover", derrota);
enemigoDos.addEventListener("mouseover", derrota);
bomba.addEventListener("mouseover", explotar);
  
setInterval(movimientoEnemigo, 450);
setInterval(movimientoBomba, 450);
