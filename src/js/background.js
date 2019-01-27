// Check whether new version or update is installed
chrome.runtime.onInstalled.addListener(function(details) {
    // Set uninstall URL
    var uninstallURL =
        'https://docs.google.com/forms/d/e/1FAIpQLScB0MjgYz90KnvksWOGGwh9FgV43lDSXtR2GNDaCoIrgfrG5A/viewform';
    if (details.reason == "install") {
        // This is a first install!
        chrome.tabs.create({
            url: "https://www.sanderheilbron.nl/seo-peek/instructions"
        });
        chrome.storage.sync.set({
            metaKeywordsSetting: 'meta-keywords-show',
            paginationDirectivesSetting: 'pagination-directives-show',
            mobileDirectivesSetting: 'mobile-directives-show',
            internationalDirectivesSetting: 'international-directives-show'
        },
        function(settings) {}
        );
        // If Chrome version supports it, uninstall extension for new users and open uninstall URL
        if (chrome.runtime.setUninstallURL) {
            chrome.runtime.setUninstallURL(uninstallURL);
        }
    } else if (details.reason == "update") {
        var thisVersion = chrome.runtime.getManifest().version;
        // console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
        if (thisVersion > details.previousVersion) {
            chrome.tabs.create({
                url: "https://www.sanderheilbron.nl/seo-peek/upgrade"
            });
        }
        // If Chrome version supports it, uninstall extension for updated (1.3.0) users and open uninstall URL
        if (chrome.runtime.setUninstallURL) {
            chrome.runtime.setUninstallURL(uninstallURL);
        }
    }
});