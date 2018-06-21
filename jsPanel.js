
// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
  name: "devtools-page"
});

backgroundPageConnection.onMessage.addListener(function (message) {
  // Handle responses from the background page, if any
});





const editorArea = document.getElementById("editor-area");
const myCodeMirror = CodeMirror.fromTextArea(editorArea, {
  lineNumbers: true,
  mode: "javascript"
});


let runButton = document.getElementById("run");
runButton.addEventListener('click', function() {
  console.log(myCodeMirror.getValue());
  // Relay the tab ID to the background page
  backgroundPageConnection.postMessage({
    tabId: chrome.devtools.inspectedWindow.tabId,
    content: myCodeMirror.getValue()
  });
});






