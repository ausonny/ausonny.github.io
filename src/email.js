/* exported putEmail */
/* global */
//
// Email address link javascript     (by Grauw)
// =============================
// Using standard DOM methods working in an XHTML environment.
//
// License: Public Domain (but feel free to mention my name ;))
//
// Usage:
// * Fill in your email address in the variable ‘eml’ below,
// * Put a tag with class="myemail" where you want the link,
// * Add onload="putEmail();" to your <body> tag.
//

//
// Returns an array of elements with the given class
//
function getElementsByClass(elem, classname) {
  const classes = [];
  const alltags = document.getElementsByTagName(elem);
  for (let i = 0; i < alltags.length; i++) {
    if (alltags[i].className === classname) classes[classes.length] = alltags[i];
  }
  return classes;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function putEmail() {
  // eslint-disable-line no-unused-vars
  let eml = 'ausonny'; // The email address...
  eml += '@';
  eml += 'gmail.com';

  const link = document.createElement('a');
  link.setAttribute('href', `mailto:${eml}`);
  link.appendChild(document.createTextNode(eml));
  const spans = getElementsByClass('span', 'myemail');
  for (let i = 0; i < spans.length; i++) spans[i].parentNode.replaceChild(link.cloneNode(true), spans[i]);
}
