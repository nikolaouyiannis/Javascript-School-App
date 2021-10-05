// Empty array in which course objects will be added.
var courses = [];


//Called upon clicking the submit button.
//It creates an object and populates it with the user info.
//Then it calls two other functions.
function onFormSubmit() {
    var course = { lang: '', duration: '', title: '', descr: '' };
    
    course['lang'] = document.getElementById('lang').value;
    course['duration'] = document.getElementById('duration').value;
    course['title'] = document.getElementById('title').value;
    course['descr'] = document.getElementById('descr').value;

    //Add course object to the courses array.
    courses.push(course);
    insertData(course);
    resetForm();
}

//Sets form's text inputs back to blank after clicking submit button.
function resetForm() {
    document.getElementById('title').value = '';
    document.getElementById('descr').value = '';
}

//Adds user input into a table. Takes as parameter the object that was just created.
function insertData(course) {
    //Responds to the table that will be filled.
    const table = document.querySelector(".courses-table");
    
    //Every time insertData() is called, a new row is added to the table.
    let newRow = table.insertRow(table.length);
    
    //Creating 5 row cells that will be filled with data.
    cell0 = newRow.insertCell(0);
    cell1 = newRow.insertCell(1);
    cell2 = newRow.insertCell(2);
    cell3 = newRow.insertCell(3);
    cell4 = newRow.insertCell(4);
    
    //First 4 cells contain the object's values.
    cell0.innerText = course['lang'];
    cell1.innerText = course['duration'];
    cell2.innerText = course['title'];
    cell3.innerText = course['descr'];
    
    //Last cells contains the edit/delete/save buttons for data manipulation.
    cell4.innerHTML = ` <button type="button" class="btn-edit-course" onClick="onEdit(this)">Edit</button>
                        <button type="button" class="btn-del-course" onClick="onDelete(this)">Delete</button>
                        <button hidden type="button" class='btn-save-course' onClick=onSave(this)>Save</button>`;
    
    //Global variables that respond to each manipulation button for later use.
    editBtn = document.querySelectorAll('.btn-edit-course');
    delBtn = document.querySelectorAll('.btn-del-course');
    saveBtn = document.querySelectorAll('.btn-save-course');

    //Checking
    console.log(courses)
}

//Called upon click the edit button.
function onEdit(td) {
    // Reflects to the selected row.
    let selectedRow = td.parentElement.parentElement;
    // Temporary index. -1 in order to be used in array traversing.
    let tempIndex = (selectedRow.rowIndex - 1);
    // Temporary course object. 
    // Each time the submit button is clicked two things happen simultaneously: 
    // (1) An object is created and it is added to an array, hence it has a unique index.
    // (2) A table row is created, with cells that contain the object's values. This table row has a unique index two.
    // Since these events happen at the same time, the two indexes reflect to the same position in their corresponding container.
    // But arrays' indeces start from 0, and tables row indices start from 1. Hence tempIndex = (selectedRow.rowIndex - 1).
    let tempCourse = courses[tempIndex];

    // Hiding and showing buttons to prevent unexpected user clicking.
    // Only for the selected row button.
    saveBtn[tempIndex].hidden = false;
    // For all rows buttons.
    for (let i=0; i<courses.length; i++) {
        editBtn[i].hidden = true;
        delBtn[i].hidden = true;
    }

    // Altering the cells content in input text in order for the user to write.
    selectedRow.cells[2].innerHTML = `<input type='text' id='editTitle'>`;
    selectedRow.cells[3].innerHTML = `<input type='text' id='editDescr'>`;

    // Assigning as input text value the previously put input.
    console.log(document.getElementById('editTitle').value)
    document.getElementById('editTitle').value = tempCourse['title'];
    console.log(document.getElementById('editTitle').value)
    document.getElementById('editDescr').value = tempCourse['descr'];

    // Checking
    console.log(courses)
}

//Called upon clicking the save button.
function onSave(td) {
    let selectedRow = td.parentElement.parentElement;
    let tempIndex = (selectedRow.rowIndex - 1);
    let tempCourse = courses[tempIndex];

    //Hidding and showing buttons to prevent unexpected user clicking.
    saveBtn[tempIndex].hidden = true;
    
    for (let i=0; i<courses.length; i++) {
        editBtn[i].hidden = false;
        delBtn[i].hidden = false;
    }

    //Altering the data context of the cells.
    selectedRow.cells[2].innerText = document.getElementById('editTitle').value;
    selectedRow.cells[3].innerText = document.getElementById('editDescr').value;

    //Updating the object's values.
    tempCourse['title'] = selectedRow.cells[2].innerText;
    tempCourse['descr'] = selectedRow.cells[2].innerText;

    //Checking
    console.log(courses)
}

//Called upon clicking the delete button.
function onDelete(td) { 
    let selectedRow = td.parentElement.parentElement;
    let tempIndex = (selectedRow.rowIndex - 1);
    
    if (confirm("This course will be deleted.")){
        //Removes the corresponding table row.
        document.querySelector(".courses-table").deleteRow(selectedRow.rowIndex);
        //Removes the corresponding object from the courses array.
        courses.splice(tempIndex, 1);
    }
    //Checking
    console.log(courses);
}