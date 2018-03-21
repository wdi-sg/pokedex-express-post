function revealContent(){
    var container = document.querySelector('.container');
    container.style.overflow = 'auto';
    container.style.height = 'auto';
    this.style.display = 'none';
}

function toggleSort() {
    var button = document.querySelector('#btn-sort');
    if (window.location.search === "?sortby=name") {
        button.textContent = "Sort by ID";
        button.parentNode.setAttribute('href', '/sort?sortby=id');
    } else if (window.location.search === "?sortby=id") {
        button.textContent = "Sort by Name";
        button.parentNode.setAttribute('href', '/sort?sortby=name');
    }
}

document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#btn-reveal').addEventListener('click', revealContent);
    toggleSort();
})