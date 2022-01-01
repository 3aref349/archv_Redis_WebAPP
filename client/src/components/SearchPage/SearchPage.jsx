//
// ─── REACT REDUX ────────────────────────────────────────────────────────────────
//
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


//  lodash library
import _ from 'lodash'
//
// ─── ACTIONS ────────────────────────────────────────────────────────────────────
import '../../utilities/my.css'



import { getUsers } from "../../redux/user";




// const handleSubmit = () => {
//   dispatch(getRepos);
// };

const SearchPage = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const repos = useSelector((state) => state.repos);

    var searchArray = [{ id: 0, name: "Repo" }, { id: 1, name: "User" }]
    const [searchEntity, setSearchEntity] = useState(0)
    const [username, setUserName] = useState("")
    const [data, setData] = useState([])







    const getUser = () => {

        console.log("get userData")
        var debounce_fun = _.debounce(function () {
            dispatch(getUsers(username));
        }, 4000);

        return debounce_fun();


    };


    useEffect(() => {



    }, []);


   
    return (

        <div>
            <div className="Wrapper">
                <div className="Container">
                    <div className="SeachBar">
                        <input className="Input" type="text" onChange={(e) => setUserName(e.target.value)} placeholder="Enter github username" />


                        <select className="Input" onChange={(e) => setSearchEntity(e.target.value)}>
                            {/* <select > */}
                            {searchArray.map((item) => (
                                <option key={item.id} value={item.id} >{item.name} </option>
                            ))}
                        </select>

                        <button className="Btn" onClick={() => getUser()} > Submt</button>
                    </div>
                    <div className="Data">

                        {(searchEntity == 1) ? <>

                            <div className="card" >
                                <img className="Img" src={users.users.avatar_url} placeholder="Enter github username" />
                                <p  >{users.users.login} </p>
                                <p  >{users.users.created_at} </p>
                                <p  >{users.users.updated_at} </p>

                                {/* <p  >{item.typeofsurvey.surveyName} </p> */}

                            </div>

                        </> : <>
                            <h1 className="Repos">repos: {users.users.public_repos}</h1>


                        </>


                        }
                    </div>
                </div>
            </div>

        </div>

    )

}

export default SearchPage;
