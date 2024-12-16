const numberButtons = document.querySelectorAll('.button.number');
const operatorButtons = document.querySelectorAll('.button.operator');
const calcDisplay = document.querySelector('.display');
const equalsButton = document.querySelector('.button.equals');

/*-------------------------------- Variables --------------------------------*/
let displayValue = '';
let lastClickedOperator = false; // Flag to track the last button clicked
let storedValue = ''; // Variable to store the previous value
let equalsClicked = false;

/*----------------------------- Event Listeners -----------------------------*/
numberButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    console.log(event.target.innerText);
    if (lastClickedOperator || equalsClicked) {
      storedValue += displayValue; // Append the previous value to storedValue
      displayValue = '';
      equalsClicked = false; // Clear the display value if the last clicked button was an operator
      lastClickedOperator = false; // Reset the flag
    }
    if (displayValue === '0')
      displayValue = '';
    displayValue += event.target.innerText;
    calcDisplay.innerText = displayValue;
  });
});

operatorButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    console.log(event.target.innerText);
    if (event.target.innerText === 'C') {
      storedValue = ''; // Clear stored value when 'C' is clicked
      displayValue = ''; // Clear display value when 'C' is clicked
      calcDisplay.innerText = '0'; // Reset the display to 0
    } else {
      if (!lastClickedOperator) {
        storedValue += displayValue + ` ${event.target.innerText} `; // Append operator with spaces
      } else {
        storedValue = storedValue.trim() + ` ${event.target.innerText} `; // Replace last operator
      }
      displayValue = ''; // Clear the display value
      calcDisplay.innerText = event.target.innerText; // Show the operator
      lastClickedOperator = true; // Set the flag indicating an operator was clicked
    }
  });
});

if (equalsButton) {
  equalsButton.addEventListener('click', (event) => {
    console.log(event.target.innerText);
    try {
      storedValue += displayValue; // Append the last entered number
      const result = eval(storedValue.trim()); // Evaluate the stored expression
      calcDisplay.innerText = result; // Display the result
      displayValue = result.toString();
      clearStorage(); // Update displayValue to the result
      storedValue = ''; // Clear stored value
      lastClickedOperator = false;
      equalsClicked = true; // Reset operator flag
    } catch (error) {
      calcDisplay.innerText = 'Error'; // Display error message
      clearStorage(); // Clear stored value
      displayValue = ''; // Clear display value
    }
  });
}

/*-------------------------------- Functions --------------------------------*/
function clearScreen() {
  calcDisplay.innerText = '0'; // Reset the display to 0
  displayValue = '';
  storedValue = '';
  lastClickedOperator = false;
}


function clearStorage() {
  storedValue = '';
}