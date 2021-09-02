import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Navbar from "./components/Navbar";
import Home from './components/Home'
import About from "./components/About";
import Blogs from "./components/Blogs";
const App = () => {
    return (
        <>
            <Router>
                <Navbar/>
                <Switch>
                    <Route path="/about" component={About}/>
                    <Route path="/blogs" component={Blogs}/>
                    <Route path="/home" component={Home}/>
                    <Redirect from="/" to="/home"/>
                </Switch>
            </Router>
        </>

    )
}

export default App;
