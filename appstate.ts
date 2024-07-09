import { observable, computed, action } from 'mobx'

export const SHOW_ALL = 'show_all'
export const SHOW_COMPLETED = 'show_completed'
export const SHOW_ACTIVE = 'show_active'

class AppState {

  @observable todos: any[];

  constructor(initialTodos: any) {
    this.todos = initialTodos || []
  }

  @computed get visibleTodos() {
     const inProgress: any[] = []
     const doneProgress: any[] = []
     this.todos.forEach(todo => {
      console.log(todo);
      if (todo.CheckBoxState){
        doneProgress.push(todo)
      }else{
        inProgress.push(todo)
      }
    });
    const sections = [
      {
        title: '进行中',
        data: inProgress,
      },
      {
        title: '已完成',
        data: doneProgress,
      },
    ];
    return sections;
  }

  findTodo = (id: number) => {
    return this.todos.find((todo: any) => todo.id === id)
  }

  @action addTodo = (text: string) => {
    const todo = {
      id: this.todos.length,
      text,
      CheckBoxState: false,
      favoritesState: false,
    }
    this.todos.unshift(todo)
    return todo
  }

  getCellTitle = (id: number) => {
    const todo = this.findTodo(id);
    return todo ? todo.text : '';
  }

  getFavoritesState = (id: number) => {
    const todo = this.findTodo(id);
    return todo ? todo.favoritesState : false;
  }

  getCheckBoxState = (id: number) => {
    const todo = this.findTodo(id);
    return todo ? todo.CheckBoxState : false;
  }

  @action deleteTodo = (id: number) => {
    const todo = this.findTodo(id);
    if (todo) {
      this.todos = this.todos.filter(t => t.id !== id);
    }
  }

  @action editTodo = (id: number, text: string) => {
    const todo = this.findTodo(id);
    if (todo) {
      todo.text = text;
    }
  }

  @action completeTodo = (id: number) => {
    const todo = this.findTodo(id);
    if (todo) {
      todo.CheckBoxState = !todo.CheckBoxState;
    }
  }

  @action favoritesTodo = (id: number) => {
    const todo = this.findTodo(id);
    if (todo) {
      todo.favoritesState = !todo.favoritesState;
    }
  }
}

export default AppState;
