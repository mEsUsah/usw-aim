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
    console.log(element);
    if (element.className === 'full') {
        element.className = 'running';
    }
    else if (element.className === 'running') {
        element.className = 'full';
    }
}

doEvents();