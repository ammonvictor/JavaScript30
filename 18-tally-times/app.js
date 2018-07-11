const videos = document.querySelector('.videos')
const videoTimeNodes = Array.from(videos.querySelectorAll('[data-time]'))

function getSeconds(timecode) {
	// Not verbatim representation of a timecode
	const [hour, min, sec] = timecode.split(':').map(parseFloat)

	// Feels unusual and kinda weird
	if (hour && min && sec) {
		return (hour * 3600) + (min * 60) + sec
	}
	// Have server return timecodes in hh:mm:ss
	return (hour * 60) + min
}

function getHumanReadableTime(seconds) {
	return {
		hour: Math.floor(seconds / 3600),
		minute: Math.floor((seconds % 3600) / 60),
		second: seconds - Math.floor(seconds / 60) * 60
	}
}

let totalSeconds = videoTimeNodes.reduce((seconds, videoTimeNode) => {
	return seconds += getSeconds(videoTimeNode.dataset.time)
}, 0)

console.log(getHumanReadableTime(totalSeconds))