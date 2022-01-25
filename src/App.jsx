import { useState } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { useLocalStorage } from 'react-use';
import './App.scss';
import AuthContext from "./context/AuthContext";
import Cadastro from './pages/cadastro/index';
import Dashboard from './pages/dashboard/index';
import Login from './pages/login';


function Redirecionar() {
  return <Route render={() => <Redirect path='/' to='/login' />}/>
 
}
function ProtectRoute(props){
  return(
    <Route render={() => props.authLogin ? (props.children) : <Redirect path='/login' to='/login' />} />
  )
}


function App() {
  const [authLogin, setAuthlogin, remove] = useLocalStorage('token', '');
  const [goodbye, setGoodbye] = useState(false);
  
  return (
    <div className="App">
      <AuthContext.Provider value={{authLogin, setAuthlogin, remove, goodbye, setGoodbye}}>   
        <Router>
          <Switch>
              <Route path="/" exact component={Redirecionar}/>
              <Route path="/login" component={Login} /> 
              <Route path="/cadastro" component={Cadastro} />
              <ProtectRoute authLogin={authLogin} path={location.pathname}>
                <Route path="/home" component={Dashboard} />  
              </ProtectRoute>
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  )
}

export default App
