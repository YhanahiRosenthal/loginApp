import React, {useState} from 'react'
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
    userName: Joi.string()
        .min(3)
        .max(20)
        .regex(/^[a-zA-Z ]+$/)
        .messages({
            'string.base': 'The username must be a text string',
            'string.empty': 'The username is a required field',
            'string.min': 'The username must be at least 3 characters',
            'string.max': 'The username must be at most 20 characters',
            'string.pattern.base': 'The username must contain only letters'
        })
        .required(),
});

const ForgotPassword = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm({
        mode: 'onBlur',
        resolver: joiResolver(schema)
      });

    const onSubmitForgot = (data: any) => {
        if (Object.values(errors).length === 0) {
            const forgotFormData = data;
            console.log('Data form:', forgotFormData);
        }
    }

  return (
    <Container
    sx={{
        minWidth: '24rem',
        maxWidth: '31rem'
    }}
    style={containerStyle}>
    <form style={formStyle} onSubmit={handleSubmit(onSubmitForgot)}>
        <Typography variant='h4' align='center'>
            Recover Your Password
        </Typography>
        <TextField
            style= {textFieldStyle}
            label= 'User Name'
            {...register('userName')}
            name='userName'
            variant='standard'
            fullWidth
            error={!!errors.userName}
            helperText={errors.userName?.message ? errors.userName.message.toString() : ''}
            type='userName'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
        />
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
        <Button
            style={submitButtonStyle}
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
        >
            Send
        </Button>
    </form>
    <div style={{ textAlign: 'center' }}>
        <span style={{marginRight: '10px', fontSize:'13px'}}>Send the form and receive an Email with data to update your password.</span>
    </div>
</Container>
  )
}

export default ForgotPassword