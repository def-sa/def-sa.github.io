
  function darkmode() {
    if (getCookie("darkmode") == 'true') {
      dark = true;
      }
    if (typeof dark == 'undefined') { //if loop or first time
      document.body.style.backgroundColor = "#3c3c3c";
      document.body.style.filter = "invert(1)";
      for (var i = 0; i < document.getElementsByTagName('img').length; i++) {
        document.getElementsByTagName('img')[i].style.filter = "invert(1)";
      }
      document.getElementById("darkmode").innerHTML = "lighten";
      dark = true;
      setCookie("darkmode", dark, 30); //set cookie to false
    } else { //if dark mode is active
      document.body.style.backgroundColor = "#c3c3c3";
      document.body.style.filter = "invert(0)";
      for (var i = 0; i < document.getElementsByTagName('img').length; i++) {
        document.getElementsByTagName('img')[i].style.filter = "invert(0)";
      }
      document.getElementById("darkmode").innerHTML = "darken";
      dark = undefined; //restart
      setCookie("darkmode", false, 30); //set cookie to false
    }
  }
  
  function loadSetting() {
    var cookie = getCookie("darkmode");
    var cookieparse = (cookie === 'true');
    if (cookie !== '' || cookie !== null) { //if cookie is defined
      if (cookieparse == true) {
        document.body.style.backgroundColor = "#3c3c3c";
        document.body.style.filter = "invert(1)";
        for (var i = 0; i < document.getElementsByTagName('img').length; i++) {
          document.getElementsByTagName('img')[i].style.filter = "invert(1)";
        }
        document.getElementById("darkmode").innerHTML = "lighten";
      }
      if (cookieparse == false) {
        document.body.style.backgroundColor = "#c3c3c3";
        document.body.style.filter = "invert(0)";
        for (var i = 0; i < document.getElementsByTagName('img').length; i++) {
          document.getElementsByTagName('img')[i].style.filter = "invert(0)";
        }
        document.getElementById("darkmode").innerHTML = "darken";
      }
    } else { //if cookie is not defined
      setCookie("darkmode", false, 30);
      }
    }
  
  function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }