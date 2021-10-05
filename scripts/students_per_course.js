// Couldn't import arrays from other scripts.
// Using dummy data instead.

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

var dummyStudents = [
    { fname: 'Joe', lname: 'Gatto', birthdate: '2001-1-1', fees: '300', courses: [] },
    { fname: 'Sal', lname: 'Vulcano', birthdate: '2001-1-1', fees: '300', courses: [] },
    { fname: 'Brian', lname: 'Quinn', birthdate: '2001-1-1', fees: '300', courses: [] },
    { fname: 'James', lname: 'Murray', birthdate: '2001-1-1', fees: '300', courses: [] },
    { fname: 'Lauren', lname: 'Cohan', birthdate: '2001-1-1', fees: '300', courses: [] },
    { fname: 'Danai', lname: 'Gurira', birthdate: '2001-1-1', fees: '300', courses: [] },
    { fname: 'Jeffrey Dean', lname: 'Morgan', birthdate: '2001-1-1', fees: '300', courses: [] },
    { fname: 'Christian', lname: 'Serratos', birthdate: '2001-1-1', fees: '300', courses: [] },
    { fname: 'Andrew', lname: 'Lincoln', birthdate: '2001-1-1', fees: '300', courses: [] },
]

// Called upon loading students per course page.
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
        cell4.innerHTML = `<button type="button" class="btn-choose-crs" onClick="onChooseCrs(this)">Choose</button>`
    };
    // Choose course button.
    chooseCrsBtn = document.querySelectorAll('.btn-choose-crs');
}

// Called upon loading students per course page.
// Populates students table with student objects.
function populateStudentsTable() {
    //Responds to the table that will be filled.
    const studentsTable = document.querySelector('.students-table');
    // Creating a new row for each course.
    // Creating cells for each row.
    // Filling cells with data.
    for (let i=0; i<dummyStudents.length; i++) {
        var newRow = studentsTable.insertRow(-1);
        cell0 = newRow.insertCell(0);
        cell1 = newRow.insertCell(1);
        cell2 = newRow.insertCell(2);
        cell0.innerText = dummyStudents[i]['fname'];
        cell1.innerText = dummyStudents[i]['lname'];
        cell2.innerHTML = `<button disabled type="button" class="btn-choose-std" onClick="onChooseStd(this)">Choose</button>`
    };
    // Choose student button to add corresponding course.
    chooseStdBtn = document.querySelectorAll('.btn-choose-std');
}

// Counts how many students belong to each individual course.
// Assigned to zero each time a new course is choosed.
var stdClickCount;
// Counts how many courses are choosed.
csrClickCount = 0;
// This object has students per course rows as keys, and each key has as value an array containing students per course cells.
spcTableElements = {};
// Called upon click the choose button in courses table.
function onChooseCrs(td) {
    let selectedRow = td.parentElement.parentElement;
    // Responds to the students per course table.
    // Each cell of it's first row will contain course titles.
    // The rest of the rows will contain students' names.
    const spcTable = document.querySelector('.std-per-crs-table');
    // This is if statement is true only the first time that onChooseCrs() is called.
    if (spcTable.rows.length === 0) {
        // Filling the tables with as many rows as the amount of students, +1 because first row will be filled with the course title.
        for (let i=0; i<=dummyStudents.length; i++) {
            var newRow = spcTable.insertRow(-1);
            // Assigning to each row (key) an empty array (value)
            spcTableElements[i] = []
            // Filling each table row with as many cells as the amount of  avaibale courses
            for (let y=0; y<dummyCourses.length; y++) {
                var newCell = newRow.insertCell(y);
                // Adding to each array a cell
                spcTableElements[i].push(newCell)
            }
        }
    } else csrClickCount += 1; // Place here because we want it to start increasing after the first course has been choosed.

    // Disabling the choose button for the course that was added in order to not have double entries in the table.
    chooseCrsBtn[selectedRow.rowIndex - 1].disabled = true;
    // Enabling the students choose buttons.
    for (i=0; i<dummyStudents.length; i++) {
        chooseStdBtn[i].disabled = false;
    }
    // [0] because course titles are added to thw first row.
    // [csrClickCount] because it reflects the specific cell.
    // Filling the table.
    spcTableElements[0][csrClickCount].innerText = selectedRow.cells[2].innerText;
    // Filling the object.
    spcTableElements[0][csrClickCount] = selectedRow.cells[2].innerText;
    
    // Assigned to zero 
    stdClickCount = 0;
    // Checking
    console.log(spcTableElements);
}

// Called upon click the choose button in students table.
function onChooseStd(td) {
    let selectedRow = td.parentElement.parentElement;
    const spcTable = document.querySelector('.std-per-crs-table');
    // Student's full name.
    var fullname = selectedRow.cells[0].innerText + ' ' + selectedRow.cells[1].innerText;
    // Filling the table.
    spcTableElements[stdClickCount + 1][csrClickCount].innerText = fullname;
    // Filling the object.
    spcTableElements[stdClickCount + 1][csrClickCount] = fullname;
    // Filling each student object with the courses that the student has.
    dummyStudents[selectedRow.rowIndex - 1]['courses'].push(spcTableElements[0][csrClickCount])

    stdClickCount += 1;
    // Disabling the choose button for the student that was added in order to not have double entries in one course.
    chooseStdBtn[selectedRow.rowIndex - 1].disabled = true;
    // Checking
    console.log(dummyStudents);
}
