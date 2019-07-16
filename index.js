const express = require( 'express' );
const jsonfile = require( 'jsonfile' );
const file = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use( express.json() );
app.use( express.urlencoded( {
    extended: true
} ) );

/**
 * ===================================
 * Routes
 * ===================================
 */
app.post( '/pokemon', ( request, response ) => {
    let newPokemonObj = request.body;
    jsonfile.readFile( file, ( err, obj ) => {
        if ( err ) {
            console.log( `ERROR DETECTED WHILE READING: ${err}` );
        } else {
            obj[ "pokemon" ].push( newPokemonObj );
            jsonfile.writeFile( file, obj, ( err ) => {
                if ( err ) {
                    console.log( `ERROR DETECTED WHILE WRITING: ${err}` );
                } else {
                    response.send( "Misson sucess!" );
                }
            } );
        }
    } );
} );

app.get( '/sortPokemon', ( request, response ) => {
    let data = "";
    let sortKey = Object.values(request.query)[0];
    let sortOrder = Object.values(request.query)[1];
    console.log(request.query);
    jsonfile.readFile( file, ( err, obj ) => {
        let pokemonArr;
        if (sortOrder === "asc") {
            pokemonArr = obj["pokemon"].sort( (a, b) => ( a[sortKey] > b[sortKey] ) ? 1 : -1 );
        } else {
            pokemonArr = obj["pokemon"].sort( (a, b) => ( a[sortKey] < b[sortKey] ) ? 1 : -1 );
        }
        pokemonArr.forEach((pokemonObj, index) => {
            data += `<img src=${pokemonObj.img}><p>${pokemonObj.id}: ${pokemonObj.name}</p>` ;
        } );
        response.send (data);
    } );

});

app.get( '/pokemon', ( request, response ) => {
    console.dir( "getting form" );
    let form =  '<html>' +
                '<body>' +
                '<h1>Pokedex</h1>' +
                '<form method="POST" action="/pokemon">' +
                '<p>id</p><input name="id"/>' +
                '<p>num</p><input name="num"/>' +
                '<p>name</p><input name="name"/>' +
                '<p>img</p><input name="img"/>' +
                '<p>height</p><input name="height"/>' +
                '<p>weight</p><input name="weight"/>' +
                '<p><input type="submit"/></p>' +
                '</form>' +
                '</body>' +
                '</html>';
    response.send( form );
} );

// app.get( '/:id', ( request, response ) => {
//     jsonfile.readFile( file, ( err, obj ) => {
//         let inputId = parseInt( request.params.id );
//         let pokemon;
//         for ( let i = 0; i < obj.pokemon.length; i++ ) {
//             let currentPokemon = obj.pokemon[ i ];
//             if ( currentPokemon.id === inputId ) {
//                 pokemon = currentPokemon;
//             }
//         }
//         if ( pokemon === undefined ) {
//             response.status( 404 );
//             response.send( "not found" );
//         } else {
//             response.send( pokemon );
//         }
//     } );
// } );

app.get( '/', ( request, response ) => {
    let data = "";
    jsonfile.readFile( file, ( err, obj ) => {
        if ( err ) {
            console.log( `ERROR DETECTED WHILE READING: ${err}` );
        } else {
            obj[ "pokemon" ].forEach( ( pokemonObj, index ) => data += `<img src=${pokemonObj.img}><p>${pokemonObj.id}: ${pokemonObj.name}</p>` );
            let keysArr = Object.keys(obj[ "pokemon" ][0]);
            let optionData = "";
            keysArr.forEach((value, index) => optionData += `<option value="${keysArr[index]}">${keysArr[index]}</option>`);

            let preData =   '<form method="get" action="/sortPokemon">'+
                            '<select name="keys">'+
                            optionData +
                            '</select>'+
                            '<select name="order">'+
                            '<option value="asc">Ascending</option>'+
                            '<option value="dsc">Descending</option>'+
                            '</select>'+
                            '<input type="submit">'+
                            '<h1>List of Pokemon!</h1>';
            response.send( preData + data );
        }
    } );
} );

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen( 3000, () => console.log( '~~~ Tuning in to the waves of port 3000 ~~~' ) );
