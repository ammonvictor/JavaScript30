const hero = document.querySelector('.hero')
const copy = hero.querySelector('h1')
const walk = 100

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
		${xWalk}px ${yWalk}px 0 rgba(255, 0, 49, 0.5),
		${xWalk * -1}px ${yWalk}px 0 rgba(0, 120, 36, 0.7),
		${yWalk }px ${xWalk* -1}px 0 rgba(82, 12, 36, 0.3),
		${yWalk * -1}px ${xWalk}px 0 rgba(98, 20, 6, 0.5)
	`
}

hero.addEventListener('mousemove', dynamicShadow)