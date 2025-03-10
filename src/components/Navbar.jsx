import etracker from "../assets/Etracker.png"
import { Link } from "react-router-dom"
const Navbar = ()=>{
    return (
        <>
            <div id="navbar">
                <Link to="/"><img src={etracker} id='menu_image'/></Link>
                <div id="navbar_options">
                    <Link to="/track">
                        Track
                    </Link>
                    <Link to="/about">
                        About
                    </Link>
                </div>
            </div>
        </>
    )
}
export default Navbar