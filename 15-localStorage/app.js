const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || []
const clearTapas = document.querySelector('.clear-all-tapas')

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
	if(!plates.length){
		// console.error('No items in array')
		plateslist.innerHTML = "<li>Loading Tapas...</li>"
		return
	}
	plateslist.innerHTML = plates.map((plate, index) => {
		return `
			<li>
				<input type="checkbox" name="" id="item${index}" data-index=${index} ${plate.done ? 'checked': ''}/>
				<label for="item${index}">${plate.text}</label>
				<button class="delete" data-index=${index}>➖</button>
			</li>`;
	}).join('')
}

function toggleDone(event) {
	if (!event.target.matches('input') && !event.target.matches('button')) return;

	const el = event.target
	const index = el.dataset.index
	
	if (el.matches('button')) {
		items.splice(index, 1)
	}

	if (el.matches('input')) {
		items.map((item, indx) => {
			if (indx == index) {
				item.done = !item.done
			}
		})
	}

	// console.log(items)
	populateList(items, itemsList)
	localStorage.setItem('items', JSON.stringify(items))
}

function clearAllTapas() {
	items.length = 0
	populateList(items, itemsList)
	localStorage.setItem('items', JSON.stringify(items))
}

addItems.addEventListener('submit', addItem)
itemsList.addEventListener('click', toggleDone)
clearTapas.addEventListener('click', clearAllTapas)

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