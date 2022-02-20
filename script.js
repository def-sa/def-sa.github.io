
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

//keyboard nav for header links
all_nav = document.getElementById("nav-tab").children;
for (i = 0; i < all_nav.length; i++) {
  all_nav[i].onkeyup = function(event) {
    keyboardClick(event, this.children[0]); 
  };
}

//hide tabs
function hideTabs() {
  home.style.display = "none";
  gallery.style.display = "none";
  about.style.display = "none";
  speps.style.display = "none";
}

//if click outside of homepost window, close home
document.getElementById('home-tab').onclick = function(e) {
  if  (event.target.id == 'home-tab') {
    openGallery();
  }
};

// close home post
document.getElementById('closehome').onclick = function(event){
  openGallery();
}; //accessibility support for closehome
document.getElementById('closehome').onkeyup = function(event){
  keyboardClick(event, this);
};
//accessibility support for about me link
document.getElementById('homepost').children[4].children[0].onkeyup = function(event) {
  keyboardClick(event, this);
  };

function keyboardClick(event, element) {
  if (event.key == "Enter" || event.key == "Space") {
    element.click();
    } 
}

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
	document.body.scrollTop = document.documentElement.scrollTop = 0;
});

//sorry about this but idk what else i'd do
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

//toggle hamburger menu
function toggleHam() {
  var e = document.getElementById("ham-menu");
  e.style.display = ((e.style.display!='block') ? 'block' : 'none');
}

//remove items from popup and close it
document.getElementById('item-x').onclick = function(event){
  clearPopup();
};
//popup x keyboard support
document.getElementById('item-x').onkeyup = function(event){
  keyboardClick(event, this);
};

function clearPopup() {
  document.getElementById('item-details').style.display = 'none';
  lists = document.getElementById("item-info").getElementsByTagName("ul");
  for (i = 0; i < lists.length; i++) {
    lists[i].innerHTML = ""; //remove all children within lists
  }
}
//key press to move along gallery images
document.addEventListener("keyup", function(event) {
  if (event.key == "ArrowLeft" || event.key == "a") {
    moveGallery(true, false);
    return;
  }
  if (event.key == "ArrowRight" || event.key == "d") {
    moveGallery(false, true);
    return;
  }
});
//move gallery 
function moveGallery(left, right) {
  galleryactive = document.querySelector('#gallery-tab .active');
  index = getChildrenIndex(galleryactive)-2; 
  galleryitem = document.querySelectorAll("#gallery-tab .item");
  for (i = 0; i < galleryitem.length; i++ ) { //for each gallery item 
    if (right == true) { //if right pressed
      if (index < galleryitem.length-1) { //dont move index out of range
        galleryitem[index].classList.remove("active");
        galleryitem[index+1].classList.add("active");
        galleryitem[index+1].children[0].click(); //click viewbutton
        return;
      }
    }
    if (left == true) {
      if (index > 0) {
        galleryitem[index].classList.remove("active");
        galleryitem[index-1].classList.add("active");
        galleryitem[index-1].children[0].click();
        return;
      }
    }
  }
}
//some function i stole 
function getChildrenIndex(ele){
  if(ele.sourceIndex){
    var eles = ele.parentNode.children;
    var low = 0, high = eles.length-1, mid = 0;
    var esi = ele.sourceIndex, nsi;
    //use binary search algorithm
    while (low <= high) {
      mid = (low + high) >> 1;
      nsi = eles[mid].sourceIndex;
      if (nsi > esi) {
          high = mid - 1;
      } else if (nsi < esi) {
          low = mid + 1;
        } else {
          return mid;
        }
    }
  }
  //other browsers
  var i=0;
  while(ele = ele.previousElementSibling){
    i++;
  }
  return i;
}

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
      input.id = uniqueTags[i]+"btn";
      input.setAttribute("onclick" , "toggle(this)");
      if (uniqueTags[i] == "showcase") {
        input.classList.add("activebutton");
        }
      container.appendChild(input);
    }
    //for each data entry
    for (i = 0; i < data.length; i++) {
      //metadata names: id, id_thumb, desc, tags, programs, links, date, dimensions, type
      //create gallery item, with tags for button sorting
      item = document.createElement("div");
      item.classList.add("item");
      if (data[i].tags != undefined) {
        item.setAttribute("data-tags", data[i].tags);
      } else {
        data[i].tags = "(no tags)";
        item.setAttribute("data-tags", "");
        }
      if (i == 0) {
        item.classList.add("active");
        }
        
      //create gallery item overlay
      viewbutton = document.createElement("button");
      viewbutton.classList.add("viewbutton");
      viewbutton.setAttribute("onclick", "populatePopup(this)");
      viewbutton.innerHTML = "view "+data[i].type;
      item.appendChild(viewbutton);
      
      if (data[i].tags.includes("video")) { //if video
        //create iframe with video
        iframe = document.createElement("iframe");
        data[i].id = data[i].links.split("/").pop(); //id = yt video id **assumes link will always be youtube if video**
        iframe.alt = data[i].desc;
        iframe.src = "https://www.youtube-nocookie.com/embed/"+data[i].id;
        iframe.frameBorder = 0;
        iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
        iframe.setAttribute("data-meta", JSON.stringify(data[i])); //add full metadata to iframe
        item.appendChild(iframe);
        } else { //if not video
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
        item.appendChild(image);
        }
      document.getElementById("gallery-tab").appendChild(item);
    }
  toggle("showcase");
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
  clearPopup();
  //for arrow navigation
  btn.blur();
  if (document.querySelector('#gallery-tab .active')) { //if active exists, remove, or else the first item is active
    document.querySelector('#gallery-tab .active').classList.remove('active');
  } else {
    document.getElementById('gallery-tab').children[2].classList.add("active");
  }
  btn.parentNode.classList.add("active");
  
  iframe = btn.parentElement.getElementsByTagName('iframe').item(0);
  img = btn.parentElement.getElementsByTagName('img').item(0);
  item = document.getElementById('item-image');
  iteminfo = document.getElementById('item-info');
  
  
  
  // if tag of item is iframe, clone iframe to popup 
  if (iframe) {
    video = document.getElementById("full-video");
    videometa = iframe.getAttribute("data-meta");
    videometa = JSON.parse(videometa);
    document.getElementById("full-img").style.display = "none";
    video.style.display = "block";
    
    videometa.dimensions = "";
    video.src = iframe.src;
    
    addtoPopup(videometa, "video");
  }
  if (img) { // if tag of item is img
    imagemeta = img.getAttribute("data-meta");
    imagemeta = JSON.parse(imagemeta);
    
    //put image src in img
    image = document.getElementById("full-img");
    image.style.display = "block";
    document.getElementById("full-video").style.display = "none";
    image.src = "";
    if (imagemeta.type.includes("gif")) { //preloading gifs is fucky, so don't
      image.src = "https://drive.google.com/uc?id="+imagemeta.id;
      } else {
      image.src = "https://drive.google.com/uc?id="+imagemeta.id_thumb; //load thumbnail first
      image.setAttribute("onLoad","this.src='https://drive.google.com/uc?id="+imagemeta.id+"';this.onload='Function()'"); //load full image after 
    }
    image.alt = "full image";
    addtoPopup(imagemeta);
  }
  document.getElementById("item-info").focus();
  document.getElementById('item-details').style.display = 'flex';
}

function addtoPopup(meta, type) {
  //put metadata in date
  date = document.getElementById("date");
  if (meta.date == "N/A") {
    date.innerText = "unknown date";
  } else {
    date.innerText = meta.date.substring(0,10); 
  }
  //put metadata in desc
  desc = document.getElementById("desc");
  desc.innerText = meta.desc;
  
  //put metadata in full
  full = document.getElementById("full");
  full.innerText = "open original";
  full.target = "_blank";
  if (type == "video") {
    full.href = "https://youtu.be/"+meta.id;
  } else {
    full.href = "https://drive.google.com/uc?id="+meta.id;
  }
  
  //put metadata in dimensions
  dim = document.getElementById("dimensions");
   dim.innerText = meta.dimensions;
   
   //put metadata in tags
   tags = document.getElementById("tags");
   populateList(meta.tags, tags);
  
  //put metadata in programs
  programs = document.getElementById("programs");
  populateList(meta.programs, programs);
    
  //put metadata in links , special formatting so cant use the populateList function
  links = document.getElementById("links");
  if (!Array.isArray(meta.links)) { 
    link = document.createElement("li");
    anchor = document.createElement("a");
    anchor.href = meta.links;
    anchor.target = "_blank";
    anchor.innerText = meta.links.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i)[1]; //get domain from link
    link.appendChild(anchor);
    links.appendChild(link);
  } else {
    for (i = 0; i < meta.links.length; i++) {
      link = document.createElement("li");
      anchor = document.createElement("a");
      anchor.href = meta.links[i];
      anchor.target = "_blank";
      anchor.innerText = meta.links[i].match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i)[1];
      link.appendChild(anchor);
      links.appendChild(link);
      }
  }
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
  if (typeof obj === 'string') {
    tag = obj;
  } else {
    tag = obj.innerText;
  }
  var childDivs = document.querySelectorAll("#gallery-tab .item");
  for (i = 0; i < childDivs.length; i++ ) { //for each gallery item 
    var childDiv = childDivs[i];
    tags = childDiv.getAttribute('data-tags');
    if (tags.includes(tag)) { //if gallery item includes tag metadata 
      childDiv.style.display = "flex";
    } else if (tag == "all") {
      childDiv.style.display = "flex";
    } else {
      childDiv.style.display = "none";
    }
  }
  //remove active class from whichever button its on
  if (document.querySelector('#sortbuttons .activebutton') != null) {
    document.querySelector('#sortbuttons .activebutton').classList.remove('activebutton');
  } else {}
  //make this button active
  document.getElementById(tag+"btn").classList.add("activebutton");
}

console.log("if you have trouble getting gallery images to load, try clearing cookies and refreshing. idk why but it fixes it. if that doesn't help then i've probably fucked up somewhere and didn't notice");