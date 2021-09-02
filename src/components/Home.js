import {Tabs, Tab, TabList, TabPanel} from "react-tabs";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import FooterMenu from "./FooterMenu";
import axios from "axios";
import SkeletonLoader from "./SkeletonLoader";

const Home = () => {
    const [categories, setCategories] = useState([])
    const [projects, setProjects] = useState([])
    const [about, setAbout] = useState({})
    useEffect(() => {
        window.scrollTo(0, 0)
        //get categories
        axios({
            method: 'get',
            url: process.env.REACT_APP_API_URL + 'projects/categories',
            headers: {
                Authorization: 'Bearer ' + process.env.REACT_APP_API_TOKEN
            }
        })
            .then(response => {
                setCategories(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        //get projects
        axios({
            method: 'get',
            url: process.env.REACT_APP_API_URL + 'projects',
            headers: {
                Authorization: 'Bearer ' + process.env.REACT_APP_API_TOKEN
            }
        })
            .then(response => {
                setProjects(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        //get about
        axios({
            method: 'get',
            url: process.env.REACT_APP_API_URL + 'about',
            headers: {
                Authorization: 'Bearer ' + process.env.REACT_APP_API_TOKEN
            }
        }).then(response => {
            setAbout(response.data)
        })
            .catch(error => {
                console.log(error)
            })
    }, [])
    return (
        <>
            <div className="container">
                <div className="content">
                    <div className="info">
                        {about.name ? (
                            <p dangerouslySetInnerHTML={{__html: about.name}}></p>
                        ) : (
                            <SkeletonLoader height="30px" width="100px"/>
                        )}
                        {about.degree ? (
                            <small dangerouslySetInnerHTML={{__html: about.degree}}></small>
                        ) : (
                            <SkeletonLoader marginTop="5px" height="30px" width="100px"/>
                        )}
                    </div>
                    <div className="about">
                        {about.body ? (
                            <>
                                <div className="about-title">
                                    About
                                </div>
                                <div className="about-body" dangerouslySetInnerHTML={{__html: about.body}}></div>
                            </>
                        ) : (
                            <div className="skeleton-about">
                                <SkeletonLoader height="10px" width="300px" float="right"/>
                                <SkeletonLoader height="10px" width="380px" marginTop="5px" float="right"/>
                                <SkeletonLoader height="10px" width="350px" marginTop="5px" float="right"/>
                                <SkeletonLoader height="10px" width="320px" marginTop="5px" float="right"/>
                                <SkeletonLoader height="10px" width="380px" marginTop="5px" float="right"/>
                                <SkeletonLoader height="10px" width="370px" marginTop="5px" float="right"/>
                                <SkeletonLoader height="10px" width="310px" marginTop="5px" float="right"/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="projects">
                <ul className="categories">
                    {categories.map(item => (
                        <li key={item.id} className="categories-item">{item.name}</li>
                    ))}
                </ul>
                <ul className="projects-content">
                    {projects.map(item => (
                        <li key={item.id} className="project">{item.body}</li>
                    ))}
                </ul>
                <div className="read-more">
                    <p>
                        Read <span>more</span>
                    </p>
                </div>
            </div>
        </>

    )
}
export default Home
