
window.onload = function() {
  if(!localStorage.getItem('theme')) {
    populateStorage();
  } else {
    setStyles();
  }
}

function populateStorage() {
  localStorage.setItem('theme', document.getElementById('seltheme').checked);
  setStyles();
}

function setStyles() {
  if (localStorage.getItem('theme') == 'true') {
    document.body.style.backgroundColor = "#3c3c3c";
    document.body.style.color = "#fff";
    document.getElementById('seltheme').checked = true;
	document.getElementById('themelabel').innerHTML = "lighten: ";
  } else if (localStorage.getItem('theme') == 'false') {
    document.body.style.backgroundColor = "#c3c3c3";
    document.body.style.color = "#000";
    document.getElementById('seltheme').checked = false;
	document.getElementById('themelabel').innerHTML = "darken: ";
  }
}

function splash() {
	fetch('splashes.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    var random = Math.floor(Math.random() * (data.length));
    document.getElementById('splash').innerHTML = "<b>. </b>"+data[random]+"<b> .</b>";
  });
  }
  