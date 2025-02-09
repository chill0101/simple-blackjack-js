import {shuffle} from 'underscore';
import './style.css';

/*
    2C = Two of Clubs
    2D = Two of Diamonds
    2H = Two of Hearts
    2S = Two of Spades

    J = Jack
    Q = Queen
    K = King
    A = Ace
*/

const miModulo = (() => {
        'use strict';
        console.log('Inicio de juego');

        let deck          = [];
        const tipos       = ['C', 'D', 'H', 'S'], 
              especiales  = ['J', 'Q', 'K', 'A'];

    // let puntosJugador = 0,
    //     puntosComputadora = 0;

    let puntosJugadores = [];

    //Referencias del HTML
    const   btnPedir = document.querySelector('#btnPedir'),
            btnDetener = document.querySelector('#btnDetener'),
            btnNuevo = document.querySelector('#btnNuevo');

    const   divCartasJugadores = document.querySelectorAll('.divCartas'),
            puntosHTML = document.querySelectorAll('small');

    const inicializarJuego = (numJugadores = 2) => {
        puntosJugadores = [];
        deck = crearDeck();
        //console.log(deck);
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
        console.log(puntosJugadores);
        
        puntosHTML.forEach( elem => elem.innerText = 0);
        divCartasJugadores.forEach( elem => elem.innerHTML = '');

        btnPedir.disabled   = false;
        btnDetener.disabled = false;
    };



    // Esta función crea un nuevo deck
    const crearDeck = () => {
        for(let i = 2; i <=10; i++ ){
            for(let tipo of tipos){
                deck.push(i + tipo);
            }        
        }
        for(let tipo of tipos){
            for(let esp of especiales){
                deck.push(esp + tipo);
            }
        }

        //console.log(deck);

        return _.shuffle(deck);
    }


    inicializarJuego();


    // Esta función me permite tomar una carta
    const pedirCarta = () => {

        if(deck.length === 0){
            throw 'No hay cartas en el deck';
        }

        //console.log(deck);
        //console.log(carta); 
        return deck.pop();
        
    }



    //valor de la carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);

        return (isNaN(valor)) ? 
                (valor === 'A') ? 11 : 10
                : valor * 1;
    }

    const acumularPuntos = (carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
        
    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if( puntosComputadora === puntosMinimos ) {
                alert('Nadie gana :(');
            } else if ( puntosMinimos > 21 ) {
                alert('Computadora gana')
            } else if( puntosComputadora > 21 ) {
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana')
            }
        }, 100 );
    }

    //turno de la computadora
    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do{
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);        
        } while(
            (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21)
        );

        determinarGanador();

    }

    const valor = valorCarta(pedirCarta());
    //console.log(valor);


    // Eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta(); 
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        if(puntosJugador > 21){
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if(puntosJugador === 21){
            console.warn('21, genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }

    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });

    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
    });

    return  {
        nuevoJuego: inicializarJuego
    };

})();

