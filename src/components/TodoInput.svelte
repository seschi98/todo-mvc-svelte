<script>
  import { todos } from '../store/todos';

  const ENTER_CODE = 13;
  const ENTER_NAME = 'Enter';

  $: newTodo = '';

  const onKeyUp = (event) => {
    if (event.keyCode === ENTER_CODE || event.key === ENTER_NAME) {
      todos.addTodo(newTodo);
      newTodo = '';
    }
  };
</script>

<!-- svelte-ignore a11y-autofocus -->
<input class="new-todo" placeholder="What needs to be done?" autofocus bind:value={newTodo} on:keyup={onKeyUp} />
