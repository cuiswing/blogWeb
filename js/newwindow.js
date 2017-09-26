
 if (document.getElementById) {
  var newWindowLink;
  var newWindowLinks = document.getElementById('main-content').getElementsByTagName('a');
  for (var i = 0; i < newWindowLinks.length; i++) {
    newWindowLink = newWindowLinks[i];
    if (!((newWindowLink.href.indexOf("cui") != -1) && (newWindowLink.href.indexOf("#") != -1)) ){
       // newWindowLink.onclick = openInNewWindow;
       newWindowLink.target = '_blank';
    }
  }
 }