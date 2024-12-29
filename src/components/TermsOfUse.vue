<template>
  <section
    class="termsSection"
    @click="closeTerms">
    <Transition name="fadeIn">
      <div
        v-if="termsVisible"
        class="terms"
        @click.stop>
        <div class="termsTitle">
          <h3>Uslovi Korišćenja</h3>
        </div>
        <div class="termsContent">
          <p>
            Dobrodošli na naš sajt! Korišćenjem naših usluga saglasni ste sa
            sledećim uslovima korišćenja:
          </p>
          <h4>Slike Proizvoda</h4>
          <p>
            Molimo vas da imate u vidu da su slike proizvoda prikazane na našem
            sajtu ilustrativnog karaktera i mogu se razlikovati od stvarnog
            izgleda proizvoda. Razlike mogu nastati zbog ažuriranja pakovanja od
            strane proizvođača ili različitih uslova osvetljenja tokom
            fotografisanja.
          </p>
          <h4>Politika Porudžbina</h4>
          <p>
            Sve porudžbine zavise od dostupnosti proizvoda. Zadržavamo pravo da
            otkažemo bilo koju porudžbinu u slučaju da proizvod nije na zalihama
            ili ukoliko postoji greška u opisu proizvoda.
          </p>
          <h4>Odricanje Odgovornosti</h4>
          <p>
            Trudimo se da informacije na sajtu budu tačne, ali ne možemo
            garantovati da su svi opisi, cene i ostali sadržaji bez grešaka. U
            slučaju greške, zadržavamo pravo da je ispravimo bez prethodne
            najave.
          </p>
          <h4>Ponašanje Korisnika</h4>
          <p>
            Slažete se da ćete naš sajt koristiti na zakonit način i da se
            nećete baviti aktivnostima koje bi mogle štetiti našim uslugama,
            ugledu ili drugim korisnicima.
          </p>
          <h4>Povrat i Reklamacije</h4>
          <p>
            U slučaju da niste zadovoljni proizvodom, molimo vas da nas
            kontaktirate u roku od 14 dana od prijema proizvoda kako bismo
            dogovorili zamenu ili povrat novca. Proizvodi moraju biti u
            originalnom pakovanju i nekorišćeni.
          </p>
          <h4>Zaštita Podataka</h4>
          <p>
            Vaša privatnost je od najveće važnosti za nas. Svi podaci koje
            pružite biće tretirani u skladu sa našom Politikom Privatnosti i
            neće biti deljeni sa trećim stranama bez vaše saglasnosti.
          </p>
          <h4>Intelektualna Svojina</h4>
          <p>
            Svi sadržaji na ovom sajtu, uključujući slike, tekstove i logotipe,
            vlasništvo su našeg preduzeća i zaštićeni su autorskim pravima.
            Zabranjeno je kopiranje, reprodukovanje ili distribucija sadržaja
            bez naše saglasnosti.
          </p>
          <h4>Prava i Obaveze</h4>
          <p>
            Zadržavamo pravo da obustavimo pristup sajtu korisnicima koji
            prekrše ove uslove korišćenja ili zloupotrebe naše usluge.
          </p>
          <h4>Izmene Uslova</h4>
          <p>
            Zadržavamo pravo da u bilo kom trenutku izmenimo ove uslove
            korišćenja. Sve izmene stupaju na snagu odmah nakon objavljivanja na
            ovoj stranici. Nastavkom korišćenja našeg sajta prihvatate sve
            izmene ovih uslova.
          </p>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
const emits = defineEmits(["close-terms"]);
const termsVisible = ref(null);

function closeTerms() {
  termsVisible.value = false;
  setTimeout(() => {
    emits("close-terms");
  }, 300);
}

onMounted(() => {
  setTimeout(() => {
    termsVisible.value = true;
  }, 300);
});
</script>

<style scoped>
.termsSection {
  min-height: 100svh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 200;
  background: rgba(0, 0, 0, 0.4);
}
.terms {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-height: 700px;
  overflow-y: scroll;
}

.termsTitle h3 {
  font-size: 1.8rem;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.termsContent {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
}

.termsContent h4 {
  margin-top: 20px;
  font-size: 1.2rem;
  color: #444;
}

.termsContent p {
  margin: 10px 0;
}

.fadeIn-enter-from,
.fadeIn-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: all 0.5s;
}
.fadeIn-enter-to,
.fadeIn-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
