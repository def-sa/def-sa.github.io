
document.getElementById('nav-tab').addEventListener('click', event => {
  onTabClick(this.event);
});

const home = document.getElementById("home-tab");
const gallery = document.getElementById("gallery-tab");
const about = document.getElementById("about-tab");
const speps = document.getElementById("speps-tab");

home.style.display = "block";
gallery.style.display = "flex";

//remove all active, scroll to top, add selected active 
function onTabClick(event) {
	if (event.path[0].id == "nav-tab") {
		return;
    }
  document.querySelector('#nav-tab .active').classList.remove('active'); //remove active tab
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  tab = document.getElementById(event.target.parentElement.children[0].innerHTML+"-tab");
  nav = event.target.parentElement;
  if (event.target.parentElement.children[0].innerHTML == `↑`) {
    tab = speps;
  }
  addActive(tab, nav);
}

//remove active class from all tabs
function removeActive() {
  document.querySelector('#nav-tab .active').classList.remove('active'); //remove active tab
}

// activate new tab and panel
function addActive(tab, nav) {
  nav.classList.add("active"); //for nav highlight + underline
  //hide all tabs then display active tab
  switch (tab.id) {
    case 'home-tab':
      hideTabs();
      home.style.display = "block";
      gallery.style.display = "flex";
      break;
    case 'gallery-tab':
      hideTabs();
      gallery.style.display = "flex";
      break;
    case 'about-tab':
      hideTabs();
      about.style.display = "block";
      break;
    case 'speps-tab':
      hideTabs();
      speps.style.display = "block";
      break;
    }  
}

// close home post
document.getElementById('closehome').onclick = function(event){
  document.querySelector('#nav-tab .active').classList.remove('active'); //remove active tab
  addActive(gallery, document.getElementById("nav-tab").children[1]);
};

//toggle hamburger menu
function toggleHam() {
  var e = document.getElementById("ham-menu");
  e.style.display = ((e.style.display!='none') ? 'none' : 'block');
}
/*
document.getElementById("logo").addEventListener('animationend', () => {
  console.log("hiiiiiiii");
});
*/
//hide tabs
function hideTabs() {
  home.style.display = "none";
  gallery.style.display = "none";
  about.style.display = "none";
  speps.style.display = "none";
}

//show full gallery
function fullgallery(btn) {
  btn.style.display = "none";
  document.getElementById("full-gallery").style.display = "flex";
  }
  
//intro
window.onload = function() {
  document.getElementById("wrapper").style.display = "block";
  document.getElementById("intro").style.display = "none";
};

URLfix();
//make url pretty when linked to /index.html, /#home, /#about, /#gallery, or /#speps
function URLfix() {
  url = document.URL;
  url = url.split('/');
  currenttab = url.pop();
  switch (currenttab) {
    case "index.html":
      history.replaceState({}, document.title, "https://"+url[2]+"/"+url[3]); //remove index.html from url without refreshing
      openHome();
    break;
    case "#home":
      history.replaceState({}, document.title, window.location.href.split('#')[0]); //remove hashtag from url without refreshing
      openHome();
    break;
    case "#gallery":
      history.replaceState({}, document.title, window.location.href.split('#')[0]);
      openGallery();
    break;
    case "#about":
      history.replaceState({}, document.title, window.location.href.split('#')[0]);
      openAbout();
    break;
    case "#speps":
      history.replaceState({}, document.title, window.location.href.split('#')[0]);
      openSpeps();
  }
}
//on url change, make it pretty
window.addEventListener('popstate', function (event) {
	URLfix();
});

 //sorry about this
function openHome() {
  document.querySelector('#nav-tab .active').classList.remove('active'); //remove active tab //remove underline + highlight
  addActive(document.getElementById("home-tab"), document.getElementById("nav-tab").children[0]);
  }
  
function openGallery() {
  document.querySelector('#nav-tab .active').classList.remove('active'); //remove active tab
  addActive(document.getElementById("gallery-tab"), document.getElementById("nav-tab").children[1]); 
  }
  
function openAbout() {
  document.querySelector('#nav-tab .active').classList.remove('active'); //remove active tab
  addActive(document.getElementById("about-tab"), document.getElementById("nav-tab").children[3]); //skip one child because of empty list item where logo is
  }

function openSpeps() {
  document.querySelector('#nav-tab .active').classList.remove('active'); //remove active tab
  addActive(document.getElementById("speps-tab"), document.getElementById("nav-tab").children[4]);
  }

//remove items from popup and close it
function closePopup() {
  document.getElementById('item-details').style.display = 'none';
  image = document.getElementById('item-image');
  info = document.getElementById('item-info');
  image.removeChild(image.children[0]);
  while (info.lastChild.id !== 'item-x') {
    info.removeChild(info.lastChild);
  }
}

populateGallery();
createElements();

function populateGallery() {
  fetch('./art.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (i = 0; i < data.length; i++) {
        //date //desc //dimensions //id //id_thumb //links //tags //type
        item = document.createElement("div");
        item.classList.add("item");
        item.setAttribute("data-tags", data[i].tags);
        
        viewbutton = document.createElement("button");
        viewbutton.classList.add("viewbutton");
        viewbutton.setAttribute("onclick", "populatePopup(this)");
        viewbutton.innerHTML = "view "+data[i].type;
        
        image = document.createElement("img");
        if (data[i].tags.includes("showcase")) {
          image.loading = "eager";
          } else {
            image.loading = "lazy";
            }
        image.alt = data[i].desc;
        image.src = "https://drive.google.com/uc?id="+data[i].id_thumb;
        image.setAttribute("data-meta", JSON.stringify(data[i]));
        
        item.appendChild(viewbutton);
        item.appendChild(image);
        document.getElementById("gallery-tab").insertBefore(item, document.getElementById("more-images"));
      }
      });
  }
  
function populatePopup(btn) {
  iframe = btn.parentElement.getElementsByTagName('iframe').item(0);
  img = btn.parentElement.getElementsByTagName('img').item(0);
  item = document.getElementById('item-image');
  iteminfo = document.getElementById('item-info');
  if (iframe) { //if iframe, clone to item-image
    item.appendChild(iframe.cloneNode());
    //write custom metadata for videos specifically
    }
  if (img) { // if img,  create img in item-image
    imagemeta = img.getAttribute("data-meta");
    imagemeta = JSON.parse(imagemeta);
    
    image = document.createElement("img");
    image.src = "https://drive.google.com/uc?id="+imagemeta.id;
    image.alt = "full image";
    image.loading = "eager";
    
    date = document.createElement("h3");
    if (imagemeta.date == "N/A") {
      date.innerText = "unknown date";
      } else {
       date.innerText = imagemeta.date.substring(0,10); 
      }
    date.id = "date";
    
    desc = document.createElement("p");
    desc.innerText = imagemeta.desc;
    desc.id = "desc";
    
    full = document.createElement("a");
    full.innerText = "open original";
    full.target = "_blank";
    full.href = "https://drive.google.com/uc?id="+imagemeta.id;
    full.id = "full";
    
    dim = document.createElement("p");
    dim.innerText = imagemeta.dimensions;
    dim.id = "dimensions";
    
    tags = document.createElement("ul");
    if (!Array.isArray(imagemeta.tags)) { //if tags not array (meaning it's 1 item)
      tag = document.createElement("li");
      tag.innerText = imagemeta.tags;
      tags.appendChild(tag);
    } else {
      for (i = 0; i < imagemeta.tags.length; i++) {
        tag = document.createElement("li");
        tag.innerText = imagemeta.tags[i];
        tags.appendChild(tag);
      }
    }
    tags.id = "tags";
    
    programs = document.createElement("ul");
    if (!Array.isArray(imagemeta.programs)) { 
      program = document.createElement("li");
      program.innerText = imagemeta.programs;
      programs.appendChild(program);
    } else {
      for (i = 0; i < imagemeta.programs.length; i++) {
        program = document.createElement("li");
        program.innerText = imagemeta.programs[i];
        programs.appendChild(program);
        }
    }
    programs.id = "programs";
    
    links = document.createElement("ul");
    if (!Array.isArray(imagemeta.links)) { 
      link = document.createElement("li");
      anchor = document.createElement("a");
      anchor.href = imagemeta.links;
      anchor.target = "_blank";
      anchor.innerText = imagemeta.links.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i)[1]; //get domain from link
      link.appendChild(anchor);
      links.appendChild(link);
    } else {
      for (i = 0; i < imagemeta.links.length; i++) {
        link = document.createElement("li");
        anchor = document.createElement("a");
        anchor.href = imagemeta.links[i];
        anchor.target = "_blank";
        anchor.innerText = imagemeta.links[i].match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i)[1];
        link.appendChild(anchor);
        links.appendChild(link);
        }
    }
    links.id = "links";
    
    iteminfo.appendChild(dim);
    iteminfo.appendChild(date);
    iteminfo.appendChild(full);
    iteminfo.appendChild(desc);
    iteminfo.appendChild(tags);
    iteminfo.appendChild(programs);
    iteminfo.appendChild(links);
    
    item.appendChild(image);
    }
  document.getElementById('item-details').style.display = 'flex';
  }


function toggle(obj) {
  var childDivs = document.querySelectorAll("#gallery-tab .item");
  for ( i = 0; i < childDivs.length; i++ ) {
    var childDiv = childDivs[i];
    tags = childDiv.getAttribute('data-tags');
    if (tags.includes(obj.innerText)) {
      childDiv.style.display = "flex";
    } else if (obj.innerText == "all") {
      childDiv.style.display = "flex";
    } else {
      childDiv.style.display = "none";
    }
  }
  
  //remove active class from whichever button its on
  document.querySelector('#sortbuttons .active').classList.remove('active');
  //make this button active
  obj.classList.add("active");
}

function createElements() {
  fetch('./art.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
    //create inputs
    uniqueTags = getUniqueTags(data);
    for (i = 0; i < uniqueTags.length; i++) {
      createInputs(uniqueTags[i]);
    }
    });
  }

function createInputs(uniqueTag) {
  container = document.getElementById("sortbuttons");
  
  input = document.createElement("button");
  input.innerText = uniqueTag;
  input.setAttribute("onclick" , "toggle(this)");
  if (uniqueTag == "showcase") {
    input.classList.add("active");
    }
  container.appendChild(input);
}

function getUniqueTags(data) {
  var allTags = []; //pre define for sorting unique tags later
  for (i = 0; i < data.length; i++) { //for each array of tags
    tags = data[i].tags;
    allTags.push(tags); //add each array of tags to allTags
  }
  var tagsMerged = [].concat.apply([], allTags); //combine arrays into 1 long array
  var tagsFiltered = tagsMerged.filter(x => x !== undefined); //remove undefined
  uniqueTags = tagsFiltered.filter(onlyUnique); //get only unique tags
  uniqueTags.sort();
  return uniqueTags;
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

console.log("if you have trouble getting gallery images to load, try clearing cookies and refreshing. idk why but it fixes it. if that doesn't help then i've probably fucked up somewhere and didn't notice");