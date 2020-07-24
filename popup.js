// Initializations
// Update DOM with requested data
function setDOMData(data) {
  if (data) {
    console.log({ data });

    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        document.getElementById(key.split(' ').join('_')).style.color = data[
          key
        ]
          ? 'limegreen'
          : 'red';
      }
    }
  } else {
    const parent = document.getElementById('container');
    parent.innerHTML = '';

    const messages = [
      'Hello there!',
      'Please visit an apartment listing on StreetEasy.com to utilize me.',
    ];
    messages.forEach(function(message) {
      const child = document.createElement('div');
      child.className = 'containee';
      child.textContent = message;

      parent.appendChild(child);
    });
  }
}

// Listeners
// Listen for DOM content load completion
window.addEventListener('DOMContentLoaded', function() {
  // Query for active tab
  browser.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function(tabs) {
      // Send request for DOM data
      browser.tabs.sendMessage(
        tabs[0].id,
        {
          from: 'popup',
          subject: 'DOMData',
        },
        // Specify callback to be invoked from receiving end (content script)
        setDOMData
      );
    }
  );
});
