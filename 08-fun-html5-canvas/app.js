"use strict";

function init(e){
	const canvas = document.querySelector('#draw')
	const context = canvas.getContext('2d')

	canvas.width = window.innerWidth
	canvas.height = window.innerHeight

	context.strokeStyle = '#BADA55'
	context.lineJoin = 'round'
	context.lineCap = 'round'
	context.lineWidth = 1
	// context.globalCompositeOperation= 'multiply'

	let isDrawing = false
	let lastX = 0
	let lastY = 0
	let hue = 0
	let direction = true

	function draw(event) {
		if (!isDrawing) return
		// console.log(event)
		
		context.strokeStyle = `hsl(${hue}, 100%, 50%)`

		context.beginPath()
		context.moveTo(lastX, lastY)
		context.lineTo(event.offsetX, event.offsetY)
		context.stroke()

		lastX = event.offsetX
		lastY = event.offsetY

		hue++
		if (hue >= 360) {
			hue = 0
		}

		if (context.lineWidth > 100 || context.lineWidth <= 1) {
			direction = !direction
		}
		if (direction) {
			context.lineWidth++
		} else {
			context.lineWidth--
		}
	}

	canvas.addEventListener('mousedown', (event) => {
		isDrawing = true
		lastX = event.offsetX
		lastY = event.offsetY
	})
	canvas.addEventListener('mousemove', draw)
	canvas.addEventListener('mouseup', () => isDrawing = false)
	canvas.addEventListener('mouseout', () => isDrawing = false)
}

window.addEventListener('load', init)