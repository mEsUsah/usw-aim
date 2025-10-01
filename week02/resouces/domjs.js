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
