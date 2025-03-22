document.addEventListener('DOMContentLoaded', () => {
    const previousOutput = document.querySelector('.previous-output');
    const currentOutput = document.querySelector('.current-output');
    let lastInputWasOperator = false;
    const MAX_DISPLAY_LENGTH = 16; // Maximum length for display
    const EXP_THRESHOLD = 1e+15; // Threshold for converting to exponential notation
    let currentOperator = null;

    // Function to handle number and operator button clicks
    function handleButtonClick(button) {
        const char = button.textContent;
        const currentText = currentOutput.textContent;

        // Reset current output if it contains invalid values
        if (currentText.toLowerCase() === "undefined" || currentText.toLowerCase() === "infinity" || isNaN(currentText)) {
            currentOutput.textContent = "";
        }

        // Handle operator buttons
        if (['+', '-', '*', '/'].includes(char)) {
            if (lastInputWasOperator) return; // Prevent chaining operators
            if (previousOutput.textContent) {
                // Calculate the result with the previous operand and the current operand
                let result = simpleCalculate(parseFloat(previousOutput.textContent), parseFloat(currentText), currentOperator);
                result = formatResult(result);
                previousOutput.textContent = result + " " + char + " ";
                currentOutput.textContent = "";
                currentOperator = char;
            } else {
                previousOutput.textContent = currentText + " " + char + " ";
                currentOutput.textContent = "";
                currentOperator = char;
            }
            lastInputWasOperator = true;
        } else {
            // Prevent multiple '0' at the beginning and multiple '.'
            if (char === '.' && currentText.includes('.')) return;
            if (char === '0' && currentText === '0') return;
            if (currentText === '0' && char !== '.') {
                currentOutput.textContent = char;
            } else {
                currentOutput.textContent += char;
            }
            lastInputWasOperator = false;
        }
    }

    // Function to perform simple calculations
    function simpleCalculate(num1, num2, operator) {
        switch (operator) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                return num1 / num2;
            default:
                return num2;
        }
    }

    // Add event listeners to number and operator buttons
    document.querySelectorAll(".char-btn").forEach(button => {
        button.addEventListener("click", () => handleButtonClick(button));
    });

    // Function to clear the calculator screen
    function clearScreen() {
        previousOutput.textContent = "";
        currentOutput.textContent = "";
        lastInputWasOperator = false;
        currentOperator = null;
    }

    // Add event listener to reset button
    document.querySelector('.reset').addEventListener('click', () => clearScreen());

    // Function to perform the calculation
    function calculate() {
        try {
            let result = simpleCalculate(parseFloat(previousOutput.textContent), parseFloat(currentOutput.textContent), currentOperator);
            result = formatResult(result);
            previousOutput.textContent = "";
            currentOutput.textContent = result;
            lastInputWasOperator = false;
            currentOperator = null;
        } catch (error) {
            currentOutput.textContent = "Error";
        }
    }

    // Function to format the result and handle large numbers
    function formatResult(result) {
        // Limit the number of decimal places to a maximum of 5 and remove trailing zeros
        if (result.toString().includes('.')) {
            result = parseFloat(result.toFixed(5)).toString();
        }
        // Convert large numbers to exponential notation if necessary
        if (Math.abs(result) >= EXP_THRESHOLD) {
            result = Number(result).toExponential(5).replace(/\.?0+e/, 'e');
        }
        return result;
    }

    // Add event listener to equal button
    document.querySelector('.equal').addEventListener('click', () => calculate());

    // Function to remove the last character from the current output or clear everything if the output is invalid
    function deleteOrClear() {
        let current = currentOutput.textContent;
        if (current.toLowerCase() === "undefined" || current.toLowerCase() === "infinity" || isNaN(current) || current === "Error") {
            clearScreen();
        } else {
            currentOutput.textContent = current.slice(0, -1);
        }
    }

    // Add event listener to delete button
    document.querySelector('.delete').addEventListener('click', () => deleteOrClear());
});