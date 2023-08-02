<script setup lang="ts">
import { defaultKeymap } from "@codemirror/commands";
import { sql } from "@codemirror/lang-sql";
import { foldGutter, syntaxHighlighting } from "@codemirror/language";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
import { onMounted, ref } from "vue";
import { hightlightExtension, myTheme, updateToMinNumberOfLines } from "./config";

let startState = EditorState.create({
  doc: `-- Delivery Performance by Carrier
WITH
  delivery_cte AS(
    SELECT
      delivery_id,
    carrier_id,
    DATE_TRUNC('day', delivery_date) AS delivery_day,
  delivery_status
    FROM deliveries
),
  on_time_delivery_cte AS (
    SELECT
      delivery_cte.carrier_id,
  delivery_cte.delivery_day,
  COUNT(*) AS num_on_time_deliveries
    FROM delivery_cte
    WHERE delivery_cte.delivery_status = 'delivered_on_time'
    GROUP BY 1, 2
  ),
  total_delivery_cte AS(
    SELECT
      delivery_cte.carrier_id,
    delivery_cte.delivery_day,
    COUNT(*) AS num_total_deliveries
    FROM delivery_cte
    GROUP BY 1, 2
  ),
  delivery_performance_cte AS(
    SELECT
      on_time_delivery_cte.carrier_id,
    on_time_delivery_cte.delivery_day,
    on_time_delivery_cte.num_on_time_deliveries / total_delivery_cte.num_total_deliveries:: float AS on_time_delivery_rate
    FROM on_time_delivery_cte
    JOIN total_delivery_cte ON on_time_delivery_cte.carrier_id = total_delivery_cte.carrier_id AND on_time_delivery_cte.delivery_day = total_delivery_cte.delivery_day
  )
SELECT
delivery_performance_cte.carrier_id,
  AVG(delivery_performance_cte.on_time_delivery_rate) AS average_on_time_delivery_rate
FROM delivery_performance_cte
GROUP BY 1
`,
  extensions: [
    keymap.of(defaultKeymap),
    lineNumbers(),
    sql(),
    foldGutter(),
    syntaxHighlighting({
      style: () => "monokai",
    }),
    EditorView.lineWrapping,
    hightlightExtension,
    myTheme
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
  updateToMinNumberOfLines(view, 40);
  content.value = view.state.doc.toString();
});
</script>

<template>
  <div class="p-5 h-screen w-screen">
    <div class="text-xl">Editor example</div>
    <div class="grid grid-cols-2 gap-5 h-[80vh]">
      <div id="editor" class="border overflow-auto border-gray-800" ref="editor"></div>
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
