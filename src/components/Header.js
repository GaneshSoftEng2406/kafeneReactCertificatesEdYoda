// import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { setLoggedInAction } from '../redux/actions/authAction'
import styles from './header.module.css'

const Header = ({loggedIn,setLoggedIn}) => {


    const onLogouthandler = () => {
        localStorage.removeItem("userName");
        localStorage.removeItem("password");
        setLoggedIn(false)
    }

    return (
        <>
            <header id="header">
                <div className={styles.topbar}>
                    <div className={styles.topbar_LeftMenu}>
                        <div className={styles.topbar_logoWrapper}><img
                            src="https://edu-web-fundamentals.web.app/static/media/logo.58169365.png" alt="Logo" />
                            <p className={styles.topbar_brandName}>Kafene</p>
                        </div>
                        <nav>
                            <NavLink className={(navData) => (navData.isActive ? `${styles.active} ${styles.topbar_menuItem}` : `${styles.topbar_menuItem}`)} id="Order" to="/orders">Orders</NavLink>
                            <NavLink className={(navData) => (navData.isActive ? `${styles.active} ${styles.topbar_menuItem}` : `${styles.topbar_menuItem}`)} id="product" to="/products">Products</NavLink>
                            <NavLink className={(navData) => (navData.isActive ? `${styles.active} ${styles.topbar_menuItem}` : `${styles.topbar_menuItem}`)} id="user" to="/users">Users</NavLink>
                        </nav>
                    </div>

                    {
                       loggedIn &&
                        <Link className={styles.topbar_menuItem} id="logout" onClick={onLogouthandler} to="/">Logout</Link>
                    }
                </div>
            </header>


        </>
    )
}
const mapStateToProps = states => {
    return {
        loggedIn: states.authentication.loggedIn,
    }
}
const mapDispatchToProps = dispatch => ({
    setLoggedIn : (bool)=>dispatch(setLoggedInAction(bool)),
})
export default connect(mapStateToProps,mapDispatchToProps) (Header);
