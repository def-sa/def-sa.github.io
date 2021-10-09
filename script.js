
document.getElementById('nav-tab').addEventListener("click", onTabClick, false);

var regex = /#(.*)/;
var url = window.location.href.match(regex);

if (!new RegExp(regex).test(url)) {
    //no tab selected, do nothing
} else {
    removeActive();
    addActive(null, `${url[1]}`);
}

function onTabClick(event, a) {
    removeActive();
    addActive(event, null, a);
    splashes();
}

function removeActive() {
    let activeTabs = document.querySelectorAll('.active');
    //remove active class from all tabs
    activeTabs.forEach(function (tab) {
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
        var active = document.querySelector('a[href="#' + `${url[1]}` + '"]');
        active.parentElement.className += ' active';
        document.getElementById(`${url[1]}`).className += ' active';
    }
    if (a) {
        var tabname = a.getAttribute("href").substring(1);
        var activetab = document.querySelector('a[href="#' + tabname + '"]');
        activetab.parentElement.className += ' active';
        document.getElementById(tabname).className += ' active';
    }
}

window.onscroll = function () { //back to top button
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
    data.forEach((entry) => {
        if (entry.text.includes("\n")) {
            entry.text = entry.text.replace("\n", "<br>");
        }
        createPosts(entry);
    });
    recentBlog(data);
});

function createPosts(entry) { 
    var formatted = document.getElementById("formatted");
    if (entry.title) { //if title exists
        title = document.createElement("h3");
        title.innerText = entry.title + " (" + entry.date + ")";
    } else { //if title doesn't exist
        title = document.createElement("h3");
        title.innerText = "(" + entry.date + ")";
    }
    if (entry.edited) { //if entry is edited
        title.innerText = entry.title + " (" + entry.date + ")*";
        title.title = "[edited on " + entry.edited + "]";
    }
    text = document.createElement("p");
    text.innerHTML += entry.text;
    post = document.createElement("div");
    post.appendChild(title);
    post.appendChild(text);
    formatted.appendChild(post);
}

function splashes() {
    fetch('splashes.json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        var random = Math.floor(Math.random() * (data.length));
        document.getElementById('splashes').innerHTML = "<b>. </b>" + data[random] + "<b> .</b>";
    });
}

function recentBlog(data) {
    container = document.getElementById("recent-blog");
    var recent = data.at(-1);
    header = document.createElement("h3");
    header.innerText = recent.date;
    container.appendChild(header);
    var blurb = recent.text.substr(0, 128) + "...";
    body = document.createElement("p");
    body.innerHTML = blurb;
    container.appendChild(body);
}

//invert color of icons if dark mode
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  img = document.querySelectorAll("img");
	for (i = 0; i < img.length; i++) {
		if (img[i].getAttribute('src').includes("./images/icons/")) {
		img[i].style.filter = "invert(1)";
		}
	}
} else {
	img = document.querySelectorAll("img");
	for (i = 0; i < img.length; i++) {
		if (img[i].getAttribute('src').includes("./images/icons/")) {
		img[i].style.filter = "invert(0)";
		}
	}
}
