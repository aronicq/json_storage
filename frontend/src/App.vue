<template>
  <div id="app">
    <Header />
    <p>{{currJson}}</p>
    <Body
      v-bind:currJson="currJson"
    @updateJson="updateJson"/>
  </div>
</template>

<script>
import Header from './components/Header'
import Body from './components/Body'

export default {
  name: 'app',
  components: {
    Header,
    Body
  },
  data () {
    return {
      currJson: ''
    }
  },
  methods: {
    updateJson (jsonData) {
      this.currJson = jsonData
    }
  }
}
</script>
