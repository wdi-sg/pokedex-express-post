function revealContent(){
    var container = document.querySelector('.container');
    container.style.overflow = 'auto';
    container.style.height = 'auto';
    this.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#btn-reveal').addEventListener('click', revealContent);
})