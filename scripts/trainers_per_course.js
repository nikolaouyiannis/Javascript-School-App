// Same functionality as students_per_course script.

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

var dummyTrainers = [
    { fname: 'Georges', lname: 'St-Pierre', courses: [] },
    { fname: 'Jon', lname: 'Jones', courses: [] },
    { fname: 'Khabib', lname: 'Nurmagomedov', courses: [] },
    { fname: 'Anderson', lname: 'Silva', courses: [] },
    { fname: 'Francis', lname: 'Ngannou', courses: [] },
    { fname: 'Amanda', lname: 'Nunes', courses: [] },
    { fname: 'Robert', lname: 'Whittaker', courses: [] },
    { fname: 'Nick', lname: 'Diaz', courses: [] },
    { fname: 'Valentina', lname: 'Shevchenko', courses: [] },
]

function populateCoursesTable() {
    const coursesTable = document.querySelector('.courses-table');
    
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
    chooseCrsBtn = document.querySelectorAll('.btn-choose-crs');
}

function populateTrainersTable() {
    const trainersTable = document.querySelector('.trainers-table');
    
    for (let i=0; i<dummyTrainers.length; i++) {
        var newRow = trainersTable.insertRow(-1);
        cell0 = newRow.insertCell(0);
        cell1 = newRow.insertCell(1);
        cell2 = newRow.insertCell(2);
        cell0.innerText = dummyTrainers[i]['fname'];
        cell1.innerText = dummyTrainers[i]['lname'];
        cell2.innerHTML = `<button disabled type="button" class="btn-choose-trn" onClick="onChooseTrn(this)">Choose</button>`
    };
    chooseTrnBtn = document.querySelectorAll('.btn-choose-trn');
}

var trnClickCount;
csrClickCount = 0;
tpcTableElements = {};
function onChooseCrs(td) {
    let selectedRow = td.parentElement.parentElement;
    const spcTable = document.querySelector('.trn-per-crs-table');
    if (spcTable.rows.length === 0) {
        for (let i=0; i<dummyTrainers.length; i++) {
            var newRow = spcTable.insertRow(-1);
            tpcTableElements[i] = []
            for (let y=0; y<dummyCourses.length; y++) {
                var newCell = newRow.insertCell(y);
                tpcTableElements[i].push(newCell)
            }
        }
    } else csrClickCount += 1;
    
    chooseCrsBtn[selectedRow.rowIndex - 1].disabled = true;
    for (i=0; i<dummyTrainers.length; i++) {
        chooseTrnBtn[i].disabled = false;
    }
    tpcTableElements[0][csrClickCount].innerText = selectedRow.cells[2].innerText;
    tpcTableElements[0][csrClickCount] = selectedRow.cells[2].innerText;
    trnClickCount = 0;
    console.log(tpcTableElements);
}


function onChooseTrn(td) {
    let selectedRow = td.parentElement.parentElement;
    const spcTable = document.querySelector('.trn-per-crs-table');
    var fullname = selectedRow.cells[0].innerText + ' ' + selectedRow.cells[1].innerText;

    
    tpcTableElements[trnClickCount + 1][csrClickCount].innerText = fullname;
    tpcTableElements[trnClickCount + 1][csrClickCount] = fullname;
    
    dummyTrainers[selectedRow.rowIndex - 1]['courses'].push(tpcTableElements[0][csrClickCount])

    trnClickCount += 1;
    chooseTrnBtn[selectedRow.rowIndex - 1].disabled = true;
    console.log(dummyTrainers);
}
