import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { tags } from "@lezer/highlight";

export function updateToMinNumberOfLines(editor: EditorView, minNumOfLines: number) {
  const currentNumOfLines = editor.state.doc.lines;
  const currentStr = editor.state.doc.toString();
  if (currentNumOfLines >= minNumOfLines) {
    return;
  }
  const lines = minNumOfLines - currentNumOfLines;
  const appendLines = "\n".repeat(lines);
  editor.dispatch({
    changes: { from: currentStr.length, insert: appendLines }
  })
}

export const myTheme = EditorView.theme({
  "&": {
    color: "white",
    backgroundColor: "#034"
  },
}, { dark: true });

const myHighlightStyle = HighlightStyle.define([
  { tag: tags.keyword, color: "#fc6" },
  { tag: tags.comment, color: "#f5d", fontStyle: "italic" }
])

export const hightlightExtension: Extension = syntaxHighlighting(myHighlightStyle)
