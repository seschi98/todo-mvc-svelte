<script>
  import { Link } from 'svelte-routing';
  import { todos, onlyCheckedTodos, onlyUncheckedTodos } from '../store/todos';

  const getFilterLinkProps = ({ href, isPartiallyCurrent, isCurrent }) => {
    const isActive = href === '/' ? isCurrent : isPartiallyCurrent || isCurrent;

    // The object returned here is spread on the anchor element's attributes
    if (isActive) {
      return { class: 'selected' };
    }
    return {};
  };
</script>

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
