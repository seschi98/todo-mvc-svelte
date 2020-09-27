<script>
  import { todos, onlyCheckedTodos, onlyUncheckedTodos } from '../store/todos';

  $: editingId = -1;
</script>

{#if $todos.length > 0}
  <section class="main">
    <input
      id="toggle-all"
      class="toggle-all"
      type="checkbox"
      on:click={(e) => todos.toggleAll(e.target.checked)} />
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
      {#each $todos as todoItem}
        <li class:completed={todoItem.done} class:editing={editingId === todoItem.id}>
          <div class="view">
            <input
              class="toggle"
              type="checkbox"
              checked={todoItem.done}
            on:click={() => todos.toggleTodo(todoItem.id)} />
            <label on:dblclick={() => editingId = todoItem.id}>{todoItem.text}</label>
            <button class="destroy" on:click={() => todos.removeTodo(todoItem.id)} />
          </div>
          <input class="edit" value={todoItem.text} on:blur={() => {
              if(editingId === todoItem.id) {
                  editingId = -1;
              }
          }} on:change={(e) => todos.updateTodoText(todoItem.id, e.target.value)} />
        </li>
      {/each}
    </ul>
  </section>
  <footer class="footer">
    <span class="todo-count"><strong>{$onlyUncheckedTodos.length}</strong>
      item{$onlyUncheckedTodos.length !== 1 ? 's' : ''}
      left</span>
    <!-- Remove this if you don't implement routing -->
    <ul class="filters">
        <li>
            <a class="selected" href="#/">All</a>
        </li>
        <li>
            <a href="#/active">Active</a>
        </li>
        <li>
            <a href="#/completed">Completed</a>
        </li>
    </ul>
    {#if $onlyCheckedTodos.length > 0}
      <button class="clear-completed" on:click={todos.clearCompleted}>Clear
        completed</button>
    {/if}
  </footer>
{/if}
