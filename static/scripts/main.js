window.onload = function(){

    const inputDate = document.getElementById("student_form_input_birthday");
    inputDate.value = "1970-01-01";
    renewAverageAge();

}

function addButtonHandler(){
    const studentName = document.getElementById("student_form_input_name");
    const birthDay = document.getElementById("student_form_input_birthday");
    const gender = document.getElementById("student_form_select_gender");
    studentName.classList.remove("error");
    if (studentName.value.trim().length > 0){
        const student = {};
        student.name = studentName.value;
        student.birthDay = new Date(birthDay.value);
        student.gender = gender.value;
        student.age = Math.floor((new Date() - student.birthDay)/1000/60/60/24/365);
        addStudentRecord(student);
        renewAverageAge();
    }else{
        studentName.classList.add("error");
    }
}


function addStudentRecord(student){

    const studentRecords = document.getElementsByClassName("table_student_record");

    const newStudentRecord = document.createElement("tr");
    newStudentRecord.classList.add("table_student_record");

    let cell = document.createElement("td");
    cell.innerHTML = student.name;
    newStudentRecord.append(cell);

    cell = document.createElement("td");
    cell.innerHTML = student.gender;
    newStudentRecord.append(cell);

    cell = document.createElement("td");
    cell.innerHTML = student.birthDay.toLocaleDateString("ru-RU");
    newStudentRecord.append(cell);

    cell = document.createElement("td");
    cell.classList.add("student_age");
    cell.innerHTML = student.age;
    newStudentRecord.append(cell);

    cell = document.createElement("td");
    const removeLink = document.createElement("a");
    removeLink.addEventListener("click",() => { removeButtonHandler(removeLink); }, false);
    removeLink.href = "#";
    removeLink.innerHTML = "удалить";
    cell.append(removeLink);
    newStudentRecord.append(cell);

    if (studentRecords.length > 0){
        const lastStudentRecord = studentRecords[studentRecords.length - 1];
        lastStudentRecord.after(newStudentRecord);
    }else{
        const tBody = document.getElementById("table_body");
        tBody.prepend(newStudentRecord);
    }
}


function removeButtonHandler(element){
    const record = element.closest("tr");
    removeStudentRecord(record);
    renewAverageAge();
}

function removeStudentRecord(removeStudentRecord){
    removeStudentRecord.remove();
}

function renewAverageAge(){
    const averageAge = calculateAverageAge();
    const cell = document.getElementById("average_age");
    cell.innerHTML = averageAge;
}

function calculateAverageAge(){
    const elements = document.getElementsByClassName("student_age");
    let n = 0;
    let sum = 0;
    for (const value of elements){
        n++;
        sum = sum + parseInt(value.innerHTML);
    }
    return Math.floor(sum/n);
}