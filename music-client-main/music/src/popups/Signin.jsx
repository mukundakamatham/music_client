import styled from "styled-components";
import Model from "react-modal";
import { IoCloseSharp } from "react-icons/io5";
import { useContext, useState } from "react";
import { SongContext } from "../context/SongContext";
import {getDataError, getDataLoading, getDataSucess} from '../redux/auth/action'
import { useDispatch } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";
const Style = styled.div`
  /* height: 455px; */
  .noUserCheck {
    color: red;
    text-align: center;
  }
  .warning {
    color: #084d2f;
    margin-top: 10px;
    /* text-align: center; */
  }
  .hide {
    display: none;
  }
  width: 464px;
  border-radius: 4px;
  box-shadow: 0px 0px 4px gray;
  margin: auto;
  padding: 40px;
  padding-top: 15px;
  h1 {
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    text-align: center;
    color: #333333;
  }
  .inputBox {
    display: flex;
    margin-top: 34px;
    flex-direction: column;
    gap: 10px;
    p {
      font-size: 16px;
      line-height: 22px;
      color: #333333;
    }
    div {
      height: 40px;
      display: flex;
      align-items: center;
      border: 1px solid gray;
      border: 1px solid #3595ff;
      input {
        width: 100%;
        border: none;
        background-color: inherit;
        padding: 5px;
      }
      input:focus {
        outline: none !important;
      }
    }
  }
  .signup_button {
    height: 46px;
    width: 100%;
    border-radius: 4px;
    padding: 12px, 32px, 12px, 32px;
    background: #ff645a;
    border-radius: 4px;
    border: none;
    font-size: 16px;
    line-height: 22px;
    color: white;
    margin-top: 22px;
  }
  .signup_button:hover {
    background: #dc4f4a;
  }
  .lines {
    display: flex;
    margin-top: 25px;
    justify-content: space-between;
    align-items: center;
    span {
      width: 130px;
      height: 0px;
      background: #333333;
      border: 1px solid #333333;
    }
    p {
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0em;
      text-align: left;
    }
  }
  .oath_links {
    display: flex;
    justify-content: space-between;
    margin-top: 25px;
    .gmail {
      height: 40px;
      width: 176px;
      border-radius: 4px;
      background: #ffffff;
      border: 1px solid #797979;
      display: flex;
      align-items: center;
      gap: 10px;
      svg {
        margin-left: 10px;
      }
      p {
        font-size: 14px;
        line-height: 16px;
        color: #797979;
      }
    }
    .facebook {
      height: 40px;
      width: 176px;
      border-radius: 4px;
      background: #0b5b8f;
      border: none;
      display: flex;
      align-items: center;
      gap: 10px;
      svg {
        margin-left: 15px;
      }
      p {
        font-size: 14px;
        line-height: 16px;
        color: white;
      }
    }
  }
  .end_line {
    margin-top: 30px;
    p {
      font-size: 14px;
      line-height: 20px;
      color: #333333;
    }
    span {
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;
      color: #ff645a;
      cursor: pointer;
    }
  }
  .top_cross {
    position: relative;
    left: 380px;
    cursor: pointer;
    width: 24px;
    height: 24px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
  }
`;
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "0px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "rgba(5, 5, 5, 0.3)",
  },
};

Model.setAppElement("#root");
export const Signin = () => {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [detail, setDetail] = useState(false);
  const [complete, setComplete] = useState(false);
  const dispatch = useDispatch()
  const { signin, handleSignin } = useContext(SongContext);
  const [loginData, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e)=>{
    const {value,name} = e.target;
    setData({
      ...loginData,
      [name] : value
    })
  }
  const {data} = useSelector((store)=>store.auth)
  if(data){}
  return (
    <Model style={customStyles} isOpen={signin}>
      <Style>
        <div className="top_cross">
          <IoCloseSharp onClick={() => handleSignin()} className="crossBtn" />
        </div>
        <h1>Login</h1>
        <div className="inputBox">
          <p>Email</p>
          <div>
            <input
              //   value={mynumber}
              placeholder="Enter Your Email"
                onChange={(e) => handleChange(e)}
              type="text"
              name="email"
            />
          </div>
        </div>
        <div className="inputBox">
          <p>Password</p>
          <div>
            <input
            name="password"
              //   value={mynumber}
              placeholder="Enter Your Password"
              onChange={(e) => handleChange(e)}
              type="password"
            />
          </div>
        </div>
        <p className="warning">
              {load
                ? "loading..."
                : error
                ? "Please Enter Valid Details"
                : detail
                ? "Fill all details"
                : complete
                ? ""
                : ""}
            </p>
        <button className="signup_button" onClick={async ()=>{
          dispatch(getDataLoading)
          setLoad(true);
          try{
            setDetail(false);
          const { data } = await axios.post("https://breakable-gold-outfit.cyclic.app/login",loginData)
          localStorage.setItem('acessToken',JSON.stringify(data))
          dispatch(getDataSucess(data))
          setLoad(false);
          setComplete(true);
          handleSignin()
          }
          catch(err){
            dispatch(getDataError())
            setLoad(false);
            setError(true);
            console.log(err);
          }
        }} >Login</button>
        <div className="lines">
          <span></span>
          <p>Or login via</p>
          <span></span>
        </div>
        <div className="oath_links">
          <div className="gmail">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.5367 6.69401H13.9997V6.66634H7.99967V9.33301H11.7673C11.2177 10.8853 9.74067 11.9997 7.99967 11.9997C5.79067 11.9997 3.99967 10.2087 3.99967 7.99967C3.99967 5.79067 5.79067 3.99967 7.99967 3.99967C9.01934 3.99967 9.94701 4.38434 10.6533 5.01267L12.539 3.12701C11.3483 2.01734 9.75567 1.33301 7.99967 1.33301C4.31801 1.33301 1.33301 4.31801 1.33301 7.99967C1.33301 11.6813 4.31801 14.6663 7.99967 14.6663C11.6813 14.6663 14.6663 11.6813 14.6663 7.99967C14.6663 7.55267 14.6203 7.11634 14.5367 6.69401Z"
                fill="#FFC107"
              />
              <path
                d="M2.10156 4.89667L4.2919 6.50301C4.88456 5.03567 6.3199 3.99967 7.99956 3.99967C9.01923 3.99967 9.9469 4.38434 10.6532 5.01267L12.5389 3.12701C11.3482 2.01734 9.75556 1.33301 7.99956 1.33301C5.4389 1.33301 3.21823 2.77867 2.10156 4.89667Z"
                fill="#FF3D00"
              />
              <path
                d="M8.00043 14.6669C9.72243 14.6669 11.2871 14.0079 12.4701 12.9362L10.4068 11.1902C9.71494 11.7164 8.86958 12.0009 8.00043 12.0002C6.26643 12.0002 4.7941 10.8946 4.23943 9.35156L2.06543 11.0266C3.16876 13.1856 5.40943 14.6669 8.00043 14.6669Z"
                fill="#4CAF50"
              />
              <path
                d="M14.537 6.69466H14V6.66699H8V9.33366H11.7677C11.5047 10.0725 11.0311 10.7181 10.4053 11.1907L10.4063 11.19L12.4697 12.936C12.3237 13.0687 14.6667 11.3337 14.6667 8.00033C14.6667 7.55333 14.6207 7.11699 14.537 6.69466Z"
                fill="#1976D2"
              />
            </svg>
            <p>Gmail</p>
          </div>
          <div className="facebook">
            <svg
              width="8"
              height="16"
              viewBox="0 0 8 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.47969 5.5998V4.1598C5.47969 3.5358 5.62369 3.1998 6.63169 3.1998H7.87969V0.799805H5.95969C3.55969 0.799805 2.59969 2.3838 2.59969 4.1598V5.5998H0.679688V7.9998H2.59969V15.1998H5.47969V7.9998H7.59169L7.87969 5.5998H5.47969Z"
                fill="white"
              />
            </svg>
            <p>Facebook</p>
          </div>
        </div>
        <div className="end_line">
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => {
                // setBut(false);
                // handleSignupModel();
              }}
            >
              Create one
            </span>
          </p>
        </div>
      </Style>
    </Model>
  );
};
