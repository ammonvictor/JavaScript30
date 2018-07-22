let countdown
const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const pageTitle = document.title
const buttons = document.querySelectorAll('[data-time]')

function timer(seconds) {
	clearInterval(countdown)
	const now = Date.now()
	const then = now + seconds * 1000
	displayTimeLeft(seconds)
	displayEndTime(then)

	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000)
		// Check if we should stop
		if (secondsLeft <= 0) {
			clearInterval(countdown)
			return
		}
		// Display timer
		displayTimeLeft(secondsLeft)
	}, 1000)
}

function displayTimeLeft(seconds) {
	const minute = Math.floor(seconds/60)
	const second = seconds % 60
	const display = `${minute}:${second < 10 ? '0' : ''}${second}`
	document.title = `${pageTitle}: ${display}`
	timerDisplay.textContent = display
}

function displayEndTime(timestamp) {
	const end = new Date(timestamp)
	const hour = end.getHours()
	const minute = end.getMinutes()
	const adjustedHour = hour > 12 ? hour - 12 : hour
	endTime.textContent = `Be Back At ${adjustedHour}:${minute < 10 ? '0':''}${minute}`
}

function startTimer(event) {
	const seconds = parseInt(this.dataset.time)
	timer(seconds)
}

buttons.forEach(button => button.addEventListener('click', startTimer))
document.customForm.addEventListener('submit', function(e){
	e.preventDefault()
	timer(this.minutes.value * 60)
	this.reset()
})