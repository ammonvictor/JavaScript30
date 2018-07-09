const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || []

function addItem(event) {
	event.preventDefault()
	const text = this.querySelector('[name=item').value
	const item = {
		text,
		done: false
	}

	items.push(item)
	populateList(items, itemsList)
	localStorage.setItem('items', JSON.stringify(items))
	this.reset()
}

function populateList(plates = [], plateslist) {
	plateslist.innerHTML = plates.map((plate, index) => {
		return `
			<li>
				<input type="checkbox" name="" id="item${index}" data-index=${index} ${plate.done ? 'checked': ''}/>
				<label for="item${index}">${plate.text}</label>
			</li>`;
	}).join('')
}

function toggleDone(event) {
	if (!event.target.matches('input')) return;
	const el = event.target
	const index = el.dataset.index

	items.map((item, indx) => {
		if (indx == index) {
			item.done = !item.done
		}
	})
	console.log(items)

	localStorage.setItem('items', JSON.stringify(items))
}

addItems.addEventListener('submit', addItem)
itemsList.addEventListener('click', toggleDone)

if (!!items.length) {
	populateList(items, itemsList)
}
// var li = document.createElement('li')

// var input = document.createElement('input')
// input.setAttribute('type', 'checkbox')
// input.setAttribute('class', 'plate')
// input.setAttribute('data-item', '789')

// var label = document.createElement('label')
// label.innerText = "Fish Fingers"

// li.appendChild(input)
// li.appendChild(label)

// itemsList.appendChild(li)