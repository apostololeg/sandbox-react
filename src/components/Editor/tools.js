export default function(editor, Quill) {
  return {
    insertEmbed(type, params) {
      editor.focus();

      const { index } = editor.getSelection();

      editor.insertEmbed(index + 1, type, params, Quill.sources.USER);
    }
  };
}
