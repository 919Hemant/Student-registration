// DOM Elements
const studentForm = document.getElementById('student-form');
const studentTableBody = document.getElementById('studentTableBody');
const submitButton = document.querySelector('button[type="submit"]');

// Student array to store data
let students = JSON.parse(localStorage.getItem('students')) || [];

// Function to validate input
function validateInput(input, regex, errorMessage) {
    if (!regex.test(input)) {
        alert(errorMessage);
        return false;
    }
    return true;
}

// Function to add or update a student
function addOrUpdateStudent(e) {
    e.preventDefault();

    const studentName = document.getElementById('studentName').value.trim();
    const studentId = document.getElementById('studentId').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contact').value.trim();

    // Validate inputs
    if (!validateInput(studentName, /^[a-zA-Z\s]+$/, 'Student Name must contain only characters')) return;
    if (!validateInput(studentId, /^\d+$/, 'Student ID must be numeric')) return;
    if (!validateInput(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid Email ID')) return;
    if (!validateInput(contact, /^\d{10}$/, 'Contact No. must be a 10-digit number')) return;

    const existingStudentIndex = students.findIndex(student => student.id === studentId);

    if (existingStudentIndex !== -1) {
        // Update existing student
        students[existingStudentIndex] = { name: studentName, id: studentId, email, contact };
        alert('Student updated successfully!');
    } else {
        // Add new student
        students.push({ name: studentName, id: studentId, email, contact });
        alert('Student added successfully!');
    }

    // Save to local storage
    localStorage.setItem('students', JSON.stringify(students));

    // Clear form and update submit button
    studentForm.reset();
    submitButton.textContent = 'Register Student';

    // Update table
    displayStudents();
}

// Function to display students
function displayStudents() {
    studentTableBody.innerHTML = '';

    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
}

// Function to edit a student
function editStudent(index) {
    const student = students[index];
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentId').value = student.id;
    document.getElementById('email').value = student.email;
    document.getElementById('contact').value = student.contact;

    submitButton.textContent = 'Update Student';
}

// Function to delete a student
function deleteStudent(index) {
    if (confirm('Are you sure you want to delete this student?')) {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
        alert('Student deleted successfully!');
    }
}

// Event Listeners
studentForm.addEventListener('submit', addOrUpdateStudent);

// Initial display of students
displayStudents();
