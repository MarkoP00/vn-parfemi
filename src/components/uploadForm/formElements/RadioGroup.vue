<template>
  <div class="radio-group">
    <label class="radio-group-label">{{ label }}</label>
    <div class="radio-options">
      <div
        v-for="option in props.options"
        :key="option.value"
        class="radio-option">
        <input
          type="radio"
          :id="`${name}-${option.value}`"
          :name="name"
          :value="option.value"
          :checked="option.value === modelValue"
          @change="updateValue(option.value)" />
        <label :for="`${name}-${option.value}`">{{ option.label }}</label>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  options: Array,
  name: String,
  modelValue: [Boolean, String],
});
const emits = defineEmits(["update:modelValue"]);

const updateValue = (value) => {
  emits("update:modelValue", value);
};
</script>

<style scoped>
.radio-group-label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.radio-options {
  display: flex;
  gap: 20px;
}

.radio-option {
  display: flex;
  align-items: center;
}

input[type="radio"] {
  margin-right: 0.5rem;
}
</style>

<!--  <form>
        <InputField 
          v-for="(placeholder, key) in inputFields" 
          :key="key" 
          :label="key" 
          :placeholder="placeholder" />

        <RadioGroup
          label="Pol"
          :options="genderOptions"
          name="gender" />

        <RadioGroup
          label="Da li je parfem na popustu?"
          :options="saleOptions"
          name="sale"
          @change="toggleSaleVisibilty" />

        <InputField 
          v-if="saleVisible" 
          label="Cena sa popustom" 
          placeholder="Unesi cenu sa popustom" />

        <RadioGroup
          label="Dodati u 'Nove'?"
          :options="newOptions"
          name="new" />

        <SelectedNotes
          :selectedNotes="selectedNotes" 
          :noteColors="noteColors"
          @remove="removeNote" />

        <NotePicker 
          :noteColors="noteColors" 
          @add="addNote" />

        <div class="button">
          <GlobalButton :text="'Dodaj'" />
        </div>
      </form> 
      
      
      const inputFields = {
  Brend: "Unesi brend parfema",
  Naziv: "Unesi naziv parfema",
  Slika: "Unesi link slike",
  Cena: "Unesi cenu parfema",
  Rating: "Unesi ocenu (3, 3.5, 4, 4.5, 5)"
};

const genderOptions = [
  { value: "male", label: "Muški" },
  { value: "female", label: "Ženski" },
  { value: "unisex", label: "Unisex" }
];

const saleOptions = [
  { value: true, label: "Da" },
  { value: false, label: "Ne" }
];

const newOptions = [
  { value: true, label: "Da" },
  { value: false, label: "Ne" }
];
      -->
