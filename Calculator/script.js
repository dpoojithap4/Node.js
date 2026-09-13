function performCalculation(operator) {
    // 1. Fetch raw input values
    const rawNum1 = document.getElementById('num1').value;
    const rawNum2 = document.getElementById('num2').value;
    const resultField = document.getElementById('result');

    // 2. Edge Case: Check for empty input strings before parsing
    if (rawNum1.trim() === '' || rawNum2.trim() === '') {
        alert("One or both input fields are completely empty.");
        resultField.value = '';
        return;
    }

    // 3. Convert inputs to numbers
    const num1 = parseFloat(rawNum1);
    const num2 = parseFloat(rawNum2);

    // 4. Validate inputs to ensure the user entered valid numbers
    if (isNaN(num1) || isNaN(num2)) {
        alert("Please enter valid numbers in both fields before calculating.");
        resultField.value = '';
        return;
    }

    // 5. Edge Case: Prevent calculation with extremely large numbers (Infinity/Overflow)
    const MAX_SAFE_INPUT = 1e15; 
    if (Math.abs(num1) > MAX_SAFE_INPUT || Math.abs(num2) > MAX_SAFE_INPUT) {
        alert("Numbers are too large! Please enter values between -1e15 and 1e15.");
        resultField.value = '';
        return;
    }

    // Variable to temporarily hold the math result
    let calculatedResult = 0;

    // 6. Execute the operation matching the clicked button
    switch (operator) {
        case '+':
            calculatedResult = num1 + num2;
            break;
        case '-':
            calculatedResult = num1 - num2;
            break;
        case '*':
            calculatedResult = num1 * num2;
            break;
        case '/':
            // Edge Case: Prevent division by zero
            if (num2 === 0) {
                alert("Cannot divide by zero!");
                resultField.value = '';
                return;
            }
            calculatedResult = num1 / num2;
            break;
        default:
            resultField.value = '';
            return;
    }

    // 7. Edge Case: Fix JavaScript floating-point precision bugs (e.g., 0.1 + 0.2)
    // Limits the output to 12 decimal places maximum, removing trailing zeros
    calculatedResult = Number(calculatedResult.toFixed(12));

    // 8. Edge Case: Final safety check for absolute numerical stability
    if (isNaN(calculatedResult) || !isFinite(calculatedResult)) {
        alert("The calculation produced an invalid or infinite numerical result.");
        resultField.value = '';
        return;
    }

    // 9. Display the successful result
    resultField.value = calculatedResult;
}