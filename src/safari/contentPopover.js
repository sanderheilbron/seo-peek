// Send message to popover when injected scripts are available inside the DOM
(function () {
  safari.self.tab.dispatchMessage("scriptsInjectedIntoPage");
})();

safari.self.addEventListener("message", handleMessageEvent, false);

function handleMessageEvent(event) {

  if (event.name !== "gatherPageInfoForPopover") {
    return;
  }

  // Declare variables
  var pageTitle,
      pageTitleCharacters,
      pageTitleOccurrences,
      metaDescription,
      metaDescriptionCharacters,
      metaDescriptionOccurrences,
      metaKeywords,
      metaKeywordsOccurrences,
      metaNewsKeywords,
      metaNewsKeywordsOccurrences,
      h1Heading,
      h1HeadingOccurrences,
      metaRobots,
      metaRobotsOccurrences,
      canonicalLinkTag,
      canonicalLinkTagOccurrences,
      canonicalLinkHeader,
      relAlternateMediaLinkTag,
      prevLinkTag,
      nextLinkTag,
      relAlternateHrefLangLinkTag,
      na = 'Not available.',
      nc = 'Content is missing.';

  // Functions to fetch content
  function getCharacters(element) {
    if (element === na || element === nc) {
      return;
    } else {
      return element.length + ' characters';
    }
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
    for (var i = 0, mLen = metaTags.length; i < mLen; i++) {
      if (metaTags[i].name.toLowerCase() === name) {
        matched++;
      }
    }
    return matched;
  }

  function getElement(name){
    var elements = document.getElementsByTagName(name);
    for (var i = 0, eLen = elements.length; i < eLen; i++) {
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
    for (var i = 0, eLen = elements.length; i < eLen; i++) {
      matched++;
    }
    return matched;
  }

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
        hrefLangResults = [],
        results = [],
        value;
    for(var i = 0, l = links.length; i < l; i++) {
      if (links[i].getAttribute('rel') === 'alternate' && links[i].getAttribute('hreflang') !== null) {
        var hrefAttribute = links[i].getAttribute('href');
        var hrefLangAttribute = links[i].getAttribute('hreflang');
        if (hrefLangAttribute === '' || hrefAttribute === '') {
          value = nc;
        } else if (hrefLangAttribute === null || hrefAttribute === null) {
          value = nc;
        } else {
          value = hrefLangAttribute + "<br /><a href=" + hrefAttribute + ">" + hrefAttribute + "</a>";
        }
        hrefLangResults.push(value);
        results = hrefLangResults.join("<br /><hr />");
      }
    }
    // The array is defined and has at least one element
    if (typeof results !== 'undefined' && results.length > 0) {
      return results;
    } else {
      return na;
    }
  }

 /**
  * Scripts are injected into the top-level page and any children with HTML sources, such as iframes.
  * If you want your injected script not to execute inside of iframes, preface your high-level functions with a test
  */
  if (window.top === window) {

    pageTitle = (typeof getElement('title') !== "undefined") ? getElement('title').replace(/\s+/g, ' ') : na;
    pageTitleOccurrences = getElementOccurrences('title');
    pageTitleCharacters = getCharacters(pageTitle);

    metaDescription = getMetaElement('description');
    metaDescriptionCharacters = getCharacters(metaDescription);
    metaDescriptionOccurrences = getMetaElementOccurrences('description');

    metaKeywords = getMetaElement('keywords');
    metaKeywordsOccurrences = getMetaElementOccurrences('keywords');

    metaNewsKeywords = getMetaElement('news_keywords');
    metaNewsKeywordsOccurrences = getMetaElementOccurrences('news_keywords');

    h1Heading = (typeof getElement('h1') !== "undefined") ? getElement('h1').replace(/\s+/g, ' ') : na;
    h1HeadingOccurrences = getElementOccurrences('h1');

    metaRobots = getMetaElement('robots');
    metaRobotsOccurrences = getMetaElementOccurrences('robots');

    canonicalLinkTag = getLinkElement('canonical');
    canonicalLinkTagOccurrences = getLinkElementOccurrences('canonical');

    relAlternateMediaLinkTag = getRelAlternateMediaLinkTag('alternate');

    prevLinkTag = getLinkElement('prev');

    nextLinkTag = getLinkElement('next');

    relAlternateHrefLangLinkTag = getRelAlternateHrefLangTags();

    if (window.top === window) {
      httpStatus = event.message["http-status-content"];
      httpLinkHeader = event.message["http-header-link-content"];
      xRobotsTagHeader = event.message["x-robots-header-content"] || na;
      varyHeader = event.message["vary-header-content"] || na;

      // Canonical Link Header, check for rel="canonical"
      if (/.*<(.*)>;\srel="canonical".*/.test(httpLinkHeader)) {
        var httpCanonicalLinkHeader = /.*<(.*)>;\srel="canonical".*/;
        canonicalLinkHeader = httpLinkHeader.replace(httpCanonicalLinkHeader,'$1');
      } else {
        canonicalLinkHeader = na;
      }
}

 /**
  * Send the page information back up to the Application layer.
  * Scripts are injected into the top-level page and any children with HTML sources, such as iframes.
  * If you want your injected script not to execute inside of iframes, preface your high-level functions with a test
  */
  if (window.top === window) {
    safari.self.tab.dispatchMessage("pageInfoReport", {
      "page-title" : pageTitle,
      "page-title-characters" : pageTitleCharacters,
      "page-title-occurrences" : pageTitleOccurrences,
      "meta-description" : metaDescription,
      "meta-description-characters" : metaDescriptionCharacters,
      "meta-description-occurrences" : metaDescriptionOccurrences,
      "meta-keywords" : metaKeywords,
      "meta-keywords-occurrences" : metaKeywordsOccurrences,
      "meta-news-keywords" : metaNewsKeywords,
      "meta-news-keywords-occurrences" : metaNewsKeywordsOccurrences,
      "h1-heading" : h1Heading,
      "h1-heading-occurrences" : h1HeadingOccurrences,
      "meta-robots" : metaRobots,
      "meta-robots-occurrences" : metaRobotsOccurrences,
      "x-robots-tag" : xRobotsTagHeader,
      "canonical-link-tag" : canonicalLinkTag,
      "canonical-link-tag-occurrences" : canonicalLinkTagOccurrences,
      "canonical-link-header" : canonicalLinkHeader,
      "prev-link-tag" : prevLinkTag,
      "next-link-tag" : nextLinkTag,
      "alternate-media-link-tag" : relAlternateMediaLinkTag,
      "vary-header" : varyHeader,
      "alternate-hreflang-link-tag" : relAlternateHrefLangLinkTag,
      "http-status" : httpStatus,
      "not-available" : na,
      "no-content" : nc
      });
    }}

}