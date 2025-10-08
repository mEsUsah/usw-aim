function doEvents(){
  var el = document.getElementById('two');

  el.addEventListener('click', toggleStatus, false);
}

function toggleStatus(){
  if (this.className === 'full'){
    this.className = 'running';}
  else if (this.className === 'running'){
    this.className = 'full';
  }
}

console.log("Script loaded");
doEvents();