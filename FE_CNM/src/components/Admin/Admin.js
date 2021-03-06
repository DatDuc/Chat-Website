import React, { useEffect, useState, Fragment } from "react";
import adminAPI from "../../api/adminAPI";
import classes from "./admin.module.scss";
import User from "./User"
import FormLogOut from "../Home/form-logOut/FormLogOut"
import AddUser from "./form-addUser/FormAddUser";
import logo from "../../assets/logoZoLa.png"


const Admin = (props) => {

const [arrayUser, setArrayUser] = useState([])
const [isFormLogOut, setIsFormLogOut] = useState(false)
const [isFormAddUser, setIsFormAddUser] = useState(false)

  useEffect(() => {
    const fetchGetAllUser = async () => {
      try {
        const requestGetAllUser = await adminAPI.getAllUser({});
        setArrayUser(requestGetAllUser.data.users);
        console.log(requestGetAllUser.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetAllUser();
  }, []);


  // console.log(arrayUser?.users?._id);
  
  const LogoutHandler = () => {
    setIsFormLogOut(true)
  }
  const closeFormLogOut = () => {
    setIsFormLogOut(false)
  }
  const AddUserHandler = () => {
    setIsFormAddUser(true)
  }
  const closeFormAddUser = () => {
    setIsFormAddUser(false)
  }

  const findUserHandler = (event) => {
    if(event.target.value === ""){
      const fetchGetAllUser = async () => {
        try {
          const requestGetAllUser = await adminAPI.getAllUser({});
          setArrayUser(requestGetAllUser.data.users);
          console.log(requestGetAllUser.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchGetAllUser();
    }else{
      const fetchFriendByName = async () => {
        try {
          const getUserbyName = await adminAPI.GetUserByName({
            name: event.target.value,
          });
          console.log(getUserbyName.data);
          if (getUserbyName.status === 200) {
            setArrayUser(getUserbyName.data.users);
          }
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchFriendByName();
    }
  }

  const RenderArrayUser = () => {
    const fetchGetAllUser = async () => {
      try {
        const requestGetAllUser = await adminAPI.getAllUser({});
        setArrayUser(requestGetAllUser.data.users);
        console.log(requestGetAllUser.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetAllUser();
  }
  

  return (
    <Fragment>
        <div className={classes.manage}>
          <div className={classes.header}>
            <div className={classes.headerTop}>
              <div className={classes.logo}>
                <img src={logo} alt="" />
                <h2>Qu???n l?? ng?????i d??ng</h2>
              </div>
              <div className={classes.logout} >
                <button onClick={LogoutHandler}>
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              </div>
            </div>
            <div className={classes.headerBottom}>
              <div className={classes.left}>
                <input type="text" placeholder="T??m ki???m" onChange={findUserHandler}/>
                <button>
                  <i className="fas fa-search"></i>
                </button>
              </div>
              <div className={classes.right}>
                <button className={classes.addUser} onClick={AddUserHandler}>
                  <i className="fas fa-user-plus"></i>Th??m ng?????i d??ng
                </button>
              </div>
            </div>
          </div>
          <div className={classes.body}>
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>ID</th>
                  <th>H??? v?? t??n</th>
                  <th>Gi???i t??nh</th>
                  <th>Ng??y Sinh</th>
                  <th>S??? ??i???n tho???i</th>
                  <th>X??a t??i kho???n</th>
                </tr>
              </thead>
              <tbody>
                {arrayUser.map((user, index) => {
                    return user.role === "user" ? 
                        <User user={user} index={index} key = {user._id} RenderArrayUser={RenderArrayUser}></User>
                    : ""
                })}
              </tbody>
            </table>
          </div>
        </div>

        {<FormLogOut
          openFormLogOutFromAdmin={isFormLogOut}
          onFormFalse={closeFormLogOut}
        >
          </FormLogOut>}

        {<AddUser
          openFormAddUserFromAdmin={isFormAddUser}
          onFormFalse={closeFormAddUser}
          RenderArrayUser={RenderArrayUser}
        >
          </AddUser>}
    </Fragment>
  );
};

export default Admin;
