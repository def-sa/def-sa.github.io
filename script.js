const list = document.getElementById('list');
const container = document.getElementById('container');
const items = Array.from(list.children);

let currentIndex = 1;
let ticking = false;


var onTabCurrently = toggleTabs(false);


var dataSaved = [];
getData();


var age = new Date().getFullYear() - 2001
console.log(age)
document.getElementById("age").innerHTML = 'i\'m ' + age;





function updateView() {
  
  const activeItem = items[currentIndex];

  const containerRect = container.getBoundingClientRect();
  const itemRect = activeItem.getBoundingClientRect();

  // distance from top of list to active item
  const itemOffset = activeItem.offsetTop;

  // center calculation based purely on live layout
  const y =
    (container.clientHeight / 2) -
    (activeItem.offsetHeight / 2) -
    itemOffset;

  list.style.transform = `translateY(${y}px)`;

  items.forEach((item, i) =>
    item.classList.toggle('active', i === currentIndex)
  );
  
  if (!document.getElementById("go-down")) return;
  
  scrolled += 1;
  if (scrolled >= 5) {
    
    document.getElementById("go-down").style.opacity = "0.0"
    
  } else if (scrolled > 7) {
    document.getElementById("go-down").remove();
  } else {
    document.getElementById("go-down").style.fontStyle = "oblique";
  }
  
  
  
  
}

function requestUpdate() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    updateView();
    ticking = false;
  });
}

function moveSelection(delta) {
  const ni = currentIndex + delta;
  if (ni < 0 || ni >= items.length) return;
  currentIndex = ni;
  requestUpdate();
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowDown') moveSelection(1);
  if (e.key === 'ArrowUp') moveSelection(-1);
});

container.addEventListener('wheel', e => {
  e.preventDefault();
  moveSelection(e.deltaY > 0 ? 1 : -1);
}, { passive: false });

items.forEach((item, i) => {
  item.addEventListener('click', () => {
    currentIndex = i;
    requestUpdate();
  });
});

window.addEventListener('load', updateView);
window.addEventListener('resize', updateView);
  
var scrolled = 0;
window.addEventListener('scroll', function() {

});


function openTab(tab) {
  
  const parent = document.getElementById('tab-list');

  parent.querySelectorAll('.active').forEach(el => {
    el.classList.remove('active');
  });
    
  
  toggleTabs(true);
  document.getElementById("tab-info").innerHTML = document.getElementById(tab).getAttribute("data-tab-info");
  document.getElementById(tab).classList.add("active")
  
  }
  
function toggleTabs(bool) {
  document.getElementById("tab-info").innerHTML = "";
  
  
  document.getElementById("right-tab").classList.remove("flex-half");
  document.getElementById("right-tab").style.flex = "0";
  document.getElementById("title-desc").style.height = "100vh";
  document.getElementById("title").style.display = "block";
  document.getElementById("title-info").style.display = "none";
  document.getElementById("flex-left").style.maxWidth = "unset";
  document.getElementById("nav-x").style.display = "none";
  
  
  
  
  
  
  if (bool) { //view tab
    document.getElementById("right-tab").classList.add("flex-half");
    document.getElementById("right-tab").style.flex = "6";
    document.getElementById("title-desc").style.height = "50vh";
    
    document.getElementById("title").style.display = "none";
    document.getElementById("title-info").style.display = "block";
    document.getElementById("flex-left").style.maxWidth = "33vw";
    document.getElementById("nav-x").style.display = "block";
  } 
}
  
  
  
  
  
  
  
  
  
  
  const canvas = document.getElementById('starry-night');
  const ctx = canvas.getContext('2d');
  
  let stars = [];
  const numStars = 300;
  let dpr = window.devicePixelRatio || 1;
  
  function resizeCanvas() {
    const w = window.innerWidth;
    const h = window.innerHeight;
  
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
  
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  
  function createStars() {
    stars.length = 0;
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width / dpr,
        y: Math.random() * canvas.height / dpr,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        delta: (Math.random() * 0.02) - 0.01
      });
    }
  }
  
  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    for (const star of stars) {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
      ctx.fill();
  
      star.alpha += star.delta;
      if (star.alpha <= 0 || star.alpha >= 1) {
        star.delta *= -1;
      }
    }
  }
  
  function animate() {
    drawStars();
    requestAnimationFrame(animate);
  }
  
  window.addEventListener('resize', () => {
    resizeCanvas();
    createStars();
  });
  
  resizeCanvas();
  createStars();
  animate();
  
  
  
  
  
  
  
  
  
  
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
  
  
  
  
  
  
  
  
  
  
function getData() {
  fetch('./export.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (i = 0; i < data.length; i++) {
          // console.log(data[i])
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
  
//yeah
function populateGallery() {
  data = dataSaved;
  createButtons(data);
  //for each data entry
  for (i = 0; i < data.length; i++) {
    createGalleryItem(data, i);
    toggle("showcase")
  }
  //URLhelper();
  shuffleDivsByClass('item');
}


var uniqueTagsArray = []




//yes
function createGalleryItem(data, i) {
  
  //metadata names: id, thumb_id, desc, tag, medium, links, date, dimensions, type
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
  // item.setAttribute("data-sort", item.getAttribute("data-sort")+","+data[i].type); //for each type, add to attributes
  // item.setAttribute("data-sort", item.getAttribute("data-sort")+","+data[i].medium);
  item.setAttribute("data-sort", item.getAttribute("data-sort")+","+data[i].date.slice(0,7));
  if (i == 0) { //default position for uh keyboard movement i think
    item.classList.add("active");
    }
  //create gallery item overlay
  viewbutton = document.createElement("button");
  viewbutton.classList.add("viewbutton");
  viewbutton.setAttribute("onclick", "populatePopup(this)");
  viewbutton.innerHTML = "view "+data[i].name;
  item.appendChild(viewbutton);
  
  if (data[i].name == "video") { //if video
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
    
    /* shit broke
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "https://drive.google.com/thumbnail?id="+data[i].thumb_id, true);
    
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(xhr.responseURL);
      }
    };
    
    xhr.send();
    */
    
    
    
    
    image.src = "https://drive.google.com/thumbnail?id="+data[i].thumb_id;
    image.setAttribute("data-meta", JSON.stringify(data[i])); //add full metadata to image
    //append items to 
    item.style.display = "none";
    item.appendChild(image);
  }
  document.getElementById("zip").appendChild(item);
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
  
  //randomize button
  random = document.createElement("button");
  random.innerText = "randomize";
  random.id = random.innerText+"btn";
  random.setAttribute("onclick" , "shuffleDivsByClass('item')");
  insertAfter(sort.children[0], random);
  
  
  
  // //top "type" button
  // type = document.createElement("button");
  // type.innerText = "type";
  // type.id = type.innerText+"btn";
  // type.setAttribute("onclick" , "toggleMenu(this)");
  // insertAfter(sort.children[0], type);
  // //top "medium" button
  // medium = document.createElement("button");
  // medium.innerText = "medium";
  // medium.id = medium.innerText+"btn";
  // medium.setAttribute("onclick" , "toggleMenu(this)");
  // insertAfter(sort.children[0], medium);
  //top "date" button
  // date = document.createElement("button");
  // date.innerText = "date";
  // date.id = date.innerText+"btn";
  // date.setAttribute("onclick" , "toggleMenu(this)");
  // insertAfter(sort.children[0], date);
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
  // case "medium":
  //   galleryitem = document.querySelectorAll("#zip .item");
  //   uniqueMedium = getUnique(data, 'medium');
  //   for (i = 0; i < uniqueMedium.length; i++) { //for each unique medium
  //   galleryVisible = [];
  //     for (x = 0; x < galleryitem.length; x++ ) { //for each gallery item
  //     datasort = galleryitem[x].getAttribute('data-sort');
  //     if (datasort.includes(uniqueMedium[i])) { //if gallery includes medium
  //       galleryVisible.push(uniqueMedium[i]); //add to visible
  //       }
  //     }
  //     if (galleryVisible.length >= 2) { //only add buttons if it would result in 2 or more gallery items
  //       mediumitem = document.createElement("button");
  //       mediumitem.innerText = uniqueMedium[i];
  //       mediumitem.setAttribute("onclick" , "toggle(this)");
  //       mediumitem.id = uniqueMedium[i]+"btn";
  //       sortmenu.appendChild(mediumitem);
  //     }
  //     /* why does this make it not work? i have no idea.
  //     if (uniqueMedium[i] == "ibispaint") {
  //       mediumitem.classList.add("activebutton");
  //       mediumitem.click();
  //     }
  //     */
  //   }
  //   sortmenu.style.display = "flex";
  //   sortmenu2.style.display = "none";
  //   break;
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
      galleryitem = document.querySelectorAll("#zip .item");
      for (z = 0; z < galleryitem.length; z++ ) { //for each gallery item
        allMonths.push(data[z].date.slice(5, 7));
        } 
      // console.log(allMonths);
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
  console.log(btn)
  clearPopup();
  //for arrow navigation
  btn.blur();
  if (document.querySelector('#zip .active')) { //if active exists, remove, or else the first item is active
    document.querySelector('#zip .active').classList.remove('active');
  } else {
    document.getElementById('zip').children[2].classList.add("active");
  }
  btn.parentNode.classList.add("active");
  
  iframe = btn.parentElement.getElementsByTagName('iframe').item(0);
  img = btn.parentElement.getElementsByTagName('img').item(0);
  item = document.getElementById('item-image');
  iteminfo = document.getElementById('item-info');
  
  // // if tag of item is iframe, clone iframe to popup 
  // if (iframe) {
  //   video = document.getElementById("full-video");
  //   videometa = iframe.getAttribute("data-meta");
  //   videometa = JSON.parse(videometa);
  //   document.getElementById("full-img").style.display = "none";
  //   video.style.display = "block";
    
  //   videometa.dimensions = "";
  //   video.src = iframe.src;
    
  //   addtoPopup(videometa, "video");
  // }
  if (img) { // if tag of item is img
    
    imagemeta = img.getAttribute("data-meta");
    imagemeta = JSON.parse(imagemeta);
    
    //put image src in img
    image = document.getElementById("full-img");
    image.style.display = "block";
    document.getElementById("full-video").style.display = "none";
    // if (imagemeta.type.includes("gif")) { //preloading gifs is fucky, so don't
    //   image.src = "https://drive.google.com/thumbnail?id="+imagemeta.id;
    //   } else {
    document.getElementById("loading").innerText = "loading full res image⏳";
    image.src = "https://drive.google.com/thumbnail?id="+imagemeta.thumb_id; //load thumbnail first
    
    
    image.onload = function() {
    loadFullImage();
    };
    
    function loadFullImage() {
      image.src='https://lh3.googleusercontent.com/d/'+imagemeta.id;
      image.onload = function() {
        document.getElementById('loading').innerText = '';
        }
    }
    
    
    image.setAttribute("onError", "document.getElementById('loading').innerText = 'failed to load full res image. could not be in the backend or you are loading images too fast'")
    // }
    image.alt = "full image";
    // if (imagemeta.medium == undefined) {
    //   imagemeta.medium = "(no medium)";
    //   }
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
  // //put metadata in desc
  // desc = document.getElementById("desc");
  // desc.innerText = meta.desc;
  
  //put metadata in full
  full = document.getElementById("full");
  full.innerText = "open original";
  full.target = "_blank";
  if (type == "video") {
    full.href = "https://youtu.be/"+meta.id;
  } else {
    full.href = "https://drive.google.com/thumbnail?id="+meta.id;
  }
  
  // //put metadata in dimensions
  // dim = document.getElementById("dimensions");
  // dim.innerText = meta.dimensions;
   
   //put metadata in tag
   tag = document.getElementById("tag");
   populateList(meta.tag, tag);
  
  // //put metadata in medium
  // medium = document.getElementById("medium");
  // populateList(meta.medium, medium);
    
  // //put metadata in links , special formatting so cant use the populateList function
  // links = document.getElementById("links");
  // if (!Array.isArray(meta.links)) { 
  //   link = document.createElement("li");
  //   anchor = document.createElement("a");
  //   anchor.href = meta.links;
  //   anchor.target = "_blank";
  //   anchor.innerText = meta.links.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i)[1]; //get domain from link
  //   link.appendChild(anchor);
  //   links.appendChild(link);
  // } else {
  //   for (i = 0; i < meta.links.length; i++) {
  //     link = document.createElement("li");
  //     anchor = document.createElement("a");
  //     anchor.href = meta.links[i];
  //     anchor.target = "_blank";
  //     anchor.innerText = meta.links[i].match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i)[1];
  //     link.appendChild(anchor);
  //     links.appendChild(link);
  // //     }
  // }
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
  
  fullgallery = document.querySelectorAll("#zip .item");
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

  
  
  //remove items from popup and close it
document.getElementById('item-x').onclick = function(event){
  clearPopup();
};
  
  




  
function shuffleDivsByClass(className) {
  const elements = Array.from(document.querySelectorAll('.' + className));
  if (elements.length === 0) return;

  const parent = elements[0].parentNode;

  // Fisher–Yates shuffle
  for (let i = elements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [elements[i], elements[j]] = [elements[j], elements[i]];
  }

  const fragment = document.createDocumentFragment();
  elements.forEach(el => fragment.appendChild(el));
  parent.appendChild(fragment);
}


  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  