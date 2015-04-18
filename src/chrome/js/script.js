var na = 'Not available.',
    nc = 'Content is missing.';

function getLinkElement(rel) {
  var links = document.getElementsByTagName('link'),
  found = na;

  for (var i = 0, l; l = links[i]; i++) {
    if (l.getAttribute('rel') === rel) {
      found = l.getAttribute('href');
      if (!found) {
        return nc;
        } else {
        return found;
      }
    }
  }
  return found;
}

function getMetaElement(name) {
  var metaTags = document.getElementsByTagName('meta');
  for (var i = 0, mLen = metaTags.length; i < mLen; i++) {
    if (metaTags[i].name.toLowerCase() === name && metaTags[i].getAttribute('content')) {
      return metaTags[i].getAttribute('content');
    } else if (metaTags[i].name.toLowerCase() === name) {
      return nc;
    }
  }
  return na;
}

function getMetaElementOccurrences(name) {
  var metaTags = document.getElementsByTagName('meta'),
      matched = 0;
  for (var i = 0,mLen = metaTags.length; i < mLen; i++) {
    if (metaTags[i].name.toLowerCase() === name) {
      matched++;
    }
  }
  return matched;
}

function getElement(name){
  var elements = document.getElementsByTagName(name);
  for ( var i = 0,eLen = elements.length; i < eLen; i++ ) {
    if (elements[0].innerText === '') {
      return nc;
    } else {
      return elements[0].innerText;
    }
  }
}

function getElementOccurrences(name){
  var elements = document.getElementsByTagName(name),
      matched = 0;
  for (var i = 0,eLen = elements.length; i < eLen; i++) {
    matched++;
  }
  return matched;
}

function getCharacters(element) {
  if (element === na || element === nc) {
    return;
  } else {
    return element.length + ' characters';
  }
}

function getLinkElementOccurrences(rel) {
  var links = document.getElementsByTagName('link'),
      matched = 0;
  for (var i = 0, l; l = links[i]; i++) {
    if (l.getAttribute('rel') === rel) {
      matched++;
    }
  }
  return matched;
}

// rel-alternate-media annotation
function getRelAlternateMediaLinkTag(rel) {
  var links = document.getElementsByTagName('link'),
      found = na;
  for (var i = 0, l; l = links[i]; i++) {
  if (l.getAttribute('rel') === rel && l.getAttribute('media') !== null) {
    if (l.getAttribute('rel') === rel && l.getAttribute('media').match(/^only screen and \(max-width:/)) {
      found = l.getAttribute('href');
      if (!found) {
        return nc;
      } else {
        return found;
      }
    }
  }
}
  return found;
}

// Array of rel-alternate-hreflang annotation
function getRelAlternateHrefLangTags() {
  var links = document.getElementsByTagName('link'),
      results = [];
  for(var i = 0, l=links.length; i<l; i++) {
    if (links[i].getAttribute('rel') === 'alternate' && links[i].getAttribute('hreflang') !== null) {
      var hrefAttribute = links[i].getAttribute('href') || nc;
      var hrefLangAttribute = links[i].getAttribute('hreflang') || nc;
      results.push({
        hreflang: hrefLangAttribute,
        href: hrefAttribute
      });
    }
    results;
  }

  // the array is defined and has at least one element
  if (typeof results !== 'undefined' && results.length > 0) {
    return results;
  } else {
    return na;
  }
}

function getPageSpeed() {
  return performance.timing;
}

var pageSpeed                   = getPageSpeed();
var pageTitle                   = [],
    getPageTitle                = (typeof getElement('title') !== "undefined") ? getElement('title').replace(/\s+/g, ' ') : na;
pageTitle.push(getPageTitle);

var pageTitleOccurrences        = getElementOccurrences('title'),
    pageTitleCharacters         = getCharacters(getPageTitle);

var metaDescription             = getMetaElement('description'),
    metaDescriptionCharacters   = getCharacters(metaDescription),
    metaDescriptionOccurrences  = getMetaElementOccurrences('description');

var metaKeywords                = getMetaElement('keywords'),
    metaKeywordsOccurrences     = getMetaElementOccurrences('keywords');

var metaNewsKeywords            = getMetaElement('news_keywords'),
    metaNewsKeywordsOccurrences = getMetaElementOccurrences('news_keywords');

var h1Heading                   = [],
    getH1Heading                = (typeof getElement('h1') !== "undefined") ? getElement('h1').replace(/\s+/g, ' ') : na;
h1Heading.push(getH1Heading);
var h1HeadingOccurrences        = getElementOccurrences('h1');

var metaRobots                  = getMetaElement('robots'),
    metaRobotsOccurrences       = getMetaElementOccurrences('robots');

var canonicalLinkTag            = getLinkElement('canonical'),
    canonicalLinkTagOccurrences = getLinkElementOccurrences('canonical');

var prevLinkTag                 = getLinkElement('prev');
var nextLinkTag                 = getLinkElement('next');

var relAlternateMediaLinkTag    = getRelAlternateMediaLinkTag('alternate');

var relAlternateHrefLangLinkTag = getRelAlternateHrefLangTags();

// Sending a request from the content script
chrome.runtime.sendMessage({ pageSpeed: pageSpeed, pageTitle: pageTitle, pageTitleCharacters: pageTitleCharacters, pageTitleOccurrences: pageTitleOccurrences, metaDescription: metaDescription, metaDescriptionCharacters: metaDescriptionCharacters, metaDescriptionOccurrences: metaDescriptionOccurrences, metaKeywords:metaKeywords, metaKeywordsOccurrences: metaKeywordsOccurrences, metaNewsKeywords: metaNewsKeywords, metaNewsKeywordsOccurrences: metaNewsKeywordsOccurrences, h1Heading: h1Heading, h1HeadingOccurrences: h1HeadingOccurrences, metaRobots: metaRobots, metaRobotsOccurrences: metaRobotsOccurrences, canonicalLinkTag: canonicalLinkTag, canonicalLinkTagOccurrences: canonicalLinkTagOccurrences, prevLinkTag: prevLinkTag, nextLinkTag: nextLinkTag, relAlternateMediaLinkTag: relAlternateMediaLinkTag, relAlternateHrefLangLinkTag: relAlternateHrefLangLinkTag }, function(response) {});
