
var type = document.getElementById('awardType');
var subject = document.getElementById('subject');
var mode = document.getElementById('modeWrapper');

var hndMessage = document.getElementById('hndMessage');
var degreeMessage = document.getElementById('degreeMessage');

var degrees = {
    degcompsci: 'BSc Computer Science',
    degmmcomp: 'BA Multimedia Computing',
    deginfosec: 'BSc Information Security'
};

var hnds = {
    hndcomp: 'HND Computing',
    hndmm: 'HND Multimedia',
    hndinfosec: 'HND Information Security'
};

type.addEventListener('change', function () {
    mode.innerHTML = '';
    hideDegreeMessage();
    hideHndMessage();
    if (this.value === '') {
        subject.innerHTML = '<option value="">Please choose an Award first</option>';
        return;
    }
    var subjects = getSubjects(this.value);

    var options = '<option value="">Please choose a subject</option>';
    for (var key in subjects) {
        options += '<option value="' + key + '">' + subjects[key] + '</option>';
    }
    subject.innerHTML = options;
}, false);

subject.addEventListener('change', function (event) {
    if (type.value == 'degree' && event.target.value != '' ) {
        showDegreeMessage();
        if(mode.innerHTML.trim() === ''){
            createModeSelector();
        }
    } 
    else if (type.value == 'hnd' && event.target.value != '' ) {
        showHndMessage();
    }
    else {
        mode.innerHTML = '';
    }
}, false);

function getSubjects(awardType) {
    if (awardType === 'degree') {
        return degrees;
    } else if (awardType === 'hnd') {
        return hnds;
    }
}

function showHndMessage(){
    hndMessage.className = '';
}
function hideHndMessage(){
    hndMessage.className = 'hide';
}

function showDegreeMessage(){
    degreeMessage.className = '';
}
function hideDegreeMessage(){
    degreeMessage.className = 'hide';
}

function createModeSelector(){
    var modeSelector = document.createElement('select');
    modeSelector.name = 'mode';
    modeSelector.id = 'mode';

    var defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Please choose a mode';
    modeSelector.appendChild(defaultOption);
    
    var modes = {
        fulltime: 'Full-time',
        parttime: 'Part-time',
    };

    for (var key in modes) {
        var option = document.createElement('option');
        option.value = key;
        option.textContent = modes[key];
        modeSelector.appendChild(option);
    }
    
    var label = document.createElement('label');
    label.htmlFor = 'mode';
    label.textContent = 'Mode: ';
    label.appendChild(modeSelector);
    mode.appendChild(label);
}

