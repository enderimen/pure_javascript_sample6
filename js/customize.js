const list =  'https://gist.githubusercontent.com/ozdemirburak/4821a26db048cc0972c1beee48a408de/raw/95970d4f84617736ba111bef07811db2072f7098/cities_of_turkey.json';

const audio = document.querySelector('.sound');

const cities = [];

fetch(list)
.then(blob => blob.json())
.then(data => cities.push(...data))

function findMatches(wordToMatch,cities) {
	return cities.filter(place =>{
		const regex = new RegExp(wordToMatch,'gi');
		return place.name.match(regex) || place.region.match(regex)
	});
}

function displayMatches() {
	
	audio.currentTime = 0;
	audio.play();

	const matchArray = findMatches(this.value,cities);
	const html = matchArray.map(place =>{
		return `
				<li>
					<span class="name">${place.name},${place.region}</span>
					<span class="population">${place.population}</span>
				</li>
		`;
	}).join('');

	suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
