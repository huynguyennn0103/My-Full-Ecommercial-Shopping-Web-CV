import React from 'react'
import { useReducer,createContext } from 'react'
const initialState = {
    backGroundColor: "#e5e5e5"
}

const colorReducer = (state, action) =>{
    switch(action.type){
        case "changeRed":
            return {backGroundColor: '#ffc9c9'}
        case "changeBlack":
            return {backGroundColor: '#282828' }
        default: 
            return {backGroundColor: initialState.backGroundColor}
    }
}
export const ColorContext = createContext({});
const ColorRedux = (props) => {
    const [state, dispatch] = useReducer(colorReducer,initialState);
    console.log("state in ColorContext: ",state)
    const handleChangeColor = (type) =>{
        if(type === 1){
            dispatch({type: "changeRed"})
        }
        else if(type === 2){
            dispatch({type: "changeBlack"})
        }
        else{
            dispatch({type: "changeDefault"})
        }
    }
  
    return (
        <ColorContext.Provider value={{state, handleChangeColor}}>
            {props.children}
        </ColorContext.Provider>
    )
}

export default ColorRedux

