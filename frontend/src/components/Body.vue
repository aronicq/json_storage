<template>
  <div>
    <textarea ref="jsonInputArea"
              @input.prevent="changeJson"
              @drop.prevent="addFile"
              @focusout="inputJsonVerifier"
              @focusin="resetClass"
              cols="70" placeholder="type or paste your JSON data" rows="20">
    </textarea>
    <br>
    <div v-for="(file, key) in files" class="file-listing" :key="key">
      <img class="filename" v-bind:ref="'filename'+parseInt( key )"
      />
      {{ file.name }}>
    </div>
    <br>
    <b-button
      variant="primary"
      @click="isJson"
    >
      Submit
    </b-button>
<!--    <p>{{currJson}}</p>-->
  </div>
</template>

<script>

export default {
  data () {
    return {
      lastFile: Object,
      files: []
      // thisjson: this.currJson
    }
  },
  props: {
    currJson: String
    // updateJson: Function
  },
  methods: {
    dataToBackend (data) {
      fetch('/add')
    },
    addFile (e) {
      let droppedFile = e.dataTransfer.files
      if (!droppedFile) return
      // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
      // ([...]).forEach(f => {
      this.lastFile = droppedFile
      if (!this.isJson('f')) {
        console.log('file is not json')
      } else {
        console.log('file is json')
        this.files.push(...droppedFile)
        console.log(this.lastFile[0])
        this.getImagePreviews()
      }
    },
    getImagePreviews () {
      for (let i = 0; i < this.files.length; i++) {
        let reader = new FileReader()
        reader.addEventListener('load', function () {
          this.$refs['filename' + parseInt(i)][0].src = reader.result
        }.bind(this), false)
        reader.readAsDataURL(this.files[i])
      }
    },
    changeJson (e) {
      // console.log(e.target.value)
      // let newJson = e.target.value
      this.$emit('updateJson', e.target.value)
    },
    fileJsonVerifier () {
      if (this.isJson('f')) {

      }
    },
    inputJsonVerifier () {
      if (this.isJson('t')) {
        this.$refs['jsonInputArea'].classList.add('right')
      } else {
        this.$refs['jsonInputArea'].classList.add('wrong')
      }
    },
    resetClass () {
      this.$refs['jsonInputArea'].classList.remove('wrong')
      this.$refs['jsonInputArea'].classList.remove('right')
    },
    async isJson (key) {
      var data = '}{'
      if (key === 'f') {
        let reader = new FileReader()
        reader.onload = await function (e) {
          data = reader.result
        }
        reader.readAsDataURL(this.lastFile[0])
      } else if (key === 't') {
        data = this.currJson
      }
      try {
        JSON.parse(data)
      } catch (e) {
        return false
      }
      return true
    }
  }
}

</script>

<style>

div.file-listing{
  width: 400px;
  margin: auto;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
div.file-listing img{
  height: 100px;
}

.jsonInputArea {
  resize: none;
}

.wrong {
  border-width: thin;
  animation: wrongJson 2s 1;
}

.right {
  border-width: thin;
  animation: rightJson 2s 1;
}
@keyframes wrongJson
{
    0%      {border-color:lightgrey;}
    25%     {border-color:red;}
    75%     {border-color:red;}
    100%    {border-color:lightgrey;}
}
@keyframes rightJson
{
    0%      {border-color:lightgrey;}
    25%     {border-color:lightgreen;}
    75%     {border-color:lightgreen;}
    100%    {border-color:lightgrey;}
}
</style>
