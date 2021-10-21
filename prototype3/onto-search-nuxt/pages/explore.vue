<template>
  <div class='container h-full mx-auto'>
    <div class="bloc_principal">
      <div class="path_left">
        <div class="head">
          Classes
        </div>
        <div class="corps">
          <ul id="main" />
        </div>
      </div>
      <div class="path_right">
        <div class="bloc1">
          <div class="head">
            Graphe
          </div>
          <div class="corps">
            <ul class="base">
              <li id="base" />
            </ul>
          </div>
        </div>
        <div class="bloc2">
          <div class="head">
            Description
          </div>
          <div class="corps">
            <table>
              <tr class="line">
                <td>
                  SubClass Of
                </td>
                <td id="subclass" />
              </tr>
              <tr>
                <td>
                  Instances
                </td>
                <td id="instance" />
              </tr>
              <tr class="line">
                <td>Equivalent to</td>
                <td />
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <script src="js/jquery.min.js" />
    <script src="js/explore.js" />
  </div>
</template>

<script>
export default {
  head () {
    return {
      link: [
        { href: 'css/explore.css', rel: 'stylesheet' }
      ],
      script: [
        {
          src: 'js/jquery.min.js',
          body: true
        },
        {
          src: 'js/explore.js',
          body: true
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
