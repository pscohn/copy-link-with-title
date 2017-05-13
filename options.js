var validOptions = ['md', 'custom', 'basic', 'html'];

function saveOptions(event) {
  if (validOptions.indexOf(event.target.value) > -1) {
    chrome.storage.sync.set({ format: event.target.value });
  }
}

function saveCustomText(event) {
  chrome.storage.sync.set({ custom: event.target.value });
}

function restoreOptions() {
  chrome.storage.sync.get(['format', 'custom'], function(data) {
    document.getElementById('custom-text').value = data.custom || '';
    var radio = document.getElementById(data.format || 'basic')
    radio.checked = true;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  restoreOptions();
  document.querySelector('form').onchange = saveOptions;
  document.getElementById('custom-text').onchange = saveCustomText;
});

