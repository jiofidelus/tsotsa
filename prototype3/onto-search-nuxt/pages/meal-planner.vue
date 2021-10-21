<template>
  <div>
    <div class="page-content">
      <div class="form-v1-content">
        <div class="wizard-form">
          <form class="form-register" action="#" method="post">
            <div id="form-total">
              <!-- SECTION 1 -->
              <h2>
                <p class="step-icon">
                  <span>01</span>
                </p>
                <span class="step-text">Evénements</span>
              </h2>
              <section>
                <div class="inner">
                  <div class="wizard-header">
                    <h3 class="heading">
                      Evénements
                    </h3>
                    <p> Veuillez choisir votre region...  </p>
                  </div>

                  <div class="form-row">
                    <div class="form-holder form-holder-2">
                      <fieldset>
                        <legend>Région:</legend>
                        <select id="Region" name="region">
                          <option value="Genre" disabled selected>
                            Centre
                          </option>
                          <option value="M">
                            centre
                          </option>
                          <option value="m">
                            ouest
                          </option>
                          <option value="m">
                            sud
                          </option>
                          <option value="m">
                            Nord
                          </option>
                          <option value="m">
                            Sud-ouest
                          </option>
                          <option value="m">
                            Ngaoundére
                          </option>
                          <option value="m">
                            bertoua
                          </option>
                        </select>
                      </fieldset>
                    </div>
                  </div>

                  <div class="row">
                    <div class="column">
                      <div class="card">
                        <img src="data:image/jpeg;base64,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" alt="Avatar" style="width:100%">
                        <div class="container">
                          <h4><b>Mariage</b></h4>
                          <p><main>mariage</main></p>
                          <div class="form-holder-2">
                            <button type="button" class="btn btn-outline-success">
                              Détails
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="column">
                      <div class="card">
                        <img src="data:image/jpeg;base64,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" alt="Avatar" style="width:100%">
                        <div class="container">
                          <h4><b>Deuil</b></h4>
                          <p>deuil</p>
                          <div class="form-holder-2">
                            <button type="button" class="btn btn-outline-success">
                              Détails
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="column">
                      <div class="card">
                        <img src="https://www.hervecuisine.com/wp-content/uploads/2016/06/recette-gateau-anniversaire-chocolat.jpg" alt="Avatar" style="width:100%">
                        <div class="container">
                          <h4><b>Anniversaire</b></h4>
                          <p>Anniversaire</p>
                          <div class="form-holder-2">
                            <button type="button" class="btn btn-outline-success">
                              Détails
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="column">
                      <div class="card">
                        <img src="images/1.jpg" alt="Avatar" style="width:100%">
                        <div class="container">
                          <h4><b>Soutenance</b></h4>
                          <p>Soutenance</p>
                          <div class="form-holder-2">
                            <button type="button" class="btn btn-outline-success">
                              Détails
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <!-- SECTION 2 -->

              <h2>
                <p class="step-icon">
                  <span>02</span>
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
                  <span>03</span>
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
  }
}
</script>

<style lang="scss" scoped>

</style>
