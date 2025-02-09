// Esta función me permite tomar una carta

/**
 * 
 * @param {Arrat<String>} deck es un Array String
 * @returns {String} carta
 */
export const pedirCarta = (deck) => {



    if ( !deck || deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    return carta;
}