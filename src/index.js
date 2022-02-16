const pokeForm = document.querySelector('.poke-form');
const pokeList = document.querySelector('.poke-list');

function addPokemon(pokemon) {
	const liEl = document.createElement('li');
	const imgEl = document.createElement('img');
	const h2El = document.createElement('h2');
	const btnDivEl = document.createElement('div');
	const deleteBtnEl = document.createElement('button');
	const likeBtnEl = document.createElement('button');

	liEl.classList.add('pokemon');
	btnDivEl.classList.add('buttons');
	deleteBtnEl.classList.add('action-button');
	deleteBtnEl.classList.add('delete-button');
	likeBtnEl.classList.add('action-button');
	likeBtnEl.classList.add('like-button');
	imgEl.src = pokemon.image;

	h2El.innerText = pokemon.name;
	deleteBtnEl.innerText = 'Delete';
	likeBtnEl.innerText = 'Like';

	likeBtnEl.addEventListener('click', function () {
		fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ like: true }),
		})
	});

	deleteBtnEl.addEventListener('click', function () {
		fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
			method: 'DELETE',
		});
	});

	liEl.append(imgEl, h2El, btnDivEl);
	btnDivEl.append(likeBtnEl, deleteBtnEl);
	pokeList.append(liEl);
}

function addPokemons(pokemons) {
	pokemons.forEach((pokemon) => addPokemon(pokemon));
}

function listenToAddPokemonForm() {
	pokeForm.addEventListener('submit', function (event) {
		event.preventDefault();
		const pokemon = {
			name: pokeForm.name.value,
			image: pokeForm.image.value,
		};

		// CREATE
		fetch('http://localhost:3000/pokemons', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(pokemon),
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (pokemon) {
				addPokemon(pokemon);
			});
		pokeForm.reset();
	});
}

function init() {
	listenToAddPokemonForm();
  getPokemons()
}

function getPokemons() {
  pokeList.innerHTML = ''
  fetch('http://localhost:3000/pokemons')
  .then(function (response) {
    return response.json();
  })
  .then(function (pokemons) {
    addPokemons(pokemons);
  });
}

init();
