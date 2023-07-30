import React from 'react'
import Styles from "./component.module.css";
const Buttons = (props) => {
    const {button,setdays,days} =props;
   const handledays =(days)=>{
      setdays(days)
   } 
   console.log(days)
  return (
    <button className={days===button.days?Styles.btnactive:""} onClick={()=>handledays(button.days)}>{button.label}</button>
  )
}

export default Buttons