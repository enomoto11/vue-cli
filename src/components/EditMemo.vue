<template>
  <div class="edit">
    <h1>{{ msg }}</h1>
    <h2>一覧</h2>
    <ul>
      <li v-for="(item, index) in topTodos" :key="index">
        <a>
          {{ item }}
          <button @click="deleteTodo(index)">削除</button>
          <button @click="tryToEditTodo(index)">編集</button>
        </a>
      </li>
    </ul>
    <h3>新規作成する</h3>
    <textarea v-model="addTemp"></textarea>
    <button @click="addTodo()">TODO LISTへ追加</button><br>
    <h3>編集する</h3>
    <textarea v-model="editTemp"></textarea>
    <button @click="editTodo()">更新</button>
  </div>
</template>

<script>
export default {
  name: 'EditMemo',
  props: {
    msg: String
  },
  data: function() {
    return{
      todos: [],
      topTodos: [],
      addTemp: null,
      editTemp: null,
      editIndex: null
    }
  },
  mounted() {
    if (localStorage.getItem('memos')) {
      try {
        this.todos = JSON.parse(localStorage.getItem('memos'));
      } catch(e) {
        localStorage.removeItem('memos');
      }
    }
    for (let i = 0; i < this.todos.length; i++) {
      this.topTodos[i] = this.todos[i].split('\n')[0]
    }
  },
  methods: {
    addTodo() {
      this.todos.push(this.addTemp)
      this.topTodos.push(this.addTemp.split('\n')[0])
      this.addTemp =''
      this.saveTodo()
    },
    saveTodo(){
      const parsed = JSON.stringify(this.todos);
      localStorage.setItem('memos', parsed);
    },
    deleteTodo(index) {
      this.todos.splice(index,1)
      this.saveTodo()
    },
    tryToEditTodo(index) {
      this.editTemp = this.todos[index]
      this.editIndex = index
    },
    editTodo() {
      this.todos.splice(this.editIndex, 1, this.editTemp)
      this.topTodos.splice(this.editIndex, 1, this.editTemp.split('\n')[0])
      this.editTemp =''
      this.editIndex=''
      this.saveTodo()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
a {
  color: #42b983;
  margin: 0 10px;
}
</style>
