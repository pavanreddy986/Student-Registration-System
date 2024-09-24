let studentRecords = [];

// Here i defined function to load storage when we refreshed the page
document.addEventListener('DOMContentLoaded', function () {
    loadRecordsFromLocalStorage();
    displayRecords();
});

// here i used eventy listener for form submission
document.getElementById('studentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get values from the form input fields
    let studentName = document.getElementById('studentName').value.trim();
    let studentId = document.getElementById('studentId').value.trim();
    let email = document.getElementById('email').value.trim();
    let contactNumber = document.getElementById('contactNumber').value.trim();

    // Validate form inputs
    if (!studentName || !studentId || !email || !contactNumber) {
        alert('All fields are required.');
        return;
    }

    // Add student record to the array
    let newRecord = `${studentName},${studentId},${email},${contactNumber}`;
    studentRecords.push(newRecord);

    // Update localStorage
    saveRecordsToLocalStorage();

    // Refresh displayed records
    displayRecords();

    // Clear the form
    clearForm();
});

// Function to display records in the table
function displayRecords() {
    let tableBody = document.querySelector('#studentTable tbody');
    tableBody.innerHTML = ''; // Clear the table

    studentRecords.forEach((record, index) => {
        let studentDetails = record.split(',');
        let row = `<tr>
            <td>${studentDetails[0]}</td>
            <td>${studentDetails[1]}</td>
            <td>${studentDetails[2]}</td>
            <td>${studentDetails[3]}</td>
            <td>
                <button onclick="editRecord(${index})">Edit</button>
                <button class="delete" onclick="deleteRecord(${index})">Delete</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Here i used function to store saved records
function saveRecordsToLocalStorage() {
    localStorage.setItem('studentRecords', studentRecords.join(';'));
}

// Here i used function to load records from local storage
function loadRecordsFromLocalStorage() {
    let records = localStorage.getItem('studentRecords');
    if (records) {
        studentRecords = records.split(';');
    }
}

//here i used function to delete record immediatly after an alert
function deleteRecord(index) {
    if (confirm('Are you sure you want to delete this record?')) {
        studentRecords.splice(index, 1);  // Remove the record
        saveRecordsToLocalStorage();      // Update localStorage
        displayRecords();                 // Refresh displayed records
    }
}

// Function to clear form after submission
function clearForm() {
    document.getElementById('studentForm').reset();
}

// here i used function edit the record
function editRecord(index) {
    let record = studentRecords[index].split(',');

    // allowing students to edit the details
    document.getElementById('studentName').value = record[0];
    document.getElementById('studentId').value = record[1];
    document.getElementById('email').value = record[2];
    document.getElementById('contactNumber').value = record[3];

    //here edited item gets removed 
    deleteRecord(index);
}

