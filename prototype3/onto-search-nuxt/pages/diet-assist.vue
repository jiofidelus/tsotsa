<template>
  <div>
    <div class="page-content">
      <div class="form-v1-content">
        <div class="wizard-form">
          <form class="form-register" action="#" method="post">
            <div id="form-total">
              <!-- SECTION 1 -->
              <h2 class="flex items-center">
                <p class="step-icon">
                  <span>01</span>
                </p>
                <span class="step-text">Infomations Basiques</span>
              </h2>
              <section>
                <div class="inner">
                  <div class="wizard-header">
                    <h3 class="heading">
                      Infomations Basiques
                    </h3>
                    <p> Veuillez remplir toutes ces informations...  </p>
                  </div>

                  <div class="form-row">
                    <div class="form-holder form-holder-2">
                      <fieldset>
                        <legend>Nom </legend>
                        <input id="nom" type="text" name="nom" class="form-control" required>
                      </fieldset>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-holder form-holder-2">
                      <fieldset>
                        <legend>Numéro</legend>
                        <input
                          id="numero"
                          type="text"
                          class="form-control"
                          name="numero"
                          placeholder="+237"
                          required
                        >
                      </fieldset>
                    </div>
                  </div>

                  <div class="form-row form-row-date">
                    <div class="form-holder form-holder-2">
                      <select id="Genre" name="Genre">
                        <option value="Genre" disabled selected>
                          Genre
                        </option>
                        <option value="M">
                          M
                        </option>
                        <option value="F">
                          F
                        </option>
                      </select>
                      <select id="age" name="age">
                        <option value="Genre" disabled selected>
                          Age
                        </option>
                        <option value="M">
                          Moins de 20 ans
                        </option>
                        <option value="m">
                          moins de 30
                        </option>
                        <option value="m">
                          moins de 50
                        </option>
                        <option value="m">
                          Plus de 50
                        </option>
                      </select>

                      <div class="form-holder">
                        <fieldset>
                          <legend>Hauteur</legend>
                          <input id="Hauteur" type="number" name="Hauteur" class="form-control" required>
                        </fieldset>
                      </div>
                      <div class="form-holder">
                        <fieldset>
                          <legend>Poids en Kg</legend>
                          <input id="poids" type="number" name="poids" class="form-control" required>
                        </fieldset>
                      </div>
                    </div>
                  </div>

                  <p>Information sur la maladie:</p>

                  <div class="form-row">
                    <div class="form-holder">
                      <select id="Maladie" name="Maladie">
                        <option value="Genre" disabled selected>
                          Maladie:
                        </option>
                        <option v-for="instance in maladies" :key="instance.instance" :value="instance.instance">
                          {{ instance.label }}
                        </option>
                      </select>
                    </div>
                    <div class="form-holder">
                      <select id="durée" name="durée">
                        <option value="Genre" disabled selected>
                          Durée de maladie:
                        </option>
                        <option value="m">
                          moins de 1 ans
                        </option>
                        <option value="m">
                          moins de 2 ans
                        </option>
                        <option value="m">
                          plus de 2 ans
                        </option>
                      </select>
                    </div>
                    <div class="form-holder">
                      <select id="Actif" name="Actif">
                        <option value="Genre" disabled selected>
                          Niveau activité:
                        </option>
                        <option value="l">
                          Légerement actif
                        </option>
                        <option value="M">
                          Modérament actif
                        </option>
                        <option value="a">
                          Actif
                        </option>
                        <option value="e">
                          Extrémement actif
                        </option>
                      </select>
                    </div>
                  </div>

                  <p>Types de régime:</p>
                  <div class="form-row">
                    <div class="form-holder">
                      <select v-if="regimes" id="Actif" name="Actif">
                        <option v-for="instance in regimes" :key="instance.instance" :value="instance.instance">
                          {{ instance.label }}
                        </option>
                      </select>
                    </div>
                    <div class="form-holder">
                      <select v-if="repas" id="Actif" name="Actif">
                        <option value="r" disabled selected>
                          Repas journaliers:
                        </option>
                        <option v-for="instance in repas" :key="instance.instance" :value="instance.instance">
                          {{ instance.label }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </section>
              <!-- SECTION 2 -->
              <h2>
                <p class="step-icon">
                  <span>02</span>
                </p>
                <span class="step-text">Infomations Avancées</span>
              </h2>
              <section>
                <div class="inner">
                  <div class="wizard-header">
                    <h3 class="heading">
                      Infomations Avancées
                    </h3>
                    <p>Completer les inforamtions sur vous ...</p>
                  </div>

                  <div class="form-row">
                    <div class="form-holder">
                      <fieldset>
                        <legend>Apport calorifique:</legend>
                        <input id="apport" type="number" name="apport" class="form-control" required>
                      </fieldset>
                    </div>
                  </div>
                  <p>Allegies</p>

                  <div class="form-row-total">
                    <div class="form-row">
                      {{ aliments }}
                      <div v-for="instance of aliments" :key="instance.instance" class="form-holder">
                        <button type="button" class="mb-2 btn btn-outline-success btn-sm">
                          {{ instance }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <h2>
                <p class="step-icon">
                  <span>03</span>
                </p>
                <span class="step-text">Repas Dédiés</span>
              </h2>
              <section>
                <div class="inner">
                  <div class="wizard-header">
                    <h3 class="heading">
                      Repas Dédiés
                    </h3>
                    <p>choisiez l'un des repas suivant pour obtenir la recette de cuisine;apport calorique et sa composition.</p>
                  </div>

                  <div class="form-row">
                    <div class="form-holder form-holder-1">
                      <input
                        id="find_bank"
                        type="text"
                        name="find_bank"
                        placeholder="rechercher un repas"
                        class="form-control"
                        required
                      >
                    </div>
                  </div>
                  <div class="form-row-total">
                    <div class="form-row">
                      <div class="form-holder form-holder-2 form-holder-3">
                        <input
                          id="bank-1"
                          type="radio"
                          class="radio"
                          name="bank-1"
                          value="bank-1"
                          checked
                        >
                        <label class="bank-images label-above bank-1-label" for="bank-1">
                          <img src="images/1.jpg" alt="bank-1">
                        </label>
                        <input id="bank-2" type="radio" class="radio" name="bank-2" value="bank-2">
                        <label class="bank-images label-above bank-2-label" for="bank-2">
                          <img src="images/9.jpeg" alt="bank-2">
                        </label>
                        <input id="bank-3" type="radio" class="radio" name="bank-3" value="bank-3">
                        <label class="bank-images label-above bank-3-label" for="bank-3">
                          <img src="images/2.jpg" alt="bank-3">
                        </label>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-holder form-holder-2 form-holder-3">
                        <input
                          id="bank-1"
                          type="radio"
                          class="radio"
                          name="bank-1"
                          value="bank-1"
                          checked
                        >
                        <label class="bank-images label-above bank-1-label" for="bank-1">
                          <img src="images/3.jpeg" alt="bank-1">
                        </label>
                        <input id="bank-2" type="radio" class="radio" name="bank-2" value="bank-2">
                        <label class="bank-images label-above bank-2-label" for="bank-2">
                          <img src="images/4.jpg" alt="bank-2">
                        </label>
                        <input id="bank-3" type="radio" class="radio" name="bank-3" value="bank-3">
                        <label class="bank-images label-above bank-3-label" for="bank-3">
                          <img src="images/5.jpeg" alt="bank-3">
                        </label>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-holder form-holder-2 form-holder-3">
                        <input id="bank-4" type="radio" class="radio" name="bank-4" value="bank-4">
                        <label class="bank-images bank-4-label" for="bank-4">
                          <img src="images/6.jpg" alt="bank-4">
                        </label>
                        <input id="bank-5" type="radio" class="radio" name="bank-5" value="bank-5">
                        <label class="bank-images bank-5-label" for="bank-5">
                          <img src="images/7.jpg" alt="bank-5">
                        </label>
                        <input id="bank-6" type="radio" class="radio" name="bank-6" value="bank-6">
                        <label class="bank-images bank-6-label" for="bank-6">
                          <img src="images/8.jpg" alt="bank-6">
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <!-- SECTION 3 -->
              <h2>
                <p class="step-icon">
                  <span>04</span>
                </p>
                <span class="step-text">Informations sur le repas</span>
              </h2>
              <section>
                <div class="inner">
                  <div class="wizard-header">
                    <h3 class="heading">
                      Informations sur le repas
                    </h3>
                  </div>
                  <div class="form-row">
                    <div class="form-holder form-holder-2">
                      <div class="plan-total">
                        <span class="plan-title">Apport Calorifique:</span>
                        <p class="plan-text">
                          Pellentesque nec nam aliquam sem et volutpat consequat mauris nunc congue nisi.
                        </p>
                      </div>

                      <div class="plan-total">
                        <span class="plan-title">Composition de la norriture:</span>
                        <p class="plan-text">
                          Pellentesque nec nam aliquam sem et volutpat consequat mauris nunc congue nisi.
                        </p>
                      </div>

                      <div class="plan-total">
                        <span class="plan-title">Recette:</span>
                        <p class="plan-text">
                          Pellentesque nec nam aliquam sem et volutpat consequat mauris nunc congue nisi.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      regimes: [],
      maladies: [],
      repas: [],
      aliments: [],
      plats: undefined
    }
  },
  head () {
    return {
      link: [
        { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css', integrity: 'sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T', crossorigin: 'anonymous' },
        { rel: 'stylesheet', href: 'fonts/material-design-iconic-font/css/material-design-iconic-font.min.css' },
        { rel: 'stylesheet', href: 'css/opensans-font.css' },
        { rel: 'stylesheet', href: 'css/style.css' }

      ],
      script: [
        {
          src: 'js/jquery-3.3.1.min.js',
          body: true
        },
        {
          src: 'js/jquery.steps.js',
          body: true
        },
        {
          src: 'js/main.js',
          body: true
        }
      ]
    }
  },

  async mounted () {
    this.regimes = await this.$axios.$get('/instances', { params: { class: 'http://www.semanticweb.org/hiro/ontologies/2021/4/untitled-ontology-17#Regime' } })
    this.repas = await this.$axios.$get('/instances', { params: { class: 'http://www.semanticweb.org/hiro/ontologies/2021/4/untitled-ontology-17#Meal' } })
    this.maladies = await this.$axios.$get('/instances', { params: { class: 'http://www.semanticweb.org/hiro/ontologies/2021/4/untitled-ontology-17#Maladie' } })
    this.aliments = await this.$axios.$get('/instances', { params: { class: 'http://www.semanticweb.org/hiro/ontologies/2021/4/untitled-ontology-17#FoodSource' } })
    console.log(this.regimes)
  },

  methods: {

  }
}

</script>

<style lang="scss" scoped>

</style>
