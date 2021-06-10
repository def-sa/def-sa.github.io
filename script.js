
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
	document.body.style.color = "#ffffff";
	content = document.getElementsByClassName("content");
	for (i = 0; i < content.length; i++) {
		content[i].style.backgroundColor = "#000000";
		content[i].style.color = "#ffffff";
	}
	anchor = document.querySelectorAll("a");
	for (i = 0; i < anchor.length; i++) {
		anchor[i].style.color = "#ffffff";
	}
    document.getElementById('seltheme').checked = true;
	document.getElementById('themelabel').innerHTML = "darken:";
  } else if (sessionStorage.getItem('theme') == 'false') {
    document.body.style.backgroundColor = "#c3c3c3";
	document.body.style.color = "#000000";
	content = document.getElementsByClassName("content");
	for (i = 0; i < content.length; i++) {
		content[i].style.backgroundColor = "#ffffff";
		content[i].style.color = "#000000";
	}
	anchor = document.querySelectorAll("a");
	for (i = 0; i < anchor.length; i++) {
		anchor[i].style.color = "#000000";
	}
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
  