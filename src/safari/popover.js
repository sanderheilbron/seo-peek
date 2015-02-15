safari.application.addEventListener("message", checkAvailabilityOfInjectedScript, false);

// Check message from injected script
function checkAvailabilityOfInjectedScript(event) {
  if (event.name === "scriptsInjectedIntoPage") {
    safari.application.addEventListener("popover", handlePopoverEvent, false);
  }
}

// Reload all tabs after installation or activating the extension
function reloadTabs() {
  var browserWindows = safari.application.browserWindows;
  for (var i = 0; i < browserWindows.length; i++) {
    var tabs = browserWindows[i].tabs;
    for (var j = 0; j < tabs.length; j++) {
      tabs[j].url = tabs[j].url;
    }
  }
}

var spinner;

function handlePopoverEvent(event) {

  clearPageInformation();
  var infoElem = document.getElementById("info"),
      contentElem = document.getElementById("content"),
      directivesElem = document.getElementById("directives"),
      directivesElemPagination = document.getElementById("pagination-directives"),
      directivesElemMobile = document.getElementById("mobile-directives"),
      directivesElemInternational = document.getElementById("international-directives"),
      spinnerElem = document.getElementById("spinner");
      reloadElem = document.getElementById("reload-notification");

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

  // Create spinner
  spinner = new Spinner(opts).spin(spinnerElem);

  // Hide content
  infoElem.style.display = "none";
  contentElem.style.display = "none";
  directivesElem.style.display = "none";
  directivesElemPagination.style.display = "none";
  directivesElemMobile.style.display = "none";
  directivesElemInternational.style.display = "none";
  reloadElem.style.display = "none";

  // Show spinner
  spinnerElem.style.display = "block";

  // Fetch HTTP Response Headers
  (function () {
    var xhr = new XMLHttpRequest();
    var activeTabURL = safari.application.activeBrowserWindow.activeTab.url;

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        var tab  = safari.application.activeBrowserWindow.activeTab;

        if (typeof tab !== 'undefined' && typeof tab.page !== 'undefined') {

            var statusCode = xhr.status,
                statusText = xhr.statusText,
                httpLinkHeader = xhr.getResponseHeader('Link'),
                varyHeader = xhr.getResponseHeader('Vary'),
                xRobotsHeader = xhr.getResponseHeader('X-Robots-Tag');

            if (statusText) {
              httpStatus = statusCode + " " + statusText;
            } else {
              httpStatus = 'Not available.';
            }
            /**
       * When we know the popover is about to be shown, ask the content scripts to gather the page
       * information for the current page.
         */
            tab.page.dispatchMessage("gatherPageInfoForPopover", {"http-status-content" : httpStatus, "http-header-link-content" : httpLinkHeader, "x-robots-header-content" : xRobotsHeader, "vary-header-content" : varyHeader });
        }
      }
    };

    xhr.open('GET', activeTabURL, true);
    xhr.send(null);
  }());

  //safari.application.activeBrowserWindow.activeTab.page.dispatchMessage("gatherPageInfoForPopover");
}

// Callbacks from showInfoPopover.js
function makeUIAdjustments() {
  var infoElem = document.getElementById("info"),
      contentElem = document.getElementById("content"),
      directivesElem = document.getElementById("directives"),
      directivesElemPagination = document.getElementById("pagination-directives"),
      directivesElemMobile = document.getElementById("mobile-directives"),
      directivesElemInternational = document.getElementById("international-directives"),
      spinnerElem = document.getElementById("spinner");

  // Remove spinner from DOM
  spinner.stop();

  // Show content
  infoElem.style.display = "block";
  contentElem.style.display = "block";
  directivesElem.style.display = "block";
  directivesElemPagination.style.display = "block";
  directivesElemMobile.style.display = "block";
  directivesElemInternational.style.display = "block";

  // Hide spinner
  spinnerElem.style.display = "none";

  // Adjust the height of the popover to be the minimum necessary to show all the info.
  var thisPopover;

  // Find the popover in the array of popvers using its unique identifier.
  var allPopovers = safari.extension.popovers;
  for (var popoverIndex = 0; popoverIndex < allPopovers.length; popoverIndex++) {
    if (allPopovers[popoverIndex].identifier === "pageInfoPopover") {
      thisPopover = allPopovers[popoverIndex];
      thisPopover.width = 530; //safari.extension.settings.popoverWidth;
      break;
    }
  }

  // Update the height of the popover to fit the content.
  thisPopover.height = 600; //document.documentElement.offsetHeight;
  //thisPopover.width = safari.extension.settings.popoverWidth;
}