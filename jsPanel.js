const activeEditor = CodeMirror.fromTextArea(document.getElementById("activeEditorTextArea"), {
  lineNumbers: true,
  mode: "javascript"
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
  }
});



