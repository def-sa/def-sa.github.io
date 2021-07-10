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
    var allTags = [];
    for (ia = 0; ia < data.length; ia++) { //for each entree
      var tags = data[ia].tags.toString().split(",");
      for (i = 0; i < tags.length; i++) { //find unique tags
        allTags.push(tags[i]); 
        uniqueTags = allTags.filter(distinct); 
      }
    }
      createCheckboxes(uniqueTags);
      createBackground(uniqueTags, data);
  });
	
function createCheckboxes(uniqueTags){
    for (i = 0; i < uniqueTags.length; i++) { //for each unique tag
        //create checkbox
        var check = document.createElement('input');
        check.id = "input"+uniqueTags[i];
        //check.name = "checkbox"+i;
        check.type = "checkbox";
        check.checked = true; //expecting for everything to be displayed ha ha
        check.setAttribute("onchange" , "toggle(this)");
        //create checkbox label
        var label = document.createElement('p');
        label.for = "input";
        label.innerText = uniqueTags[i]+":";
        label.style.backgroundColor = "rgba(0, 0, 0, 0."+i+"5)";
        label.style.display = "inline-block";
        if (i >= (uniqueTags.length / 2)) {
          label.style.color = "white";
          }
        label.style.color = "filter: invert(1)";
        inputdiv = document.getElementById('inputdiv');
        //create spacer
        inputdiv.appendChild(document.createTextNode(" ")); //cant put &nbsp here for some reason
        label.appendChild(check);
        inputdiv.appendChild(label);
        //dates = document.getElementById('dates');
    }
}

function createBackground(uniqueTags, data) {
  for (i = 0; i < uniqueTags.length; i++) { //for each unique tag
    if (i > 3) { //if first or 2nd entree, create them
      //create bg
      bg = document.createElement('div');
      bg.style.position = "inline";
      bg.id = uniqueTags[i];
      bg.style.backgroundColor = "rgba(0, 0, 0, 0."+i+"5)";
      //create bg label
      label = document.createElement("p");
      label.innerText = bg.id;
      label.classList.add("tags");
      bg.appendChild(label);
      populateBackground(uniqueTags, data, bg);
    } else { //if not, create them with display:none and make checkbox unchecked
      //create bg
      bg = document.createElement('div');
      bg.style.position = "inline";
      bg.id = uniqueTags[i];
      bg.style.backgroundColor = "rgba(0, 0, 0, 0."+i+"5)";
      bg.style.display = "none";
      document.getElementById("input"+uniqueTags[i]).checked = false; // uncheck corrosponding checkbox
      //create bg labela
      label = document.createElement("p");
      label.style.backgroundColor = "rgba(0, 0, 0, 0."+i+"5)";
      label.innerText = bg.id;
      label.classList.add("tags");
      if (i >= (uniqueTags.length / 2)) {
        label.style.color = "white";
      }
      //append the things
      bg.appendChild(label);
      populateBackground(uniqueTags, data, bg);
      }
  }
}

function distinct(value, index, self) {
  return self.indexOf(value) === index;
}

function toggle(obj) {
  var tab = obj.id.substring(5);
  var e = document.getElementById(tab); //if all images under key value
  e.style.display = ((e.style.display!='none') ? 'none' : 'inherit');
}