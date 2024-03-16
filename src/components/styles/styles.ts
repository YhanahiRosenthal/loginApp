import React from "react";

export const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width:'30%',
    padding:'2rem',
    borderRadius:'.2rem',
    boxShadow:'0 0 1rem #5c5e5f',
    margin:'auto',
    marginTop:'4rem',
    marginBottom:'4rem'
};

export const formStyle: React.CSSProperties = {
    display : 'flex',
    flexDirection : 'column',
    maxWidth: '300px',
    margin: 'auto',
    marginTop: '2rem',
};

export const textFieldStyle: React.CSSProperties = {
    minWidth: '18rem',
    maxWidth: '31rem',
    margin: '1rem 0'
}

export const submitButtonStyle: React.CSSProperties = {
    margin: '2rem 0'
}

export const formStringsStyle: React.CSSProperties = {
    marginRight: '10px',
    fontSize: '13px'
}

export const linkStyles: React.CSSProperties = {
    marginRight: '10px',
    fontSize: '13px',
    color: 'blue',
    textDecorationLine: "underline"
}