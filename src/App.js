import React, { createContext, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";

import { initialState, reducer } from "./store/reducer";

import Test from './components/Test'
export const AuthContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
    {/* <Test/> */}
    
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
    <Router>
      <Switch>
        <Route path="/login" component={Test}/>
        <Route path="/" component={Home}/>
      </Switch>
    </Router>
    </AuthContext.Provider>
  </>
  );
}

export default App;