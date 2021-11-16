import React from 'react';

const Context = React.createContext([[], () => {}]);
const UserContext = React.createContext({user: null,});

export { Context, UserContext };
