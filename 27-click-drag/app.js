const slider = document.querySelector('.items')
let isDown = false
let startX
let scrollLeft

function handleMouseDown(event) {
	isDown = true
	this.classList.add('active')
	startX = event.pageX - slider.offsetLeft
	scrollLeft = slider.scrollLeft
}

function handleMouseleave(event) {
	isDown = false
	this.classList.remove('active')
}

function handleMouseUp(event) {
	isDown = false
	this.classList.remove('active')
}

function handleMouseMove(event) {
	if (!isDown) return // Stop firing unless clicked
	event.preventDefault()
	const x = event.pageX - slider.offsetLeft
	const walk = (x - startX) * 3
	slider.scrollLeft = scrollLeft - walk
}

slider.addEventListener('mousedown', handleMouseDown)
slider.addEventListener('mouseleave', handleMouseleave)
slider.addEventListener('mouseup', handleMouseUp)
slider.addEventListener('mousemove', handleMouseMove)