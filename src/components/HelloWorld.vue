<script setup lang="ts">
defineProps<{ msg: string }>();

import { defaultKeymap } from "@codemirror/commands";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
import { onMounted, ref } from "vue";

let startState = EditorState.create({
  doc: "Hello World",
  extensions: [keymap.of(defaultKeymap), lineNumbers()],
});

const editor = ref<HTMLElement>();

let view: EditorView;

onMounted(() => {
  view = new EditorView({
    state: startState,
    parent: editor.value,
  });
});
</script>

<template>
  <div class="p-5 h-screen w-screen">
    <div class="text-xl">Editor example</div>
    <div class="grid grid-cols-2 gap-5 h-full">
      <div id="editor" class="border border-gray-800" ref="editor"></div>
      <div class="">{{ view?.state.doc || "Error" }}</div>
    </div>
  </div>
</template>

<style scoped>
.cm-editor {
  height: 100%;
  background: white;
}
</style>
