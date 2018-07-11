const videos = document.querySelector('.videos')
const videoEl = Array.from(videos.querySelectorAll('li[data-time]'))

function getSeconds(timecode) {
	let times = []
	times = ([hour, min, sec] = timecode.split(':'))

	if (times.length === 3) {
		return (Number(times[0]) * 3600) + (Number(times[1]) * 60) + (Number(times[2]))
	}

	return (Number(times[0]) * 60) + Number(times[1])
}

function getHumanReadableTime(seconds) {
	return {
		hour: Math.floor(seconds/3600),
		minute: Math.floor(seconds/60),
		second: seconds - Math.floor(seconds/60) * 60
	}
}

let totalSeconds = videoEl.reduce((seconds, video) => {
	return seconds += getSeconds(video.dataset.time)
}, 0)

console.log(getHumanReadableTime(totalSeconds))