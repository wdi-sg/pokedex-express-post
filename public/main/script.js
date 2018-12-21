var socket = io();

let search = document.getElementById('search');

search.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
        socket.emit('search query', `${search.value}`)
        search.value = '';
    }
});

socket.on('search result', function (obj) {
    displayPokemonInfo(obj)
});

const displayPokemonInfo = (obj) => {
    let pokeName = document.querySelector('.pokemon-name');
    pokeName.innerHTML = `<h1>${obj.name} #${obj.num}</h1>`;
    let pokeImg = document.querySelector('.pokemon-img');
    pokeImg.innerHTML = `<img src="${obj.img}">`;

    let pokeTypes = document.querySelector('.pokemon-types')
    obj.type.length > 1 ? pokeTypes.innerHTML = '<h3>Types</h3>' : pokeTypes.innerHTML = '<h3>Type</h3>';

    let pokeWeaknesses = document.querySelector('.pokemon-weaknesses')
    obj.weaknesses.length > 1 ? pokeWeaknesses.innerHTML = '<h3>Weaknesses</h3>' : pokeWeaknesses.innerHTML = '<h3>Weakness</h3>';

    let pokeHeightWeightEgg = document.querySelector('.height-weight-egg');
    pokeHeightWeightEgg.innerHTML = `Height: ${obj.height} <br> Weight: ${obj.weight} <br> Candy: ${obj.candy} <br> Egg: ${obj.egg}`

    for (let type in obj.type) {
        let pokeType = document.createElement('div');
        pokeType.innerHTML = `${obj.type[type]}`;
        pokeTypes.appendChild(pokeType)
    }
    for (let weakness in obj.weaknesses) {
        let pokeWeakness = document.createElement('div');
        pokeWeakness.innerHTML = `${obj.weaknesses[weakness]}`;
        pokeWeaknesses.appendChild(pokeWeakness)
    }

};