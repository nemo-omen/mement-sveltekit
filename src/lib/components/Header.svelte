<script>
  import { userStore } from '$lib/stores/user.store.js';
  import MementIcon from './MementIcon.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Nav from '$lib/components/Nav.svelte';
</script>

<header>
  <div id="site-icon">
    <a href="/">
      <!-- <MementIcon /> -->
      <Icon name="mement" />
    </a>
  </div>
  <!-- <div class="user-control">
    {#if $userStore}
      <Nav />
    {/if}
  </div> -->
</header>

<style lang="scss">
  header {
    padding: 1rem;
    justify-content: space-between;
    border-bottom: 1px solid var(--primary-fg-muted);
  }
  #site-icon {
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #site-icon a {
    color: var(--link);
    transition: all 0.3s east-out;
  }
  #site-icon a:hover {
    color: #ff6347;
  }
</style>
