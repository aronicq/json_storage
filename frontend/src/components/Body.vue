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
    <b-button
      variant="primary"
      @click="addText"
    >
      Submit
    </b-button>
    <div class="weight"> {{ this.commonWeight }} bytes </div>
    <div v-for="(file, key) in files" class="file-listing" :key="key" >
<!--      <img class="filename" v-bind:ref="'filename'+parseInt( key )"-->
<!--      />-->
      {{ file.name }}
      <button type="button" class="close" aria-label="Close" @click="deleteFile( file, key )">
        <span aria-hidden="true">×</span>
      </button>
    </div>
    <br>
<!--    <p>{{currJson}}</p>-->
  </div>
</template>

<script>

export default {
  data () {
    return {
      lastFile: Object,
      files: [],
      textStatus: '',
      commonWeight: 0
    }
  },
  props: {
    currJson: String
  },
  mounted () {
    this.requestFiles()
  },
  methods: {
    countCommonWeight () {
      let sum = 0
      this.files.forEach(file => {
        sum += file.data.length
      })
      this.commonWeight = sum
    },
    requestFiles () {
      fetch('http://localhost:8000/json_storage/get/all/', {method: 'GET'})
        .then(response => response.json())
        .then(data => new Promise(function (resolve, reject) {
          let result = []
          console.log(data)
          for (let i = 0; i < data.length; i++) {
            let currentRow = data[i]
            result.push(
              {
                name: currentRow.fields.name + '(created: ' + currentRow.fields.date_of_creation + ')',
                id: currentRow.pk,
                data: currentRow.fields.json_content
              }
            )
          }
          resolve(result)
        }))
        .then(result => {
          this.files = result
          this.countCommonWeight()
        })
    },
    deleteFile (file, key) {
      this.files.splice(key, 1) // not very consistant, should be requestfiles and autorender?
      fetch('http://localhost:8000/json_storage/delete/' + file.id)
      this.countCommonWeight()
    },
    emptyTextStatus () {
      this.textStatus = ' '
    },
    getCookie (name) {
      let cookieValue = null
      // console.log('cookieValue')
      if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';')
        // console.log('cookies: ' + cookies)
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim()
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
            break
          }
        }
      }
      return cookieValue
    },
    dataToBackend (data) {
      var tosend = new FormData()
      // console.log(data.name)
      // console.log(data)
      var csrftoken = this.getCookie('csrftoken')
      var headers = new Headers()
      headers.append('x-CSRFtoken', csrftoken)
      tosend.append('json', data.json)
      tosend.append('name', data.name)
      fetch('http://localhost:8000/json_storage/add/', {
        method: 'POST',
        headers: headers,
        body: tosend
      })
        .then(res => {
          console.log('file added')
          this.files.length = 0
          this.requestFiles()
        })
    },
    addText () {
      if (this.isJson('t')) {
        console.log(this.currJson)
        this.dataToBackend({
          'json': this.currJson,
          'name': ''
        })
      } else this.textStatus = 'string is not json'
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
        state = res[0]
        // console.log('then block ' + res[0] + ' ' + res[1])
        if (!state) {
          this.textStatus = 'file is not json'
          // console.log('file is not json')
          // console.log(this.lastFile[0] + this.isJson('f'))
        } else {
          // console.log('file is json')
          this.files.push(...droppedFile)
          // console.log(this.lastFile)
          // console.log()
          this.dataToBackend({
            'json': res[1],
            'name': this.lastFile[0].name
          })
          // this.getImagePreviews()
        }
      })
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
    setFile (json, name) {
      this.lastFile = {
        'json': json,
        'name': name
      }
    },
    isJson (key) {
      var data = ''
      if (key === 'f') {
        return new Promise((resolve) => {
          let reader = new FileReader()
          reader.onload = function (e) {
            data = reader.result
            try {
              // console.log('try ' + data)
              JSON.parse(data)
            } catch (e) {
              resolve([false, reader.result])
            }
            resolve([true, reader.result])
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

div.weight {
  margin: auto;
  width: 200px;
}

div.file-listing{
  width: 400px;
  margin: auto;
  padding: 10px;
  border-bottom: 1px solid #ddd;
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
