<template>
  <div>
    <textarea ref="jsonInputArea"
              @input.prevent="changeJson"
              @drop.prevent="addFile"
              @focusout="inputJsonVerifier"
              @focusin="resetClass"
              cols="70" placeholder="type or paste your JSON data" rows="20" style="text-align: center; resize: none;">
    </textarea>
    <br>
    <div v-on:click="emptyTextStatus"> {{this.textStatus}} </div>
    <div v-for="(file, key) in files" class="file-listing" :key="key">
      <img class="filename" v-bind:ref="'filename'+parseInt( key )"
      />
      {{ file.name }}>
    </div>
    <br>
    <b-button
      variant="primary"
      @click="addText"
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
      files: [],
      textStatus: '123'
      // thisjson: this.currJson
    }
  },
  props: {
    currJson: String
    // updateJson: Function
  },
  methods: {
    emptyTextStatus () {
      this.textStatus = ' '
    },
    dataToBackend (data) {
      var tosend = new FormData()
      console.log(data.name)
      tosend.append('json', data)
      fetch('http://localhost:8000/json_storage/add/', {
        method: 'POST',
        body: tosend
      })
        .then(res => {
          console.log('response =' + res)
        })
    },
    addText () {
      this.isJson('t')
        .then(value => {
          if (value) {
            console.log(this.currJson)
            this.dataToBackend(this.currJson)
          }
        })
    },
    addFile (e) {
      let droppedFile = e.dataTransfer.files
      if (!droppedFile) return
      // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
      // ([...]).forEach(f => {
      this.lastFile = droppedFile
      var state = null

      var temp = this.isJson('f')
      temp.then(res => {
        state = res
        console.log('then block ' + res + state)
        if (!state) {
          this.textStatus = 'file is not json'
          console.log('file is not json')
          // console.log(this.lastFile[0] + this.isJson('f'))
        } else {
          console.log('file is json')
          this.files.push(...droppedFile)
          console.log(this.lastFile[0])
          console.log(this.lastFile[0].name)
          this.dataToBackend(this.lastFile[0])
          this.getImagePreviews()
        }
      })
      //
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
    inputJsonVerifier () {
      // console.log(this.isJson('t'))
      if (this.isJson('t')) {
        this.$refs['jsonInputArea'].classList.add('right')
        // console.log('right')
      } else {
        this.$refs['jsonInputArea'].classList.add('wrong')
        // console.log('wrong')
      }
    },
    resetClass () {
      this.$refs['jsonInputArea'].classList.remove('wrong')
      this.$refs['jsonInputArea'].classList.remove('right')
    },
    isJson (key) {
      var data = ''
      if (key === 'f') {
        return new Promise((resolve) => {
          let reader = new FileReader()
          reader.onload = function (e) {
            data = reader.result
            try {
              console.log('try ' + data)
              JSON.parse(data)
            } catch (e) {
              resolve(false)
            }
            resolve(true)
          }
          reader.readAsText(this.lastFile[0])
        })
      } else if (key === 't') {
        data = this.currJson
        try {
          JSON.parse(data)
        } catch (e) {
          return false
        }
        return true
      }
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
