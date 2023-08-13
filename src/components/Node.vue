<script lang="ts" setup>
import { CopyDocument, Delete, Setting } from '@element-plus/icons-vue';
import { Handle, Position } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

interface NodeData {
  toolbarVisible: boolean
  toolbarPosition: Position
}

interface Props {
  data: NodeData
  label: string
  deleteNode: () => void
}

defineProps<Props>()

</script>

<template>
  <div>
    <NodeToolbar :is-visible="data.toolbarVisible" :position="data.toolbarPosition" class="color-black">
      <div class="flex gap-5">
        <button>
          <el-icon color="#000" @click="deleteNode">
            <Delete />
          </el-icon>
        </button>
        <button>
          <el-icon color="#000">
            <Setting />
          </el-icon>
        </button>
      </div>
    </NodeToolbar>

    <div class="px-10 py-4 text-black rounded-lg border border-black bg-white">
      {{ label }}
    </div>

    <Handle type="target" :position="Position.Left" />
    <Handle type="source" :position="Position.Right" />
  </div>
</template>

<style >
.vue-flow__node {
  border-radius: 8px;
}

.vue-flow__node.selected {
  box-shadow: 0 0 0 2px #409eff;
}
</style>
