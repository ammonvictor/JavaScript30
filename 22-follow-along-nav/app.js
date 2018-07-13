// 👀👀👀👀👀👀👀👀👀👀👀👀👀👀👀

const triggers = Array.from(document.querySelectorAll('a'))
const highlight = document.createElement('span')
highlight.classList.add('highlight')
document.body.append(highlight)

function highlightLink(event) {
	const link = this.getBoundingClientRect()
	const coords = {
		width: link.width,
		height: link.height,
		top: link.top + window.scrollY,
		left: link.left + window.scrollX
	}
	// highlight.style = `width:${link.width}px; height:${link.height}px; top:${link.top}px; bottom:${link.bottom}px; left:${link.left}px; right:${link.right}px`
	highlight.style = `width:${coords.width}px; height:${coords.height}px`
	highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`
}

triggers.forEach(trigger => trigger.addEventListener('mouseenter', highlightLink))