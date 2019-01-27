var notAvailable = 'Not available',
    contentMissing = 'Content is missing';

function getLinkElement(rel) {
    var links = document.getElementsByTagName('link'),
        found = notAvailable;

    for (var i = 0, l; l = links[i]; i++) {
        if (l.getAttribute('rel') === rel) {
            found = l.getAttribute('href');
            if (!found) {
                return contentMissing;
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
            return contentMissing;
        }
    }
    return notAvailable;
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

function getElement(name) {
    var elements = document.getElementsByTagName(name);
    for (var i = 0, eLen = elements.length; i < eLen; i++) {
        if (elements[0].innerText === '') {
            return contentMissing;
        } else {
            return elements[0].innerText;
        }
    }
}

function getElementOccurrences(name) {
    var elements = document.getElementsByTagName(name),
        matched = 0;
    for (var i = 0, eLen = elements.length; i < eLen; i++) {
        matched++;
    }
    return matched;
}

function getHeadElementOccurrences(name) {
    var elements = document.head.getElementsByTagName(name),
        matched = 0;
    for (var i = 0, eLen = elements.length; i < eLen; i++) {
        matched++;
    }
    return matched;
}

function getCharacters(element) {
    if (element === notAvailable || element === contentMissing) {
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
        found = notAvailable;
    for (var i = 0, l; l = links[i]; i++) {
        if (l.getAttribute('rel') === rel && l.getAttribute('media') !== null) {
            if (l.getAttribute('rel') === rel && l.getAttribute('media').match(/^only screen and \(max-width:/)) {
                found = l.getAttribute('href');
                if (!found) {
                    return contentMissing;
                } else {
                    return found;
                }
            }
        }
    }
    return found;
}

// Check for protocl
function hasProtocol(url) {
    return (/^(?:f|ht)tps?\:\/\//.test(url));
}

// Array of rel-alternate-hreflang annotation
function getRelAlternateHrefLangTags() {
    var links = document.getElementsByTagName('link'),
        hrefLangResults = [],
        results = [],
        value;
    for (var i = 0, l = links.length; i < l; i++) {
        if (links[i].getAttribute('rel') === 'alternate' && links[i].getAttribute('hreflang') !== null) {
            var hrefAttribute = links[i].getAttribute('href');
            var hrefLangAttribute = links[i].getAttribute('hreflang');
            if (hrefLangAttribute === '' || hrefAttribute === '') {
                value = contentMissing;
            } else if (hrefLangAttribute === null || hrefAttribute === null) {
                value = contentMissing;
            } else {
                if (!hasProtocol(hrefAttribute)) {
                    value = "<span class='hreflang'>" + hrefLangAttribute + "</span><br>" + hrefAttribute;
                } else {
                    value = "<span class='hreflang'>" + hrefLangAttribute + "</span><br><a href=" + hrefAttribute + " target=\"_blank\">" + hrefAttribute + "</a>";
                }
            }
            hrefLangResults.push(value);
            results = hrefLangResults.join("<br><hr>");
        }
    }
    // The array is defined and has at least one element
    if (typeof results !== 'undefined' && results.length > 0) {
        return results;
    } else {
        return notAvailable;
    }
}

var pageTitle = [],
    getPageTitle = (typeof getElement('title') !== "undefined") ? getElement('title').replace(/\s+/g, ' ') : notAvailable;
pageTitle.push(getPageTitle);

var pageTitleOccurrences = getHeadElementOccurrences('title'),
    pageTitleCharacters = getCharacters(getPageTitle);

var metaDescription = getMetaElement('description'),
    metaDescriptionCharacters = getCharacters(metaDescription),
    metaDescriptionOccurrences = getMetaElementOccurrences('description');

var metaKeywords = getMetaElement('keywords'),
    metaKeywordsOccurrences = getMetaElementOccurrences('keywords');

var h1Heading = [],
    getH1Heading = (typeof getElement('h1') !== "undefined") ? getElement('h1').replace(/\s+/g, ' ') : notAvailable;
h1Heading.push(getH1Heading);
var h1HeadingOccurrences = getElementOccurrences('h1');

var metaRobots = getMetaElement('robots'),
    metaRobotsOccurrences = getMetaElementOccurrences('robots');

var canonicalLinkTag = getLinkElement('canonical'),
    canonicalLinkTagOccurrences = getLinkElementOccurrences('canonical');

var prevLinkTag = getLinkElement('prev');
var nextLinkTag = getLinkElement('next');

var relAlternateMediaLinkTag = getRelAlternateMediaLinkTag('alternate');

var ampHTMLLinkTag = getLinkElement('amphtml');

var relAlternateHrefLangLinkTag = getRelAlternateHrefLangTags();

// Sending a request from the content script
chrome.runtime.sendMessage({
    pageTitle: pageTitle,
    pageTitleCharacters: pageTitleCharacters,
    pageTitleOccurrences: pageTitleOccurrences,
    metaDescription: metaDescription,
    metaDescriptionCharacters: metaDescriptionCharacters,
    metaDescriptionOccurrences: metaDescriptionOccurrences,
    metaKeywords: metaKeywords,
    metaKeywordsOccurrences: metaKeywordsOccurrences,
    h1Heading: h1Heading,
    h1HeadingOccurrences: h1HeadingOccurrences,
    metaRobots: metaRobots,
    metaRobotsOccurrences: metaRobotsOccurrences,
    canonicalLinkTag: canonicalLinkTag,
    canonicalLinkTagOccurrences: canonicalLinkTagOccurrences,
    prevLinkTag: prevLinkTag,
    nextLinkTag: nextLinkTag,
    relAlternateMediaLinkTag: relAlternateMediaLinkTag,
    ampHTMLLinkTag: ampHTMLLinkTag,
    relAlternateHrefLangLinkTag: relAlternateHrefLangLinkTag
}, function(response) {});
