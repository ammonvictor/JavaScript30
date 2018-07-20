const triggers = document.querySelectorAll('.cool > li')
const dropdownBackground = document.querySelector('.dropdownBackground')
const nav = document.querySelector('.top')

function handleEnter(event) {
	this.classList.add('trigger-enter')
	setTimeout(() => {
		if (this.classList.contains('trigger-enter')) {
			this.classList.add('trigger-enter-active')
		}
	}, 150)
	dropdownBackground.classList.add('open')

	const dropdown = this.querySelector('.dropdown')
	const dropdownCoords = dropdown.getBoundingClientRect()
	const navCoords = nav.getBoundingClientRect()
	
	const coords = {
		height: dropdownCoords.height,
		width: dropdownCoords.width,
		top: (dropdownCoords.top - navCoords.top),
		left: (dropdownCoords.left - navCoords.left)
	}

	// dropdownBackground.style = `height: ${coords.height}px; width: ${coords.width}px; top: ${coords.top}px; left: ${coords.left}px`
	dropdownBackground.style.setProperty('height', `${coords.height}px`)
	dropdownBackground.style.setProperty('width', `${coords.width}px`)
	dropdownBackground.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`)
}

function handleLeave(event) {
	// setTimeout(() => { this.classList.remove('trigger-enter-active') }, 150)
	this.classList.remove('trigger-enter', 'trigger-enter-active')
	dropdownBackground.classList.remove('open')
}

triggers.forEach(trigger => {
	trigger.addEventListener('mouseenter', handleEnter)
	trigger.addEventListener('mouseleave', handleLeave)
})