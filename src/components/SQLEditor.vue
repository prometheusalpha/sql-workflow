<script setup lang="ts">
defineProps<{ msg: string }>();

import { defaultKeymap } from "@codemirror/commands";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
import { onMounted, ref } from "vue";
import { sql } from "@codemirror/lang-sql";
import { foldGutter, syntaxHighlighting } from "@codemirror/language";

let startState = EditorState.create({
  doc: "Hello World",
  extensions: [
    keymap.of(defaultKeymap),
    lineNumbers(),
    sql(),
    foldGutter(),
    syntaxHighlighting({
      style: () => "monokai",
    }),
    EditorView.lineWrapping,
  ],
});

const editor = ref<HTMLElement>();
const content = ref<string>();

onMounted(() => {
  let view: EditorView = new EditorView({
    state: startState,
    parent: editor.value,
    dispatch: (tr) => {
      view.update([tr]);
      content.value = view.state.doc.toString();
    },
  });
  content.value = view.state.doc.toString();
});
</script>

<template>
  <div class="p-5 h-screen w-screen">
    <div class="text-xl">Editor example</div>
    <div class="grid grid-cols-2 gap-5 h-[80vh]">
      <div
        id="editor"
        class="border overflow-auto border-gray-800"
        ref="editor"
      ></div>
      <div class="break-words">{{ content }}</div>
    </div>
  </div>
</template>

<style scoped>
.cm-editor {
  height: 100%;
  background: white;
}
</style>
