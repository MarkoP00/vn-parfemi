<template>
  <GlobalPopup
    v-if="popupTitle"
    :popupTitle="popupTitle"
    :popupMessage="popupMessage"
    @popup-reset="resetPopup"
    :singleButton="true"></GlobalPopup>
  <section>
    <ShopLogo></ShopLogo>
    <PageTitle :title="'Dodaj parfem'"></PageTitle>
    <main>
      <form @submit.prevent>
        <InputField
          v-for="(field, key) in inputFields"
          :key="key"
          :label="key"
          :placeholder="field.placeholder"
          :type="field.type"
          :modelValue="field.value"
          :invalidStatus="field.invalid"
          v-model:invalidStatus="field.invalid"
          v-model="field.value" />

        <div class="gender-details">
          <RadioGroup
            label="Pol"
            :options="genderOptions"
            name="gender"
            v-model="gender" />
        </div>

        <div class="new-details">
          <RadioGroup
            label="Da li parfem dodati u 'Nove'?"
            :options="newOptions"
            name="new"
            v-model="isNew" />
        </div>

        <div class="selectedNotesWrapper">
          <div class="listTitle">
            <span>Lista izabranih mirisnih nota</span>
          </div>
          <ul>
            <p v-if="!selectedNotes?.length">Lista je prazna</p>
            <li
              v-for="element in selectedNotes"
              :key="element"
              :style="{ backgroundColor: getNoteColor(element) }"
              class="noteItem"
              @click="removeNote(element)">
              {{ element }}
            </li>
          </ul>
        </div>

        <div class="noteColorList">
          <div class="noteTitle">
            <span>Izaberi mirisne note</span>
          </div>
          <ul>
            <li
              v-for="(color, note) in noteColors"
              :key="note"
              :style="{ backgroundColor: getNoteColor(note) }"
              class="noteItem"
              @click="addNote(note)">
              <span>{{ note }}</span>
            </li>
          </ul>
        </div>

        <div class="button">
          <GlobalButton
            :text="'Dodaj'"
            @click="submitForm"></GlobalButton>
        </div>
      </form>

      <div class="preview">
        <div class="previewTitle">
          <span>Pregled</span>
        </div>
        <ProductCard
          :name="inputFields.naziv.value"
          :price="+inputFields.cena.value"
          :volume="+inputFields.zapremina.value"
          :sale="inputFields.salePrice.value ? true : false"
          :salePrice="+inputFields.salePrice.value"
          :image="inputFields.slika.value"
          :brand="inputFields.brend.value"
          :rating="+inputFields.rating.value"
          :new="isNew"></ProductCard>
      </div>
    </main>
  </section>
</template>

<script setup>
import PageTitle from "../../global/PageTitle.vue";
import ShopLogo from "../../global/ShopLogo.vue";
import GlobalButton from "../../global/GlobalButton.vue";
import ProductCard from "../card/ProductCard.vue";
import InputField from "../uploadForm/formElements/InputField.vue";
import RadioGroup from "../uploadForm/formElements/RadioGroup.vue";
import GlobalPopup from "../../global/GlobalPopup.vue";
import { noteColors } from "../../parfumes/notes";
import { ref } from "vue";

const selectedNotes = ref([]);

const gender = ref("male");
const isNew = ref(false);
const inputFields = ref({
  brend: {
    placeholder: "Unesi brend parfema",
    type: "text",
    value: "",
    invalid: false,
  },
  naziv: {
    placeholder: "Unesi naziv parfema",
    type: "text",
    value: "",
    invalid: false,
  },
  zapremina: {
    placeholder: "Unesi zapreminu parfema (ml)",
    type: "number",
    value: "",
    invalid: false,
  },
  slika: {
    placeholder: "Unesi link slike",
    type: "url",
    value: "",
    invalid: false,
  },
  cena: {
    placeholder: "Unesi cenu parfema",
    type: "number",
    value: "",
    invalid: false,
  },
  salePrice: {
    placeholder: "Ostavi prazno ako parfem nije na akciji",
    type: "number",
    value: "",
  },
  rating: {
    placeholder: "Unesi ocenu (3, 3.5, 4, 4.5, 5)",
    type: "number",
    value: "",
    invalid: false,
  },
});

const genderOptions = [
  { value: "male", label: "Muški" },
  { value: "female", label: "Ženski" },
  { value: "unisex", label: "Unisex" },
];

const newOptions = [
  { value: true, label: "Da" },
  { value: false, label: "Ne" },
];

const popupTitle = ref("");
const popupMessage = ref("");

function getNoteColor(note) {
  return noteColors[note] || "#ccc";
}

function removeNote(note) {
  const noteIndex = selectedNotes.value.indexOf(note);
  selectedNotes.value.splice(noteIndex, 1);
}

function addNote(note) {
  if (!selectedNotes.value.includes(note)) {
    selectedNotes.value.push(note);
  }
}

function validateInputFields() {
  let formIsValid = true;

  Object.keys(inputFields.value).forEach((key) => {
    const field = inputFields.value[key];
    const fieldValue = field.value;

    // reset input invalid status on every function run
    field.invalid = false;

    if (key === "salePrice") {
      return;
    }

    if (field.type === "text" && (!fieldValue || fieldValue.length < 2)) {
      field.invalid = true;
      formIsValid = false;
    }

    if (
      field.type === "number" &&
      (!fieldValue || isNaN(Number(fieldValue)) || fieldValue.length < 1)
    ) {
      field.invalid = true;
      formIsValid = false;
    }

    if (
      field.type === "url" &&
      (!fieldValue || !fieldValue.startsWith("http"))
    ) {
      field.invalid = true;
      formIsValid = false;
    }

    if (field.type === "email" && (!fieldValue || !fieldValue.inclides("@"))) {
      field.invalid = true;
      formIsValid = false;
    }
  });

  return formIsValid;
}

async function submitForm() {
  const formIsValid = validateInputFields();

  if (!formIsValid) {
    popupTitle.value = "Greska";
    popupMessage.value = "Molim vas proverite sva uneta polja";
    return;
  }

  const submitData = [
    {
      name: inputFields.value.naziv.value,
      brand: inputFields.value.brend.value.toLocaleLowerCase(),
      volume: +inputFields.value.zapremina.value,
      price: +inputFields.value.cena.value,
      sale: inputFields.value.salePrice.value ? true : false,
      salePrice: +inputFields.value.salePrice.value
        ? +inputFields.value.salePrice.value
        : false,
      image: inputFields.value.slika.value,
      rating: +inputFields.value.rating.value,
      new: isNew.value,
      gender: gender.value,
      notes: selectedNotes.value,
    },
  ];

  try {
    const response = await fetch(
      `https://vn-parfemi-default-rtdb.firebaseio.com/${inputFields.value.brend.value.toLocaleLowerCase()}.json`,
      {
        method: "POST",
        headers: {
          "Content-type": "application.json",
        },
        body: JSON.stringify(submitData),
      }
    );

    if (response) {
      popupTitle.value = "Uspesno";
      popupMessage.value = "Perfem je dodan u ponudu";
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {}
}

function resetPopup() {
  popupTitle.value = "";
  popupMessage.value = "";
}
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background: linear-gradient(135deg, #a1c4fd, #c2e9fb);
}

main {
  max-width: 1200px;
  width: 100%;
  background: #fff;
  padding: 25px 30px;
  border-radius: 5px;
  display: flex;
  gap: 40px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.input-box {
  margin-bottom: 15px;
}

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

.input-box input:focus {
  border-color: #71b7e6;
}

.category-title {
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
}

.category {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 15px;
}

.category label {
  display: flex;
  align-items: center;
}

.custom-radio {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #ccc;
  position: relative;
  display: inline-block;
  cursor: pointer;
}
.gender-details,
.sale-details,
.new-details {
  border-bottom: 1px solid #ccc;
  padding: 20px 0;
}

.sale-details label,
.new-details label {
  margin: 0px 10px;
}
.sale-details,
.new-details {
  margin: 10px 0px;
}
.sale-title {
  margin-bottom: 10px;
}
.sale-details span,
.new-details span {
  font-weight: 500;
}

input[type="radio"]:checked + .custom-radio {
  background-color: #71b7e6;
  border-color: #71b7e6;
}

.noteTitle {
  text-align: center;
  font-weight: 600;
  font-size: 20px;
}
.noteColorList ul,
.selectedNotesWrapper ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  padding: 0;
  margin: 0 auto;
  list-style: none;
  max-width: 800px;
  margin-top: 20px;
}
.selectedNotesWrapper,
.noteColorList {
  border-bottom: 1px solid #ccc;
  padding: 20px 0;
}
.listTitle {
  font-size: 20px;
  text-align: center;
  font-weight: 600;
}
.noteItem {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 40px;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
  color: #000;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.noteItem:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}
.preview {
  position: sticky;
  top: 10px; /* Adjust this value as needed */
  align-self: flex-start; /* Ensure the sticky element respects its alignment in a flex container */
  padding: 20px;
  border-radius: 5px;
}
.previewTitle {
  font-weight: 600;
  font-size: 20px;
  text-align: center;
}
.button {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
@media (max-width: 768px) {
  main {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .previewTitle {
    margin-bottom: 20px;
  }
}
</style>
