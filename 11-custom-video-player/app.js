let initialize = (event) => {
	/* Get Our Elements */
	const player = document.querySelector('.player')
	const video = player.querySelector('.viewer')
	const progress = player.querySelector('.progress')
	const progressBar = player.querySelector('.progress__filled')
	const toggle = player.querySelector('.toggle')
	const skipButtons = player.querySelectorAll('[data-skip]')
	const ranges = player.querySelectorAll('.player__slider')

	let isRangeMoving = false
	let isProgressScrubbing = false

	/* Build out functions */
	function tooglePlay(event) {
		// (video.paused) ? video.play() : video.pause()
		const method = video.paused ? 'play' : 'pause'
		video[method]()
	}
	function updateButton(event) {
		const icon = this.paused ? '►' : '❚ ❚';
		toggle.textContent = icon
	}

	function skipTo (event) {
		video.currentTime += parseFloat(this.dataset.skip)
	}

	function handleRangeUpdate(event){
		if (!isRangeMoving) return
		video[this.name] = this.value
	}

	function handleProgressUpdate(event) {
		const percent = (video.currentTime / video.duration) * 100
		progressBar.style.flexBasis = `${percent}%`
	}

	function scrubTo(event) {
		const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration
		video.currentTime = scrubTime
	}

	/* Hook up the event listeners */
	video.addEventListener('click', tooglePlay)
	video.addEventListener('play', updateButton)
	video.addEventListener('pause', updateButton)
	video.addEventListener('timeupdate', handleProgressUpdate)

	toggle.addEventListener('click', tooglePlay)

	skipButtons.forEach(button => button.addEventListener('click', skipTo))

	ranges.forEach(range => {
		range.addEventListener('change', handleRangeUpdate)
		range.addEventListener('mousemove', handleRangeUpdate)
		range.addEventListener('mousedown', () => isRangeMoving = true)
		range.addEventListener('mouseup', () => isRangeMoving = false)
		range.addEventListener('mouseout', () => isRangeMoving = false)
	})

	progress.addEventListener('click', scrubTo)
	progress.addEventListener('mousemove', (event) => isProgressScrubbing && scrubTo(event))
	progress.addEventListener('mousedown', () => isProgressScrubbing = true)
	progress.addEventListener('mouseup', () => isProgressScrubbing = false)
	progress.addEventListener('mouseout', () => isProgressScrubbing = false)
}

// 
window.addEventListener('load', initialize)