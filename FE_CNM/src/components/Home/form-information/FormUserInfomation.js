import React, { Fragment, useEffect, useState } from "react";
import classes from "./formUserInfomation.module.scss";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import groupAPI from "../../../api/groupAPI";
import FormDeleteFriend from "../form-deleteFriend/FormDeleteFriend";

toast.configure();
const FormInformation = (props) => {
  const nameGroup = props.room.name;
  const avatarGroup = props.room.avatar;

  const [openFormDeleteFriend, setOpenFormDeleteFriend] = useState({
    openFormDeleteFriend: false,
  });
  const [userSendToBoxChat, setUserSendToBoxChat] = useState({
    userSendToBoxChat: null,
  });
  const [isOpenForm, setIsOpenForm] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState({
    new: props.room.avatar,
  });
  const [isChangeNameGroup, setIsChangeNameGroup] = useState(false);
  const [enteredName, setIsEnterName] = useState({ nameGroup: nameGroup });
  useEffect(() => {
    setIsEnterName({ nameGroup: props.room.name });
  }, [props.room.name]);
  useEffect(() => {
    setSelectedAvatar({ new: props.room.avatar });
  }, [props.room.avatar]);
  // const [enteredName, setIsEnterName] = useState(null);

  //console.log(props.room.name === enteredName.nameGroup? props.room.name : enteredName.nameGroup);

  useEffect(() => {
    if (props.isFormInfomation) {
      setIsOpenForm(classes.active);
    } else {
      setIsOpenForm("");
    }
  }, [props.isFormInfomation]);

  //truyen false de dong forminfomation len cho boxchat
  const closeFormInfomation = () => {
    setIsOpenForm("");
    props.SendFalseToBoxChat(false);
  };
  // console.log(props.user);

  function pad2(n) {
    return (n < 10 ? "0" : "") + n;
  }
  var date = new Date(props.user.birthday);
  var month = pad2(date.getMonth() + 1); //months (0-11)
  var day = pad2(date.getDate()); //day (1-31)
  var year = date.getFullYear();
  var formattedDate = day + "-" + month + "-" + year;

  // console.log(props.room);

  const ChangeIMGAvatarHandler = (e) => {
    e.preventDefault();
    const fileSelected = e.target.files[0];
    const fd = new FormData();
    fd.append("uploadFile", fileSelected);
    axios
      .post("//localhost:5000/messages/addFile", fd)
      .then((res) => {
        // console.log(res.data);
        setSelectedAvatar((pre) => {
          return { ...pre, new: res.data };
        });
      })
      .catch((aa) => {
        console.log("Khong Gui dc", aa);
      });
  };

  const changeNameGroupHandler = () => {
    setIsChangeNameGroup(!isChangeNameGroup);
  };

  const nameInputChangeHandler = (event) => {
    setIsEnterName((pre) => {
      return { ...pre, nameGroup: event.target.value };
    });
  };

  const updateGroupHandler = (event) => {
    event.preventDefault();
    const fetchUpdateGroup = async () => {
      try {
        const updateGroup = await groupAPI.updateRoom({
          roomID: props.room._id,
          data: {
            name: enteredName.nameGroup,
            avatar: selectedAvatar.new,
          },
        });
        if (updateGroup.status === 200) {
          toast.success("C???p nh???p th??nh c??ng", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });

          props.SendFalseToBoxChat(false);
          //props.onSendNameToBoxChat(updateGroup.data.room.name);  //Truy???n name l??n cho boxchat
        }
      } catch (error) {
        //setIsError("m?? Code kh??ng t???n t???i");
        console.log(error);
        toast.error("C???p nh???p kh??ng th??nh c??ng!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: false,
        });
      }
    };
    fetchUpdateGroup();
  };

  //mu???n m??? formdeletefriend
  const deleteFriendHandler = () => {
    setOpenFormDeleteFriend((pre) => {
      return { ...pre, openFormDeleteFriend: true };
    });
  };
  useEffect(() => {
    props.OpenFormDeleteFriendFromFormUserInfo(
      openFormDeleteFriend.openFormDeleteFriend
    );
  }, [openFormDeleteFriend.openFormDeleteFriend]);

  //????ng formdeletefriend
  useEffect(() => {
    setOpenFormDeleteFriend((pre) => {
      return { ...pre, openFormDeleteFriend: props.closeFormDeleteFriend };
    });
  }, [props.closeFormDeleteFriend]);

  useEffect(() => {
    setUserSendToBoxChat((prev) => {
      return { ...prev, userSendToBoxChat: props.user };
    });
  }, [props.user]);

  useEffect(() => {
    props.UserFromFormUserInfo(userSendToBoxChat.userSendToBoxChat);
  }, [userSendToBoxChat.userSendToBoxChat]);

  // console.log(userSendToBoxChat.userSendToBoxChat);
  // console.log(props.user);

  return (
    <Fragment>
      <div className={classes.modalView}>
        <div
          className={`${classes.backdropViewInformation} ${isOpenForm}`}
        ></div>

        {/* user */}
        {!props.room.group && (
          <div className={`${classes.viewInformation} ${isOpenForm}`}>
            <div className={classes.header}>
              <p>Th??ng Tin</p>
              <div onClick={closeFormInfomation}>
                <i className="fas fa-times"></i>
              </div>
            </div>

            <div className={classes.information}>
              <div className={classes.form}>
                <div className={classes.top}>
                  <div className={classes.avatar}>
                    <div className={classes.image}>
                      <img src={props.user.avatar} alt="" />
                    </div>
                  </div>
                </div>
                <div className={classes.bottom}>
                  <input
                    className={classes.username}
                    type="text"
                    value={props.user.name}
                    readOnly
                  />
                  <div className={classes.phone}>
                    <i className="fas fa-phone-alt"> S??? ??i???n tho???i</i>
                    <div>{props.user.phone}</div>
                  </div>

                  <div className={classes.gender}>
                    <i className="fas fa-venus-mars"> Gi???i t??nh</i>
                    <div>{props.user.gender ? "Nam" : "N???"}</div>
                  </div>

                  <div className={classes.birthday}>
                    <i className="fas fa-birthday-cake"> Ng??y sinh</i>
                    <div>{formattedDate}</div>
                  </div>

                  <div className={classes.button}>
                    <button
                      className={classes.inbox}
                      onClick={closeFormInfomation}
                    >
                      <i className="far fa-comments"></i>Nh???n Tin
                    </button>
                    <button
                      className={classes.unfriend}
                      onClick={deleteFriendHandler}
                    >
                      <i className="fas fa-users-slash"></i>H???y K???t B???n
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* group */}
        {props.room.group && (
          <div className={`${classes.viewInformationGroup} ${isOpenForm}`}>
            <div className={classes.header}>
              <p>Th??ng Tin</p>
              <div onClick={closeFormInfomation}>
                <i className="fas fa-times"></i>
              </div>
            </div>

            <div className={classes.information}>
              <div className={classes.form}>
                <div className={classes.top}>
                  <div className={classes.avatar}>
                    <div className={classes.image}>
                      {selectedAvatar.new === null ? (
                        <img src={avatarGroup} alt="" />
                      ) : (
                        <img src={selectedAvatar.new} alt="" />
                      )}
                      <i className="fas fa-camera">
                        <input
                          type="file"
                          onChange={ChangeIMGAvatarHandler}
                          multiple
                        />
                      </i>
                    </div>
                  </div>
                </div>
                <div className={classes.bottom}>
                  <input
                    className={`${classes.username} 
                          ${isChangeNameGroup ? classes.activeChangeName : ""}`}
                    type="text"
                    value={enteredName.nameGroup}
                    onChange={nameInputChangeHandler}
                    id="username"
                    name="username"
                    readOnly={!isChangeNameGroup && "readOnly"}
                  />

                  <label onClick={changeNameGroupHandler} htmlFor="username">
                    <i className="fas fa-pencil-alt"></i>
                  </label>
                  <div className={classes.member}>
                    <i className="fas fa-users"> Th??nh vi??n</i>
                    <div>{props.room.users.length} th??nh vi??n</div>
                  </div>

                  <div className={classes.button}>
                    <button
                      className={classes.updateGroup}
                      onClick={updateGroupHandler}
                    >
                      <i className="far fa-edit"></i>C???p nh???p
                    </button>
                    <button className={classes.outgroup}>
                      <i className="fas fa-sign-out-alt"></i>R???i Nh??m
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default FormInformation;
