<template>
  <div v-bind:class="{ 'is-select-mode': selectMode }">
    <table class="table is-bordered is-fullwidth">
      <thead>
      <tr>
        <th class="has-text-centered">1</th>
        <th class="has-text-centered">2</th>
        <th class="has-text-centered">3</th>
        <th class="has-text-centered">4</th>
        <th class="has-text-centered">5</th>
        <th class="has-text-centered">6</th>
        <th class="has-text-centered">7</th>
        <th class="has-text-centered">8</th>
        <th class="has-text-centered">9</th>
        <th class="has-text-centered">10</th>
        <th class="has-text-centered">11</th>
        <th class="has-text-centered">12</th>
      </tr>
      </thead>
      <tbody>
      <tr>

        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.a1"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.a2"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.a3"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.a4"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.a5"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.a6"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.a7"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.a8"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.a9"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.a10"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.a11"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.a12"/>
      </tr>
      <tr>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.b1"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.b2"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.b3"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.b4"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.b5"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.b6"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.b7"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.b8"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.b9"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.b10"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.b11"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.b12"/>
      </tr>
      <tr>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.c1"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.c2"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.c3"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.c4"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.c5"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.c6"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.c7"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.c8"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.c9"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.c10"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.c11"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.c12"/>
      </tr>
      <tr>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.d1"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.d2"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.d3"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.d4"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.d5"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.d6"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.d7"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.d8"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.d9"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.d10"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.d11"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.d12"/>
      </tr>
      <tr>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.e1"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.e2"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.e3"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.e4"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.e5"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.e6"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.e7"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.e8"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.e9"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.e10"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.e11"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.e12"/>
      </tr>
      <tr>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.f1"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.f2"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.f3"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.f4"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.f5"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.f6"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.f7"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.f8"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.f9"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.f10"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.f11"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.f12"/>
      </tr>
      <tr>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.g1"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.g2"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.g3"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.g4"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.g5"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.g6"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.g7"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.g8"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.g9"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.g10"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.g11"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.g12"/>
      </tr>
      <tr>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.h1"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.h2"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.h3"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.h4"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.h5"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.h6"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.h7"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.h8"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.h9"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.h10"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.h11"/>
        <PlateCell :onPress="onPress" :onLongPress="onLongPress" :edit="edit" :item="plate.h12"/>
      </tr>
      </tbody>
    </table>
    <button v-bind:class="[edit?'is-success':'is-info', 'button']" v-on:click="toggeleEdit">
      {{saving?'saving':edit?'Save':'Edit'}}
    </button>
  </div>
</template>

<script>
  import PlateCell from '../components/PlateCell';

  export default {
    props: ['plate', 'save'],
    data() {
      return {
        saving: false,
        edit: false,
        selectMode: false,
      }
    },
    methods: {
      toggeleEdit: function () {

        if (this.edit) {
          //save
          this.saving = true;
          this.save()
            .then(() => {
              console.log('done');
              this.edit = false;
              this.saving = false;
            })
            .catch(err => {
              console.error(err);
            })
        } else {
          this.edit = true;
        }

      },

      onLongPress() {
        if (!this.selectMode) {
          this.selectMode = true;
        } else {
          //...
        }
      },
      onPress(item) {
        if (this.selectMode) {
          //mark cell
          // console.log(pos);

          if (item) {
            // this.$set(item, 'selected', true);
            if(item.selected){
              this.$set(item, 'selected', false);
            } else {
              this.$set(item, 'selected', true);
            }
          }
        }
      }


    },
    components: {
      PlateCell
    },
  }

</script>

<style>
  .is-select-mode {
    border: 2px solid #3676D9;
  }
</style>
