import React, { useRef } from 'react';
import './mail.css'
import styled from "styled-components";
import emailjs from '@emailjs/browser';
import { useContext } from 'react';
import { ColorContext } from '../../context/ColorRedux';
const StyledContactForm = styled.div`
    margin: 0 auto;
  width: 400px;

  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;
    input {
      width: 95%;
      padding: 10px;
      height: 24px;
      padding: 7px;
      outline: none;
      border-radius: 9px;
      border: 1px solid rgb(220, 220, 220);
      box-shadow: 12px 12px 12px -11px rgba(0, 0, 0, 0.75);
      &:focus {
        border: 2px solid #ff0000;
      }
    }
    textarea {
      max-width: 95%;
      min-width: 95%;
      width: 95%;
      max-height: 160px;
      min-height: 160px;
      padding: 7px;
      outline: none;
      border-radius: 9px;
      border: 1px solid rgb(220, 220, 220);
      box-shadow: 12px 12px 12px -11px rgba(0, 0, 0, 0.75);
      &:focus {
        border: 2px solid #ff0000;
      }
    }
    label {
      margin-top: 18px;
      margin-bottom:4px;
      font-weight:bold;
      color: #ff0000
    }
    input[type="submit"] {
        height: initial;
        width:100%;
      margin-top: 2rem;
      cursor: pointer;
      background: #ff0000;
      color: white;
      border: none;
      font-size: 18px;
      font-weight: bold;
      padding: 10px;
     box-shadow: 12px 12px 12px -11px rgba(0, 0, 0, 0.75);;

    }
    }
`;
const Mail = () => {
    const colorProcess = useContext(ColorContext);
    console.log(colorProcess.state.backGroundColor)
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs
          .sendForm(
            //"service id"
            "service_gy56vg9",
            //"template id",
            "template_9au3wiw",
            form.current,
            // "public key" => get from account
            "TUkrg_edMOAekiOfR"

          )
          .then(
            (result) => {
              console.log(result.text);
              e.target.reset()
              console.log("message sent");
            },
            (error) => {
              console.log(error.text);
            }
          );
      };
  return (
    <div className='Mail'>
      <div className="MailContainer" style={{backgroundColor: (colorProcess.state.backGroundColor)}}>
        <h2>Write me a Message</h2>
         <StyledContactForm>
      <form ref={form} onSubmit={sendEmail}>
      
        <label>Name</label>
        <input type="text" name="user_name" placeholder='Enter your name...' required/>
        <label>Email</label>
        <input type="email" name="user_email" placeholder='Enter your email...' required/>
        <label>To </label>
        <input type="email" name="receiver_email" placeholder="Enter receiver's email..." required/>
        <label>Message</label>
        <textarea name="message" placeholder="Enter message..." style={{resize: "none"}} required/>
        <input type="submit" value="Send" />
      </form>
    </StyledContactForm>
      </div>
      <div className="setting-color">
        <button className='color1' onClick={() => colorProcess.handleChangeColor(1)}></button>
        <button className='color2' onClick={() => colorProcess.handleChangeColor(2)}></button>
        <button className ='color3' onClick={() => colorProcess.handleChangeColor(3)}></button>
      </div>
    </div>
  )
}

export default Mail
