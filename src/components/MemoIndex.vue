<template>
  <div class="memo">
    <h1>Input your new note!</h1>
    <ul>
      <li v-for="(item, index) in topTodos" :key="index">
        <span @click="tryToEditTodo(index),isTrueToEdit()">
          {{ item }}
        </span>
      </li>
      <li>
        <span @click="isTrueToAdd()">+</span>
      </li>
    </ul>
    <div v-if="whetherToAdd">
      <textarea v-model="addItem"></textarea>
      <button @click="addTodo()">追加</button><br>
    </div>
    <div v-if="whetherToEdit">
      <textarea v-model="editItem"></textarea>
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
      addItem: '',
      editItem: '',
      editIndex: '',
    }
  },
  mounted() {
    if (localStorage.getItem('memos')) {
      this.todos = JSON.parse(localStorage.getItem('memos'))
    }
    for (let i = 0; i < this.todos.length; i++) {
      this.topTodos[i] = this.todos[i].split('\n')[0]
    }
  },
  methods: {
    isTrueToAdd() {
      this.whetherToAdd = true
      this.whetherToEdit = false
      this.editItem = ''
      this.editIndex = ''
    },
    isTrueToEdit() {
      this.whetherToAdd = false
      this.whetherToEdit = true
      this.addItem = ''
    },
    addTodo() {
      if (this.addItem !== '') {
        this.todos.push(this.addItem)
        this.topTodos.push(this.addItem.split('\n')[0])
        this.addItem = ''
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
      this.todos.splice(this.editIndex,1)
      this.topTodos.splice(this.editIndex,1)
      this.editItem = ''
      this.editIndex = ''
      this.saveTodo()
    },
    tryToEditTodo (index) {
      this.editItem = this.todos[index]
      this.editIndex = index
    },
    editTodo() {
      if (this.editItem !== ''){
        this.todos.splice(this.editIndex, 1, this.editItem)
        this.topTodos.splice(this.editIndex, 1, this.editItem.split('\n')[0])
        this.editItem = ''
        this.editIndex = ''
        this.saveTodo()
      } else {
        window.alert('空欄で編集はできません')
      }
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
