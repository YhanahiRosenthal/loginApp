import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Divider,
    Typography,
} from '@mui/material'

interface SignInFormProps {
    onSignIn: (username: string, password: string) => void;
}

const SignInForm: React.FC<SignInFormProps> = ({onSignIn}) => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width:"30%",
        padding:'2rem',
        borderRadius:'.2rem',
        boxShadow:'0 0 1rem #5c5e5f',
        margin:'auto',
        marginTop:'4rem',
        marginBottom:'4rem'
    };

    const formStyle: React.CSSProperties = {
        display : 'flex',
        flexDirection : 'column',
        maxWidth: '300px',
        margin: 'auto',
        marginTop: '2rem',
    };

    const textFieldStyle: React.CSSProperties = {
        minWidth: '18rem',
        margin: '1rem 0'
    }

    const submitButtonStyle: React.CSSProperties = {
        margin: '2rem 0'
    }

    const errorTextStyle: React.CSSProperties = {
        color: 'red',
        marginTop: '0.5rem',
    }

    const validateForm = () => {
        let isValid = true;

        if(!userName){
            isValid = false;
            setUserNameError('You must type your name above')
        }else{
            setUserNameError('');
        }

        if(!password){
            isValid = false;
            setPasswordError('You must type a password')
        }else{
            setPasswordError('')
        }

        return isValid;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(validateForm()){
            onSignIn(userName, password)
        }
    };

    return (
        <Container style={containerStyle}>
            <form style={formStyle} onSubmit={handleSubmit}>
                <Typography variant='h4' align='center'>
                    Sign In
                </Typography>
                <TextField
                    style= {textFieldStyle}
                    label= 'Username'
                    variant='standard'
                    fullWidth
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <Typography
                    variant='body2'
                    style={errorTextStyle}
                >
                    {userNameError}
                </Typography>
                <TextField
                    style= {textFieldStyle}
                    label= 'Password'
                    variant='standard'
                    fullWidth
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Typography
                    variant='body2'
                    style={errorTextStyle}
                >
                    {passwordError}
                </Typography>
                <Button
                    style={submitButtonStyle}
                    type='submit'
                    variant='contained'
                    color='primary'
                    fullWidth
                >
                    Sign In
                </Button>
            </form>
            <Divider
                    variant="middle"
                    style={{
                        margin: '1.6rem 0',
                        backgroundColor: '#121212',
                        width: '70%',
                        height: '.1px',
                        opacity: '0.5',
                      }}
                />
            <div style={{ textAlign: 'center' }}>
                <span style={{marginRight: '10px'}}>Don't have an account?</span> <Link to="/SignUp" >Register</Link>
            </div>
        </Container>
  )
}

export default SignInForm