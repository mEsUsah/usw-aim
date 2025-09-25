class Student {
    constructor(name, course, results) {
        this.name = name;
        this.course = course;
        this.results = results;
    }

    printDetailsHtml() {
        var details = '<b>Student Name:</b> ' + this.name + '<br>' +
            '<b>Course:</b> ' + this.course + '<br>' +
            '<b>Results:</b> <br>';

        this.results.forEach(function(result) {
            details = details + result.module + ' ' + result.mark + '%' + '<br>';
        });

        return details;
    }
}

function showModules() {
    var students = [];
    
    students.push(new Student('Alice Johnson', 'Computer Science', [
        { module: 'Maths', mark: 80 },
        { module: 'Programming', mark: 78 },
        { module: 'Web Development', mark: 92 }
    ]));
    
    students.push(new Student('Bob Smith', 'Information Technology', [
        { module: 'Web Development', mark: 65 },
        { module: 'Programming', mark: 72 },
        { module: 'Web Development', mark: 68 }
    ]));

    students.push(new Student('Charlie Brown', 'Software Engineering', [
        { module: 'Maths', mark: 90 },
        { module: 'Programming', mark: 88 },
        { module: 'Web Development', mark: 95 }
    ]));

    var output = '';
    students.forEach(function(student) {
        output += student.printDetailsHtml() + '<br>';
    });
    document.getElementById('outputElement').innerHTML = output;
}

showModules();
