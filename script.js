  function darkmode() {
    if (typeof dark == 'undefined') { 
      document.body.style.backgroundColor = "#3c3c3c";
      document.body.style.filter = "invert(1)";
      for (var i = 0; i < document.getElementsByTagName('img').length; i++) {
        document.getElementsByTagName('img')[i].style.filter = "invert(1)";
      }
      document.getElementById("darkmode").innerHTML = "lighten";
      dark = true;
    } else { //if dark mode is active
        document.body.style.backgroundColor = "#c3c3c3";
        document.body.style.filter = "invert(0)";
        for (var i = 0; i < document.getElementsByTagName('img').length; i++) {
          document.getElementsByTagName('img')[i].style.filter = "invert(0)";
        }
        document.getElementById("darkmode").innerHTML = "darken";
        dark = undefined;
    }
  }