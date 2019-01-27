// Saves options to chrome.storage.sync.
function saveOptions() {
    var metaKeywords = document.querySelector('input[name = "meta-keywords"]:checked').value || '';
    var paginationDirectives = document.querySelector('input[name = "pagination-directives"]:checked').value || '';
    var mobileDirectives = document.querySelector('input[name = "mobile-directives"]:checked').value || '';
    var internationalDirectives = document.querySelector('input[name = "international-directives"]:checked').value || '';

    chrome.storage.sync.set({
        metaKeywordsSetting: metaKeywords,
        paginationDirectivesSetting: paginationDirectives,
        mobileDirectivesSetting: mobileDirectives,
        internationalDirectivesSetting: internationalDirectives
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved';
        setTimeout(function() {
            status.textContent = '';
        }, 1500);
    });
}

// Loads options from chrome.storage.sync.
function loadOptions() {
    chrome.storage.sync.get(["metaKeywordsSetting", "paginationDirectivesSetting", "mobileDirectivesSetting", "internationalDirectivesSetting"], function(settings) {
        document.getElementById(settings.metaKeywordsSetting).checked = true;
        document.getElementById(settings.paginationDirectivesSetting).checked = true;
        document.getElementById(settings.mobileDirectivesSetting).checked = true;
        document.getElementById(settings.internationalDirectivesSetting).checked = true;
    });
}

// Restores options to chrome.storage.sync.
function restoreOptions() {
    chrome.storage.sync.set({
        metaKeywordsSetting: 'meta-keywords-show',
        paginationDirectivesSetting: 'pagination-directives-show',
        mobileDirectivesSetting: 'mobile-directives-show',
        internationalDirectivesSetting: 'international-directives-show'
    }, function(settings) {});

    chrome.storage.sync.get(["metaKeywordsSetting", "paginationDirectivesSetting", "mobileDirectivesSetting", "internationalDirectivesSetting"], function(settings) {
        document.getElementById(settings.metaKeywordsSetting).checked = true;
        document.getElementById(settings.paginationDirectivesSetting).checked = true;
        document.getElementById(settings.mobileDirectivesSetting).checked = true;
        document.getElementById(settings.internationalDirectivesSetting).checked = true;

        var status = document.getElementById('status');
        status.textContent = 'Options restored';
        setTimeout(function() {
            status.textContent = '';
        }, 1500);
    });
}

// Event listeners
//window.addEventListener("load", loadOptions);
document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('restore').addEventListener('click', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
