<template>
  <div class="memo">
    <h1>Input your new note!</h1>
    <button @click="allDelete()"> localstrage削除</button>
    <ul>
      <li v-for="memo in topTodos" :key="memo.id">
        <span @click="tryToEditTodo(memo.id), isTrueToEdit()">
          {{ memo.text }} : {{ memo.id }}
        </span>
      </li>
      <li>
        <span @click="isTrueToAdd()">+</span>
      </li>
    </ul>
    <div v-if="whetherToAdd">
      <textarea v-model="addText"></textarea>
      <button @click="addTodo()">追加</button><br>
    </div>
    <div v-if="whetherToEdit">
      <textarea v-model="editText"></textarea>
      <button @click="editTodo()">編集</button>
      <button @click="deleteTodo()">削除</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemoIndex',
  data: function() {
    return{
      whetherToAdd: false,
      whetherToEdit: false,
      todos: [],
      topTodos: [],
      addText: '',
      editId: '',
      editText: '',
      deleteMemo: ''
    }
  },
  mounted() {
    if (localStorage.getItem('memos')) {
      this.todos = JSON.parse(localStorage.getItem('memos'))
    }
    for (let i = 0; i < this.todos.length; i++) {
      this.topTodos.push({ text:this.todos[i].text.split('\n')[0], id:this.todos[i].id})
    }
    console.log(this.todos)
    console.log(this.topTodos)
  },
  methods: {
    getMaxId () {
      if (this.todos.length !== 0) {
        const ids = this.todos.map(item => item.id)
        return Math.max(...ids)
      } else {
        return 0
      }
    },
    isTrueToAdd () {
      this.whetherToAdd = true
      this.whetherToEdit = false
      this.editItem = ''
      this.editIndex = ''
    },
    isTrueToEdit () {
      this.whetherToAdd = false
      this.whetherToEdit = true
      this.addText = ''
    },
    addTodo () {
      if (this.addText !== '') {
        const newId = this.getMaxId() + 1
        this.todos.push({ text: this.addText, id: newId })
        this.topTodos.push({ text: this.addText.split('\n')[0], id: newId })
        this.addText = ''
        this.saveTodo()
      } else {
        window.alert('空欄でTODO LISTへ追加はできません')
      }
    },
    saveTodo() {
      const parsed = JSON.stringify(this.todos);
      localStorage.setItem('memos', parsed);
    },
    deleteTodo() {
      const index = this.todos.findIndex((memo) => memo.id === this.deleteMemo.id)
      this.todos.splice(index,1)
      this.topTodos.splice(index,1)
      this.editText = ''
      this.deleteMemo = ''
      this.whetherToEdit = false
      this.saveTodo()
    },
    tryToEditTodo (id) {
      const memo = this.todos.find((memo) => memo.id === id)
      this.editText = memo.text
      this.editId = id
      this.deleteMemo = {
        text: this.editText,
        id: this.editId
      }
    },
    editTodo() {
      if (this.editItem !== ''){
        const todo = this.todos.find((memo) => memo.id === this.deleteMemo.id)
        todo.text = this.editText
        const topTodo = this.topTodos.find((memo) => memo.id === this.deleteMemo.id)
        topTodo.text = this.editText.split('\n')[0]
        this.editText = ''
        this.deleteMemo = ''
        this.whetherToEdit = false
        this.saveTodo()
      } else {
        window.alert('空欄で編集はできません')
      }
    },
    allDelete() {
      this.todos = []
      this.topTodos = []
      this.saveTodo()
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
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
a {
  color: #42b983;
  margin: 0 10px;
}
textarea {
  width: 50%;
  height: 400px;
}
</style>
