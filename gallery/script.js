  fetch('art.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (const [key, value] of Object.entries(data)) {
        createCheckbox(key);
        createImg(key, value);
      }
    });
    
function createImg(key,value) {
  //create bg
  var bg = document.createElement('div');
  bg.style.position = "inline";
  bg.id = key+"bg";
  switch (key) { //customize specific bg
    case "ideas":
      bg.style.border = "3px dotted black";
    break;
    case "edits":
      bg.style.display = "none";
	  document.getElementById(key).checked = false;
    break;
	case "other":
      bg.style.display = "none";
	  document.getElementById(key).checked = false;
    break;
	case "animated":
      bg.style.display = "none";
	  document.getElementById(key).checked = false;
    break;
    default: //if no case is met, mark as checked
      document.getElementById(key).checked = true;
    break;
    }
  for (i = 0; i < value.length; i++) { //for each link
    bg.style.backgroundColor = "rgba(0, 0, 0, 0."+i+"5)";
    //create image
    var img = document.createElement('img'); 
    img.id = key+i;
    img.src = value[i];
    img.alt = key;
    //create anchor
    var a = document.createElement("a");
    a.href = value[i];
	switch (key) { //customize specific image details
    case "ideas":
      img.loading = "auto";
    break;
    default: //if no case is met, lazy load
      img.loading = "lazy";
    break;
    }
    a.appendChild(img);
    bg.appendChild(a);
    document.getElementById('art').appendChild(bg);
    
  }
}

function createCheckbox(key) {
  var check = document.createElement('input');
  check.id = key;
  check.type = "checkbox";
  check.name = key;
  check.setAttribute("onchange" , "toggle(this)");
  var label = document.createElement('label');
  label.for = "input";
  label.innerHTML = key+":";
  document.getElementById('input').appendChild(label);
  document.getElementById('input').appendChild(check);
  }

function toggle(obj) {
    var e = document.getElementById(obj.id+"bg"); //if all images under key value
    e.style.display = ((e.style.display!='none') ? 'none' : 'inherit');
}
