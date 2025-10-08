function doEvents() {
    var list = document.getElementById('course-list')?.children;
    if (list && list.length > 0) {
        // cast HTMLCollection to Array
        Array.prototype.forEach.call(list, (item) => {
            item.addEventListener('click', toggleStatus, false);
        });
    }
}

function toggleStatus(event) {
    var element = event.target;
    if (element.classList.contains('full')) {
        element.classList.remove('full');
    }
    else if (element.classList.contains('running')) {
        element.classList.remove('running');
        element.classList.add('full');
    }
    else {
        element.classList.add('running');
    }
}

doEvents();