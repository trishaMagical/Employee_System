import {BrowserRouter,Switch,Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AddEdit from "./pages/AddEdit";
import  Home from "./pages/Home"
import Login from "./pages/Login";
import Registration from "./pages/Registration";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <ToastContainer position="top-center"/>
     <Switch>
     <Route exact path="/" component ={Registration} />
      <Route path="/home" component ={Home} />
      <Route  path="/addupdate" component ={AddEdit} />
      <Route  path="/addupdate/:id" component ={AddEdit} />
      <Route  path="/login" component ={Login} />
     </Switch>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
