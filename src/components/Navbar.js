import {NavLink,Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import SkeletonLoader from "./SkeletonLoader";
const Navbar = () => {
    const [active,setActive] = useState(false)
    const [settings,setSettings] = useState({})
    const menu = [
        {
            name:'Home',
            slug:'home'
        },
        {
            name:'Blog',
            slug:'blogs'
        },
        {
            name:'Contact',
            slug: 'contact'
        },
        {
            name:'About',
            slug:'about'
        }
    ]
    const toggleMenu = () => {
         setActive(!active)
         document.querySelector('body').style.overflow = active ? 'auto' : 'hidden'
    }
    useState(() => {
        axios({
            method:'get',
            url:process.env.REACT_APP_API_URL + 'setting',
            headers:{
                Authorization:'Bearer ' + process.env.REACT_APP_API_TOKEN
            }
        })
            .then(response => {
                setSettings(response.data)
                document.title = response.data.title
            })
            .catch(error => {
                console.log(error)
            })
    },[])
   return(
       <nav className="navbar">
           <Link to="/">
               {settings.logo ? (
                   <img src={process.env.REACT_APP_SITE + settings.logo} alt="Logo"/>
               ) : (
                   <SkeletonLoader width="125px" height="42px"/>
               )}
           </Link>
           <ul className={`menu ${active && 'active'}`}>
               {menu.map((m,index) => (
                   <li className="menu-item" key={index}>
                       <NavLink to={`/${m.slug}`} activeClassName="nav-active">{m.name}</NavLink>
                   </li>
               ))}
           </ul>
           <div className={`hamburger ${active && 'active'}`} onClick={toggleMenu}>
               <span className="bar"></span>
               <span className="bar"></span>
               <span className="bar"></span>
           </div>
       </nav>
   )
}
export default Navbar
