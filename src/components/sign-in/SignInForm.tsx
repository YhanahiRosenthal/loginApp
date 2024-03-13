import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import {
    containerStyle,
    formStyle,
    textFieldStyle,
    submitButtonStyle,
    formStringsStyle
} from '../styles/styles';
import { Link } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Divider,
    Typography,
} from '@mui/material'


const schema = Joi.object({
    username: Joi.string()
        .required()
        .messages({
            'string.base': 'Username must be a text string',
            'string.empty': 'Username is a required field',
        }),
    password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-!@#$%^&*()_+|~=`{}[\]:";'<>?,./])[a-zA-Z\d-!@#$%^&*()_+|~=`{}[\]:";'<>?,./]{8,}$/)
        .required()
        .messages({
            'string.pattern.base':
            'Password must contain at least one lowercase letter, one uppercase letter, and one digit',
            'string.min': 'The password must be at least 8 characters long',
            'string.empty': 'The password field is required'
        }),
});

interface SignInFormProps {
    actionHandler:Function
}

const SignInForm: React.FC<SignInFormProps> = ({actionHandler}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();

    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm({
        mode: 'onBlur',
        resolver: joiResolver(schema)
      });

    const onSubmit = (dataToSubmit: any) => {
        if (Object.values(errors).length === 0) {
            const callback = (response: any) => {
                if(response.success){
                    window.location = response.message.appUrl;
                }else{
                    setError(response.message.message || 'Invalid credentials');
                }
            }
            actionHandler({type:'authoriseUser',payload:{callback, data:dataToSubmit}})
        }
    }

    return (
        <Container
        sx={{
            minWidth: '24rem',
            maxWidth: '31rem'
        }}
        style={containerStyle}>
            <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
                <Typography variant='h4' align='center'>
                    Sign In
                </Typography>
                <TextField
                    style= {textFieldStyle}
                    label= 'Username'
                    {...register('username')}
                    name='username'
                    variant='standard'
                    fullWidth
                    error={!!errors.username}
                    helperText={errors.username?.message ? errors.username.message.toString() : ''}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    style= {textFieldStyle}
                    label= 'Password'
                    {...register('password')}
                    name='password'
                    variant='standard'
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message ? errors.password.message.toString() : ''}
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
                <div style={{ textAlign: 'center' }}>
                    <span style={formStringsStyle}>Forgot your password?</span><Link style={formStringsStyle} to="/forgot-password" >Click here</Link>
                </div>
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
                <span style={formStringsStyle}>Don't have an account?</span> <Link style={formStringsStyle} to="/signup" >Register</Link>
            </div>
            {error &&
                <div>
                    <p style={{color: 'red', fontSize: '12px', textAlign: 'center'}}>{error}</p>
                </div>
            }
        </Container>
  )
}

export default SignInForm