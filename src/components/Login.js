import React, { useState } from 'react'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setLoggedInAction } from '../redux/actions/authAction';
import styles from './login.module.css'


const Login = ({loggedIn,setLoggedIn}) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const onFormSubmit = (e) => {
        e.preventDefault();
        if (userName !== '' && password !== '') {
            if (userName === password){
                localStorage.setItem("username", userName)
                localStorage.setItem("password", password)
                alert('login Successfull')
                setLoggedIn(true)
                navigate('/orders')
            }
            else{
                alert('Please enter valid credentials!')
            }
        }
    }

    return (
        <main className={styles.main_container}>
            <div>
                <form id="form" className={styles.loginPage_loginForm}>
                    <h1>Sign In</h1>
                    <input className={styles.loginPage_inputField} type="text" name="username" value={userName} placeholder="Enter Username" onChange={(e) => setUserName(e.target.value)} />
                    <input className={styles.loginPage_inputField} type="password" name="password" value={password} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                    <input className={styles.loginPage_button} type="submit" value="Login" onClick={(e) => onFormSubmit(e)}/>
                </form>
            </div>
        </main>
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
export default connect(mapStateToProps,mapDispatchToProps)(Login);
