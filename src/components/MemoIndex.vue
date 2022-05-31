<template>
  <div class="memo">
    <h1>Input your new note!</h1>
    <ul>
      <li v-for="memo in memos" :key="memo.id">
        <span @click="tryToEditMemo(memo.id), isTrueToEdit()">
          {{ memo.topText }}
        </span>
      </li>
      <li>
        <span @click="isTrueToAdd()">+</span>
      </li>
    </ul>
    <div v-if="whetherToAdd">
      <textarea v-model="addText"></textarea>
      <button @click="addMemo()">追加</button><br>
    </div>
    <div v-if="whetherToEdit">
      <textarea v-model="editText"></textarea>
      <button @click="editMemo()">編集</button>
      <button @click="deleteMemo()">削除</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemoIndex',
  data: function() {
    return {
      whetherToAdd: false,
      whetherToEdit: false,
      memos: [],
      addText: '',
      editId: '',
      editText: '',
    }
  },
  mounted () {
    if (localStorage.getItem('memos')) {
      this.memos = JSON.parse(localStorage.getItem('memos'))
    }
  },
  methods: {
    getMaxId () {
      if (this.memos.length !== 0) {
        const ids = this.memos.map(memo => memo.id)
        return Math.max(...ids)
      } else {
        return 0
      }
    },
    isTrueToAdd () {
      this.whetherToAdd = true
      this.whetherToEdit = false
    },
    isTrueToEdit () {
      this.whetherToAdd = false
      this.whetherToEdit = true
      this.addText = ''
    },
    saveMemo () {
      const parsed = JSON.stringify(this.memos)
      localStorage.setItem('memos', parsed)
      this.addText = ''
      this.whetherToAdd = false
      this.editText = ''
      this.whetherToEdit = false
    },
    addMemo () {
      if (this.addText !== '') {
        const newId = this.getMaxId() + 1
        this.memos.push({ text: this.addText, topText: this.addText.split('\n')[0], id: newId })
        this.saveMemo()
      } else {
        window.alert('空欄でMemo LISTへ追加はできません')
      }
    },
    tryToEditMemo (id) {
      const memo = this.memos.find((memo) => memo.id === id)
      this.editText = memo.text
      this.editId = id
    },
    deleteMemo () {
      const index = this.memos.findIndex((memo) => memo.id === this.editId)
      this.memos.splice(index,1)
      this.saveMemo()
    },
    editMemo () {
      if (this.editText !== ''){
        const memo = this.memos.find((memo) => memo.id === this.editId)
        memo.text = this.editText
        memo.topText = this.editText.split('\n')[0]
        this.saveMemo()
      } else {
        window.alert('空欄で編集はできません')
      }
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
li:hover {
  color: blue;
}
textarea {
  width: 50%;
  height: 400px;
}
</style>
