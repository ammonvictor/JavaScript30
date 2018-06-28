const dogs = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 }];

function makeGreen() {
  const p = document.querySelector('p');
  p.style.color = '#BADA55';
  p.style.fontSize = '50px';
}

// Regular
console.log('Hello')

// Interpolated
console.log('I am an %s, I\'m a %s %s, I\'m a %s in %s', '👽', '👨🏽‍⚖️', '👽', '🇯🇲', '🗽')

// Styled
console.log('%c Styled output', 'background-color:limegreen; color:white;')

// warning!
console.warn('Oh boy!')

// Error :|
console.error('Tings are getting gagna gagna!')

// Info
console.info('Pistachio nut is actually a fruit %s', '😳')

// Testing
const para = document.querySelector('p')
console.assert(para.classList.contains('Kame Ha Me Ha'), 'And! you call yourself a ninja')

// clearing
// console.clear()

// Viewing DOM Elements
// console.log(para)
// console.dir(para)

// Grouping together
dogs.forEach(dog => {
    console.groupCollapsed(`${dog.name}`)
    console.log(`${dog.name} is a 🐕 `)
    console.log(`${dog.name} is ${dog.age} years old`)
    console.log(`${dog.name} is ${dog.age * 7} years old in human years`)
    console.groupEnd(`${dog.name}`)
})

// counting
console.count(para)

// timing
console.time('Fetching Data')
fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => {
        console.timeEnd('Fetching Data')
        console.table(data)
    })