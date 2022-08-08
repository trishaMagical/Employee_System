import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AddEdit from "./pages/AddEdit";
// import Categories from "./pages/Categories";
import Home from "./pages/Home"
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import SignUp from "./pages/SignUp";
import Categories from "./pages/Categories";
import Todo from "./pages/Todo";

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
      
        {/* <ToastContainer position="top-center"/> */}
        <Switch>
          {/* <Route exact path="/" component={Registration} /> */}
          <Route exact path="/SignUp" component ={SignUp} />
          <Route exact path="/login/user" component={Login} />
          <Route exact path="/Categories" component={Categories} />
          <Route exact path="/Todo" component={Todo} />
          <Route exact path="/Home" component={Home} />
          <Route exact path="/addupdate" component={AddEdit} />
          <Route exact path="/SignUp" component ={SignUp} />
          <Route exact path="/logout" component={Login} />
          
          
          
          <Redirect to="/SignUp" />
          
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
