chrome.tabs.executeScript(null, {file: "js/script.js"});

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
    ampHTMLLinkTag = [],
    relAlternateHrefLangLinkTag = [];

  var notAvailable = 'Not available',
      contentMissing = 'Content is missing';

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

/**
 * Listen for the content script to send a message to the background
 * On the receiving end, you need to set up an runtime.onMessage event listener to handle the message.
 */
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // Get the current active tab in the lastly focused window
    chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
      sendResponse({})

      // and use that tab to fill in url and all page information
      var tab = tabs[0],
          tabURL = tab.url;

      // Check for protocol
      function hasProtocol(url) {
        return (/^(?:f|ht)tps?\:\/\//.test(url));
      }

      // Page Title
      var pageTitleElem = document.getElementById("page-title"),
          titleElem = document.createElement("p"),
          pageTitle = request.pageTitle;

      if (pageTitle == notAvailable || pageTitle == contentMissing) {
        titleElem.innerHTML = '<span class="missing-value">' + pageTitle + '</span>';
      } else {
        titleElem.innerText = pageTitle;
      }
      pageTitleElem.appendChild(titleElem);

      // Page Title Characters
      var pageTitleCharacters = request.pageTitleCharacters;
      if (pageTitleCharacters) {
        var spanTitleCharacters = document.getElementById("page-title-characters");
        spanTitleCharacters.innerText = pageTitleCharacters;
      }

      // Page Title Occurrences
      var pageTitleOccurrences = request.pageTitleOccurrences;
      if (pageTitleOccurrences > 1) {
        var spanTitleOccurrences = document.getElementById("page-title-occurrences");
        spanTitleOccurrences.innerText = pageTitleOccurrences + ' elements';
      }

      // Meta Description
      var metaDescriptionElem = document.getElementById("meta-description"),
          descriptionElem = document.createElement("p");
          metaDescription = request.metaDescription;

      if (metaDescription == notAvailable || metaDescription == contentMissing) {
        descriptionElem.innerHTML = '<span class="missing-value">' + metaDescription + '</span>';
      } else {
        descriptionElem.innerText = metaDescription;
      }
      metaDescriptionElem.appendChild(descriptionElem);

      // Meta Description Characters
      var metaDescriptionCharacters = request.metaDescriptionCharacters;
      if (metaDescriptionCharacters) {
        var spanMetaCharacters = document.getElementById("meta-description-characters");
        spanMetaCharacters.innerText = metaDescriptionCharacters;
      }

      // Meta Description Occurrences
      var metaDescriptionOccurrences = request.metaDescriptionOccurrences;
      if (metaDescriptionOccurrences > 1) {
        var spanMetaDescriptionOccurrences = document.getElementById("meta-description-occurrences");
        spanMetaDescriptionOccurrences.innerText = metaDescriptionOccurrences + ' elements';
      }

      // Meta Keywords
      var metaKeywordsElem = document.getElementById("meta-keywords"),
          keywordsElem = document.createElement("p");
          metaKeywords = request.metaKeywords;

      if (metaKeywords == notAvailable || metaKeywords == contentMissing) {
        keywordsElem.innerHTML = '<span class="missing-value">' + metaKeywords + '</span>';
      } else {
        keywordsElem.innerText = metaKeywords;
      }
      metaKeywordsElem.appendChild(keywordsElem);

      // Meta Keywords Occurrences
      var metaKeywordsOccurrences = request.metaKeywordsOccurrences;
      if (metaKeywordsOccurrences > 1 ) {
        var spanMetaKeywordsOccurrences = document.getElementById("meta-keywords-occurrences");
        spanMetaKeywordsOccurrences.innerText = metaKeywordsOccurrences + ' elements';
      }

      // Meta News Keywords
      var metaNewsKeywordsElem = document.getElementById("meta-news-keywords"),
          newsKeywordsElem = document.createElement("p");
          metaNewsKeywords = request.metaNewsKeywords;

      if (metaNewsKeywords == notAvailable || metaNewsKeywords == contentMissing) {
        newsKeywordsElem.innerHTML = '<span class="missing-value">' + metaNewsKeywords + '</span>';
      } else {
        newsKeywordsElem.innerText = metaNewsKeywords;
      }
      metaNewsKeywordsElem.appendChild(newsKeywordsElem);

      // Meta News Keywords Occurrences
      var metaNewsKeywordsOccurrences = request.metaNewsKeywordsOccurrences;
      if (metaNewsKeywordsOccurrences > 1 ) {
        var spanMetaNewsKeywordsOccurrences = document.getElementById("meta-news-keywords-occurrences");
        spanMetaNewsKeywordsOccurrences.innerText = metaNewsKeywordsOccurrences + ' elements';
      }

      // H1 Heading
      var h1HeadingElem = document.getElementById("h1-heading"),
          h1HeadingPElem = document.createElement("p");
          h1Heading = request.h1Heading;

      if (h1Heading == notAvailable || h1Heading == contentMissing) {
        h1HeadingPElem.innerHTML = '<span class="missing-value">' + h1Heading + '</span>';
      } else {
        h1HeadingPElem.innerText = h1Heading;
      }
      h1HeadingElem.appendChild(h1HeadingPElem);

      // H1 Heading Occurrences
      var h1HeadingOccurrences = request.h1HeadingOccurrences;
      if (h1HeadingOccurrences > 1) {
        var spanH1HeadingOccurrences = document.getElementById("h1-heading-occurrences");
        spanH1HeadingOccurrences.innerText = h1HeadingOccurrences + ' elements';
      }

      // Meta Robots
      var metaRobotsElem = document.getElementById("meta-robots"),
          robotsElem = document.createElement("p");
          metaRobots = request.metaRobots;

      if (metaRobots == notAvailable || metaRobots == contentMissing) {
        robotsElem.innerHTML = '<span class="missing-value">' + metaRobots + '</span>';
      } else {
        robotsElem.innerText = metaRobots
      }
      metaRobotsElem.appendChild(robotsElem);

      // Meta Robots Occurrences
      var metaRobotsOccurrences = request.metaRobotsOccurrences;
      if (metaRobotsOccurrences > 1 ) {
        var spanMetaRobotsOccurrences = document.getElementById("meta-robots-occurrences");
        spanMetaRobotsOccurrences.innerText = metaRobotsOccurrences + ' elements';
      }

      // Canonical Link Tag
      var canonicalLinkElem = document.getElementById("canonical-link-tag"),
          canonicalLinkTag = request.canonicalLinkTag;
          canonicalElem = document.createElement("p");

      if (typeof canonicalLinkTag === "undefined") {
        canonicalElem.innerHTML = canonicalLinkTag;
      } else if (canonicalLinkTag === notAvailable || canonicalLinkTag === contentMissing) {
        canonicalElem.innerHTML = '<span class="missing-value">' + canonicalLinkTag + '</span>';
      } else if (!hasProtocol(canonicalLinkTag)) {
        canonicalElem.innerHTML = canonicalLinkTag;
      } else {
        canonicalElem.innerHTML = '<span class="hreflang" id="canonical-link-tag-info-status"></span><br><a href="' + canonicalLinkTag + '" target="_blank">' + canonicalLinkTag + '</a><span class="hreflang" id="canonical-link-tag-info-response-url"></span><br><span id="canonical-link-tag-info-response-url-value"></span>';

        if (canonicalLinkTag === tabURL) {
          var spanCanonicalLinkTagInfo = document.getElementById("canonical-link-tag-info");
          spanCanonicalLinkTagInfo.innerHTML = 'Self-referential';
        }
      }
      canonicalLinkElem.appendChild(canonicalElem);

      // Canonical Link Tag Occurrences
      var canonicalLinkTagOccurrences = request.canonicalLinkTagOccurrences;
      if (canonicalLinkTagOccurrences > 1 ) {
        var spanCanonicalLinkTagOccurrences = document.getElementById("canonical-link-tag-occurrences");
        spanCanonicalLinkTagOccurrences.innerText = canonicalLinkTagOccurrences + ' elements';
      }

      // Next Link Tag
      var nextLinkElem = document.getElementById("next-link-tag"),
          nextLinkTag = request.nextLinkTag;
          nextElem = document.createElement("p");

      if (typeof nextLinkTag === "undefined") {
        nextElem.innerHTML = nextLinkTag;
      } else if (nextLinkTag === notAvailable || nextLinkTag === contentMissing) {
        nextElem.innerHTML = '<span class="missing-value">' + nextLinkTag + '</span>';
      } else if (!hasProtocol(nextLinkTag)) {
        nextElem.innerHTML = nextLinkTag;
      } else {
        nextElem.innerHTML = '<a href="' + nextLinkTag + '" target="_blank">' + nextLinkTag + '</a>';

        if (nextLinkTag === tabURL) {
          var spanNextLinkTagInfo = document.getElementById("next-link-tag-info");
          spanNextLinkTagInfo.innerHTML = 'Self-referential';
        }
      }
      nextLinkElem.appendChild(nextElem);

      // Previous Link Tag
      var prevLinkElem = document.getElementById("prev-link-tag"),
          prevLinkTag = request.prevLinkTag;
          prevElem = document.createElement("p");

      if (typeof prevLinkTag === "undefined") {
        prevElem.innerHTML = prevLinkTag;
      } else if (prevLinkTag === notAvailable || prevLinkTag === contentMissing) {
        prevElem.innerHTML = '<span class="missing-value">' + prevLinkTag + '</span>';
      } else if (!hasProtocol(prevLinkTag)) {
        prevElem.innerHTML = prevLinkTag;
      } else {
        prevElem.innerHTML = '<a href="' + prevLinkTag + '" target="_blank">' + prevLinkTag + '</a>';

        if (prevLinkTag === tabURL) {
          var spanPrevLinkTagInfo = document.getElementById("prev-link-tag-info");
          spanPrevLinkTagInfo.innerHTML = 'Self-referential';
        }
      }
      prevLinkElem.appendChild(prevElem);

      // AMP HTML Link Tag
      var ampHTMLLinkElem = document.getElementById("amp-html-link-tag"),
          ampHTMLLinkTag = request.ampHTMLLinkTag;
          ampHTMLElem = document.createElement("p");

      if (ampHTMLLinkTag === notAvailable || ampHTMLLinkTag === contentMissing) {
        ampHTMLElem.innerHTML = '<span class="missing-value">' + ampHTMLLinkTag + '</span>';
      } else if (!hasProtocol(ampHTMLLinkTag)) {
        ampHTMLElem.innerHTML = ampHTMLLinkTag;
      } else {
        ampHTMLElem.innerHTML = '<a href="' + ampHTMLLinkTag + '" target="_blank">' + ampHTMLLinkTag + '</a>';
      }
      ampHTMLLinkElem.appendChild(ampHTMLElem);

      // Rel-alternate-media annotation
      var alternateMediaLinkElem = document.getElementById("alternate-media-link-tag"),
          relAlternateMediaLinkTag = request.relAlternateMediaLinkTag;
          alternateMediaElem = document.createElement("p");
      if (relAlternateMediaLinkTag === notAvailable || relAlternateMediaLinkTag === contentMissing) {
        alternateMediaElem.innerHTML = '<span class="missing-value">' + relAlternateMediaLinkTag + '</span>';
      } else if (!hasProtocol(relAlternateMediaLinkTag)) {
        alternateMediaElem.innerHTML = relAlternateMediaLinkTag;
      } else {
        alternateMediaElem.innerHTML = '<a href="' + relAlternateMediaLinkTag + '" target="_blank">' + relAlternateMediaLinkTag + '</a>';
      }
      alternateMediaLinkElem.appendChild(alternateMediaElem);

      // Rel-alternate-hreflang annotation
      var alternateHreflangLinkElem = document.getElementById("alternate-hreflang-link-tag"),
          relAlternateHrefLangLinkTag = request.relAlternateHrefLangLinkTag,
          alternateHreflangElem = document.createElement("p");
      if (relAlternateHrefLangLinkTag === notAvailable || relAlternateHrefLangLinkTag === contentMissing) {
        alternateHreflangElem.innerHTML = '<span class="missing-value">' + relAlternateHrefLangLinkTag + '</span>';
      } else {
        alternateHreflangElem.innerHTML = relAlternateHrefLangLinkTag;
      }
      alternateHreflangLinkElem.appendChild(alternateHreflangElem);

      var spanRelAlternateHrefLangLinkTagInfo = document.getElementById("alternate-hreflang-link-tag-info");
      if (relAlternateHrefLangLinkTag !== 'Not available.') {
        if (relAlternateHrefLangLinkTag.search(tabURL) !== -1) {
          spanRelAlternateHrefLangLinkTagInfo.innerHTML = 'Self-referential';
        }
      }

      //Loads options from chrome.storage.sync.
      chrome.storage.sync.get(["metaKeywordsSetting","metaNewsKeywordsSetting","paginationDirectivesSetting","mobileDirectivesSetting","internationalDirectivesSetting"], function(settings) {
        if (!chrome.runtime.error) {
          var metaKeywordsSetting = settings.metaKeywordsSetting;
          var metaNewsKeywordsSetting = settings.metaNewsKeywordsSetting;
          var paginationDirectivesSetting = settings.paginationDirectivesSetting;
          var mobileDirectivesSetting = settings.mobileDirectivesSetting;
          var internationalDirectivesSetting = settings.internationalDirectivesSetting;
        }

        if (metaNewsKeywordsSetting === 'meta-news-keywords-hide') {
          metaNewsKeywordsElem.parentNode.style.display = 'none';
          metaKeywordsElem.parentNode.style.borderBottomWidth = '0px';
        } else {
          metaNewsKeywordsElem.parentNode.style.display = 'block';
          metaKeywordsElem.parentNode.style.borderBottomWidth = '1px';
        }

        if (metaKeywordsSetting === 'meta-keywords-hide') {
          metaKeywordsElem.parentNode.style.display = 'none';
          metaDescriptionElem.parentNode.style.borderBottomWidth = '0px';
        } else {
          metaKeywordsElem.parentNode.style.display = 'block';
          metaDescriptionElem.parentNode.style.borderBottomWidth = '1px';
        }

        if (paginationDirectivesSetting === 'pagination-directives-hide') {
          document.getElementById("pagination").style.display = 'none';
        } else {
          document.getElementById("pagination").style.display = 'block';
        }

        if (mobileDirectivesSetting === 'mobile-directives-hide') {
          document.getElementById("mobile").style.display = 'none';
        } else {
          document.getElementById("mobile").style.display = 'block';
        }

        if (internationalDirectivesSetting === 'international-directives-hide') {
          document.getElementById("international").style.display = 'none';
        } else {
          document.getElementById("international").style.display = 'block';
        }
      });

      // AJAX request to retrieve HTTP Status & HTTP Response Headers
      var xhr = new XMLHttpRequest();
      var xhr2 = new XMLHttpRequest();

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (typeof tab != 'undefined') {

            var statusCode = xhr.status,
                statusText = xhr.statusText,
                httpLinkHeader = xhr.getResponseHeader('Link'),
                varyHeader = xhr.getResponseHeader('Vary') || notAvailable,
                xRobotsTag = xhr.getResponseHeader('X-Robots-Tag') || notAvailable;

            // HTTP/2 does not provide a statusText, but returns a status
            var httpStatus = statusCode + " " + statusText;
            if (!statusText) {
              var spanHTTPVersionInfo = document.getElementById("http-version-info");
              spanHTTPVersionInfo.innerText = 'HTTP/2';
            }

            // HTTP Status Code
            var statusCodeElem = document.getElementById("http-status"),
                statusElem = document.createElement("p");
            statusElem.innerText = httpStatus;
            statusCodeElem.appendChild(statusElem);

            // X-Robots-Tag Header
            const xRobotsTagHTTPHeader = document.getElementById("x-robots-tag"),
            xRobotsTagHeader = document.createElement("p"),
            xRobotsTagValue = xRobotsTag;
            if (xRobotsTagValue === notAvailable || xRobotsTagValue === contentMissing) {
              xRobotsTagHeader.innerHTML = '<span class="missing-value">' + xRobotsTagValue + '</span>';
            } else {
              xRobotsTagHeader.innerText = xRobotsTagValue;
            }
            xRobotsTagHTTPHeader.appendChild(xRobotsTagHeader);

            // Canonical Link Header, check for rel="canonical"
            if (/.*<(.*)>;\srel="canonical".*/.test(httpLinkHeader)) {
              var httpCanonicalLinkHeader = /.*<(.*)>;\srel="canonical".*/;
              canonicalLinkHeader = httpLinkHeader.replace(httpCanonicalLinkHeader,'$1');
            } else {
              canonicalLinkHeader = notAvailable;
            }

            // Canonical Link Header
            var canonicalLinkHTTPHeader = document.getElementById("canonical-link-header"),
                canonicalHeader = document.createElement("p");

            if (canonicalLinkHeader === notAvailable || canonicalLinkHeader === contentMissing) {
              canonicalHeader.innerHTML = '<span class="missing-value">' + canonicalLinkHeader + '</span>';
            } else if (!hasProtocol(canonicalLinkHeader)) {
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
            if (varyHeader === notAvailable || varyHeader === contentMissing) {
              varyhttpHeader.innerHTML = '<span class="missing-value">' + varyHeader + '</span>';
            } else {
              varyhttpHeader.innerText = varyHeader;
            }
            varyHTTPHeader.appendChild(varyhttpHeader);

            // Show footer links
            var seoPeekLink = document.getElementById("seo-peek");
                seoPeekLink.innerHTML = '<a href="https://www.sanderheilbron.nl/seo-peek/" target="_blank">SEO Peek</a>';
            var shLink = document.getElementById("sh");
                shLink.innerHTML = '<a href="https://www.sanderheilbron.nl/" target="_blank">Sander Heilbron</a>';

            // Show content
            infoElem.style.display = "block";

            // Remove spinner from DOM
            spinner.stop();

            // Hide spinner
            spinnerElem.style.display = "none";

            xhr2.onreadystatechange = function() {
              if (xhr2.readyState === 4) {
                statusCode = xhr2.status;
                statusText = xhr2.statusText;
                responseURL = xhr2.responseURL;

                var httpCanonicalStatus = statusCode + " " + statusText;

                if (httpCanonicalStatus) {
                  var spanCanonicalLinkTagInfoStatus = document.getElementById("canonical-link-tag-info-status");
                  spanCanonicalLinkTagInfoStatus.innerHTML = (responseURL !== canonicalLinkTag) ? "redirects &rarr; " + httpCanonicalStatus : httpCanonicalStatus;
                }
                if (responseURL !== canonicalLinkTag) {
                  var spanCanonicalLinkTagInfoResponseUrl = document.getElementById("canonical-link-tag-info-response-url");
                  spanCanonicalLinkTagInfoResponseUrl.innerHTML = "<br><hr>Response URL";
                  var spanCanonicalLinkTagInfoResponseUrlValue = document.getElementById("canonical-link-tag-info-response-url-value");
                  spanCanonicalLinkTagInfoResponseUrlValue.innerHTML = '<a href="' + responseURL + '" target="_blank">' + responseURL + '</a>';;
                }
              }
            };
            xhr2.open('GET', canonicalLinkTag, true);
            xhr2.send(null);
          }
        }
      };

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

      // If you want to asynchronously use sendResponse, add return true; to the onMessage event handler.
      return true;
  });

});
