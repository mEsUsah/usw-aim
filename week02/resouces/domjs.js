function manipulateDOM1(){
    var el = document.getElementById('one');
    el.textContent = 'BSc Big Data';
}

function manipulateDOM2(){
    var el = document.querySelector('li.running');
    el.className = 'full';
}

function manipulateDOM3(){
    var els = document.getElementsByClassName('running');
    var noOfElements = els.length;

    if (noOfElements >= 1) {
        var el = els[noOfElements - 1];
        el.className = 'full';
    }
}

function manipulateDOM4(){
    var els = document.getElementsByTagName('li');
    var noOfElements = els.length;

    if (noOfElements >= 1) {
        var el = els[noOfElements - 1];
        el.className = 'full';
    }
}

function manipulateDOM5(){
    var els = document.querySelectorAll('li.running');
    var noOfElements = els.length;

    for (var i = 0; i < noOfElements; i++ ) {
        els[i].className = 'full';
    }
}

function manipulateDOM6(){
    var el = document.querySelector('li.running');
          var els = document.querySelectorAll('li.running');
      
    /* set class of first element to full */
    el.className = 'full';

    /* set class of first element to full */
    els[0].className = 'full';
}

function manipulateDOM7(){
    var el = document.querySelector('li.running');

    /* set class of first element to full */
    el.className = 'full';

    var els = document.querySelectorAll('li.running'); // dynamic node list
    console.log(els);

    /* set class of first element to full */
    els[0].className = 'full';
}

function manipulateDOM8(){
  var els = document.getElementsByClassName('running');

    els[1].textContent='BA Social Media Studies'; //static node list

    // var el = document.getElementById('two');
    // el.className = '';
    
    els[1].className='full';
}

function manipulateDOM9(){
    var el = document.getElementById('one');
    var parel = el.parentNode;
    parel.className = 'rounded';
}

function manipulateDOM10(){
    var el = document.getElementById('two');
    var preSib = el.previousElementSibling;
    var nexSib = el.nextElementSibling;

    if (preSib) {
        preSib.className = 'full';
    }
    if (nexSib) {
        nexSib.className = 'full';
    } 
}

function manipulateDOM11(){
    var els = document.getElementsByTagName('ul');

    if (els.length >= 1) {
        var firChi = els[0].firstElementChild;
        var lasChi = els[0].lastElementChild;

        if (firChi) {
            firChi.className = 'full';
        }
        if (lasChi) {
            lasChi.className = 'full';
        } 
    }

    document.getElementById('two').innerText = 'BSc Artificial Intelligence';
}

function manipulateDOM12(){
    var el = document.getElementById('four');
    var elTxt = el.firstChild.nodeValue;

    elTxt = elTxt.replace('Mechatronics', 'Multimedia Studies');
    el.firstChild.nodeValue = elTxt;

    document.getElementById('one').firstChild.nextSibling.nodeValue = ' BSc Games Design';
}

function manipulateDOM13(){
    var el = document.getElementById('four');
    var elTxt = el.textContent;

    elTxt = elTxt.replace('Mechatronics', 'Multimedia Studies');
    el.textContent = elTxt;
}

function manipulateDOM14(){
    var courseUpdated = '<b> Updated!</b>'
    var el = document.getElementById('four');
    var elTxt = el.textContent;

    elTxt = elTxt + courseUpdated;
    el.innerHTML = elTxt;
}

function manipulateDOM15(){
    var newEl = document.createElement('li');
    var newTxt = document.createTextNode('BSc Theoretical Robotics');

    newEl.appendChild(newTxt);
    var loc = document.getElementsByTagName('ul')[0];
    loc.appendChild(newEl);
}

function manipulateDOM16(){
    var delEl = document.getElementsByTagName('li')[2];
    var parDelEl = delEl.parentNode;

    parDelEl.removeChild(delEl);
}

function manipulateDOM17(){
    var el = document.getElementsByTagName('li')[2];
    var revClass = ' Has no class attribute';

    if (el.hasAttribute('class')) {
        revClass = ' ' + el.getAttribute('class');
    }

    el.textContent = el.textContent + revClass;
}

function manipulateDOM18(){
    var el = document.getElementsByTagName('link')[0];

    el.setAttribute('href', 'domcss2.css');
}

function manipulateDOM19(){
    var el = document.getElementsByTagName('li')[2];

    if (el.hasAttribute('class')) {
        el.removeAttribute('class');
    }
}

function clearRunning(){
    var els = document.getElementsByClassName('running');
    for (let i=els.length-1; i>=0; i--){
        els[i].classList.remove('running');
    }
}

function manipulateDOMinsert(){
    newEl = document.createElement('li');
    newEl.className = 'running';
    emEl = document.createElement('em');
    emEl.textContent = ' BSc Theoretical Robotics';
    newEl.appendChild(emEl);

    let list = document.getElementsByTagName('ul')[0];
    let children = list.children;
    
    if (children.length < 1) {
        list.appendChild(newEl);
        return;
    }


    for (let i=0; i<children.length; i++){
        if(!children[i].classList.contains('running')){
            list.insertBefore(newEl, children[i]);
            return;
        }
    };

    list.appendChild(newEl);
}

function setIdTwoAsNotRunning(){
    document.getElementById('two')?.classList.remove('running');
}

function removeAllNotRunning(){
    var list = document.querySelector('ul');
    var notRunning = list.querySelectorAll('li:not(.running)');
    notRunning.forEach(function(item){
        list.removeChild(item);
    });
}

function doSomeCrazyStuff(){
    var list = document.querySelector('ul');
    var items = list.querySelectorAll('li');

    if (items.length < 2) return;

    var runningCourses = list.querySelectorAll('li.running');
    if (!runningCourses.length) {
        items[0].classList.add('running');
        items[1].classList.add('running');
    }
    if (runningCourses.length % 2 === 0){ 
        return;
    } 

    var notRunningCourses = list.querySelectorAll('li:not(.running)');
    if (runningCourses.length % 2 !== 0 && notRunningCourses.length > 0){
        notRunningCourses[0].classList.add('running');
    }

    if (runningCourses.length % 2 !== 0 && notRunningCourses.length === 0){
        list.lastElementChild.classList.add('running');
    }
}

