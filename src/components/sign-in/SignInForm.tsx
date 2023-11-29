import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import {
    containerStyle,
    formStyle,
    textFieldStyle,
    submitButtonStyle
} from '../styles/styles';
import {
    Container,
    TextField,
    Button,
    Divider,
    Link,
    Typography,
} from '@mui/material'


const schema = Joi.object({
    email: Joi.string()
        .required()
        .email({minDomainSegments: 2, tlds: { allow: ['com', 'net']}})
        .messages({
            'string.base': 'Email must be a text string',
            'string.empty': 'Email is a required field',
            'string.email': 'Email must be a valid email address',
            'string.minDomainSegments': 'Email must have at least 2 domain segments',
            'string.tlds.allow': 'Email must have a valid top-level domain (.com or .net)'
        }),
    password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
        .required()
        .messages({
            'string.pattern.base':
            'Password must contain at least one lowercase letter, one uppercase letter, and one digit',
            'string.min': 'The password must be at least 8 characters long',
            'string.empty': 'The password field is required'
        }),
});

interface SignInFormProps {
    onSignIn: (username: string, password: string) => void;
}

const SignInForm: React.FC<SignInFormProps> = ({onSignIn}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm({
        mode: 'onBlur',
        resolver: joiResolver(schema)
      });

    const onSubmit = (data: any) => {
        if (Object.values(errors).length === 0) {
            const loginFormData = data;
            console.log('Data form:', loginFormData);
        }
    }

    return (
        <Container style={containerStyle}>
            <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
                <Typography variant='h4' align='center'>
                    Sign In
                </Typography>
                <TextField
                    style= {textFieldStyle}
                    label= 'Email'
                    {...register('email')}
                    name='email'
                    variant='standard'
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message ? errors.email.message.toString() : ''}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    <span style={{marginRight: '10px'}}>Forgot your password?</span><Link href="/ForgotPassword" >Click here</Link>
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
                <span style={{marginRight: '10px'}}>Don't have an account?</span><Link href="/SignUpForm" >Register</Link>
            </div>
        </Container>
  )
}

export default SignInForm