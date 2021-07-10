window.onscroll = function() {
  var totop = document.getElementById("top");
  if (document.body.scrollTop > 125 || document.documentElement.scrollTop > 125) {
    totop.style.display = "block";
  } else {
    totop.style.display = "none";
  }
};
	
fetch('art.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
  //console.log(data);
	var keysArr = [];
	for (let [key, value] of Object.entries(data)) {
	  keys(keysArr, key);
  }
  var i = 0;
  for (const [key, value] of Object.entries(data)) {
		createCheckboxes(key, keysArr, i);
		createBackground(key, value, keysArr, i);
		i++;
  }
  });

function keys(keysArr, key) {
  keysArr.push(key);
  return keysArr;
  }
  
function createCheckboxes(key, keysArr, i){
  //create checkbox
  var check = document.createElement('input');
  check.id = "input"+key;
  check.type = "checkbox";
  check.checked = true; //expecting for everything to be displayed ha ha
  check.setAttribute("onchange" , "toggle(this)");
  //create checkbox label
  var label = document.createElement('p');
  label.for = "input";
  label.innerText = key+":";
  label.style.backgroundColor = "rgba(0, 0, 0, 0."+i+"5)";
  label.style.display = "inline-block";
  if (i >= (keysArr.length / 2)) {
    label.style.color = "white";
  } else {
    label.style.color = "black";
  }
  label.style.color = "filter: invert(1)";
  inputdiv = document.getElementById('input');
  //create spacer
  inputdiv.appendChild(document.createTextNode(" ")); //cant put &nbsp here for some reason
  label.appendChild(check);
  inputdiv.appendChild(label);
}
  
function createBackground(key, value, keysArr, i) {
  if (i < 3) { //for backgrounds 0 - 3
    //create bg
    bg = document.createElement('div');
    bg.style.position = "inline";
    bg.id = key;
    bg.style.backgroundColor = "rgba(0, 0, 0, 0."+i+"5)";
    //create bg label
    label = document.createElement("p");
    label.style.backgroundColor = "rgba(0, 0, 0, 0."+i+"5)";
    label.innerText = key;
    if (i >= (keysArr.length / 2)) {
      label.style.color = "white";
    } else {
      label.style.color = "black";
    }
    console.log(bg, label);
    bg.appendChild(label);
    populateBackground(key, value, keysArr, bg);
  } else { //if not, create them with display:none and make checkbox unchecked
    //create bg
    bg = document.createElement('div');
    bg.style.position = "inline";
    bg.id = key;
    bg.style.backgroundColor = "rgba(0, 0, 0, 0."+i+"5)";
    bg.style.display = "none";
    document.getElementById("input"+key).checked = false; // uncheck corrosponding checkbox
    //create bg labela
    label = document.createElement("p");
    label.style.backgroundColor = "rgba(0, 0, 0, 0."+i+"5)";
    label.innerText = key;
    if (i >= (keysArr.length / 2)) {
      label.style.color = "white";
    } else {
      label.style.color = "black";
    }
    //append the things
    bg.appendChild(label);
    populateBackground(key, value, keysArr, bg);
  }
}

function populateBackground(key, value, keysArr, bg) {
  for (i = 0; i < value.length; i++) {
    //create image
    var img = document.createElement('img');
    img.alt = "image in "+key;
    img.loading = "lazy";
    img.title = "Tags: "+keysArr;
    img.src = value[i];
    //create anchor
    var a = document.createElement("a");
    a.href = value[i];
    //append elements
    document.getElementById('art').appendChild(bg);
    bg.appendChild(a);
    a.appendChild(img);
  }
}

function toggle(obj) {
  console.log(obj.id);
  var tab = obj.id.substring(5);
  var e = document.getElementById(tab);
  e.style.display = ((e.style.display!='none') ? 'none' : 'inherit');
}