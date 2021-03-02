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
      return $axios.get('/api/masterPlate/' + params.id)
        .then((res) => {

          if (res.data.master) {
            redirect(`/masters/${res.data.master._id}`)
          } else {

            const error = res.data.error || 'Master Plate not found. Please try navigating again from main menu.';
            return {error}
          }

        })
        .catch(err => {
          return {error: 'Could not find Master Plate ' + params.id, err}
        })
    },
  }
</script>
