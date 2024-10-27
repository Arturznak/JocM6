//Constants
const inpuObj = document.getElementById("paraulaSecreta")
const buttonObj = document.getElementById("iniciarPartida")
const mostraObj = document.getElementById("mostrar");
const guionsParaulaObj = document.getElementById("guionsParaula");
const bodyObj = document.body; 

//Variables
let paraulaSecreta;
let guions;
let jugadesRestants = 10;
let puntsPartidaActual = 0;
let totalPartides = 0;
let partidesGuanyades = 0;
let millorPuntaje = 0;
let encertsConsecutius = 0;

// Funció per iniciar la partida
function iniciarPartida(){
    paraulaSecreta = inpuObj.value;
    if(paraulaSecreta === "") {
        alert("Has d’afegir una paraula per poder començar a jugar");
    } else if(!isNaN(paraulaSecreta)) {
        alert("Introdueix una paraula vàlida");
    } else if((paraulaSecreta.length) <= 3) {
        alert("Introdueix una paraula més gran de 3 caràcters");
    } else if(/[0-9]/.test(paraulaSecreta)) { 
        alert("La paraula no pot contenir números");
    } else {
        inpuObj.disabled = true;
        buttonObj.disabled = true;
        jugadesRestants = 10;
        puntsPartidaActual = 0;
        encertsConsecutius = 0;

        mostrarGuions(paraulaSecreta.length);
        actualizarGuions();
        
    }
}
// Funció per mostrar guions per la paraula secreta
function mostrarGuions(longitud) {
    guions = Array(longitud).fill('_'); 
    while (guionsParaulaObj.firstChild) {
        guionsParaulaObj.removeChild(guionsParaulaObj.firstChild); // Elimina tots els fills
    }

     // Crea spans per cada guió i els afegeix al display
    for (let i = 0; i < guions.length; i++) {
        const span = document.createElement("span");
        span.textContent = guions[i] + " "; 
        guionsParaulaObj.appendChild(span); 
    }
}

// Funció per mostrar o ocultar la paraula secreta
function mostrarParaula(){
    if (inpuObj.type === "password") {
        inpuObj.type = "text";
    }else{
        inpuObj.type = "password";
    }
}

// Funció per jugar una lletra
function jugarLletra(lletra) {
    let acertada = false;
    let letraRepetida = 0;

// Comprova si la lletra introduïda és correcta
    for (let i = 0; i < paraulaSecreta.length; i++) {
        if (paraulaSecreta[i].toLowerCase() === lletra.toLowerCase()) {
            if (guions[i] === '_') {
            guions[i] = paraulaSecreta[i];
            acertada = true;
            letraRepetida++;
            }
        }
    }
//Actualitza punts segons si ha estat un encert o no
    if (acertada) {
        incrementarPuntos(true, letraRepetida);
    } else {
        jugadesRestants--;
        incrementarPuntos(false, 0); 
    }

    actualizarGuions();
    actualizarInformacioJugador();

    // Comprova si el jugador ha guanyat o ha perdut
    if (guions.join('') === paraulaSecreta) {
        alert("¡Has guanyat!"); 
        bodyObj.style.backgroundColor = "green"; 
        reiniciarJuego(); 
    } else if (jugadesRestants === 0) {
        alert("Has perdut! La paraula era: " + paraulaSecreta); 
        bodyObj.style.backgroundColor = "red"; 
        reiniciarJuego(); 
    }
}


/// Funció per actualitzar els guions en la pantalla
function actualizarGuions() {
     // Neteja el contenidor de guions
     while (guionsParaulaObj.firstChild) {
        guionsParaulaObj.removeChild(guionsParaulaObj.firstChild); // Elimina els fills
    }

    // Crea span per cada guió i l'afegeix al contenidor
    for (let i = 0; i < guions.length; i++) {
        const span = document.createElement("span");
        span.textContent = guions[i] + " "; 
        guionsParaulaObj.appendChild(span); 
    }
}
// Reiniciar el juego
function reiniciarJuego() {
    inpuObj.disabled = false;
    buttonObj.disabled = false;
    inpuObj.value = ''; 
    while (guionsParaulaObj.firstChild) {
        guionsParaulaObj.removeChild(guionsParaulaObj.firstChild);
    } 
    bodyObj.style.backgroundColor = ""; 
    jugadesRestants = 10;
    puntsPartidaActual = 0;
    encertsConsecutius = 0;
    actualizarInformacioJugador();
}

// Funció per actualitzar la informació del jugador
function actualizarInformacioJugador() {
    document.getElementById("puntsActuals").textContent = `Punts Partida Actual: ${puntsPartidaActual}`;
    document.getElementById("totalPartides").textContent = `Total Partides: ${totalPartides}`;
    document.getElementById("partidesGuanyades").textContent = `Partides Guanyades: ${partidesGuanyades}`;
    document.getElementById("millorPartida").textContent = `Partida amb més punts: ${millorPuntaje}`;
}
// Funció per incrementar punts
function incrementarPuntos(acertada, letraRepetida) {
    if (acertada) {
        encertsConsecutius++;
        puntsPartidaActual += encertsConsecutius;
        if (letraRepetida) {
            puntsPartidaActual *= letraRepetida;
        }
    } else {
        encertsConsecutius = 0;
        puntsPartidaActual = Math.max(0, puntsPartidaActual - 1); 
    }
    actualizarInformacioJugador();
}

// Aquí finalitza y reiniciar la partida
function finalizarPartida(ganada) {
    totalPartides++;
    if (ganada) {
        partidesGuanyades++;
        millorPuntaje = Math.max(millorPuntaje, puntsPartidaActual); 
    }
    puntsPartidaActual = 0; 
    encertsConsecutius = 0;
    actualizarInformacioJugador();
}