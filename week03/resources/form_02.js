
var form = document.getElementById('details');
var elements = form.elements;
var options = elements.subject;
var all = document.getElementById('all');

function updateAll() {
    for (var i = 0; i < options.length; i++) {
        options[i].checked = all.checked;
    }
}

all.addEventListener('change', updateAll, false);

function updateAllOption(event) {
    var allChecked = true
    for (var i = 0; i < options.length; i++) {
        if (!options[i].checked) {
            allChecked = false;
            break;
        }
    }
    all.checked = allChecked;
}

for (var i = 0; i < options.length; i++) {
    options[i].addEventListener('change', updateAllOption, false);
}

