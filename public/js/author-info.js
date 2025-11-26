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

    // Display Info
    let authorInfo = document.querySelector('#authorInfo');
    authorInfo.innerHTML = `
        <h1>${data[0].firstName} ${data[0].lastName}</h1>
        <img src='${data[0].portrait}' width='200'>
        <h3>${data[0].profession}</h3>
        <p>${data[0].biography}</p>
        `;
}