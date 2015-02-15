/**
 * Called when a message is passed. We assume that the content script wants to show the page action.
 */
var pageTitle = [],
    pageTitleCharacters = [],
    pageTitleOccurrences = [],
    metaDescription = [],
    metaDescriptionCharacters = [],
    metaDescriptionOccurrences = [],
    metaKeywords = [],
    metaKeywordsOccurrences = [],
    metaNewsKeywords = [],
    metaNewsKeywordsOccurrences = [],
    h1Heading = [],
    h1HeadingOccurrences = [],
    metaRobots = [],
    metaRobotsOccurrences = [],
    canonicalLinkTag = [],
    canonicalLinkTagOccurrences = [],
    prevLinkTag = [],
    nextLinkTag = [],
    relAlternateMediaLinkTag = [],
    relAlternateHrefLangLinkTag = [];

/**
 * Listen for the content script to send a message to the background page.
 * On the receiving end, you need to set up an runtime.onMessage event listener to handle the message.
 */
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    pageTitle[sender.tab.id] = request.pageTitle;
    pageTitleCharacters[sender.tab.id] = request.pageTitleCharacters;
    pageTitleOccurrences[sender.tab.id] = request.pageTitleOccurrences;
    metaDescription[sender.tab.id] = request.metaDescription;
    metaDescriptionCharacters[sender.tab.id] = request.metaDescriptionCharacters;
    metaDescriptionOccurrences[sender.tab.id] = request.metaDescriptionOccurrences;
    metaKeywords[sender.tab.id] = request.metaKeywords;
    metaKeywordsOccurrences[sender.tab.id] = request.metaKeywordsOccurrences;
    metaNewsKeywords[sender.tab.id] = request.metaNewsKeywords;
    metaNewsKeywordsOccurrences[sender.tab.id] = request.metaNewsKeywordsOccurrences;
    h1Heading[sender.tab.id] = request.h1Heading;
    h1HeadingOccurrences[sender.tab.id] = request.h1HeadingOccurrences;
    canonicalLinkTag[sender.tab.id] = request.canonicalLinkTag;
    canonicalLinkTagOccurrences[sender.tab.id] = request.canonicalLinkTagOccurrences;
    metaRobots[sender.tab.id] = request.metaRobots;
    metaRobotsOccurrences[sender.tab.id] = request.metaRobotsOccurrences;
    prevLinkTag[sender.tab.id] = request.prevLinkTag;
    nextLinkTag[sender.tab.id] = request.nextLinkTag;
    relAlternateMediaLinkTag[sender.tab.id] = request.relAlternateMediaLinkTag;
    relAlternateHrefLangLinkTag[sender.tab.id] = request.relAlternateHrefLangLinkTag;
    sendResponse({});
  });


function getPageTitle(tabId) {
  return pageTitle[tabId];
}

function getPageTitleCharacters(tabId) {
  return pageTitleCharacters[tabId];
}

function getPageTitleOccurrences(tabId) {
  return pageTitleOccurrences[tabId];
}

function getMetaDescription(tabId) {
  return metaDescription[tabId];
}

function getMetaDescriptionCharacters(tabId) {
  return metaDescriptionCharacters[tabId];
}

function getMetaDescriptionOccurrences(tabId) {
  return metaDescriptionOccurrences[tabId];
}

function getMetaKeywords(tabId) {
  return metaKeywords[tabId];
}

function getMetaKeywordsOccurrences(tabId) {
  return metaKeywordsOccurrences[tabId];
}

function getMetaNewsKeywords(tabId) {
  return metaNewsKeywords[tabId];
}

function getMetaNewsKeywordsOccurrences(tabId) {
  return metaNewsKeywordsOccurrences[tabId];
}

function getH1Heading(tabId) {
  return h1Heading[tabId];
}

function getH1HeadingOccurrences(tabId) {
  return h1HeadingOccurrences[tabId];
}

function getMetaRobots(tabId) {
  return metaRobots[tabId];
}

function getMetaRobotsOccurrences(tabId) {
  return metaRobotsOccurrences[tabId];
}

function getCanonicalLinkTag(tabId) {
  return canonicalLinkTag[tabId];
}

function getCanonicalLinkTagOccurrences(tabId) {
  return canonicalLinkTagOccurrences[tabId];
}

function getPrevLinkTag(tabId) {
  return prevLinkTag[tabId];
}

function getNextLinkTag(tabId) {
  return nextLinkTag[tabId];
}

function getRelAlternateMediaLinkTag(tabId) {
  return relAlternateMediaLinkTag[tabId];
}

function getRelAlternateHrefLangLinkTags(tabId) {
  return relAlternateHrefLangLinkTag[tabId];
}