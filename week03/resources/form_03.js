var form, options, other, otherText, hide;
form = document.getElementById('publicity');
options = form.elements.source;
other = document.getElementById('other');
otherText = document.getElementById('othertext');
otherText.className = 'hide';

for (var i = 0; i < options.length; i++) {
    options[i].addEventListener('click', radioChanged, false);
}

function radioChanged() {
    hide = other.checked ? '' : 'hide';
    otherText.className = hide;
    if (hide) {
        otherText.value = '';
    }
}

function updateCounter(){
    if (otherText.value.length > 140) {
        textCount.className = '';
        textCount.textContent = otherText.value.length + '/140';
    } else {
        textCount.className = 'hide';
        textCount.textContent = '';
    }
}

otherText.addEventListener('blur', function () {
    updateCounter();
}, false);

otherText.addEventListener('focus', function () {
    updateCounter();
}, false);

otherText.addEventListener('input', function () {
    updateCounter();
}, false);

