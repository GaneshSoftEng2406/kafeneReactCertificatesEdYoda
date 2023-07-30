import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { flushSync } from 'react-dom';
import './user.css'

const Users = () => {

    const [users, setUsers] = useState(null);
    const [searchParam, setSearchParam] = useState('');
    const [displayUsers, setDisplayUsers] = useState([]);

    const apiData = async () => {
        const { data } = await axios.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users')
        setDisplayUsers(data);
        setUsers(data)
    }

    useEffect(() => {
        apiData();
        // eslint-disable-next-line
    }, [])

    const onReset = (e) => {
        e.preventDefault()
        setSearchParam('')
        setDisplayUsers(users)
    }


    const searchUserHandler = (e) => {
        flushSync(() => {
            setSearchParam(e.target.value)
        })

            let arr = users?.filter((item) => {
                if (item.fullName.toLowerCase().includes(searchParam.toLowerCase())) {
                    return item
                }
            })
            setDisplayUsers(arr);
    }


    return (
        <main className="MainContainer">
            <div className="UserList_PageWrapper">
                <h1 className="UserList_MainHeading">Users</h1>
                <div className="UserList_OrdersWrapper">
                    <form className="UserList_FilterWrapper" >
                        <input className="UserList_SearchBox" id="searchInput"
                            type="search" value={searchParam} onChange={searchUserHandler} placeholder="Search by Name"
                        />
                        <input type="reset" className="UserList_Button" value="Reset" id="reset" onClick={onReset} />
                    </form>

                    <div style={{ width: '100%' }}>
                        <table className="UserList_OrderTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User Avatar</th>
                                    <th>Full Name</th>
                                    <th style={{ minWidth: '100px' }}>DoB</th>
                                    <th>Gender</th>
                                    <th>Current Location</th>
                                </tr>
                            </thead>
                            <tbody id="tbody">
                                {
                                    displayUsers !== [] ? displayUsers.map((item, idx) => (
                                        <tr className='Homepage_TableRow' key={item.id + '' + idx}>

                                            <td className="UserList_SecondaryText">{item.id}</td>
                                            <td className="UserList_PrimaryText">
                                                <img src={item.profilePic} alt="Profile Pic" />
                                            </td>
                                            <td className="UserList_SecondaryText">{item.fullName}</td>
                                            <td className="UserList_PrimaryText">{item.dob}</td>
                                            <td className="UserList_SecondaryText">{item.gender}</td>
                                            <td className="UserList_SecondaryText">{item.currentCity}, {item.currentCountry}</td>
                                        </tr>
                                    ))
                                        :
                                        null
                                }
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Users
