const hero = document.querySelector('.hero')
const copy = hero.querySelector('h1')
const walk = 150

function dynamicShadow(event) {
	const { offsetWidth: width, offsetHeight: height } = hero
	let { offsetX: x, offsetY: y } = event
	
	if (this !== event.target) {
		x = x + event.target.offsetLeft
		y = y + event.target.offsetTop
	}

	// Sets maximum stretch
	const xWalk = Math.round((x / width * walk) - (walk / 2))
	const yWalk = Math.round((y / height * walk) - (walk / 2))

	copy.style.textShadow = `
		${xWalk}px ${yWalk * -1}px 0 rgba(17, 75, 95, .9),
		${xWalk * -1}px ${yWalk}px 0 rgba(69, 105, 144, .88),
		${yWalk }px ${xWalk* -1}px 0 rgba(244, 91, 105, .86),
		${yWalk * -1}px ${xWalk}px 0 rgba(107, 39, 55, .84)
	`
}

hero.addEventListener('mousemove', dynamicShadow)