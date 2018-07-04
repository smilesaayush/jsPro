const activeEditor = CodeMirror.fromTextArea(document.getElementById("activeEditorTextArea"), {
  lineNumbers: true,
  mode: "javascript",
  theme: "dracula",
  hint: CodeMirror.hint.javascript,
  autoCloseBrackets: true,
  tabSize: 2
});

const referenceEditor = CodeMirror.fromTextArea(document.getElementById("referenceEditorTextArea"), {
  mode: "javascript",
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

activeEditor.setOption("extraKeys", {
  'Shift-Ctrl-J': function(cm) {
    executeCurrentCode();
  },
  'Ctrl-Space': function(cm) {
    CodeMirror.commands.autocomplete(cm);
  }
});

activeEditor.on("keyup", function (cm, event) {
  if (
    !(event.key == 'J' && event.ctrlKey && event.shiftKey) &&
    (event.keyCode >= 65 && event.keyCode <= 90) || 
    (event.keyCode >= 97 && event.keyCode <= 122) || 
    (event.keyCode >= 46 && event.keyCode <= 57)
  ) {
    CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
  }
});