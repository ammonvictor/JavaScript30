let initialize = () => {
    const inbox = document.querySelector('.inbox')
    const checkboxes = inbox.querySelectorAll('input[type=checkbox]')

    let lastChecked

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', handleChecked)
    })
    
    function handleChecked (event) {
        let inBetween = false

        if (event.shiftKey && this.checked) {
            checkboxes.forEach(checkbox => {

                console.log(checkbox)
                
                if (checkbox === this || checkbox ===  lastChecked) {
                    inBetween = !inBetween
                    console.log('In between items')
                }
                
                if (inBetween) {
                    checkbox.checked = true
                }
            })
        }
        
        lastChecked = this
    }
}

window.addEventListener('load', initialize)