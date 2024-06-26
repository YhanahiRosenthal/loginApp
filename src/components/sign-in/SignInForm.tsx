import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import {
    containerStyle,
    formStyle,
    textFieldStyle,
    submitButtonStyle,
    formStringsStyle,
    textFieldStyleHidden,
    containerErrorPin,
    linkStyles
} from '../styles/styles';
import {
    Container,
    TextField,
    Button,
    Divider,
    Typography,
} from '@mui/material'
import Pin from '../shared/pin';
import PetsIcon from '@mui/icons-material/Pets';
import PasswordIcon from '@mui/icons-material/Password';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLabel, useStyles} from '../useHooks/useThemeLabel';
interface SignInFormProps {
    actionHandler:Function
}

const SignInForm: React.FC<SignInFormProps> = ({ actionHandler }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [selectedInput, setSelectedInput] = useState<string>('');
    const passwordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (passwordRef.current) {
            passwordRef.current.focus();
        }
    }, [password]);

    const toggleInputType = (inputType: 'password' | 'pin') => {
        setSelectedInput(inputType);
    };

    const schema = Joi.object({
        username: Joi.string()
            .required()
            .messages({
                'string.base': 'Username must be a text string',
                'string.empty': 'Username is a required field',
            }),
            password: Joi.string()
                .min(8)
                .pattern(selectedInput === 'password' ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-!@#$%^&*()_+|~=`{}[\]:";'<>?,./])[a-zA-Z\d-!@#$%^&*()_+|~=`{}[\]:";'<>?,./]{8,}$/ : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-!@#$%^&*()_+|~=`{}[\]:";'<>?,./])[a-zA-Z\d-!@#$%^&*()_+|~=`{}[\]:";'<>?,./]{19,}$/)
                .required()
                .messages({
                    'string.pattern.base': selectedInput === 'password' ? 'Password must contain at least one lowercase letter, one uppercase letter, one digit and special character' : 'The pin must have at least 4 numbers',
                    'string.min': selectedInput === 'password' ? 'The password must be at least 8 characters long' : 'Pin must be at least 4 numbers',
                    'string.empty': selectedInput === 'password' ? 'The password is required' : 'Pin is required'
                })
    });

    const wLabel = useLabel();
    const wStyles = useStyles();

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
                    // console.log('Response', response)
                    // setTimeout(() => {
                        window.location = response.responseData.message.appUrl; //'http://www.google.com.ar';
                    // }, 1500);
                }else{
                    setError(response.errorMessage.message || 'Invalid credentials');
                }
            };
            actionHandler({ type: 'authoriseUser', payload: { callback, data: dataToSubmit } });
        }
    };

    // console.log(password)

    return (
        <Container
        sx={{
            fontFamily:wStyles('fonts.body'),
            minWidth: '24rem',
            maxWidth: '31rem'
        }}
        style={containerStyle}>
            {selectedInput !== '' && <div style={{ width:'100%', height:'0' }}>
                <ArrowBackIcon sx={{ fontSize:'1.5rem', cursor: 'pointer' }} onClick={() => setSelectedInput('')} />
            </div>}
            <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
                <Typography variant='h4' align='center'>
                    {wLabel('Log in')}
                </Typography>
                <TextField
                    style= {textFieldStyle}
                    label= {wLabel('username')}
                    {...register('username')}
                    name='username'
                    variant='standard'
                    fullWidth
                    error={!!errors.username}
                    helperText={errors.username?.message ? errors.username.message.toString() : ''}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {selectedInput === '' && (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ cursor: 'pointer' }} onClick={() => toggleInputType('password')}>
                        <div style={{ width: '9rem', height: '7rem', backgroundColor:'#c4c4c477', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <PasswordIcon sx={{ fontSize: '3rem' }} />
                        </div>
                        <p style={{ textAlign: 'center', color:'#757575' }}>Password</p>
                    </div>
                    or
                    <div style={{ cursor: 'pointer' }} onClick={() => toggleInputType('pin')}>
                        <div style={{ width: '9rem', height: '7rem', backgroundColor: '#c4c4c477', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <PetsIcon sx={{ fontSize: '3rem' }} />
                        </div>
                        <p style={{ textAlign: 'center', color: '#757575' }}>Pin</p>
                    </div>
                </div>)}
                {selectedInput === 'password' &&
                    <TextField
                        style={textFieldStyle}
                        label= {wLabel('Password')}
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
                }
                {selectedInput === 'pin' &&
                    <>
                        <Pin
                            setPin={setPassword}
                            backColor={'#834bff'}
                            textColor={'#ffffff'}
                        />
                        <TextField
                            style={textFieldStyleHidden}
                            label= {wLabel('Password')}
                            {...register('password')}
                            name='password'
                            variant='standard'
                            fullWidth
                            error={!!errors.password}
                            helperText={errors.password?.message ? errors.password.message.toString() : ''}
                            type='password'
                            value={password}
                            inputProps={{ readOnly: true }}
                            onChange={(e) => setPassword(e.target.value)}
                            inputRef={passwordRef}
                        />
                        <div style={containerErrorPin} >
                            {password.length < 20 && <p style={{color:'#d30000'}}>{errors.password?.message ? errors.password.message.toString() : ''}</p>}
                        </div>
                    </>
                }
                <Button
                    style={submitButtonStyle}
                    type='submit'
                    variant='contained'
                    color='primary'
                    fullWidth
                    disabled={selectedInput === ''}
                >
                    {wLabel('Log in')}
                </Button>
                <div style={{ textAlign: 'center' }}>
                    <span style={formStringsStyle}>{wLabel('Forgot your password')}</span><span style={linkStyles} onClick={() => actionHandler({type: 'activeForgotPassword', payload:{}})} >{wLabel('Click here')}</span>
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
                <span style={formStringsStyle}>{wLabel('Dont have an account')}</span> <span style={linkStyles} onClick={() => actionHandler({type: 'activeSignUp', payload:{}})} >{wLabel('Register')}</span>
            </div>
            {error &&
                <div>
                    <p style={{color: 'red', fontSize: '12px', textAlign: 'center'}}>{error}</p>
                </div>
            }
        </Container>
  )
}

export default SignInForm;