<template>
  <div>
    <div v-if="!error">Redirecting...</div>
    <div v-if="error">{{error}}</div>
  </div>
</template>

<script>
  export default {
    middleware: 'auth',
    asyncData({$axios, store, params, redirect}) {
      return $axios.get('/api/plate/' + params.id)
        .then((res) => {

          if (res.data.stock) {
            redirect(`/stocks/${res.data.stock._id}`)
          } else if (res.data.master) {

            redirect(`/masters/${res.data.master._id}`)
          } else {

            const error = res.data.error || 'Plate not found';
            return {error}
          }

        })
        .catch(err => {
          return {error: 'Could not find plate ' + params.id}
        })
    },
  }
</script>
