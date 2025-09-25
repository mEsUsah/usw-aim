function showModules() {
    var modules = ['Maths','Programming', 'Web Development']
    var modulesCombined = ['Maths', 45, 'Programming', 98,'Web Development', 75]
    var marks = [45, 28, 65];
    var arrayLength = modules.length;
    var modulesMessage = '';
    var i;

    // for (i = 0; i < arrayLength; i=i+2) {
    //     modulesMessage = modulesMessage + modules[i] + ' ' + modulesCombined[i+1] + '%' + '<br>';
    // }

    // modules.forEach(function(module, index) {
    //     modulesMessage = modulesMessage + module + ' ' + marks[index] + '%' + '<br>';
    // });

    var index = 0;
    do {
        index++;
        modulesMessage = modulesMessage + modules[index - 1] + ' ' + marks[index - 1] + '%' + '<br>';
    } while (index < modules.length);
    document.getElementById('outputElement').innerHTML = modulesMessage;
}

showModules();
