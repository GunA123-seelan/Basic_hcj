
const data = [
    { id: 1, name: 'John Doe', age: 25, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', age: 30, email: 'jane@example.com' },
    { id: 3, name: 'Paul Walker', age: 45, email: 'paul@example.com' },
    { id: 4, name: 'Alice Johnson', age: 22, email: 'alice@example.com' },
    { id: 5, name: 'Peter Parker', age: 28, email: 'peter@example.com' },
    { id: 6, name: 'Tony Stark', age: 42, email: 'tony@example.com' },
    { id: 7, name: 'Bruce Wayne', age: 35, email: 'bruce@example.com' },
    { id: 8, name: 'Clark Kent', age: 33, email: 'clark@example.com' },
    { id: 9, name: 'Diana Prince', age: 29, email: 'diana@example.com' },
    { id: 10, name: 'Steve Rogers', age: 38, email: 'steve@example.com' },
    { id: 11, name: 'Natasha Romanoff', age: 35, email: 'natasha@example.com' },
    { id: 12, name: 'Wanda Maximoff', age: 27, email: 'wanda@example.com' }
];


const rowsPerPage = 5;
let currentPage = 1;


function displayTable(page) {
    console.log("currentPage",page);
    const start = (page - 1) * rowsPerPage;
    console.log("start",start);
    const end = start + rowsPerPage;
    const paginatedData = data.slice(start, end);
    console.log("paginationData",paginatedData);
    const tableBody = document.querySelector('#dataTable tbody');
    // console.log("tableBody",tableBody);
    tableBody.innerHTML = '';

    paginatedData.forEach(item => {
        console.log("item",item);
        const row = `<tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.age}</td>
            <td>${item.email}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}


function updatePagination() {
    const totalPages = Math.ceil(data.length / rowsPerPage);

    document.getElementById('pageNumber').textContent = currentPage;
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === totalPages;
}


document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayTable(currentPage);
        updatePagination();
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    const totalPages = Math.ceil(data.length / rowsPerPage);
    console.log("totalPages",totalPages,currentPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayTable(currentPage);
        updatePagination();
    }
});

displayTable(currentPage);
updatePagination();
