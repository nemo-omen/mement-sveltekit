<script>
  import { userStore } from '$lib/stores/user.store.js';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let errorMessage;

  async function logOut() {
    console.log('Logging out...');
    try {
      const response = await fetch('/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: $userStore.email }),
      });

      if (!response.ok) {
        errorMessage = response.message;
      } else {
        console.log('logout response: ', response);
        $userStore = null;
        dispatch('logout');
      }
    } catch (error) {
      errorMessage = error.message;
    }
  }
</script>

<nav aria-label="Main Navigation">
  <ul>
    <li class="dropdown">
      <button class="btn-link dropdown__title" aria-expanded="false" aria-controls="menu-dropdown">Menu</button>
      <ul class="dropdown__menu" id="menu-dropdown">
        <li>
          <a href="/profile" class="profile-link">
            {$userStore.userName}
          </a>
        </li>
        <li>
          <button class="btn-link" on:click="{logOut}">Log Out</button>
        </li>
      </ul>
    </li>
  </ul>
</nav>

<style lang="scss">
  $color: rebeccapurple;
  $color-dark: scale-color($color, $lightness: -30%);
  $transition: 280ms all 120ms ease-out;

  .dropdown__title {
    background-color: transparent;
    border: none;
    font-family: inherit;
  }

  nav {
    padding: 0 1rem;
    position: sticky;
    top: 0;
    display: grid;
    place-items: center;

    > ul {
      grid-auto-flow: column;

      > li {
        margin: 0 0.5rem;

        a,
        .dropdown__title {
          text-decoration: none;
          text-align: center;
          display: inline-block;
          color: var(--link);
          font-size: 1.125rem;

          &:focus {
            outline: none;
          }
        }

        > a,
        .dropdown__title {
          padding: 1rem 0.5rem;
          border-top: 3px solid transparent;
          transition: $transition;

          &:hover,
          &:focus {
            border-top-color: var(--hover);
            color: var(--hover);
          }
        }
      }
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;

      li {
        padding: 0;
      }
    }
  }

  .dropdown {
    position: relative;

    .dropdown__title {
      display: inline-flex;
      align-items: center;

      &:after {
        content: '';
        border: 0.35rem solid transparent;
        border-top-color: rgba(var(--link), 0.45);
        margin-left: 0.25em;
        transform: translateY(0.15em);
      }
    }

    .dropdown__menu {
      position: absolute;
      min-width: 15ch;
      left: 50%;
      top: calc(100% - 0.25rem);
      transition: $transition;
      transform: rotateX(-90deg) translateX(-50%);
      transform-origin: top center;
      visibility: hidden;
      opacity: 0.3;
      padding: 0.5em 0;
      background-color: var(--primary-bg);
      border-radius: 4px;
      box-shadow: 0 0.15em 0.25em rgba(black, 0.25);

      a {
        color: var(--link);
        display: block;
        padding: 0.5em;
        opacity: 0;
        transition: $transition;

        &:hover {
          background-color: var(--primary-bg-muted);
          color: var(--hover);
        }

        &:focus {
          outline: none;
          background-color: rgba($color, 0.25);
        }
      }
      button {
        width: 100%;
      }
    }

    // &:after {
    //   content: '';
    //   border: 0.5rem solid transparent;
    //   border-bottom-color: #fff;
    //   position: absolute;
    //   top: calc(100% - 1.25rem);
    //   left: 50%;
    //   transform: translateX(-50%);
    //   transition: $transition;
    //   opacity: 0;
    //   will-change: opacity;
    // }

    &:hover,
    &:focus-within {
      .dropdown__title {
        border-top-color: var(--hover);
      }

      .dropdown__menu {
        opacity: 1;
        transform: rotateX(0) translateX(-50%);
        visibility: visible;

        a {
          opacity: 1;
        }
      }

      &:after {
        opacity: 1;
      }
    }
  }
</style>
