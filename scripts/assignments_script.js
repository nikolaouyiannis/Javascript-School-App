// Couldn't import courses array from courses_script
// Using dummy courses instead.

var dummyCourses = [
    { lang: 'C#', duration: 'Full Time', title: 'CB13FTCS', descr: '12 weeks' },
    { lang: 'C#',duration: 'Part Time',title: 'CB13PTCS',descr: '24 weeks' },
    { lang: 'Java',duration: 'Full Time',title: 'CB13FTJA',descr: '12 weeks' },
    { lang: 'Java',duration: 'Part Time',title: 'CB13PTJA',descr: '24 weeks' },
    { lang: 'Javascript',duration: 'Full Time',title: 'CB13FTJS',descr: '12 weeks' },
    { lang: 'Javascript',duration: 'Part Time',title: 'CB13FTJS',descr: '24 weeks' },
    { lang: 'Python',duration: 'Full Time',title: 'CB13FTPY',descr: '12 weeks' },
    { lang: 'Python',duration: 'Part Time',title: 'CB13FTPY',descr: '24 weeks' }
];

// Empty array in which assignment objects will be added.
var assignments = [];

// Called upon loading assignments page.
// Populates courses table with course objects.
function populateCoursesTable() {
    //Responds to the table that will be filled.
    const coursesTable = document.querySelector('.courses-table');
    
    // Creating a new row for each course.
    // Creating cells for each row.
    // Filling cells with data.
    for (let i=0; i<dummyCourses.length; i++) {
        var newRow = coursesTable.insertRow(-1);
        cell0 = newRow.insertCell(0);
        cell1 = newRow.insertCell(1);
        cell2 = newRow.insertCell(2);
        cell3 = newRow.insertCell(3);
        cell4 = newRow.insertCell(4);
        cell0.innerText = dummyCourses[i]['lang'];
        cell1.innerText = dummyCourses[i]['duration'];
        cell2.innerText = dummyCourses[i]['title'];
        cell3.innerText = dummyCourses[i]['descr'];
        cell4.innerHTML = `<button type="button" class="btn-add-ass" onClick="onAddAss(this)">Add Assignment</button>`
    };
    // Add button.
    addBtn = document.querySelectorAll('.btn-add-ass');
}

// Called upon click the add button.
function onAddAss(td) {
    let selectedRow = td.parentElement.parentElement;
    // Responds to the table that will be filled.
    const assTable = document.querySelector('.assignments-table');
    let newRow = assTable.insertRow(assTable.length);
    cell0 = newRow.insertCell(0);
    cell1 = newRow.insertCell(1);
    cell2 = newRow.insertCell(2);
    cell3 = newRow.insertCell(3);
    cell4 = newRow.insertCell(4);
    // cell0 responds to Course Title field.
    cell0.innerText = selectedRow.cells[2].innerText;
    cell1.innerHTML = `<input type=text id='assTitle'>`;
    cell2.innerHTML = `<input type=text id='assDescr'>`;
    cell3.innerHTML = `<input type=text id='assDeadline'>`;
    cell4.innerHTML = ` <button type="button" class='btn-save-ass' onClick=onSaveAss(this)>Save</button>
                        <button hidden type="button" class='btn-edit-ass' onClick=onEditAss(this)>Edit</button>
                        <button hidden type="button" class='btn-del-ass' onClick=onDelAss(this)>Delete</button>
                        <button hidden type="button" class='btn-save-changes' onClick=onSaveChanges(this)>Save Changes</button>`;
    // Manupulation buttons.                        
    saveBtn = document.querySelectorAll('.btn-save-ass');
    editBtn = document.querySelectorAll('.btn-edit-ass');
    delBtn = document.querySelectorAll('.btn-del-ass');
    saveChangesBtn = document.querySelectorAll('.btn-save-changes');

    // Disabling all add course buttons to prevent unexpected user clicking.
    // Will be enabled after clicking the save assignment button.
    for (let i=0; i<dummyCourses.length; i++) {
        addBtn[i].disabled = true;
    }
}

// Called upon click the save button.
function onSaveAss(td) {
    let selectedRow = td.parentElement.parentElement;
    // Temporary index. -1 in order to be used in array traversing.
    let tempIndex = (selectedRow.rowIndex - 1);
    // New assignment object.
    var ass = { course_title: '', ass_title: '', ass_descr: '', ass_deadline: ''};
    // Changing the visibility of the buttons in the specific row that the last assignment was entered.
    saveBtn[tempIndex].hidden = true;
    editBtn[tempIndex].hidden = false;
    delBtn[tempIndex].hidden = false;
    saveChangesBtn[tempIndex].hidden = true;

    // Enabling all add course buttons for the user to be able to add another assignment per course.
    for (let i=0; i<dummyCourses.length; i++) {
        addBtn[i].disabled = false;
    }
    // Changing the content of the assignments table cells from input type to the value of the input type.
    selectedRow.cells[1].innerText = document.getElementById('assTitle').value;
    selectedRow.cells[2].innerText = document.getElementById('assDescr').value;
    selectedRow.cells[3].innerText = document.getElementById('assDeadline').value;
    // Filling the assignment object keys with values.
    ass['course_title'] = selectedRow.cells[0].innerText;
    ass['ass_title'] = selectedRow.cells[1].innerText;  
    ass['ass_descr'] = selectedRow.cells[2].innerText; 
    ass['ass_deadline'] = selectedRow.cells[3].innerText;
    // Adding the assignment object to the assignments array.
    assignments.push(ass);
    // Checking.
    console.log(assignments)
}

// Called upon click the edit assignment button.
function onEditAss(td) {
    let selectedRow = td.parentElement.parentElement;
    // Temporary index. -1 in order to be used in array traversing.
    let tempIndex = (selectedRow.rowIndex - 1);
    // Temporary course object. 
    // Each time the submit button is clicked two things happen simultaneously: 
    // (1) An object is created and it is added to an array, hence it has a unique index.
    // (2) A table row is created, with cells that contain the object's values. This table row has a unique index two.
    // Since these events happen at the same time, the two indexes reflect to the same position in their corresponding container.
    // But arrays' indeces start from 0, and tables row indices start from 1. Hence tempIndex = (selectedRow.rowIndex - 1).
    let tempAss = assignments[tempIndex];

    // Making visile the save changes button.
    saveChangesBtn[tempIndex].hidden = false;

    // Disabling the all add courses button.
    for (let i=0; i<dummyCourses.length; i++) {
        addBtn[i].disabled = true;
    }

    // Hidding buttons.
    for (let i=0; i<assignments.length; i++) {
        editBtn[i].hidden = true;
        delBtn[i].hidden = true;
        saveBtn[i].hidden = true;
    }
    // Changing the cell content to input type.
    selectedRow.cells[1].innerHTML = `<input type=text id='assTitle'>`;
    selectedRow.cells[2].innerHTML = `<input type=text id='assDescr'>`;
    selectedRow.cells[3].innerHTML = `<input type=text id='assDeadline'>`;
    // Assigning to input type value the object's values.
    document.getElementById('assTitle').value = tempAss['ass_title'];
    document.getElementById('assDescr').value = tempAss['ass_descr'];
    document.getElementById('assDeadline').value = tempAss['ass_deadline'];
}

// Called upon click the save changes button.
function onSaveChanges(td) {
    let selectedRow = td.parentElement.parentElement;
    let tempIndex = (selectedRow.rowIndex - 1);
    let tempAss = assignments[tempIndex];

    
    saveChangesBtn[tempIndex].hidden = true;
    editBtn[tempIndex].hidden = false;
    delBtn[tempIndex].hidden = false;
    saveBtn[tempIndex].hidden = true;

    for (let i=0; i<dummyCourses.length; i++) {
        addBtn[i].disabled = false;
    }

    for (let i=0; i<assignments.length; i++) {
        editBtn[i].hidden = false;
        delBtn[i].hidden = false;
        saveBtn[i].hidden = true;
    }
    // Altering the data context of the cells.
    selectedRow.cells[1].innerText = document.getElementById('assTitle').value;
    selectedRow.cells[2].innerText = document.getElementById('assDescr').value;
    selectedRow.cells[3].innerText = document.getElementById('assDeadline').value;
    // Updating the object's values.
    tempAss['ass_title'] = selectedRow.cells[1].innerText;
    tempAss['ass_descr'] = selectedRow.cells[2].innerText;
    tempAss['ass_deadline'] = selectedRow.cells[3].innerText;

    //Checking
    console.log(assignments)
}

//Called upon clicking the delete button.
function onDelAss(td) {
    let selectedRow = td.parentElement.parentElement;
    let tempIndex = (selectedRow.rowIndex - 1);
    
    if (confirm("This assignment will be deleted.")){
        //Removes the corresponding table row.
        document.querySelector(".assignments-table").deleteRow(selectedRow.rowIndex);
        //Removes the corresponding object from the courses array.
        assignments.splice(tempIndex, 1);
    }
    //Checking
    console.log(assignments);
}