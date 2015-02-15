// Listen for the messages from the content script with the page information.
safari.application.addEventListener("message", handleMessageEvent, false);

function handleMessageEvent(event) {
  if (event.name !== "pageInfoReport") {
    return;
  }

  showPageInformation(event.message["page-title"],event.message["page-title-characters"],event.message["page-title-occurrences"],event.message["meta-description"],event.message["meta-description-characters"],event.message["meta-description-occurrences"],event.message["meta-keywords"],event.message["meta-keywords-occurrences"],event.message["meta-news-keywords"],event.message["meta-news-keywords-occurrences"],event.message["h1-heading"],event.message["h1-heading-occurrences"],event.message["http-status"],event.message["meta-robots"],event.message["meta-robots-occurrences"],event.message["x-robots-tag"],event.message["canonical-link-tag"],event.message["canonical-link-tag-occurrences"],event.message["canonical-link-header"],event.message["alternate-media-link-tag"],event.message["vary-header"],event.message["alternate-hreflang-link-tag"],event.message["prev-link-tag"],event.message["next-link-tag"],event.message["not-available"],event.message["no-content"]);
}

function showPageInformation(pageTitle,pageTitleCharacters,pageTitleOccurrences,metaDescription,metaDescriptionCharacters,metaDescriptionOccurrences,metaKeywords,metaKeywordsOccurrences,metaNewsKeywords,metaNewsKeywordsOccurrences,h1Heading,h1HeadingOccurrences,httpStatus,metaRobots,metaRobotsOccurrences,xRobotsTagHeader,canonicalLinkTag,canonicalLinkTagOccurrences,canonicalLinkHeader,relAlternateMediaLinkTag,varyHeader,relAlternateHrefLangLinkTag,prevLinkTag,nextLinkTag,na,nc) {

  var tabURL = safari.application.activeBrowserWindow.activeTab.url,
      na = na,
      nc = nc;

  // Generate the HTML to show page elements.

  // Page Title
  var pageTitleElem = document.getElementById("page-title"),
      titleElem = document.createElement("p");
  titleElem.innerText = pageTitle;
  pageTitleElem.appendChild(titleElem);

  if (pageTitleCharacters) {
    var spanTitleCharacters = document.getElementById("page-title-characters");
    spanTitleCharacters.innerText = pageTitleCharacters;
  }

  if (pageTitleOccurrences > 1) {
    var spanTitleOccurrences = document.getElementById("page-title-occurrences");
    spanTitleOccurrences.innerText = pageTitleOccurrences + ' elements';
  }

  // Meta Description
  var metaDescriptionElem = document.getElementById("meta-description");
      descriptionElem = document.createElement("p");
  descriptionElem.innerHTML = metaDescription;
  metaDescriptionElem.appendChild(descriptionElem);

  if (metaDescriptionCharacters) {
    var spanMetaCharacters = document.getElementById("meta-description-characters");
    spanMetaCharacters.innerText = metaDescriptionCharacters;
  }

  if (metaDescriptionOccurrences > 1 ) {
    var spanMetaOccurrences = document.getElementById("meta-description-occurrences");
    spanMetaOccurrences.innerText = metaDescriptionOccurrences + ' elements';
  }

  // Meta Keywords
  var metaKeywordsElem = document.getElementById("meta-keywords"),
      keywordsElem = document.createElement("p");
  keywordsElem.innerText = metaKeywords;
  metaKeywordsElem.appendChild(keywordsElem);

  if (metaKeywordsOccurrences > 1 ) {
    var spanMetaKeywordsOccurrences = document.getElementById("meta-keywords-occurrences");
    spanMetaKeywordsOccurrences.innerText = metaKeywordsOccurrences + ' elements';
  }

  // Meta News Keywords
  var metaNewsKeywordsElem = document.getElementById("meta-news-keywords"),
      newsKeywordsElem = document.createElement("p");
  newsKeywordsElem.innerText = metaNewsKeywords;
  metaNewsKeywordsElem.appendChild(newsKeywordsElem);

  if (metaNewsKeywordsOccurrences > 1 ) {
    var spanMetaNewsKeywordsOccurrences = document.getElementById("meta-news-keywords-occurrences");
    spanMetaNewsKeywordsOccurrences.innerText = metaNewsKeywordsOccurrences + ' elements';
  }

  // H1 Heading
  var h1HeadingElem = document.getElementById("h1-heading"),
      h1HeadingPElem = document.createElement("p");
  h1HeadingPElem.innerText = h1Heading;
  h1HeadingElem.appendChild(h1HeadingPElem);

  if (h1HeadingOccurrences > 1) {
    var spanH1HeadingOccurrences = document.getElementById("h1-heading-occurrences");
    spanH1HeadingOccurrences.innerText = h1HeadingOccurrences + ' elements';
  }

  // Meta Robots
  var metaRobotsElem = document.getElementById("meta-robots"),
      robotsElem = document.createElement("p");
  robotsElem.innerText = metaRobots;
  metaRobotsElem.appendChild(robotsElem);

  if (metaRobotsOccurrences > 1 ) {
    var spanMetaRobotsOccurrences = document.getElementById("meta-robots-occurrences");
    spanMetaRobotsOccurrences.innerText = metaRobotsOccurrences + ' elements';
  }

  // Canonical Link Tag
  var canonicalLinkElem = document.getElementById("canonical-link-tag"),
      canonicalElem = document.createElement("p");
  if (canonicalLinkTag === na || canonicalLinkTag === nc) {
    canonicalElem.innerHTML = canonicalLinkTag;
  } else {
    canonicalElem.innerHTML = '<a href="' + canonicalLinkTag + '">' + canonicalLinkTag + '</a>';

    if (canonicalLinkTag === tabURL) {
      var spanCanonicalLinkTagInfo = document.getElementById("canonical-link-tag-info");
      spanCanonicalLinkTagInfo.innerHTML = 'Self-referential';
    }
  }
  canonicalLinkElem.appendChild(canonicalElem);

  if (canonicalLinkTagOccurrences > 1 ) {
    var spanCanonicalLinkTagOccurrences = document.getElementById("canonical-link-tag-occurrences");
    spanCanonicalLinkTagOccurrences.innerText = canonicalLinkTagOccurrences + ' elements';
  }

  // Rel-alternate-media annotation
  var alternateMediaLinkElem = document.getElementById("alternate-media-link-tag"),
      alternateMediaElem = document.createElement("p");
  if (relAlternateMediaLinkTag === na || relAlternateMediaLinkTag === nc) {
    alternateMediaElem.innerHTML = relAlternateMediaLinkTag;
  } else {
    alternateMediaElem.innerHTML = '<a href="' + relAlternateMediaLinkTag + '">' + relAlternateMediaLinkTag + '</a>';
  }
  alternateMediaLinkElem.appendChild(alternateMediaElem);

  // Canonical Link Header
  var canonicalLinkHTTPHeader = document.getElementById("canonical-link-header"),
      canonicalHeader = document.createElement("p");

  if (canonicalLinkHeader === na || canonicalLinkHeader === nc) {
    canonicalHeader.innerHTML = canonicalLinkHeader;
  } else {
    canonicalHeader.innerHTML = '<a href="' + canonicalLinkHeader + '">' + canonicalLinkHeader + '</a>';

    if (canonicalLinkHeader === tabURL) {
      var spanCanonicalLinkHeaderInfo = document.getElementById("canonical-link-header-info");
      spanCanonicalLinkHeaderInfo.innerHTML = 'Self-referential';
    }
  }
  canonicalLinkHTTPHeader.appendChild(canonicalHeader);

  // X-Robots-Tag Header
  var xRobotsTagHTTPHeader = document.getElementById("x-robots-tag"),
      xRobotsTag = document.createElement("p");
  xRobotsTag.innerText = xRobotsTagHeader;
  xRobotsTagHTTPHeader.appendChild(xRobotsTag);

  // Next Link Tag
  var nextLinkElem = document.getElementById("next-link-tag"),
      nextElem = document.createElement("p");

  if (nextLinkTag === na || nextLinkTag === nc) {
    nextElem.innerHTML = nextLinkTag;
  } else {
    nextElem.innerHTML = '<a href="' + nextLinkTag + '">' + nextLinkTag + '</a>';

    if (nextLinkTag === tabURL) {
      var spanNextLinkTagInfo = document.getElementById("next-link-tag-info");
      spanNextLinkTagInfo.innerHTML = 'Self-referential';
    }
  }
  nextLinkElem.appendChild(nextElem);

  // Previous Link Tag
  var prevLinkElem = document.getElementById("prev-link-tag"),
      prevElem = document.createElement("p");
  if (prevLinkTag === na || prevLinkTag === nc) {
    prevElem.innerHTML = prevLinkTag;
  } else {
    prevElem.innerHTML = '<a href="' + prevLinkTag + '">' + prevLinkTag + '</a>';

    if (prevLinkTag === tabURL) {
      var spanPrevLinkTagInfo = document.getElementById("prev-link-tag-info");
      spanPrevLinkTagInfo.innerHTML = 'Self-referential';
    }
  }
  prevLinkElem.appendChild(prevElem);

  // HTTP Status Code
  var statusCodeElem = document.getElementById("http-status"),
      statusElem = document.createElement("p");
  statusElem.innerText = httpStatus;
  statusCodeElem.appendChild(statusElem);

  // Vary Header
  var varyHTTPHeader = document.getElementById("vary-header"),
      varyHeaderElem = document.createElement("p");
  varyHeaderElem.innerText = varyHeader;
  varyHTTPHeader.appendChild(varyHeaderElem);

  // Rel-alternate-hreflang annotation
  var alternateHreflangLinkElem = document.getElementById("alternate-hreflang-link-tag"),
      alternateHreflangElem = document.createElement("p");
  alternateHreflangElem.innerHTML = relAlternateHrefLangLinkTag;
  alternateHreflangLinkElem.appendChild(alternateHreflangElem);

  var spanRelAlternateHrefLangLinkTagInfo = document.getElementById("alternate-hreflang-link-tag-info");
  if (relAlternateHrefLangLinkTag !== 'Not available.') {
    if (relAlternateHrefLangLinkTag.search(tabURL) !== -1) {
      spanRelAlternateHrefLangLinkTagInfo.innerHTML = 'Self-referential';
    }
  }

  //Display settings
  var metaNewsKeywordsSetting = safari.extension.settings.metaNewsKeywordsSetting,
      paginationSetting = safari.extension.settings.paginationSetting,
      mobileSetting = safari.extension.settings.mobileSetting,
      internationalSetting = safari.extension.settings.internationalSetting;

  if (!metaNewsKeywordsSetting) {
    metaNewsKeywordsElem.parentNode.style.display = 'none';
    metaKeywordsElem.parentNode.style.borderBottomWidth = '0px';
  } else {
    metaNewsKeywordsElem.parentNode.style.display = 'block';
    metaKeywordsElem.parentNode.style.borderBottomWidth = '1px';
  }

  if (!paginationSetting) {
    document.getElementById("pagination").style.display = 'none';
  } else {
    document.getElementById("pagination").style.display = 'block';
  }

  if (!mobileSetting) {
    document.getElementById("mobile").style.display = 'none';
  } else {
    document.getElementById("mobile").style.display = 'block';
  }

  if (!internationalSetting) {
    document.getElementById("international").style.display = 'none';
  } else {
    document.getElementById("international").style.display = 'block';
  }

 /**
  * Now that the HTML content has been generated, make any adjustments to the UI to make it
  * the content fit where it is being displayed.
  */
  makeUIAdjustments();
}

function clearPageInformation() {

  var infoToClear = {
    "page-title": [],
    "page-title-characters": [],
    "page-title-occurrences": [],
    "meta-description": [],
    "meta-description-characters": [],
    "meta-description-occurrences": [],
    "meta-keywords": [],
    "meta-keywords-occurrences": [],
    "meta-news-keywords": [],
    "meta-news-keywords-occurrences": [],
    "h1-heading": [],
    "h1-heading-occurrences": [],
    "http-status": [],
    "meta-robots": [],
    "meta-robots-occurrences": [],
    "x-robots-tag": [],
    "canonical-link-tag": [],
    "canonical-link-tag-info": [],
    "canonical-link-tag-occurrences": [],
    "canonical-link-header": [],
    "canonical-link-header-info": [],
    "vary-header": [],
    "alternate-media-link-tag": [],
    "alternate-hreflang-link-tag": [],
    "alternate-hreflang-link-tag-info" : [],
    "prev-link-tag": [],
    "next-link-tag": []
  };

  for (var infoType in infoToClear) {
    var parentElement = document.getElementById(infoType);
    while (parentElement.hasChildNodes()) {
      parentElement.removeChild(parentElement.firstChild);
      infoToClear[infoType].length = 0;
    }
  }
}