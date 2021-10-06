
document.getElementById('nav-tab').addEventListener("click", onTabClick, false);

var regex = /#(.*)/;
var url = window.location.href.match(regex);

if(!new RegExp(regex).test(url)){
  //no tab selected, do nothing
} else {
  removeActive();
  addActive(null,`${url[1]}`);
  }

function onTabClick(event, a) {
  removeActive();
  addActive(event, null, a);
  splashes();
}

function removeActive() {
  let activeTabs = document.querySelectorAll('.active');
  //remove active class from all tabs
  activeTabs.forEach(function(tab) {
    tab.className = tab.className.replace('active', '');
  });
}

function addActive(event, tab, a) {
  if (event) {
    // activate new tab and panel
    event.target.parentElement.className += ' active'; //for highlight + underline
    document.getElementById(event.target.href.split('#')[1]).className += ' active'; //for tab-pane to be visible
  }
  if (tab) {
    var active = document.querySelector('a[href="#'+`${url[1]}`+'"]');
    active.parentElement.className += ' active';
    document.getElementById(`${url[1]}`).className += ' active';
  }
  if (a) {
    var tabname = a.getAttribute("href").substring(1);
    var activetab = document.querySelector('a[href="#'+tabname+'"]');
    activetab.parentElement.className += ' active';
    document.getElementById(tabname).className += ' active';
    }
}



window.onscroll = function() {
  var totop = document.getElementById("top");
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    totop.style.display = "block";
  } else {
    totop.style.display = "none";
  }
};

fetch('blog-main.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
  var formatted = document.getElementById("formatted");
    data.forEach((entry) => {
      if (entry.date == '') {
        entry.date = 'none';
      }
      if (entry.text == '') {
        entry.text = 'none';
      }
    post = document.createElement("div");
    header = document.createElement("h3");
    header.innerText = entry.date;
    body = document.createElement("p");
    body.innerHTML = entry.text;
    post.appendChild(header);
    post.appendChild(body);
    post.appendChild(document.createElement("hr"));
    formatted.appendChild(post);
    });
  recentBlog(data);
});

function splashes() {
	fetch('splashes.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    var random = Math.floor(Math.random() * (data.length));
    document.getElementById('splashes').innerHTML = "<b>. </b>"+data[random]+"<b> .</b>";
  });
}

function recentBlog(data) {
    if (data.date == '') {
       data.date = 'none';
     }
    if (data.text == '') {
       data.text = 'none';
     }
    container = document.getElementById("recent-blog");
    var recent = data.at(-1);
    header = document.createElement("h3");
    header.innerText = recent.date;
    container.appendChild(header);
    var blurb = recent.text.substr(0, 128)+"...";
    body = document.createElement("p");
    body.innerHTML = blurb;
    container.appendChild(body);
}

