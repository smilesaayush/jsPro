const activeEditor = CodeMirror.fromTextArea(document.getElementById("activeEditorTextArea"), {
  lineNumbers: true,
  lineWrapping: true,
  mode: "javascript",
  hint: CodeMirror.hint.javascript,
  autoCloseBrackets: true,
  tabSize: 2
});

const referenceEditor = CodeMirror.fromTextArea(document.getElementById("referenceEditorTextArea"), {
  mode: "javascript",
  lineWrapping: true,
  readOnly: true
});


let runButton = document.getElementById("run");
runButton.addEventListener('click', executeCurrentCode);
function executeCurrentCode() {
  const currentValue = activeEditor.getValue();
  sendMsg(currentValue);
  activeEditor.setValue("");
  referenceEditor.setValue(referenceEditor.getValue() + "\n//......................\n" + currentValue);
}

let themeSelector = document.getElementById("themeSelector");
themeSelector.addEventListener('click', changeTheme);
function changeTheme(event) {
  const theme = event.target.value;
  activeEditor.setOption("theme", theme);
}


activeEditor.setOption("extraKeys", {
  'Shift-Ctrl-J': function(cm) {
    executeCurrentCode();
  },
  'Ctrl-Space': function(cm) {
    CodeMirror.commands.autocomplete(cm);
  }
});

activeEditor.on("keydown", function (cm, event) {
  if (
    !(event.ctrlKey) &&
    (event.keyCode >= 65 && event.keyCode <= 90) || 
    (event.keyCode >= 97 && event.keyCode <= 122) || 
    (event.keyCode >= 46 && event.keyCode <= 57)
  ) {
    CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
  }
});