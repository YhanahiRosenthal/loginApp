import React, { useState } from 'react'
import {
    Container,
    TextField,
    Button,
    Divider,
    Link,
    Typography,
} from '@mui/material'

interface SignInFormProps {
    onSignIn: (username: string, password: string) => void;
}

const SignInForm: React.FC<SignInFormProps> = ({onSignIn}) => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSignIn(userName, password)
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
                <TextField
                    style= {textFieldStyle}
                    label= 'Password'
                    variant='standard'
                    fullWidth
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
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
                <span style={{marginRight: '10px'}}>Don't have an account?</span><Link href="/SignUpForm" >Register</Link>
            </div>
        </Container>
  )
}

export default SignInForm