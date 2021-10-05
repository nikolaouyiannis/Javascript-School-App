// Empty array in which student objects will be added.
var students = [];

//Called upon clicking the submit button.
//It creates an object and populates it with the user info.
//Then it calls two other functions.
function onFormSubmit() {
    var std = { fname: '', lname: '', birthdate: '', fees: '', courses: {} };
    
    std['fname'] = document.getElementById('fname').value;
    std['lname'] = document.getElementById('lname').value;
    std['birthdate'] = document.getElementById('birthdate').value;
    std['fees'] = document.getElementById('fees').value;

    //Add course object to the courses array.
    students.push(std);
    insertData(std);
    resetForm();
}

//Sets form's text inputs back to blank after clicking submit button.
function resetForm() {
    document.getElementById('fname').value = '';
    document.getElementById('lname').value = '';
    document.getElementById('birthdate').value = '';
    document.getElementById('fees').value = '';
}

//Adds user input into a table. Takes as parameter the object that was just created.
function insertData(std) {
    //Responds to the table that will be filled.
    const table = document.querySelector(".students-table");
    
    //Every time insertData() is called, a new row is added to the table.
    let newRow = table.insertRow(table.length);
    
    //Creating 5 row cells that will be filled with data.
    cell0 = newRow.insertCell(0);
    cell1 = newRow.insertCell(1);
    cell2 = newRow.insertCell(2);
    cell3 = newRow.insertCell(3);
    cell4 = newRow.insertCell(4);
    
    //First 4 cells contain the object's values.
    cell0.innerText = std['fname'];
    cell1.innerText = std['lname'];
    cell2.innerText = std['birthdate'];
    cell3.innerText = std['fees'];
    
    //Last cells contains the edit/delete/save buttons for data manipulation.
    cell4.innerHTML = ` <button type="button" class="btn-edit-course" onClick="onEdit(this)">Edit</button>
                        <button type="button" class="btn-del-course" onClick="onDelete(this)">Delete</button>
                        <button hidden type="button" class='btn-save-course' onClick=onSave(this)>Save</button>`;
    
    //Global variables that respond to each manipulation button for later use.
    editBtn = document.querySelectorAll('.btn-edit-course');
    delBtn = document.querySelectorAll('.btn-del-course');
    saveBtn = document.querySelectorAll('.btn-save-course');

    //Checking
    console.log(students);
}

//Called upon click the edit button.
function onEdit(td) {
    //Reflects to the selected row.
    let selectedRow = td.parentElement.parentElement;
    //Temporary index. -1 in order to be used in array traversing.
    let tempIndex = (selectedRow.rowIndex - 1);
    //Temporary course object. 
    //Each time the submit button is clicked two things happen simultaneously: 
    //(1) An object is created and it is added to an array, hence it has a unique index.
    //(2) A table row is created, with cells that contain the object's values. This table row has a unique index two.
    //Since these events happen at the same time, the two indexes reflect to the same position in their corresponding container.
    //But arrays' indeces start from 0, and tables row indices start from 1. Hence tempIndex = (selectedRow.rowIndex - 1).
    let tempStd = students[tempIndex];

    //Hiding and showing buttons to prevent unexpected user clicking.
    //Only for the selected row button.
    saveBtn[tempIndex].hidden = false;
    //For all rows buttons.
    for (let i=0; i<students.length; i++) {
        editBtn[i].hidden = true;
        delBtn[i].hidden = true;
    }

    //Altering the cells content in input text in order for the user to write.
    selectedRow.cells[0].innerHTML = `<input type='text' id='editFname'>`;
    selectedRow.cells[1].innerHTML = `<input type='text' id='editLname'>`;
    selectedRow.cells[2].innerHTML = `<input type='date' id='editBirthdate' min="1951-01-01" max="2003-01-01">`;
    selectedRow.cells[3].innerHTML = `<input type='number' id='editFees' min="1" max="2500">`;

    //Assigning as input text value the previously put input.
    document.getElementById('editFname').value = tempStd['fname'];
    document.getElementById('editLname').value = tempStd['lname'];
    document.getElementById('editBirthdate').value = tempStd['birthdate'];
    document.getElementById('editFees').value = tempStd['fees'];

    //Checking
    console.log(students)
}

//Called upon clicking the save button.
function onSave(td) {
    let selectedRow = td.parentElement.parentElement;
    let tempIndex = (selectedRow.rowIndex - 1);
    let tempStd = students[tempIndex];

    //Hidding and showing buttons to prevent unexpected user clicking.
    saveBtn[tempIndex].hidden = true;
    
    for (let i=0; i<students.length; i++) {
        editBtn[i].hidden = false;
        delBtn[i].hidden = false;
    }

    //Altering the data context of the cells.
    selectedRow.cells[0].innerText = document.getElementById('editFname').value;
    selectedRow.cells[1].innerText = document.getElementById('editLname').value;
    selectedRow.cells[2].innerText = document.getElementById('editBirthdate').value;
    selectedRow.cells[3].innerText = document.getElementById('editFees').value;

    //Updating the object's values.
    tempStd['fname'] = selectedRow.cells[0].innerText;
    tempStd['lname'] = selectedRow.cells[1].innerText;
    tempStd['birthdate'] = selectedRow.cells[2].innerText;
    tempStd['fees'] = selectedRow.cells[3].innerText;

    //Checking
    console.log(students)
}

//Called upon clicking the delete button.
function onDelete(td) { 
    let selectedRow = td.parentElement.parentElement;
    let tempIndex = (selectedRow.rowIndex - 1);
    
    if (confirm("This course will be deleted.")){
        //Removes the corresponding table row.
        document.querySelector(".students-table").deleteRow(selectedRow.rowIndex);
        //Removes the corresponding object from the courses array.
        students.splice(tempIndex, 1);
    }
    //Checking
    console.log(students);
}