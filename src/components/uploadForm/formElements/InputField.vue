<template>
  <div class="input-box">
    <label class="details">{{ props.label }}</label>
    <input
      :type="props.type"
      :placeholder="props.placeholder"
      :value="modelValue"
      :class="{ invalidStatus: props.invalidStatus === true }"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="handleBlur" />
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  placeholder: String,
  type: String,
  modelValue: String,
  invalidStatus: Boolean,
});

const emit = defineEmits(["update:invalidStatus", "update:modelValue"]);

// reset invalid status on blur
function handleBlur() {
  emit("update:invalidStatus", false);
}
</script>

<style scoped>
.input-box .details {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.input-box input {
  width: 100%;
  height: 40px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;
}
.input-box .invalidStatus {
  border: 1px solid rgb(239, 76, 76);
}
.input-box input:focus {
  border-color: #71b7e6;
}
.input-box label {
  text-transform: uppercase;
}
</style>
