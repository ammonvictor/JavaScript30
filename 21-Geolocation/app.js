const arrow = document.querySelector('.arrow')
const speed = document.querySelector('.speed-value')

navigator.geolocation.watchPosition((data) => {
	console.log(data)
	speed.textContent = data.coords.speed
	arrow.style.transform = `rotate(${data.coords.heading}deg)`
}, (err) => {
	console.error(err)
	/*
	* Notify user you need their approval
	* Guide them on what to do to re-enable
	*/
})