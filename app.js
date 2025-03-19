const display = document.querySelector('#screen')

// Entering Numbers
document.querySelectorAll(".char-btn").forEach(button => {
    button.addEventListener("click", function(e) {
        if (display.value.toLowerCase() === "undefined" || display.value.toLowerCase() === "infinity") {
            display.value = "";
        }        
        display.value += button.textContent;
    });
});

// Clearing Screen
document.querySelector('.reset').addEventListener('click', () => {
    display.value = "";
})

// Calculation
document.querySelector('.equal').addEventListener('click', () =>{
    display.value = eval(display.value)
})

// Removing from end
document.querySelector('.delete').addEventListener('click', () => {
    let current = display.value;
    display.value = current.slice(0, -1);
});




