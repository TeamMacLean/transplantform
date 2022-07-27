<template>
  <div>
    <h1 class="title is-2">TRF Form #{{this.trfId}}</h1>

  </div>
</template>

<script>
  export default {
    middleware: 'auth',    

    asyncData({ route, $axios, error }) {
      if (!route.query.id) {
        error({ statusCode: 404, message: "TRF form not found" });
        this.$buefy.toast.open({
          message: 'No TRF form ID provided in URL. If further assistance required, then please contact system admin.',
          type: "is-danger",
        });
      }

      return {
        trfId: route.query.id,
      }

      // return $axios
      //   .get("/form", { params: { id: route.query.id } })
      //   .then((res) => {
      //     if (res.status === 200 && res.data.trfForm) {
      //       const trfForm = res.data.trfForm;
      //       return {
      //         ...trfForm, // TODO remove
      //         trfId: trfForm.id,
      //       };
      //     } else {
      //       error({ statusCode: 501, message: "TRF form not found" });
      //       this.$buefy.toast.open({
      //         message: 'Unexpected error. Please contact system admin.',
      //         type: "is-danger",
      //       });
      //     }
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //     error({ statusCode: 501, message: "TRF form not found" });
      //     this.$buefy.toast.open({
      //       message: 'Unexpected error. Please contact system admin.',
      //       type: "is-danger",
      //     });
      //   });
    },
  }
</script>

<style scoped>



</style>
