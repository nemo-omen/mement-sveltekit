<script>
  import MementIcon from './MementIcon.svelte';
</script>

<header>
  <div id="site-icon">
    <a href="/">
      <MementIcon />
    </a>
  </div>
</header>

<style>
  header {
    padding: 1rem;
  }
  #site-icon {
    font-size: 3rem;
  }
  #site-icon a {
    color: black;
    transition: all 0.3s east-out;
  }
  #site-icon a:hover {
    color: tomato;
  }
</style>
