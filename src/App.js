import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home"
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import SignUp from "./pages/SignUp";
import TodoList from "./pages/TodoList";

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
      
        {/* <ToastContainer position="top-center"/> */}
        <Switch>
          <Route exact path="/" component={Registration} />
          <Route exact path="/SignUp" component ={SignUp} />
          <Route exact path="/login/user" component={Login} />
          <Route exact path="/TodoList" component={TodoList} />
          <Route exact path="/Home" component={Home} />
          <Route exact path="/addupdate" component={AddEdit} />
          <Route exact path="/SignUp" component ={SignUp} />
          <Route exact path="/logout" component={Login} />
          
          
          
          <Redirect to="/Home" />
          
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
