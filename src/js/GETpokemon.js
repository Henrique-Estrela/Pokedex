const pokeApi = {}; // Definição correta do objeto

pokeApi.getDetailPokemon = (pokemon) => {
    return fetch(pokemon.url).then((res) => res.json())
}

pokeApi.getpokemons = (offset = 0, limit = 21) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((res) => res.json())
        .then((data) => data.results)
        .then((dataPokemon) => dataPokemon.map(pokeApi.getDetailPokemon))
        .then((detailPokemon) => Promise.all(detailPokemon))
        .catch((error) => {
            console.log("Erro:", error);
            return [];
        });
};
