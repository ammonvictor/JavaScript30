const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

const bandsUl = document.querySelector('ul#bands')
let liHtml = ""

function stripArticle(bandName) {
	return bandName.replace(/^(a |the |an )/i, '').trim()
}

bands
.sort((a,b) => stripArticle(a) > stripArticle(b) ? 1 : -1)
.forEach(band => {
	liHtml += `<li>${band}</li>`
})

// ||
// .map(band => liHtml += `<li>${band}</li>`).join()

// console.table(bands)
bandsUl.innerHTML = liHtml