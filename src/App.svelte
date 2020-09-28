<script>
  import { Router, Route } from 'svelte-routing';

  import Footer from './components/Footer.svelte';
  import Header from './components/Header.svelte';
  import List from './components/List.svelte';

  export let url = '';
</script>

<main>
  <Router {url}>
    <section class="todoapp">
      <Header />
      <Route path="/" component={List} filter="all" />
      <Route path="/active" component={List} filter="active" />
      <Route path="/completed" component={List} filter="completed" />
    </section>
    <Footer />
  </Router>
</main>
