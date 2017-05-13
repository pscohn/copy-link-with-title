function copyTextToClipboard(text) {
  var input = document.createElement('textarea');
  document.body.appendChild(input);
  input.value = text;
  input.focus();
  input.select();
  document.execCommand('Copy');
  input.remove();
}

function getFormattedLink(title, url, callback) {
  chrome.storage.sync.get(['format', 'custom'], function(data) {
    var formattedLink;
    if (data.format == 'md') {
      formattedLink = `[${title}](${url})`;
    } else if (data.format == 'html') {
      formattedLink = `<a href="${url}">${title}</a>`;
    } else if (data.format == 'basic') {
      formattedLink = `${title} - ${url}`;
    } else if (data.format == 'custom') {
      formattedLink = data.custom.replace(/\[title\]/g, title).replace(/\[url\]/g, url);
    } else {
      formattedLink = `${title} - ${url}`;
    }
    callback(formattedLink);
  });
}

chrome.browserAction.onClicked.addListener(
  function(tab) {
    getFormattedLink(tab.title, tab.url, function(formattedLink) {
      copyTextToClipboard(formattedLink);
    });
  }
);
