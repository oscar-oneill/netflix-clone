import React, {useEffect, useState} from 'react'
import '../styles/Nav.css'

const Nav = () => {
    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true)
            } else handleShow(false)
        });

        return () => {
            window.removeEventListener("scroll")
        };
    }, []);

    return (
        <div className={`nav ${show && "nav_black"}`}>
            <img 
                className="nav_logo"
                src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" 
                alt="Netflix Logo"
            />

            <img 
                className="nav_avatar"
                src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/1bdc9a33850498.56ba69ac2ba5b.png" 
                alt="Avatar"
            />
        </div>
    )
}

export default Nav
