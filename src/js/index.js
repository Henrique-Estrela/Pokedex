let offset = 0;
const limit = 20;
const maxPage = 1304
const container = document.querySelector(".container-grid");
const btnMore = document.querySelector(".readMore");


function img(pokemon) {
    if (pokemon.sprites.other.dream_world.front_default == null) {
        return `<img class="img-pokemon" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">`
    }else {
        return `<img class="img-pokemon" src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">`
    }
}

function loadPokemons(offset, limit) {
    pokeApi.getpokemons(offset, limit).then((pokemons = []) => {
    const html = pokemons.map((pokemon) => `
     <li class="list-pokemon">
                <div class="pokemon ${pokemon.types[0].type.name}">
                    <span class="number">#${pokemon.id}</span>
                    ${img(pokemon)}
                    <h1 class="name">${pokemon.name}</h1>
                </div>
            </li>
    `).join('')
        container.innerHTML += html

    });
}

loadPokemons(offset, limit)


btnMore.addEventListener('click', () => {
    offset += limit
    const qtnNextPage = offset + limit

    if (qtnNextPage >= maxPage) {
        const newLimit = maxPage - limit
        loadPokemons(offset, newLimit)
        btnMore.parentElement.removeChild(btnMore)

    }else{
        loadPokemons(offset, limit)
    }

})