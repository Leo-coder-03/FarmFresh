import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {
    const [open, setOpen] = React.useState(false)
    const {user,setUser,setShowUserLogin,navigate} = useAppContext();
    const logout = async() =>{
        setUser(null);
        console.log("logout");
        navigate('/');
    }
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-primary-dull relative transition-all">
    <NavLink to='/'onClick={()=>setOpen(false)}>
        <img className="h-16" src={assets.farmfreshlogo} alt="farmfreshlogo" />
    </NavLink>

    <div className="hidden sm:flex items-center gap-8">
    <NavLink to='/' className="text-white">Home</NavLink>
    <NavLink to='/products'className="text-white">All Products</NavLink>
    <NavLink to='/contact'className="text-white">Contact</NavLink>
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
            <input className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500 text-white placeholder-white" type="text" placeholder="Search products" />
            <svg className="cursor-pointer" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.836 10.615 15 14.695" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                <path clip-rule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </div>

        <div onClick={()=>navigate("/cart")}className="relative cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <button className="absolute -top-2 -right-3 text-xs text-white hover:bg-button-hover bg-primary w-[18px] h-[18px] rounded-full">3</button>
        </div>

        {!user ?( <button onClick = {()=>{setShowUserLogin(true);setUser(true);}} className="cursor-pointer px-8 py-2 bg-primary hover:bg-button-hover transition text-white rounded-full">
            Login
        </button>):(<div className="relative group">
            <img src={assets.profile_icon} className='w-10' alt=""/>
            <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray py-2.5 w-30 rounded-md text-sm z-40'>
                <li onClick={()=>navigate("my-orders")} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">
                    My Orders
                </li>
                <li onClick={logout} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">
                    Logout
                </li>
            </ul>
        </div>)}
    </div>

    <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
        <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="21" height="1.5" rx=".75" fill="white" />
            <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="white" />
            <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="white" />
        </svg>
    </button>

{ open && (
    <div className={`${open ? 'flex' : 'hidden'} absolute top-[90px] z-99 left-0 w-full text-primary bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
        <NavLink to="/" onClick={()=>setOpen(false)}>Home</NavLink>
        <NavLink to="/products" onClick={()=>setOpen(false)}>All Products</NavLink>
        {user &&
        <NavLink to="/products" onClick={()=>setOpen(false)}>My Orders</NavLink>
        }
        <NavLink to="/" onClick={()=>setOpen(false)}>Contact</NavLink>

        {!user?(
        <button onClick={()=>{
            setOpen(false);
            setShowUserLogin(true);
            setUser(true);
        }}className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary text-white transition text-white rounded-full text-sm">
            Login
        </button>):( <button onClick={logout}className="cursor-pointer px-6 py-2 mt-2 bg-primary text-white hover:bg-primary transition text-white rounded-full text-sm">
            Logout
        </button>)
        }
    </div>
)}

</nav>
  )
}

export default Navbar
