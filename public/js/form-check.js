// Functions
/**
 * Checks if the keyword input is empty.
 * Displays a message if input is invalid.
 * @returns true = form is valid, false = form is invalid
 */
function validateKeyword() {
    // Check if input is empty
    if (document.querySelector('#keyword').value == '') {
        document.querySelector('#keywordError').innerHTML = `
            Please enter a keyword.`;
        return false;
    }
    // Return true
    return true;
} // validateKeyword

/**
 * Checks if the likes inputs have valid numbers.
 * Displays a message if input is invalid.
 * @returns true = form is valid, false = form is invalid
 */
function validateLikes() {
    // Get input
    let min = document.querySelector('#min').value
    let max = document.querySelector('#max').value
    let error = document.querySelector('#likesError');

    // Check if input is empty
    if (min == '' || max == '') {
        error.innerHTML = 'Please enter minimum and maximum likes.';
        return false;
    }
    
    // Check if input is NaN
    if(Number.isNaN(min) || Number.isNaN(max)) {
        error.innerHTML = 'Minimum and maximum likes must be positive integers.';
        return false;
    }

    // Check if input has negative numbers
    if (min < 0 || max < 0) {
        error.innerHTML = 'Minimum and maximum likes cannot be negative.';
        return false;
    }

    // Check if min is greater than max
    if (min > max) {
        error.innerHTML = 'Minimum cannot be greater than maximum.';
        return false;
    }

    // Return true
    return true;
} // validateLikes
