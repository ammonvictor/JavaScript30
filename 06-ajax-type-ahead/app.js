'use strict';

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
const search = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')

fetch(endpoint)
	.then(res => res.json())
	.then(data => {
		cities.push(...data)
	})
	.catch(error => console.table(error))

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function findMatches(wordToMatch, cities) {
	return cities.filter(city => {
		const regex = new RegExp(wordToMatch, 'gi')
		return city.city.match(regex) || city.state.match(regex);
	})
}

function displayMatchedRecords(e) {
	if (!this.value) { return; }

	const results = findMatches(this.value, cities)
	const html = results.map(city => {
		const regex = new RegExp(this.value, 'gi')
		const cityName = city.city.replace(regex, `<span class="hl">${this.value}</span>`)
		const stateName = city.state.replace(regex, `<span class="hl">${this.value}</span>`)
		return `
			<li>
				<span class="name">${cityName}, ${stateName}</span>
				<span class="population">${numberWithCommas(city.population)}</span>
			</li>
		`
	}).join('')

	suggestions.innerHTML = html
}

search.addEventListener('input', displayMatchedRecords)