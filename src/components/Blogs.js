import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import {useEffect, useState} from "react";
import axios from "axios";
import SkeletonLoader from "./SkeletonLoader";
import {Link} from "react-router-dom";

const Blogs = () => {
    const [categories, setCategories] = useState([])
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        axios({
            method: 'get',
            url: process.env.REACT_APP_API_URL + 'blogs/categories',
            headers: {
                Authorization: 'Bearer ' + process.env.REACT_APP_API_TOKEN
            }
        })
            .then(resonse => {
                setCategories(resonse.data)
                console.log(resonse.data)
            })
            .catch(error => {
                console.log(error)
            })
        axios({
            method: 'get',
            url: process.env.REACT_APP_API_URL + 'blogs',
            headers: {
                Authorization: 'Bearer ' + process.env.REACT_APP_API_TOKEN
            }
        })
            .then(response => {
                console.log(response)
                setBlogs(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
    return (
        <Tabs className="blogs">
            <TabList className="blogs-tab-list">
                {categories.length ? (
                    <>
                        {categories.map(category => (
                            <Tab key={category.id} className="blogs-tab-list-tab"
                                 selectedClassName="active">{category.name}</Tab>
                        ))}
                    </>
                ) : (
                    <>
                        <SkeletonLoader height="20px" width="60px" marginRight="36px"/>
                        <SkeletonLoader height="20px" width="60px" marginRight="36px"/>
                        <SkeletonLoader height="20px" width="60px" marginRight="36px"/>
                        <SkeletonLoader height="20px" width="60px" marginRight="36px"/>
                        <SkeletonLoader height="20px" width="60px" marginRight="36px"/>
                        <SkeletonLoader height="20px" width="60px"/>
                    </>
                )}
            </TabList>
            {categories.map(category => (
                <TabPanel className="blogs-tab-panel" key={'panel' + category.id}>
                    {blogs.filter(item => item.categories[0].id === category.id).map(item => (
                        <div className="blog" key={item.id}>
                            <Link to={'/blog/' + item.id}>
                                <img src={process.env.REACT_APP_SITE + item.details[0].media} alt={item.title}/>
                            </Link>
                            <div className="blog-info">
                                <p>{item.title}</p>
                                <p>{item.created_at}</p>
                            </div>
                        </div>
                    ))}
                </TabPanel>
            ))}
        </Tabs>
    )
}
export default Blogs
