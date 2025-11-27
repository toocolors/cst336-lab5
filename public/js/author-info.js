// Event Listeners
let authorLinks = document.getElementsByClassName('author');
for (authorLink of authorLinks) {
    authorLink.addEventListener('click', getAuthorInfo);
}

// Functions
/**
 * Gets and displays the portrait and information of the clicked author
 *  inside of a Bootstrap Modal.
 */
async function getAuthorInfo() {
    // Enable Modal
    let myModal = new bootstrap.Modal(document.getElementById('authorModal'));
    myModal.show();

    // Build URL
    let url = `/api/author/${this.id}`;

    // Get Author Info
    let response = await fetch(url);
    let data = await response.json();

    // Get dob and dod
    let birth = new Date(data[0].dob);
    let death = new Date(data[0].dod);
    let dates = `${getMonth(birth.getMonth())} ${birth.getDate()} ${birth.getFullYear()}
        - ${getMonth(death.getMonth())} ${death.getDate()} ${death.getFullYear()}`;

    // Display Info
    let authorInfo = document.querySelector('#authorInfo');
    authorInfo.innerHTML = `
        <h1>${data[0].firstName} ${data[0].lastName}</h1>
        <img src='${data[0].portrait}' width='200'>
        <h3>${data[0].profession}</h3>
        <p>
        Country: ${data[0].country}<br>
        Gender: ${data[0].sex}<br>
        ${data[0].biography}<br>
        ${dates}
        </p>
        `;
}

/**
 * Returns a month name based on the passed in number.
 * Months start at 0 (e.g. 0 = January, 11 = December).
 * @param {Integer} month The number of a month.
 * @returns A string of the name of a month.
 */
function getMonth(month) {
    switch(month) {
        case 0:
            return 'January';
        case 1:
            return 'February';
        case 2:
            return 'March';
        case 3:
            return 'April';
        case 4:
            return 'May';
        case 5:
            return 'June';
        case 6:
            return 'July';
        case 7:
            return 'August';
        case 8:
            return 'September';
        case 9:
            return 'October';
        case 10:
            return 'November';
        case 11:
            return 'December';
        default:
            return 'Undefined';
    }
}