import { useState } from 'react'
import {Link} from "react-router-dom"

export default function SidebarItem({item}) {
    const[open, setOpen] = useState(false)

    if(item.childrens){
        return (
            <div className={open ? "sidebar-item open" : "sidebar-item"} style={{ color: "black" }}>
                <div className="sidebar-title">
                    <span>
                        { item.icon && <i className={item.icon}></i> }
                        {item.title}    
                    </span> 
                    <i className="bi-chevron-down toggle-btn" onClick={() => setOpen(!open)}></i>
                </div>
                <div className="sidebar-content">
                    { item.childrens.map((child, index) => <SidebarItem key={index} item={child} />) }
                </div>
            </div>
        )
    }else{
        return (
            <Link to={item.path || "#"} className="sidebar-item plain" style={{ color: "black", paddingTop: "0%",marginTop: "-9px" }}>
                { item.icon && <i className={item.icon}></i> }
                {item.title}
            </Link>
        )
    }

}
