
import { createMachine, assign, interpret } from 'xstate';

const authMachine = createMachine({
  id: 'auth',
  initial: 'unauthorized',
  context: {
    data: undefined,
  },
  states: {
    unauthorized: {
      on: {
        LOGIN: 'authorizing',
      },
    },
    authorizing: {
      on: {
        AUTH_SUCCESS: 'authorized',
      },
    },
    authorized: {
      on: {
        LOGOUT: 'deauthorizing',
      },
    },
    deauthorizing: {
      on: {
        DEAUTH_SUCCESS: 'unauthorized'
      },
    },
  }
});

export const authService = interpret(authMachine).start();