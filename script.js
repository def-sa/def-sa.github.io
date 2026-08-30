const list = document.getElementById('list');
const container = document.getElementById('container');
const items = Array.from(list.children);

let ticking = false;


var onTabCurrently = toggleTabs(false);


const GALLERY_DATA_URL = './gallery.json';
var dataSaved = [];
var galleryDataPromise = null;
getData();


var age = new Date().getFullYear() - 2001
document.getElementById("age").innerHTML = 'i\'m ' + age;







let currentIndex = 0;
let positions = [];
let locked = false;

function cachePositions() {
  positions = items.map(item => ({
    top: item.offsetTop,
    height: item.offsetHeight
  }));
}

function updateView() {
  const p = positions[currentIndex];
  if (!p) return;

  const y = container.clientHeight / 2 - p.height / 2 - p.top;

  list.style.transform = `translate3d(0, ${y}px, 0)`;

  items.forEach((item, i) =>
    item.classList.toggle("active", i === currentIndex)
  );
}

function moveSelection(dir) {
  const next = Math.max(0, Math.min(items.length - 1, currentIndex + dir));
  if (next === currentIndex) return;

  currentIndex = next;
  requestAnimationFrame(updateView);
}

container.addEventListener("wheel", e => {
  e.preventDefault();
  if (locked || !e.deltaY) return;
  
  if (e.deltaY > 0) {
    document.getElementById("go-down")?.remove();
  }
  locked = true;
  moveSelection(Math.sign(e.deltaY));

  setTimeout(() => locked = false, 100);
}, { passive: false });

document.addEventListener("DOMContentLoaded", () => {
  cachePositions();
  updateView();
});

window.addEventListener("resize", () => {
  cachePositions();
  updateView();
});






document.addEventListener('keydown', e => {
  if (e.key === 'ArrowDown') moveSelection(1);
  if (e.key === 'ArrowUp') moveSelection(-1);
});


window.addEventListener('resize', updateView);
  


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
  document.getElementById("notepad").style.display = "none";
  document.getElementById("flex-left").style.maxWidth = "unset";
  document.getElementById("nav-x").style.display = "none";
  
  
  
  
  
  
  if (bool) { //view tab
    document.getElementById("right-tab").classList.add("flex-half");
    document.getElementById("right-tab").style.flex = "6";
    document.getElementById("title-desc").style.height = "50vh";
    
    document.getElementById("title").style.display = "none";
    document.getElementById("notepad").style.display = "block";
    document.getElementById("flex-left").style.maxWidth = "33vw";
    document.getElementById("nav-x").style.display = "block";
  } 
}
  

  
  
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
    event.preventDefault();
    moveGallery(-1);
    return;
  }
  if (event.key == "ArrowRight" || event.key == "d") {
    event.preventDefault();
    moveGallery(1);
    return;
  }
  if (event.key == "Escape") {
    openGallery();
    clearPopup();
    }
});
  
  
  
function moveGallery(dir) {
  var items = Array.from(document.querySelectorAll("#zip .item"))
    .filter(function(item) {
      return getComputedStyle(item).display !== "none";
    });

  if (!items.length) return;

  var current = items.findIndex(function(item) {
    return item.classList.contains("active");
  });

  if (current < 0) current = 0;

  items[current].classList.remove("active");

  current = (current + dir + items.length) % items.length;

  var next = items[current];
  next.classList.add("active");

  // If popup is currently open, replace its contents too.
  var popup = document.querySelector("#item-popup");

  if (popup) {
    var button = next.querySelector(".viewbutton");
    if (button) populatePopup(button);
  }
}

  
  
  
  
  
async function loadGalleryData() {
  if (galleryDataPromise) return galleryDataPromise;

  galleryDataPromise = fetch(GALLERY_DATA_URL, {
    cache: "no-cache"
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`gallery.json failed: ${response.status}`);
      }
      return response.json();
    })
    .then(json => {
      if (!json || !Array.isArray(json.art)) {
        throw new Error("Invalid gallery.json format");
      }

      return json.art.map(item => ({
        artwork_id: item[0],
        name: String(item[0]).padStart(4, "0"),
        date: item[1] || "N/A",
        type: item[2] || "",
        tag: Array.isArray(item[3]) ? item[3] : [],
        id: item[4],
        thumb_id: item[5]
      }));
    });

  return galleryDataPromise;
}

async function getData() {
  try {
    const data = await loadGalleryData();

    dataSaved = data.map(item => ({
      ...item,
      tag: [...item.tag]
    }));

    populateGallery();
  } catch (error) {
    console.error("Failed to load gallery:", error);
  }
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

   
    checkUrlStatus("https://drive.google.com/thumbnail?id="+data[i].thumb_id)
    
    
    image.src = "https://drive.google.com/thumbnail?id="+data[i].thumb_id;
    
    const tags = Array.isArray(data[i].tag)
      ? data[i].tag
      : String(data[i].tag || "").split(",");
    
    const isShowcase = tags
      .map(tag => tag.trim().toLowerCase())
      .includes("showcase");
    
    image.loading = isShowcase ? "eager" : "lazy";
    
    if (isShowcase) {
      image.fetchPriority = "high";
    }
    
    image.setAttribute("data-meta", JSON.stringify(data[i])); //add full metadata to image
    //append items to 
    item.style.display = "none";
    item.appendChild(image);
  }
  document.getElementById("zip").appendChild(item);
}


function checkUrlStatus(url) {
  return new Promise((resolve) => {
    const img = new Image();
    
    // If the image loads successfully, the status is effectively 200
    img.onload = () => resolve({ success: true, status: 200 });
    
    // If it fails to load (404, broken link, or private), it triggers an error
    img.onerror = () => resolve({ success: false, status: "Failed to load (Private or 404)"});
    
    img.alt = "loading...";
    img.src = url;
    
  });
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
    full.href = "https://lh3.googleusercontent.com/d/"+meta.id;
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
  

fetch("./blog.json")
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    var blog = document.getElementById("blog");

    data.posts
      .sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
      })
      .forEach(function(post) {
        var article = document.createElement("article");
        article.className = "blog-post";

        var avatar = document.createElement("div");
        avatar.className = "blog-avatar";

        var avatarImg = document.createElement("img");
        avatarImg.src = "./images/illy.png";
        avatarImg.alt = "illy";
        avatarImg.title = "hi, im illy!";

        avatar.appendChild(avatarImg);

        var body = document.createElement("div");
        body.className = "blog-body";

        var header = document.createElement("div");
        header.className = "blog-header";

        var author = document.createElement("span");
        author.className = "blog-author";
        author.textContent = "illy";

        var date = document.createElement("span");
        date.className = "blog-date";
        date.textContent = formatBlogDate(post.date);

        header.appendChild(author);
        header.appendChild(date);

        var title = document.createElement("span");
        title.className = "blog-title";
        title.textContent = post.title;

        var content = document.createElement("div");
        content.className = "blog-content";
        content.textContent = post.content;

        var tags = document.createElement("div");
        tags.className = "blog-tags";

        post.tags.forEach(function(tag) {
          var tagElement = document.createElement("span");
          tagElement.textContent = "#" + tag;
          tags.appendChild(tagElement);
        });

        body.appendChild(header);
        body.appendChild(title);
        body.appendChild(content);
        body.appendChild(tags);

        article.appendChild(avatar);
        article.appendChild(body);

        blog.appendChild(article);
      });
  });

function formatBlogDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  })
  .format(new Date(date))
  .replace(",", "");
}









//for randomize 
function shuffleDivsByClass(className) {
  const elements = Array.from(document.querySelectorAll('.' + className));
  if (elements.length === 0) return;

  const parent = elements[0].parentNode;

  for (let i = elements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [elements[i], elements[j]] = [elements[j], elements[i]];
  }

  const fragment = document.createDocumentFragment();
  elements.forEach(el => fragment.appendChild(el));
  parent.appendChild(fragment);
}


















//space floaty gallery
const SPACE_IMAGE_COUNT = 16;


function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

function generatePositions(count) {
    const positions = [];

    const minDistance = 24;
    const maxAttempts = 500;

    for (let i = 0; i < count; i++) {
        let best = null;
        let bestDistance = -1;

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            const candidate = {
                x: rand(4, 86),
                y: rand(5, 80)
            };

            if (!positions.length) {
                best = candidate;
                break;
            }

            const nearest = Math.min(
                ...positions.map(pos =>
                    Math.hypot(
                        candidate.x - pos.x,
                        candidate.y - pos.y
                    )
                )
            );

            if (nearest >= minDistance) {
                best = candidate;
                break;
            }

            if (nearest > bestDistance) {
                bestDistance = nearest;
                best = candidate;
            }
        }

        positions.push(best);
    }

    return positions;
}


function thumbnailURL(item) {
    return (
        "https://drive.google.com/thumbnail?id=" +
        encodeURIComponent(item.thumb_id) +
        "&sz=w400"
    );
}


function preloadImage(item) {
    return new Promise(resolve => {
        const img = new Image();

        img.fetchPriority = "high";
        img.src = thumbnailURL(item);

        img.onload = () => resolve(item);
        img.onerror = () => resolve(null);
    });
}


function createGalleryImage(item, position, index) {
    const img = document.createElement("img");

    img.className = "space-gallery-image";
    img.src = thumbnailURL(item);
    

    img.alt = item.name || "";
    img.loading = "eager";
    img.fetchPriority = "high";
    img.draggable = false;


    // SIZE
    const sizeRoll = Math.random();

    const size =
        sizeRoll < 0.08 ? rand(200, 280) :
        sizeRoll < 0.30 ? rand(50, 90) :
        rand(90, 170);

    img.style.width = `${size}px`;


    // POSITION
    img.style.left = `${position.x}%`;
    img.style.top = `${position.y}%`;


    // ROTATION
    img.style.setProperty(
        "--rotation",
        `${rand(-21, 78)}deg`
    );


    // OPACITY
    img.style.setProperty(
        "--image-opacity",
        rand(0.5, 0.9)
    );


    // DRIFT
    img.style.setProperty(
        "--drift-x",
        `${rand(10, 25)}px`
    );

    img.style.setProperty(
        "--drift-y",
        `${rand(8, 22)}px`
    );

    img.style.setProperty(
        "--float-time",
        `${rand(10, 18)}s`
    );

    img.style.setProperty(
        "--float-delay",
        `${rand(-12, 0)}s`
    );


    // STAGGERED ENTRANCE
    img.style.setProperty(
        "--enter-delay",
        `${index * 0.06}s`
    );


    img.onerror = () => img.remove();

    return img;
}



async function createSpaceGallery() {
    const container = document.getElementById("space-gallery");

    if (!container) return;

    try {
        const gallery = await loadGalleryData();

        // ONLY ITEMS TAGGED "showcase"
        const showcase = gallery.filter(item =>
            item?.thumb_id &&
            Array.isArray(item.tag) &&
            item.tag.some(tag =>
                String(tag)
                    .trim()
                    .toLowerCase() === "showcase"
            )
        );

        // RANDOM SELECTION
        const selected = shuffle(showcase)
            .slice(0, SPACE_IMAGE_COUNT);

        // SPREAD POSITIONS
        const positions = generatePositions(
            selected.length
        );

        // LOAD SELECTED IMAGES FIRST
        const loaded = (
            await Promise.all(
                selected.map(preloadImage)
            )
        ).filter(Boolean);

        // ADD TO PAGE
        container.replaceChildren(
            ...loaded.map((item, index) =>
                createGalleryImage(
                    item,
                    positions[index],
                    index
                )
            )
        );
    }

    catch (error) {
        console.error(
            "Space gallery failed:",
            error
        );
    }
}



if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        createSpaceGallery
    );
}
else {
    createSpaceGallery();
}
  
  
  

  
  