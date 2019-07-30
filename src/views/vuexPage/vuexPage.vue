<template>
  <div>
  {{ count }}
  </div>
</template>

<script>
export default {
  name: 'vuexPage',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
  },
  computed: {
    count () {
      // main.js 引入了vuex和注册了store
      return this.$store.state.count
    }
  }
}

</script>

<style>
</style>
