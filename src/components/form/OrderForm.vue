<template>
  <form class="userInfoWrapper">
    <!-- 1 -->
    <div>
      <div class="sectionNumber">
        <span>1</span>
        <h3>Korisnik</h3>
      </div>
      <div class="userInfo">
        <div class="input-group">
          <input
            required=""
            type="text"
            autocomplete="off"
            class="input"
            id="sendername"
            v-model="userData.name.value"
            :class="{ invalid: userData.name.invalid }"
            @blur="userData.name.invalid = false" />
          <label class="user-label">Ime i Prezime</label>
        </div>
        <div class="input-group">
          <input
            required=""
            type="text"
            autocomplete="off"
            class="input"
            v-model="userData.phoneNumber.value"
            :class="{ invalid: userData.phoneNumber.invalid }"
            @blur="userData.phoneNumber.invalid = false" />
          <label class="user-label">Telefon</label>
        </div>
        <div class="input-group">
          <input
            required=""
            type="email"
            autocomplete="off"
            class="input"
            id="to"
            v-model="userData.email.value"
            :class="{ invalid: userData.email.invalid }"
            @blur="userData.email.invalid = false" />
          <label class="user-label">E-mail</label>
        </div>
      </div>
    </div>
    <!-- 2 -->
    <div class="infoToOrder">
      <div class="sectionNumber">
        <span>2</span>
        <h3>Mesto i adresa</h3>
      </div>
      <div class="userAddress">
        <div class="input-group">
          <input
            required
            type="text"
            autocomplete="off"
            class="input"
            v-model="userData.city.value"
            :class="{ invalid: userData.city.invalid }"
            @blur="userData.city.invalid = false" />
          <label class="user-label">Grad</label>
        </div>
        <div class="input-group">
          <input
            required
            type="text"
            autocomplete="off"
            class="input"
            v-model="userData.adress.value"
            :class="{ invalid: userData.adress.invalid }"
            @blur="userData.adress.invalid = false" />
          <label class="user-label">Adresa</label>
        </div>
        <div class="input-group">
          <input
            required
            type="number"
            autocomplete="off"
            class="input"
            v-model="userData.postalNumber.value"
            :class="{ invalid: userData.postalNumber.invalid }"
            @blur="userData.postalNumber.invalid = false" />
          <label class="user-label">Poštanski broj</label>
        </div>
      </div>
    </div>
    <!-- 3 -->
    <div>
      <div class="sectionNumber">
        <span>3</span>
        <h3>Metod plaćanja</h3>
      </div>

      <div class="paymentMethodWrapper">
        <div
          class="paymentMethod"
          :class="{ active: payWithCard === false }"
          @click="handlePayment(false)">
          <div class="paymentMethodSmall">
            <img
              src="https://d23xypyp2dkdqm.cloudfront.net/wp-content/uploads/2022/01/31034059/woman-hand-accepting-delivery-boxes-from-deliveryman-1-1024x683.jpg"
              alt="" />
            <span>Plaćanje pouzećem</span>
          </div>
          <i class="fa-solid fa-check"></i>
        </div>

        <div
          class="paymentMethod"
          :class="{ active: payWithCard }"
          @click="handlePayment(true)">
          <div class="paymentMethodSmall">
            <img
              src="https://cdn.britannica.com/54/237654-050-9DD5E536/Macro-image-of-all-major-credit-card-companies.jpg"
              alt="" />
            <span>Uplatom na račun</span>
          </div>
          <i class="fa-solid fa-check"></i>
        </div>
        <p v-if="!payWithCard">
          Pri preuzimanju paketa od kurira, otkup plaćate gotovinski
        </p>
        <p
          v-if="payWithCard === true"
          :class="{ warning: payWithCard === true }">
          Molimo vas sačekajte naš poziv kako bi smo Vam potvrdili dostupnost
          parfema
        </p>
      </div>
    </div>

    <div>
      <div class="sectionNumber">
        <span>4</span>
        <h3>Napomena</h3>
      </div>
      <div>
        <textarea
          name=""
          id="note message"
          cols="30"
          rows="10"
          v-model="userData.note.value"></textarea>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import emailjs from "@emailjs/browser";
import { toast } from "vue3-toastify";
const emits = defineEmits(["formData"]);

const props = defineProps({
  perfumesToOrder: Array,
  totalAmount: Number,
});

const payWithCard = ref(false);

const userData = ref({
  name: {
    value: "",
    invalid: false,
  },
  phoneNumber: {
    value: "",
    invalid: false,
  },
  email: {
    value: "",
    invalid: false,
  },
  city: {
    value: "",
    invalid: false,
  },
  adress: {
    value: "",
    invalid: false,
  },
  postalNumber: {
    value: "",
    invalid: false,
  },
  note: {
    value: "",
  },
});

function formValidation() {
  let formIsValid = true;

  Object.keys(userData.value).forEach((key) => {
    if (key === "note") return; // Skip

    const fieldValue = userData.value[key].value;
    userData.value[key].invalid = false;

    if (key === "email" && (!fieldValue || !fieldValue.includes("@"))) {
      userData.value[key].invalid = true;
      formIsValid = false;
    }

    if (!fieldValue || fieldValue.length < 5) {
      userData.value[key].invalid = true;
      formIsValid = false;
    }
  });

  return formIsValid;
}

async function submitForm() {
  const formIsValid = formValidation();

  if (!formIsValid) {
    toast.dark("Proverite sva uneta polja", {
      type: "warning",
      class: "Toastify__toast-container--top-custom",
      autoClose: 2500,
    });
    return;
  }

  const serviceID = "service_wlxp6h5";
  const templateID = "template_xu0p1nm";
  const userID = "n8SCu9ix_klWQ5LQq";

  const formattedPerfumes = props.perfumesToOrder
    .map(
      (perfume) =>
        `Brend: ${perfume.brand.toUpperCase()}, Naziv parfema: ${
          perfume.name
        }, Kolicina: ${perfume.quantity}/kom, Cena: ${
          perfume.price
        } rsd, Zapremina: ${perfume.volume}ml`
    )
    .join("\n");

  // im aware that this is not the best approach 👇

  const dataForSubmit = {
    name: userData.value.name.value,
    phoneNumber: userData.value.phoneNumber.value,
    email: userData.value.email.value,
    city: userData.value.city.value,
    adress: userData.value.adress.value,
    postalNumber: userData.value.postalNumber.value,
    note: userData.value.note.value,
    payWithCard: payWithCard.value,
    perfumesToOrder: formattedPerfumes,
    totalAmount: props.totalAmount,
  };

  await emailjs.send(serviceID, templateID, dataForSubmit, userID);

  return {
    popupTitle: "Vaša porudžbina je poslata!",
    popupMessage:
      "Naš tim će vas kontaktirati u što kraćem roku. Hvala vam na poverenju!",
  };
}

function handlePayment(value) {
  payWithCard.value = value;
}

defineExpose({
  submitForm,
});
</script>

<style scoped>
.userInfoWrapper {
  max-width: 970px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
}

.userInfoWrapper > div {
  margin-bottom: 20px;
}

.userInfo,
.userAddress {
  display: flex;
  gap: 20px;
}
.userInfo,
.infoToOrder {
  border-bottom: 1px solid #b7b7b7;
  padding-bottom: 20px;
}

.sectionNumber {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.sectionNumber span {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
  color: white;
  border-radius: 50%;
  margin-right: 10px;
  font-weight: bold;
}

h3 {
  font-size: 18px;
  color: #333;
}

/* input styles */
.input-group {
  position: relative;
}

.input {
  border: solid 1.5px #b7b7b7;
  border-radius: 10px;
  background: none;
  padding: 15px;
  font-size: 15px;
  transition: border 150ms cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
}
.invalid {
  border: 1px solid rgb(239, 76, 76);
}
.user-label,
textarea::placeholder {
  position: absolute;
  left: 15px;
  color: #b7b7b7;
  pointer-events: none;
  transform: translateY(1rem);
  transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.user-label::after {
  content: "*";
  color: rgb(239, 76, 76);
  margin-left: 5px;
}
.input:focus,
input:valid {
  outline: none;
  border: 1.5px solid #000;
}

.input:focus ~ label,
input:valid ~ label {
  transform: translateY(-50%) scale(0.8);
  background-color: #fff;
  padding: 0 0.2em;
  color: #000;
}

.input:focus ~ label::after {
  content: "";
}
/* paymentMethod */

.paymentMethodWrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
.paymentMethod {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 1px solid #b7b7b7;
  border-radius: 10px;
  padding: 5px 20px;
  transition: 0.1s all;
  cursor: pointer;
}
.paymentMethodWrapper p {
  border-radius: 10px;
  font-weight: 600;
  background: #333;
  color: #fff;
  padding: 5px;
  text-align: center;
}
.warning {
  background: rgb(239, 76, 76) !important;
}
.active {
  border: 1px solid #000;
  background: rgba(26, 124, 228, 0.1);
}
.active i {
  color: #fff;
  background: #000;
  padding: 5px;
  border-radius: 10px;
}
.paymentMethodSmall {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.paymentMethodSmall span {
  font-weight: 600;
}
.paymentMethodSmall img {
  height: 50px;
  width: 80px;
  object-fit: cover;
}

textarea {
  width: 100%;
  resize: none;
  padding: 20px;
  font-size: 17px;
}
textarea::placeholder {
  font-size: 17px;
}

@media (max-width: 768px) {
  .userInfoWrapper {
    padding: 15px;
  }

  h3 {
    font-size: 16px;
  }

  input,
  textarea {
    font-size: 12px;
  }
}

@media (max-width: 768px) {
  .userInfo,
  .userAddress {
    flex-direction: column;
  }
}
</style>
