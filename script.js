let button = querySelector('.button');
let form = querySelector('#deletePokeForm');
let input = querySelector('#inputId');

let changeAction = () => {
    let id = this.value;
    console.log(form.action);
    form.action = "/pokemon/" + id + "/delete/";
}

input.addEventListener('change', changeAction);