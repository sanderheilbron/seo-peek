var page = chrome.extension.getBackgroundPage(),
    na = 'Not available.',
    nc = 'Content is missing.';

// Spinner settings
var opts = {
  lines: 13, // The number of lines to draw
  length: 6, // The length of each line
  width: 3, // The line thickness
  radius: 8, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#000', // #rgb or #rrggbb
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9
};

// Get the current active tab in the lastly focused window
chrome.tabs.query({active: true,lastFocusedWindow: true}, function(tabs) {
  // and use that tab to fill in url and all page information
  var tab = tabs[0],
      tabURL = tab.url,
      parser = document.createElement('a');
  parser.href = tabURL;

  var host = parser.protocol + parser.host;

  // Page Speed
  var t = page.getPageSpeed(tab.id);
  var start = t.redirectStart == 0 ? t.fetchStart : t.redirectStart;
  var responseTime = t.responseStart - start;
  var pageSpeedElem = document.getElementById("pageTiming");

  pageSpeedElem.innerText = responseTime + "ms";

  // Page Title
  var pageTitleElem = document.getElementById("page-title"),
      titleElem = document.createElement("p");
  titleElem.innerText = page.getPageTitle(tab.id);
  pageTitleElem.appendChild(titleElem);

  var pageTitleCharacters = page.getPageTitleCharacters(tab.id);
  if (pageTitleCharacters) {
    var spanTitleCharacters = document.getElementById("page-title-characters");
    spanTitleCharacters.innerText = pageTitleCharacters;
  }

  var pageTitleOccurrences = page.getPageTitleOccurrences(tab.id);
  if (pageTitleOccurrences > 1) {
    var spanTitleOccurrences = document.getElementById("page-title-occurrences");
    spanTitleOccurrences.innerText = pageTitleOccurrences + ' elements';
  }

  // Meta Description
  var metaDescriptionElem = document.getElementById("meta-description"),
      descriptionElem = document.createElement("p");
  descriptionElem.innerHTML = page.getMetaDescription(tab.id);
  metaDescriptionElem.appendChild(descriptionElem);

  var metaDescriptionCharacters = page.getMetaDescriptionCharacters(tab.id);
  if (metaDescriptionCharacters) {
    var spanMetaCharacters = document.getElementById("meta-description-characters");
    spanMetaCharacters.innerText = metaDescriptionCharacters;
  }

  var metaDescriptionOccurrences = page.getMetaDescriptionOccurrences(tab.id);
  if (metaDescriptionOccurrences > 1) {
    var spanMetaDescriptionOccurrences = document.getElementById("meta-description-occurrences");
    spanMetaDescriptionOccurrences.innerText = metaDescriptionOccurrences + ' elements';
  }

  // Meta Keywords
  var metaKeywordsElem = document.getElementById("meta-keywords"),
      keywordsElem = document.createElement("p");
  keywordsElem.innerText = page.getMetaKeywords(tab.id);
  metaKeywordsElem.appendChild(keywordsElem);

  var metaKeywordsOccurrences = page.getMetaKeywordsOccurrences(tab.id);
  if (metaKeywordsOccurrences > 1 ) {
    var spanMetaKeywordsOccurrences = document.getElementById("meta-keywords-occurrences");
    spanMetaKeywordsOccurrences.innerText = metaKeywordsOccurrences + ' elements';
  }

  // Meta News Keywords
  var metaNewsKeywordsElem = document.getElementById("meta-news-keywords"),
      newsKeywordsElem = document.createElement("p");
  newsKeywordsElem.innerText = page.getMetaNewsKeywords(tab.id);
  metaNewsKeywordsElem.appendChild(newsKeywordsElem);

  var metaNewsKeywordsOccurrences = page.getMetaNewsKeywordsOccurrences(tab.id);
  if (metaNewsKeywordsOccurrences > 1 ) {
    var spanMetaNewsKeywordsOccurrences = document.getElementById("meta-news-keywords-occurrences");
    spanMetaNewsKeywordsOccurrences.innerText = metaNewsKeywordsOccurrences + ' elements';
  }

  // H1 Heading
  var h1HeadingElem = document.getElementById("h1-heading"),
      h1HeadingPElem = document.createElement("p");
  h1HeadingPElem.innerText = page.getH1Heading(tab.id);
  h1HeadingElem.appendChild(h1HeadingPElem);

  var h1HeadingOccurrences = page.getH1HeadingOccurrences(tab.id);
  if (h1HeadingOccurrences > 1) {
    var spanH1HeadingOccurrences = document.getElementById("h1-heading-occurrences");
    spanH1HeadingOccurrences.innerText = h1HeadingOccurrences + ' elements';
  }

  // Meta Robots
  var metaRobotsElem = document.getElementById("meta-robots"),
      robotsElem = document.createElement("p");
  robotsElem.innerText = page.getMetaRobots(tab.id);
  metaRobotsElem.appendChild(robotsElem);

  var metaRobotsOccurrences = page.getMetaRobotsOccurrences(tab.id);
  if (metaRobotsOccurrences > 1 ) {
    var spanMetaRobotsOccurrences = document.getElementById("meta-robots-occurrences");
    spanMetaRobotsOccurrences.innerText = metaRobotsOccurrences + ' elements';
  }

  // Canonical Link Tag
  var canonicalLinkElem = document.getElementById("canonical-link-tag"),
      canonicalLinkTag = page.getCanonicalLinkTag(tab.id),
      canonicalElem = document.createElement("p");

  if (typeof canonicalLinkTag === "undefined") {
    canonicalElem.innerHTML = canonicalLinkTag;
  } else if (canonicalLinkTag === na || canonicalLinkTag === nc) {
    canonicalElem.innerHTML = canonicalLinkTag;
  } else {
    canonicalElem.innerHTML = '<a href="' + canonicalLinkTag + '" target="_blank">' + canonicalLinkTag + '</a>';

    if (canonicalLinkTag === tabURL) {
      var spanCanonicalLinkTagInfo = document.getElementById("canonical-link-tag-info");
      spanCanonicalLinkTagInfo.innerHTML = 'Self-referential';
    }
  }
  canonicalLinkElem.appendChild(canonicalElem);

  var canonicalLinkTagOccurrences = page.getCanonicalLinkTagOccurrences(tab.id);
  if (canonicalLinkTagOccurrences > 1 ) {
    var spanCanonicalLinkTagOccurrences = document.getElementById("canonical-link-tag-occurrences");
    spanCanonicalLinkTagOccurrences.innerText = canonicalLinkTagOccurrences + ' elements';
  }

  // Next Link Tag
  var nextLinkElem = document.getElementById("next-link-tag"),
      nextLinkTag = page.getNextLinkTag(tab.id),
      nextElem = document.createElement("p");

  if (typeof nextLinkTag === "undefined") {
    nextElem.innerHTML = nextLinkTag;
  } else if (nextLinkTag === na || nextLinkTag === nc) {
    nextElem.innerHTML = nextLinkTag;
  } else {
    nextElem.innerHTML = '<a href="' + host + nextLinkTag + '" target="_blank">' + nextLinkTag + '</a>';

    if (nextLinkTag === tabURL) {
      var spanNextLinkTagInfo = document.getElementById("next-link-tag-info");
      spanNextLinkTagInfo.innerHTML = 'Self-referential';
    }
  }
  nextLinkElem.appendChild(nextElem);

  // Previous Link Tag
  var prevLinkElem = document.getElementById("prev-link-tag"),
      prevLinkTag = page.getPrevLinkTag(tab.id),
      prevElem = document.createElement("p");

  if (typeof prevLinkTag === "undefined") {
    prevElem.innerHTML = prevLinkTag;
  } else if (prevLinkTag === na || prevLinkTag === nc) {
    prevElem.innerHTML = prevLinkTag;
  } else {
    prevElem.innerHTML = '<a href="' + host + prevLinkTag + '" target="_blank">' + prevLinkTag + '</a>';

    if (prevLinkTag === tabURL) {
      var spanPrevLinkTagInfo = document.getElementById("prev-link-tag-info");
      spanPrevLinkTagInfo.innerHTML = 'Self-referential';
    }
  }
  prevLinkElem.appendChild(prevElem);

  // Rel-alternate-media annotation
  var alternateMediaLinkElem = document.getElementById("alternate-media-link-tag"),
      relAlternateMediaLinkTag = page.getRelAlternateMediaLinkTag(tab.id),
      alternateMediaElem = document.createElement("p");
  if (relAlternateMediaLinkTag === na || relAlternateMediaLinkTag === nc) {
    alternateMediaElem.innerHTML = relAlternateMediaLinkTag;
  } else {
    alternateMediaElem.innerHTML = '<a href="' + relAlternateMediaLinkTag + '" target="_blank">' + relAlternateMediaLinkTag + '</a>';
  }
  alternateMediaLinkElem.appendChild(alternateMediaElem);

  // Rel-alternate-hreflang annotation
  var relAlternateHreflangLinkElem = document.getElementById("alternate-hreflang-link-tag"),
      relAlternateHreflangTag = page.getRelAlternateHrefLangLinkTags(tab.id),
      relAlternateHreflangElem = document.createElement("p");

  if (relAlternateHreflangTag === na || relAlternateHreflangTag === nc) {
    relAlternateHreflangElem.innerHTML = relAlternateHreflangTag;
  } else {
    var hreflangResults = [];
    for (var prop in relAlternateHreflangTag) { 
      if (relAlternateHreflangTag[prop].hreflang !== nc && relAlternateHreflangTag[prop].href !== nc) {
        hreflangResults.push(relAlternateHreflangTag[prop].hreflang + '<br /><a href="' + relAlternateHreflangTag[prop].href + '" target="_blank">' + relAlternateHreflangTag[prop].href + '</a>');
      } else {
        hreflangResults.push(nc);
      }
    }
    hreflangResults = hreflangResults.join("<br /><hr />");
    relAlternateHreflangElem.innerHTML = hreflangResults;

    var spanRelAlternateHrefLangLinkTagInfo = document.getElementById("alternate-hreflang-link-tag-info");
    if (page.getRelAlternateHrefLangLinkTags(tab.id) !== na) {
      if (page.getRelAlternateHrefLangLinkTags(tab.id)) {
        //console.log(tabURL);
        //console.log(hreflangResults);
        //console.log(hreflangResults.search(tabURL));
        if (hreflangResults.search(tabURL) !== -1) {
          spanRelAlternateHrefLangLinkTagInfo.innerHTML = 'Self-referential';
        }
      }
    }
  }
  
  
  relAlternateHreflangLinkElem.appendChild(relAlternateHreflangElem);


  // Settings on install, will be set on first popup view
  if (!localStorage.myMetaNewsKeywordsSetting) {
    localStorage.myMetaNewsKeywordsSetting = 'disable';
  }

  if (!localStorage.myPaginationDirectivesSetting) {
    localStorage.myPaginationDirectivesSetting = 'disable';
  }

  if (!localStorage.myMobileDirectivesSetting) {
    localStorage.myMobileDirectivesSetting = 'disable';
  }

  if (!localStorage.myInternationalDirectivesSetting) {
    localStorage.myInternationalDirectivesSetting = 'disable';
  }

  // Display settings
  var metaNewsKeywordsSetting = localStorage.myMetaNewsKeywordsSetting;
  var paginationSetting = localStorage.myPaginationDirectivesSetting;
  var mobileSetting = localStorage.myMobileDirectivesSetting;
  var internationalSetting = localStorage.myInternationalDirectivesSetting;

  if (metaNewsKeywordsSetting === 'disable') {
    metaNewsKeywordsElem.parentNode.style.display = 'none';
    metaKeywordsElem.parentNode.style.borderBottomWidth = '0px';
  } else {
    metaNewsKeywordsElem.parentNode.style.display = 'block';
    metaKeywordsElem.parentNode.style.borderBottomWidth = '1px';
  }

  if (paginationSetting === 'disable') {
    document.getElementById("pagination").style.display = 'none';
  } else {
    document.getElementById("pagination").style.display = 'block';
  }

  if (mobileSetting === 'disable') {
    document.getElementById("mobile").style.display = 'none';
  } else {
    document.getElementById("mobile").style.display = 'block';
  }

  if (internationalSetting === 'disable') {
    document.getElementById("international").style.display = 'none';
  } else {
    document.getElementById("international").style.display = 'block';
  }


  if (page.getPageTitle(tab.id)) {

    // AJAX request to retrieve HTTP Status & HTTP Response Headers
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (typeof tab != 'undefined') {

          var statusCode = xhr.status,
              statusText = xhr.statusText,
              httpLinkHeader = xhr.getResponseHeader('Link'),
              varyHeader = xhr.getResponseHeader('Vary') || na,
              xRobotsTag = xhr.getResponseHeader('X-Robots-Tag') || na;

          if (statusText) {
            httpStatus = statusCode + " " + statusText;
          } else {
            httpStatus = 'Not available.';
          }

          // HTTP Status Code
          var statusCodeElem = document.getElementById("http-status"),
              statusElem = document.createElement("p");
          statusElem.innerText = httpStatus;
          statusCodeElem.appendChild(statusElem);

          // X-Robots-Tag Header
          var xRobotsTagHTTPHeader = document.getElementById("x-robots-tag"),
          xRobotsTagHeader = document.createElement("p");
          xRobotsTagHeader.innerText = xRobotsTag;
          xRobotsTagHTTPHeader.appendChild(xRobotsTagHeader);

          // Canonical Link Header, check for rel="canonical"
          if (/.*<(.*)>;\srel="canonical".*/.test(httpLinkHeader)) {
            var httpCanonicalLinkHeader = /.*<(.*)>;\srel="canonical".*/;
            canonicalLinkHeader = httpLinkHeader.replace(httpCanonicalLinkHeader,'$1');
          } else {
            canonicalLinkHeader = na;
          }

          // Canonical Link Header
          var canonicalLinkHTTPHeader = document.getElementById("canonical-link-header"),
              canonicalHeader = document.createElement("p");

          if (canonicalLinkHeader === na || canonicalLinkHeader === nc) {
            canonicalHeader.innerHTML = canonicalLinkHeader;
          } else {
            canonicalHeader.innerHTML = '<a href="' + canonicalLinkHeader + '" target="_blank">' + canonicalLinkHeader + '</a>';

            if (canonicalLinkHeader === tabURL) {
              var spanCanonicalLinkHeaderInfo = document.getElementById("canonical-link-header-info");
              spanCanonicalLinkHeaderInfo.innerHTML = 'Self-referential';
            }
          }
          canonicalLinkHTTPHeader.appendChild(canonicalHeader);

          // Vary Header
          var varyHTTPHeader = document.getElementById("vary-header"),
              varyhttpHeader = document.createElement("p");
          varyhttpHeader.innerText = varyHeader;
          varyHTTPHeader.appendChild(varyhttpHeader);

          // Show footer links
          var seoPeekLink = document.getElementById("seo-peek");
              seoPeekLink.innerHTML = '<a href="http://www.sanderheilbron.nl/seo-peek/" target="_blank">SEO Peek</a>';
          var shLink = document.getElementById("sh");
              shLink.innerHTML = '<a href="http://www.sanderheilbron.nl/" target="_blank">Sander Heilbron</a>';

          // Show content
          infoElem.style.display = "block";

          // Remove spinner from DOM
          spinner.stop();

          // Hide spinner
          spinnerElem.style.display = "none";


        }
      }
    };

  } else {
    var reloadElem = document.getElementById("reload-notification");
    reloadElem.style.display = "block";
  }
  
  xhr.open('GET', tabURL, true);
  xhr.send(null);

  // Hide content
  var infoElem = document.getElementById("info");
  infoElem.style.display = "none";

  // Show spinner
  spinnerElem = document.getElementById("spinner");
  spinnerElem.style.display = "block";
  reloadElem = document.getElementById("reload-notification");
  reloadElem.style.display = "none";

  // Create spinner
  var spinner = new Spinner(opts).spin(spinnerElem);

});