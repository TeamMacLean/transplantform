<template>
  <section>
    <b-button
      :label="getEditAccessionsLabel"
      type="is-primary"
      size="is-medium"
      @click="isComponentModalActive = true"
    />

    <b-modal v-model="isComponentModalActive">
      <ModalForm></ModalForm>
    </b-modal>
  </section>
</template>

<script>
import moment from 'moment';
const ModalForm = {
  props: [
    'canCancel',
    'type',
    'typeId',
    'initialAccessions',
    'initialReleaseDate',
  ],
  data() {
    return {};
  },
  computed: {},
  template: `
<div>HELLO</div>
  `,
  methods: {},
};

export default {
  components: {
    ModalForm,
  },
  props: [],
  data() {
    return {
      isComponentModalActive: false,
    };
  },
  computed: {},
};
</script>
<style>
.rightPadding {
  padding-right: 10px;
}
</style>
