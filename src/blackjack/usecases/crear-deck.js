import _ from "underscore";

/**
 * 
 * @param   {Arrat<String>} tiposDeCarta     ejemplo: ['C','D','H','S'];
 * @param   {Arrat<String>}         tiposEspeciales  ejemplo: ['A','J','Q','K'];
 * @returns {Arrat<String>} deck
 */


// Esta función crea un nuevo deck
export const crearDeck = (tiposDeCarta, tiposEspeciales) => {


    if(!tiposDeCarta || tiposDeCarta.length === 0) throw new Error('Tipos de carta es obligatorio como un array string');
    

    let deck = [];

    for( let i = 2; i <= 10; i++ ) {
        for( let tipo of tiposDeCarta ) {
            deck.push( i + tipo);
        }
    }

    for( let tipo of tiposDeCarta ) {
        for( let esp of tiposEspeciales ) {
            deck.push( esp + tipo);
        }
    }
    // console.log( deck );
    deck = _.shuffle( deck );

    return deck;

    
}

// export default crearDeck;