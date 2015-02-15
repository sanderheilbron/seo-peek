// Show settings
function loadOptions() {
  var myMetaNewsKeywordsSetting = localStorage.myMetaNewsKeywordsSetting;
  var myPaginationDirectivesSetting = localStorage.myPaginationDirectivesSetting;
  var myMobileDirectivesSetting = localStorage.myMobileDirectivesSetting;
  var myInternationalDirectivesSetting = localStorage.myInternationalDirectivesSetting;
  var select_meta_news_keywords_values = document.getElementById("meta_news_keywords_values");
  var select_pagination_directives_values = document.getElementById("pagination_directives_values");
  var select_mobile_directives_values = document.getElementById("mobile_directives_values");
  var select_international_directives_values = document.getElementById("international_directives_values");
  var i = 0;

  for (; i < select_meta_news_keywords_values.children.length; i++) {
    var child_meta_news_keywords_values = select_meta_news_keywords_values.children[i];
      if (child_meta_news_keywords_values.value === myMetaNewsKeywordsSetting) {
        child_meta_news_keywords_values.selected = "true";
        break;
    }
  }

  for (; i < select_pagination_directives_values.children.length; i++) {
    var child_pagination_directives_values = select_pagination_directives_values.children[i];
      if (child_pagination_directives_values.value === myPaginationDirectivesSetting) {
        child_pagination_directives_values.selected = "true";
        break;
    }
  }

  for (; i < select_mobile_directives_values.children.length; i++) {
    var child_mobile_directives_values = select_mobile_directives_values.children[i];
      if (child_mobile_directives_values.value === myMobileDirectivesSetting) {
        child_mobile_directives_values.selected = "true";
        break;
    }
  }

  for (; i < select_international_directives_values.children.length; i++) {
    var child_international_directives_values = select_international_directives_values.children[i];
      if (child_international_directives_values.value === myInternationalDirectivesSetting) {
        child_international_directives_values.selected = "true";
        break;
    }
  }

}

// Save settings
function saveOptions() {
  var select_meta_news_keywords_values = document.getElementById("meta_news_keywords_values");
  var select_pagination_directives_values = document.getElementById("pagination_directives_values");
  var select_mobile_directives_values = document.getElementById("mobile_directives_values");
  var select_international_directives_values = document.getElementById("international_directives_values");
  var meta_news_keywords = select_meta_news_keywords_values.children[select_meta_news_keywords_values.selectedIndex].value;
  localStorage.myMetaNewsKeywordsSetting = meta_news_keywords;
  var pagination_directives = select_pagination_directives_values.children[select_pagination_directives_values.selectedIndex].value;
  localStorage.myPaginationDirectivesSetting = pagination_directives;
  var mobile_directives = select_mobile_directives_values.children[select_mobile_directives_values.selectedIndex].value;
  localStorage.myMobileDirectivesSetting = mobile_directives;
  var international_directives = select_international_directives_values.children[select_international_directives_values.selectedIndex].value;
  localStorage.myInternationalDirectivesSetting = international_directives;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Your options are saved.";
  setTimeout(function() {
     status.innerHTML = "";
  }, 2000);
}

// Restore settings
function restoreOptions() {
  localStorage.myMetaNewsKeywordsSetting = 'disable';
  localStorage.myPaginationDirectivesSetting = 'disable';
  localStorage.myMobileDirectivesSetting = 'disable';
  localStorage.myInternationalDirectivesSetting = 'disable';
  location.reload();
}

// Event listeners
window.addEventListener("load", loadOptions);

/**
 * Add event listeners once the DOM has fully loaded by listening for the
 * `DOMContentLoaded` event on the document, and adding your listeners to
 * specific elements when it triggers.
 */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('[class = save]').addEventListener('click', saveOptions);
  document.querySelector('[class = restore]').addEventListener('click', restoreOptions);
});
