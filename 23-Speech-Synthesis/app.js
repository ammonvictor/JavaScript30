const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

msg.text = document.querySelector('[name="text"]').value

function populateVoices(event) {
	voices = this.getVoices()
	voicesDropdown.innerHTML = voices.filter(voice => voice.lang.includes("en")).map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`).join('')
}

function setVoice(event) {
	msg.voice = voices.find(voice => voice.name === this.value)
	toogle()
}

function toogle(startOver = true) {
	speechSynthesis.cancel()
	if (startOver) {
		speechSynthesis.speak(msg)
	}
}

function setOption() {
	// if(this.name === "rate") msg.rate = this.value
	// if(this.name === "pitch") msg.pitch = this.value
	// if(this.name === "text") msg.text = this.value
	msg[this.name] = this.value
	toogle()
}

speechSynthesis.addEventListener('voiceschanged', populateVoices)
voicesDropdown.addEventListener('change', setVoice)
options.forEach(option => option.addEventListener('change', setOption))
speakButton.addEventListener('click', toogle)
// stopButton.addEventListener('click', toogle.bind(null, false))
stopButton.addEventListener('click', () => toogle(false))