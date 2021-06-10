
window.onload = function() {
  if(!sessionStorage.getItem('theme')) {
    populateStorage();
  } else {
    setStyles();
  }
  splash();
}

function populateStorage() {
  sessionStorage.setItem('theme', document.getElementById('seltheme').checked);
  setStyles();
}

function setStyles() {
  if (sessionStorage.getItem('theme') == 'true') {
    document.body.style.backgroundColor = "#3c3c3c";
	document.getElementsByClassName('content').style.background = "#000";
	document.querySelector("a").style.color = "#fff";
	document.body.style.color = "#fff";
    document.getElementById('seltheme').checked = true;
	document.getElementById('themelabel').innerHTML = "darken:";
  } else if (sessionStorage.getItem('theme') == 'false') {
    document.body.style.backgroundColor = "#c3c3c3";
	document.getElementsByClassName('content').style.background = "#fff";
	document.querySelector("a").style.color = "#000";
    document.body.style.color = "#000";
    document.getElementById('seltheme').checked = false;
	document.getElementById('themelabel').innerHTML = "darken:";
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
  