
const home = document.getElementById("home-tab");
const gallery = document.getElementById("gallery-tab");
const about = document.getElementById("about-tab");
const speps = document.getElementById("speps-tab");

var dataSaved = [];
getData();

openHome();
URLfix();

function getData() {
  fetch('./art.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (i = 0; i < data.length; i++) {
          if (data[i].type == "jpg" || data[i].type == "png") {
            data[i].type = "image";
            }
          data[i].date = data[i].date.slice(0, 10);
        }
        dataSaved = data;
        //populate gallery on successful json request
        populateGallery();
      });
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
//document.getElementById('homepost').children[4].children[0].onkeyup = function(event) {
  //keyboardClick(event, this);
  //};

function keyboardClick(event, element) {
  if (event.key == "Enter" || event.key == "Space") {
    element.click();
    } 
}

//intro
window.onload = function() {
  document.getElementById("wrapper").style.display = "block";
  document.getElementById("intro").style.display = "none";
  
  // if refferred to nonexisting pages /home/ /about/ /gallery/ or /speps/ direct user correctly
  if (document.referrer != "") {
    ref = document.referrer;
    refArr = ref.split('/'); //if referrer url has index.html, remove it
    if ((ref = ref.split('/').pop()) == "index.html") {
      refArr = refArr.slice(0, -1);
      ref = refArr.pop();
    }
    if (refArr.pop() == "") {
      ref = refArr.pop();
      }
      URLfix(ref);
  }
};


/* TODO: fix this to work with new sort buttons
uniqueTag = [];

//takes url and redirects user based on /#this-string
function URLhelper() {
  url = document.URL;
  url = url.split('/');
  currenttab = url.pop();
  linked = currenttab.slice(1);
  uniqueTag.push("all"); //add "all" temporarily because its hardcoded in the html
  if (uniqueTag.includes(linked)) {
    URLfix("gallery");
    toggle(linked);
    x = uniqueTag.pop(); //to remove "all"
  } else {
    x = uniqueTag.pop();
    history.replaceState({}, document.title, window.location.href.split('#')[0]);
    }
}
*/

//make url pretty when linked to /index.html, /#home, /#about, /#gallery, or /#speps
function URLfix(toTab) {
  if (toTab == undefined) {
    url = document.URL;
    url = url.split('/');
    to = url.pop();
  } else {
    to = "#"+toTab;
  }
  switch (to) {
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
      toggle("showcase");
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
	URLhelper();
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
  if (event.key == "Escape") {
    openGallery();
    clearPopup();
    }
});

//move gallery 
function moveGallery(left, right) {
  galleryitem = document.querySelectorAll("#gallery-tab .item");
  galleryitemVisible = [];
  for (i = 0; i < galleryitem.length; i++ ) { //if visible items
    if (galleryitem[i].style.display == "flex") {
      galleryitemVisible.push(galleryitem[i]); //create list of them
      }
  }
  galleryactive = document.querySelectorAll("#gallery-tab .active");
  galleryactive = galleryactive[0]; //because queryselectorall returns a node list
  if (galleryitemVisible.includes(galleryactive)) { //if active is not visible, make first item active
    index = galleryitemVisible.indexOf(galleryactive);
  } else { //active item is not visible, set to first item
    galleryactive = galleryitemVisible[0];
    index = 0;
  }
  for (i = 0; i < galleryitemVisible.length; i++ ) { //for each visible gallery item
    if (right == true) { //if right pressed
    if (index < galleryitemVisible.length) { //if in scope of items
      if (galleryitemVisible[index+1] == undefined) {return;}
      galleryitemVisible[index].classList.remove("active");
      galleryitemVisible[index+1].classList.add("active");
      galleryitemVisible[index+1].children[0].click(); //click viewbutton
      return;
    }
    }
    if (left == true) { //same as above 
    if (index > 0) {
      if (galleryitemVisible[index-1] == undefined) {return;}
      galleryitemVisible[index].classList.remove("active");
      galleryitemVisible[index-1].classList.add("active");
      galleryitemVisible[index-1].children[0].click();
      return;
    }
    }
  }
}

//yeah
function populateGallery() {
  data = dataSaved;
  createButtons(data);
  //for each data entry
  for (i = 0; i < data.length; i++) {
    createGalleryItem(data, i);
  }
  //URLhelper();
}

//yes
function createGalleryItem(data, i) {
  //metadata names: id, id_thumb, desc, tag, medium, links, date, dimensions, type
  //create gallery item, with tag for button sorting
  item = document.createElement("div");
  item.classList.add("item");
  //add attribues for sorting buttons 
  if (data[i].tag != undefined) { //if any tags exist
    item.setAttribute("data-sort", data[i].tag); //set tag as data attribute
  } else { //if tag doesnt exist
    data[i].tag = "(no tag)";
    item.setAttribute("data-sort", "");
  }
  item.setAttribute("data-sort", item.getAttribute("data-sort")+","+data[i].type); //for each type, add to attributes
  item.setAttribute("data-sort", item.getAttribute("data-sort")+","+data[i].medium);
  item.setAttribute("data-sort", item.getAttribute("data-sort")+","+data[i].date.slice(0,7));
  if (i == 0) { //default position for uh keyboard movement i think
    item.classList.add("active");
    }
  //create gallery item overlay
  viewbutton = document.createElement("button");
  viewbutton.classList.add("viewbutton");
  viewbutton.setAttribute("onclick", "populatePopup(this)");
  viewbutton.innerHTML = "view "+data[i].type;
  item.appendChild(viewbutton);
  
  if (data[i].type == "video") { //if video
    //create iframe with video
    iframe = document.createElement("iframe");
    data[i].id = data[i].links.split("/").pop(); //id = yt video id **assumes link will always be youtube if video**
    iframe.alt = data[i].desc;
    iframe.src = "https://www.youtube-nocookie.com/embed/"+data[i].id;
    iframe.frameBorder = 0;
    iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
    iframe.setAttribute("data-meta", JSON.stringify(data[i])); //add full metadata to iframe
    item.appendChild(iframe);
  } else { //if not video (if is image)
  //create gallery image with thumbnail
    image = document.createElement("img");
    if (data[i].tag.includes("showcase")) {
      image.loading = "eager";
    } else {
      image.loading = "lazy";
    }
    image.alt = data[i].desc;
    image.src = "https://drive.google.com/thumbnail?id="+data[i].id_thumb;
    image.setAttribute("data-meta", JSON.stringify(data[i])); //add full metadata to image
    //append items to 
    item.appendChild(image);
  }
  document.getElementById("gallery-tab").appendChild(item);
}

//create top buttons
function createButtons(data) {
  sort = document.getElementById("sort");
  sortmenu = document.getElementById("sort-menu");
  //top "tag" button
  tag = document.createElement("button");
  tag.innerText = "tag";
  tag.id = tag.innerText+"btn";
  tag.setAttribute("onclick" , "toggleMenu(this)");
  insertAfter(sort.children[0], tag);
  //top "type" button
  type = document.createElement("button");
  type.innerText = "type";
  type.id = type.innerText+"btn";
  type.setAttribute("onclick" , "toggleMenu(this)");
  insertAfter(sort.children[0], type);
  //top "medium" button
  medium = document.createElement("button");
  medium.innerText = "medium";
  medium.id = medium.innerText+"btn";
  medium.setAttribute("onclick" , "toggleMenu(this)");
  insertAfter(sort.children[0], medium);
  //top "date" button
  date = document.createElement("button");
  date.innerText = "date";
  date.id = date.innerText+"btn";
  date.setAttribute("onclick" , "toggleMenu(this)");
  insertAfter(sort.children[0], date);
  toggleMenu(tag);
  toggle("showcase");
}

//toggle sort-menu
function toggleMenu(btn, year) {
  if (typeof btn === 'string') {
    menu = btn;
  } else {
    menu = btn.innerText;
  }
  //remove active from top sort buttons
  if (document.querySelector('#sort .activebutton') != null) {
      document.querySelector('#sort .activebutton').classList.remove('activebutton');
  }
  sortmenu = document.getElementById("sort-menu");
  sortmenu2 = document.getElementById("sort-menu2");
  removeChildren(sortmenu);
  removeChildren(sortmenu2);
  createButtonsMenu(menu, year);
  document.getElementById(menu+"btn").classList.add("activebutton");
}
//create sort-menu items
function createButtonsMenu(att, yearSelected) {
  sortmenu = document.getElementById("sort-menu");
  sortmenu2 = document.getElementById("sort-menu2");
  if (data == undefined) {
    data = dataSaved;
  }
  switch(att) {
  case "all":
    removeChildren(sortmenu);
    removeChildren(sortmenu2);
    sortmenu.style.display = "none";
    sortmenu2.style.display = "none";
    toggle('all');
    break;
  case "tag":
    uniqueTag = getUnique(data, 'tag');
    for (i = 0; i < uniqueTag.length; i++) { //for each unique tag, make button
      if (uniqueTag[i] != "(no tag)") { //skip if (no tag)
        tagitem = document.createElement("button");
        tagitem.innerText = uniqueTag[i];
        tagitem.setAttribute("onclick" , "toggle(this)");
        tagitem.id = uniqueTag[i]+"btn";
        sortmenu.appendChild(tagitem);
      }
    }
    sortmenu.style.display = "flex";
    sortmenu2.style.display = "none";
    break;
  case "type":
    uniqueType = getUnique(data, 'type');
    for (i = 0; i < uniqueType.length; i++) { //for each unqiue type
      typeitem = document.createElement("button");
      typeitem.innerText = uniqueType[i];
        typeitem.setAttribute("onclick" , "toggle(this)");
      typeitem.id = uniqueType[i]+"btn";
      sortmenu.appendChild(typeitem);
    }
    sortmenu.style.display = "flex";
    sortmenu2.style.display = "none";
    break;
  case "medium":
    galleryitem = document.querySelectorAll("#gallery-tab .item");
    uniqueMedium = getUnique(data, 'medium');
    for (i = 0; i < uniqueMedium.length; i++) { //for each unique medium
    galleryVisible = [];
      for (x = 0; x < galleryitem.length; x++ ) { //for each gallery item
      datasort = galleryitem[x].getAttribute('data-sort');
      if (datasort.includes(uniqueMedium[i])) { //if gallery includes medium
        galleryVisible.push(uniqueMedium[i]); //add to visible
        }
      }
      if (galleryVisible.length >= 2) { //only add buttons if it would result in 2 or more gallery items
        mediumitem = document.createElement("button");
        mediumitem.innerText = uniqueMedium[i];
        mediumitem.setAttribute("onclick" , "toggle(this)");
        mediumitem.id = uniqueMedium[i]+"btn";
        sortmenu.appendChild(mediumitem);
      }
      /* why does this make it not work? i have no idea.
      if (uniqueMedium[i] == "ibispaint") {
        mediumitem.classList.add("activebutton");
        mediumitem.click();
      }
      */
    }
    sortmenu.style.display = "flex";
    sortmenu2.style.display = "none";
    break;
  case "date":
    data = dataSaved;
    uniqueYear = getUnique(data, 'date', true);
    
    for (i = 0; i < uniqueYear.length; i++) { //for each year
      dateitem = document.createElement("button");
      dateitem.innerText = uniqueYear[i];
      dateitem.setAttribute("onclick" , "toggle(this, undefined, true)");
      dateitem.id = uniqueYear[i]+"btn";
      sortmenu.appendChild(dateitem);
      
      allMonths = []; //get unique months here because returning getUnique breaks the for loop
      galleryitem = document.querySelectorAll("#gallery-tab .item");
      for (z = 0; z < galleryitem.length; z++ ) { //for each gallery item
        allMonths.push(data[z].date.slice(5, 7));
        }
      console.log(allMonths);
      uniqueMonths = Array.from(new Set(allMonths)); //remove duplicates
      uniqueMonths.sort();
      
      yearMonth = [];
      for (y = 0; y < uniqueMonths.length; y++) { //for each month
        for (x = 0; x < galleryitem.length; x++ ) { //for each gallery item
          datasort = galleryitem[x].getAttribute('data-sort');
          yyyymm = uniqueYear[i]+"-"+uniqueMonths[y]; 
          if (datasort.includes(yyyymm)) { //check if gallery item has specific year and month
            yearMonth.push(yyyymm);
          }
        }
      }
        yearMonth = Array.from(new Set(yearMonth));
        yearMonth.sort();
        
        //currentMonth = new Date().getMonth()+1;
        
        for (b = 0; b < yearMonth.length; b++ ) {
          year = yearMonth[b].slice(0, 4);
          if (year == yearSelected) {
            month = yearMonth[b].slice(5, 7);
            dateitem2 = document.createElement("button");
            dateitem2.innerText = month;
            dateitem2.setAttribute("onclick" , "toggle(this, true)");
            dateitem2.id = yearMonth[b]+"btn";
            sortmenu2.appendChild(dateitem2);
          }
        }
    }
    sortmenu.style.display = "flex";
    sortmenu2.style.display = "none";
    break;
  }
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function getUnique(data, item, isyear) {
  allItems = []; 
  for (i = 0; i < data.length; i++) { //for all entrees
    if (Array.isArray(data[i][item])) { //if is an array add all items
      for (x = 0; x < data[i][item].length; x++) {
        allItems.push(data[i][item][x]);
        }
    } else //if not an array (it's 1 item) add 1
      if (isyear == true) { //get unique years
        allItems.push(data[i][item].slice(0, 4))
      } else {
      allItems.push(data[i][item]);
      }
    }
  allItems = allItems.filter(function(x) { //remove undefined
    return x !== undefined;
  });
  uniqueItems = Array.from(new Set(allItems)); //remove duplicates
  uniqueItems.sort();
  return uniqueItems;  
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
      image.src = "https://drive.google.com/thumbnail?id="+imagemeta.id;
      } else {
      image.src = "https://drive.google.com/thumbnail?id="+imagemeta.id_thumb; //load thumbnail first
      image.setAttribute("onLoad","this.src='https://lh3.googleusercontent.com/d/"+imagemeta.id+"';this.onload='Function()'"); //load full image after 
    }
    image.alt = "full image";
    if (imagemeta.medium == undefined) {
      imagemeta.medium = "(no medium)";
      }
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
    full.href = "https://drive.google.com/thumbnail?id="+meta.id;
  }
  
  //put metadata in dimensions
  dim = document.getElementById("dimensions");
   dim.innerText = meta.dimensions;
   
   //put metadata in tag
   tag = document.getElementById("tag");
   populateList(meta.tag, tag);
  
  //put metadata in medium
  medium = document.getElementById("medium");
  populateList(meta.medium, medium);
    
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
  if (!Array.isArray(meta)) { //if tag not array (meaning it's 1 item)
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
function toggle(obj, ismonth, isyear) {
  if (typeof obj === 'string') {
    tag = obj;
  } else {
    tag = obj.innerText;
  }
  
  if (isyear != undefined) {
    toggleMenu("date", obj.innerText);
    document.getElementById("sort-menu2").style.display = "flex";
  }
  isMonth = undefined;
  if (ismonth != undefined) {
    year = document.querySelectorAll("#sort-menu .activebutton")[0];
    tag = year.innerText+"-"+tag
    isMonth = true;
  }
  
  fullgallery = document.querySelectorAll("#gallery-tab .item");
  for (i = 0; i < fullgallery.length; i++ ) { //for each gallery item 
    item = fullgallery[i];
    datasort = item.getAttribute('data-sort');
    if (datasort.includes(tag) || tag == "all") { //if gallery item includes sorted, or all, display them
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  }
  //if tag exists
  if (document.getElementById(tag+"btn") != undefined) {
    
    //remove active class from sort-menu buttons
    if (document.querySelector('#sort-menu2 .activebutton') != null) {
        document.querySelector('#sort-menu2 .activebutton').classList.remove('activebutton');
    }
    if (isMonth == undefined) {
      if (document.querySelector('#sort-menu .activebutton') != null) {
          document.querySelector('#sort-menu .activebutton').classList.remove('activebutton');
      }
    }
    //remove active from tag
    document.getElementById(tag+"btn").classList.add("activebutton");
  }
}

console.log("if you have trouble getting gallery images to load, try clearing cookies and refreshing. idk why but it fixes it. if that doesn't help then i've probably fucked up somewhere and didn't notice");