
const home = document.getElementById("home-tab");
const gallery = document.getElementById("gallery-tab");
const about = document.getElementById("about-tab");
const speps = document.getElementById("speps-tab");

openHome();
URLfix();
populateGallery();

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
//hide tabs
function hideTabs() {
  home.style.display = "none";
  gallery.style.display = "none";
  about.style.display = "none";
  speps.style.display = "none";
}

// close home post
document.getElementById('closehome').onclick = function(event){
  openGallery();
}; //accessibility support
document.getElementById('closehome').onkeyup = function(event){
  if (event.key == "Enter" || event.key == "Space") {
    this.click();
    } 
};

//intro
window.onload = function() {
  document.getElementById("wrapper").style.display = "block";
  document.getElementById("intro").style.display = "none";
};

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
    break;
  }
}

//on url change, make it pretty
window.addEventListener('popstate', function (event) {
	URLfix();
});

//sorry about this but idk what else i'd do
function openHome() {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  document.querySelector('#nav-tab .active').classList.remove('active'); //remove active tab //remove underline + highlight
  addActive(document.getElementById("home-tab"), document.getElementById("nav-tab").children[0]);
  }
function openGallery() {
  document.querySelector('#nav-tab .active').classList.remove('active'); //remove active tab
  addActive(document.getElementById("gallery-tab"), document.getElementById("nav-tab").children[1]); 
  }
function openAbout() {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  document.querySelector('#nav-tab .active').classList.remove('active'); //remove active tab
  addActive(document.getElementById("about-tab"), document.getElementById("nav-tab").children[3]); //skip one child because of empty list item where logo is
  }
function openSpeps() {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  document.querySelector('#nav-tab .active').classList.remove('active'); //remove active tab
  addActive(document.getElementById("speps-tab"), document.getElementById("nav-tab").children[4]);
  }

//toggle hamburger menu
function toggleHam() {
  var e = document.getElementById("ham-menu");
  e.style.display = ((e.style.display!='block') ? 'block' : 'none');
}

//remove items from popup and close it
document.getElementById('item-x').onclick = function(event){
  document.getElementById('item-details').style.display = 'none';
  lists = document.getElementById("item-info").getElementsByTagName("ul");
  for (i = 0; i < lists.length; i++) {
    lists[i].innerHTML = ""; //remove all children within lists
  }
};
document.getElementById('item-x').onkeyup = function(event){
  if (event.key == "Enter" || event.key == "Space") {
    this.click();
    } 
};

//populate gallery, duh
function populateGallery() {
  fetch('./art.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
    //create buttons for each unique button tag
    uniqueTags = getUniqueTags(data);
    for (i = 0; i < uniqueTags.length; i++) {
      container = document.getElementById("sortbuttons");
      input = document.createElement("button");
      input.innerText = uniqueTags[i];
      input.setAttribute("onclick" , "toggle(this)");
      if (uniqueTags[i] == "showcase") {
        input.classList.add("active");
        }
      container.appendChild(input);
    }
    //for each data entry
    for (i = 0; i < data.length; i++) {
      //metadata names: id, id_thumb, desc, tags, programs, links, date, dimensions, type
      
      //TODO: add support for videos within an iframe
      //create gallery item, with tags for button sorting
      item = document.createElement("div");
      item.classList.add("item");
      item.setAttribute("data-tags", data[i].tags);
      //create gallery item overlay
      viewbutton = document.createElement("button");
      viewbutton.classList.add("viewbutton");
      viewbutton.setAttribute("onclick", "populatePopup(this)");
      viewbutton.innerHTML = "view "+data[i].type;
      //create gallery image with thumbnail
      image = document.createElement("img");
      if (data[i].tags.includes("showcase")) {
        image.loading = "eager";
        } else {
          image.loading = "lazy";
          }
      image.alt = data[i].desc;
      image.src = "https://drive.google.com/uc?id="+data[i].id_thumb;
      image.setAttribute("data-meta", JSON.stringify(data[i])); //add full metadata to image
      //append items to 
      item.appendChild(viewbutton);
      item.appendChild(image);
      document.getElementById("gallery-tab").appendChild(item);
    }
  });
}
//to get uniquetags for gallery buttons
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
  
//populate gallery popup
function populatePopup(btn) {
  iframe = btn.parentElement.getElementsByTagName('iframe').item(0);
  img = btn.parentElement.getElementsByTagName('img').item(0);
  item = document.getElementById('item-image');
  iteminfo = document.getElementById('item-info');
  
  // if tag of item is iframe, clone iframe to popup 
  if (iframe) {
    item.appendChild(iframe.cloneNode());
    //TODO: write custom metadata for videos specifically
    }
  if (img) { // if tag of item is img
    imagemeta = img.getAttribute("data-meta");
    imagemeta = JSON.parse(imagemeta);
    
    //put image src in img
    image = document.getElementById("full-img");
    image.src = "";
    if (imagemeta.type.includes("gif")) { //preloading gifs is fucky, so don't
      image.src = "https://drive.google.com/uc?id="+imagemeta.id;
      } else {
      image.src = "https://drive.google.com/uc?id="+imagemeta.id_thumb; //load thumbnail first
      image.setAttribute("onLoad","this.src='https://drive.google.com/uc?id="+imagemeta.id+"';this.onload='Function()'"); //load full image after 
    }
    image.alt = "full image";
    
    //put metadata in date
    date = document.getElementById("date");
    if (imagemeta.date == "N/A") {
      date.innerText = "unknown date";
      } else {
       date.innerText = imagemeta.date.substring(0,10); 
      }
    
    //put metadata in desc
    desc = document.getElementById("desc");
    desc.innerText = imagemeta.desc;
    
    //put metadata in full
    full = document.getElementById("full");
    full.innerText = "open original";
    full.target = "_blank";
    full.href = "https://drive.google.com/uc?id="+imagemeta.id;
    
    //put metadata in dimensions
    dim = document.getElementById("dimensions");
    dim.innerText = imagemeta.dimensions;
    
    //put metadata in tags
    tags = document.getElementById("tags");
    populateList(imagemeta.tags, tags);
    
    //put metadata in programs
    programs = document.getElementById("programs");
    populateList(imagemeta.programs, programs);
    
    //put metadata in links , special formatting so cant use the populateList function
    links = document.getElementById("links");
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
  }
  document.getElementById('item-details').style.display = 'flex';
  }

//populate meta lists
function populateList(meta, list) {
  if (!Array.isArray(meta)) { //if tags not array (meaning it's 1 item)
      item = document.createElement("li");
      item.innerText = meta;
      list.appendChild(item);
    } else {
      for (i = 0; i < meta.length; i++) {
        item = document.createElement("li");
        item.innerText = meta[i];
        list.appendChild(item);
      }
  }
}

//gallery sorted buttons toggle
function toggle(obj) {
  var childDivs = document.querySelectorAll("#gallery-tab .item");
  for (i = 0; i < childDivs.length; i++ ) { //for each gallery item 
    var childDiv = childDivs[i];
    tags = childDiv.getAttribute('data-tags');
    if (tags.includes(obj.innerText)) { //if gallery item includes tag metadata 
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

console.log("if you have trouble getting gallery images to load, try clearing cookies and refreshing. idk why but it fixes it. if that doesn't help then i've probably fucked up somewhere and didn't notice");