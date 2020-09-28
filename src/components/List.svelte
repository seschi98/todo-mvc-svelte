<script>
  import { Link } from 'svelte-routing';
  import { todos, onlyCheckedTodos, onlyUncheckedTodos } from '../store/todos';

  export let filter = 'all';
  export let location;

  const getFilterLinkProps = ({
    location,
    href,
    isPartiallyCurrent,
    isCurrent,
  }) => {
    const isActive = href === '/' ? isCurrent : isPartiallyCurrent || isCurrent;

    // The object returned here is spread on the anchor element's attributes
    if (isActive) {
      return { class: 'selected' };
    }
    return {};
  };

  $: editingId = -1;
  $: currentFilteredTodos = todos;

  $: {
    if (filter === 'all') {
      currentFilteredTodos = todos;
    } else if (filter === 'completed') {
      currentFilteredTodos = onlyCheckedTodos;
    } else if (filter === 'active') {
      currentFilteredTodos = onlyUncheckedTodos;
    }
  }
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
      {#each $currentFilteredTodos as todoItem}
        <li
          class:completed={todoItem.done}
          class:editing={editingId === todoItem.id}>
          <div class="view">
            <input
              class="toggle"
              type="checkbox"
              checked={todoItem.done}
              on:click={() => todos.toggleTodo(todoItem.id)} />
            <label
              on:dblclick={() => {
                editingId = todoItem.id;
                const input = document.querySelector(`[data-edit-todo="${todoItem.id}"]`);
                setTimeout(() => input.focus(), 50);
              }}>{todoItem.text}</label>
            <button
              class="destroy"
              on:click={() => todos.removeTodo(todoItem.id)} />
          </div>
          <input
            class="edit"
            data-edit-todo={todoItem.id}
            value={todoItem.text}
            on:blur={() => {
              if (editingId === todoItem.id) {
                editingId = -1;
              }
            }}
            on:change={(e) => todos.updateTodoText(todoItem.id, e.target.value)} />
        </li>
      {/each}
    </ul>
  </section>
  <footer class="footer">
    <span class="todo-count"><strong>{$onlyUncheckedTodos.length}</strong>
      item{$onlyUncheckedTodos.length !== 1 ? 's' : ''}
      left</span>
    <ul class="filters">
      <li>
        <Link to="/" getProps={getFilterLinkProps}>All</Link>
      </li>
      <li>
        <Link to="/active" getProps={getFilterLinkProps}>Active</Link>
      </li>
      <li>
        <Link to="/completed" getProps={getFilterLinkProps}>Completed</Link>
      </li>
    </ul>
    {#if $onlyCheckedTodos.length > 0}
      <button class="clear-completed" on:click={todos.clearCompleted}>Clear
        completed</button>
    {/if}
  </footer>
{/if}
