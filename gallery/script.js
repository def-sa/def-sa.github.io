var t = {};

fetch('./art.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    for (var [key, value] of Object.entries(data)) {
      value = `${value}`.split(","); //make array of links
      switch(`${key}`) {
      case "ideas":
        t.ideasvalue = value;
        createImg(`${key}`,value);
        for (i = 0; i < value.length; i++) { //for each link
          document.getElementById(`${key}`+"img"+i).style.backgroundColor = "black";
        }
        break;
      case "drawings":
        t.drawingsvalue = value;
        createImg(`${key}`,value);
        for (i = 0; i < value.length; i++) {
          document.getElementById(`${key}`+"img"+i).style.backgroundColor = "gray";
        }
        break;
      case "edits":
        t.editsvalue = value;
        createImg(`${key}`,value);
        for (i = 0; i < value.length; i++) {
          document.getElementById(`${key}`+"img"+i).style.backgroundColor = "lightgray";
        }
        break;
	  case "other":
        t.othervalue = value;
        createImg(`${key}`,value);
        for (i = 0; i < value.length; i++) {
          document.getElementById(`${key}`+"img"+i).style.backgroundColor = "lightgray";
        }
        break;
      }
    }
  });
  
function createImg(key,value) {
  document.getElementById(key).checked = true;
  for (i = 0; i < value.length; i++) { //for each link
    var img = document.createElement('img');
    img.id = key+"img"+i;
    img.src = value[i];
    img.alt = key;
    var a = document.createElement("a");
    a.setAttribute("href", value[i]);
	a.setAttribute('target', '_blank');
    a.appendChild(img);
    document.getElementById('art').appendChild(a);
  }
}

function toggle(obj) {
  switch(obj.id) {
    case "ideas":
      for (i = 0; i < t.ideasvalue.length; i++) {
        toggle_vis("ideasimg"+i);
      }
      break;
    case "drawings":
      for (i = 0; i < t.drawingsvalue.length; i++) {
        toggle_vis("drawingsimg"+i);
      }
      break;
    case "edits":
      for (i = 0; i < t.editsvalue.length; i++) {
        toggle_vis("editsimg"+i);
      }
      break;
	case "other":
      for (i = 0; i < t.othervalue.length; i++) {
        toggle_vis("otherimg"+i);
      }
      break;
    }
}

function toggle_vis(id) {
  var e = document.getElementById(id);
  e.style.display = ((e.style.display!='none') ? 'none' : 'inline');
}