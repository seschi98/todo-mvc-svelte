<script>
  import { Router, Route } from 'svelte-routing';

  import TodoInput from './components/TodoInput.svelte';
  import List from './components/List.svelte';
  import Footer from './components/Footer.svelte';

  export let url = '';
</script>

<main>
  <Router {url}>
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <TodoInput />
      </header>

      <Route path="/" component={List} filter="all" />
      <Route path="/active" component={List} filter="active" />
      <Route path="/completed" component={List} filter="completed" />
    </section>
    <Footer />
  </Router>
</main>
