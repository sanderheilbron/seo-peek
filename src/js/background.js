// Check whether new version or update is installed
chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason == "install") {
        chrome.tabs.create({
            url: "instructions.html"
        }); //console.log("This is a first install!");
        chrome.storage.sync.set({
            metaKeywordsSetting: 'meta-keywords-show',
            metaNewsKeywordsSetting: 'meta-news-keywords-show',
            paginationDirectivesSetting: 'pagination-directives-show',
            mobileDirectivesSetting: 'mobile-directives-show',
            internationalDirectivesSetting: 'international-directives-show'
        }, function(settings) {});
    } else if (details.reason == "update") {
        var thisVersion = chrome.runtime.getManifest().version; // console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
        if (thisVersion > details.previousVersion) {
            chrome.tabs.create({
                url: "upgrade.html"
            });
        }
    }
});
