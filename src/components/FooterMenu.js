import {NavLink} from "react-router-dom";
import {HomeIcon,BlogIcon,ContactIcon,AboutIcon} from '../icons'
const FooterMenu = () => {
    const menu = [
        {
            icon:<HomeIcon/>,
            slug:''
        },
        {
            icon: <BlogIcon/>,
            slug: 'blog'
        },
        {
            icon: <ContactIcon/>,
            slug: 'contact'
        },
        {
            icon: <AboutIcon/>,
            slug: 'about'
        }
    ]
    return(
        <div className="footer-menu">
            {menu.map((m,index) => (
                <NavLink activeClassName="active" key={index} to={`/${m.slug}`}>
                    {m.icon}
                </NavLink>
            ))}
        </div>
    )
}
export default FooterMenu