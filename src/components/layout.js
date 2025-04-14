import { NavLink, Outlet, useNavigate } from "react-router-dom";

function Layout(){
    const navigate = useNavigate();
    return (
        <>
        <nav className="layout-cont">
         <NavLink className='links' to='/'>Home</NavLink>
         <NavLink className='links' to='/create'>Create Product</NavLink>
         
         <div className="cart-container">
        <button onClick={() => navigate('/Cart')} id="viewCart">View Cart</button>
        </div>  
        </nav>


        <Outlet />
        </>
    )
}

export default Layout;