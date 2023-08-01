<template>
  <a-modal :open="visible" title="Custom text" @cancel="onClose">
    <a-input
      v-model:value="inputValue"
      placeholder="Add text to custom on the cake"
      :maxlength="25"
      @change="onChange"
    />
    <span class="b8 text-danger">(*) You can only enter up to 25 characters</span>
    <template #footer>
      <a-button key="back" danger @click="onClose">Cancel</a-button>
      <a-button key="submit" type="primary" :disabled="!inputValue" @click="onSubmit">
        Submit
      </a-button>
    </template>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'CustomModal',

  props: {
    value: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    }
  },

  emits: ['submit-text', 'update:visible'],

  setup(props, { emit }) {
    const inputValue = ref(props.value)

    watch(
      () => props.value,
      (newVal) => {
        inputValue.value = newVal
      }
    )

    const onChange = ({ target: { value } }) => {
      inputValue.value = value
    }

    const onClose = () => {
      inputValue.value = ''
      emit('update:visible', false)
    }

    const onSubmit = () => {
      emit('submit-text', inputValue.value)

      onClose()
    }

    return {
      inputValue,
      onChange,
      onClose,
      onSubmit
    }
  }
})
</script>

<style></style>
