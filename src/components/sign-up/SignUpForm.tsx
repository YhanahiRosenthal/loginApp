import { FormHelperText, Grid, TextField, Typography } from '@mui/material';
import { linkStyles } from '../styles/styles';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useState, useEffect } from 'react';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { useLabel, useStyles } from '../useHooks/useThemeLabel';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import Select, { SelectOption } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Avatar from '@mui/joy/Avatar';
import languageIcons from '../json/languageIcon.json';
import { getImage } from '../useHooks/GetImage';

interface FormData {
    displayName: string;
    username: string;
    email: string;
    password: string;
    language: string | null;
    type: string;
    termsAndConditions: Boolean;
  }

  interface SignUpFormProps {
    actionHandler: Function
}

const SignForm: React.FC<SignUpFormProps> = ({actionHandler}) => {

    const [isPressed, setIsPressed] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [error, setError] = useState();

    const wLabel = useLabel();
    const wStyles = useStyles();
    const iconsLanguage: string[] = getImage(languageIcons);

    const handleShowPassword = () => setShowPassword((show) => !show);

    const [formData, setFormData] = useState<FormData>({
        displayName: '',
        username: '',
        email: '',
        password: '',
        language: 'en-en',
        type:'1',
        termsAndConditions: isPressed,
      });

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setIsPressed(checked);
        setFormData({ ...formData, termsAndConditions: checked });
    };

    useEffect(() => {

        const isAllFieldsFilled = Object.values(formData).every(value => !!value);
        setIsFormValid(isAllFieldsFilled && isPressed);

    }, [formData, isPressed]);

    const schema = Joi.object({
        displayName:
            Joi.string()
                .alphanum()
                .min(3)
                .max(20)
                .messages({
                    'string.base': 'The displayName must be a text string',
                    'string.empty': 'The displayName is a required field',
                    'string.min': 'The displayName must be at least 3 characters',
                    'string.max': 'The displayName must be at most 20 characters',
                })
                .required(),
        username:
            Joi.string()
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
        email:
            Joi.string()
                .required()
                .email({ minDomainSegments: 2,
                        tlds: { allow: ['com', 'net'] }
                        })
                .messages({
                    'string.base': 'The email must be a text string',
                    'string.empty': 'The email is a required field',
                    'string.email': 'The email must be a valid email address',
                    'string.minDomainSegments': 'The email must have at least 2 domain segments',
                    'string.tlds.allow': 'The email must have a valid top-level domain (com or net)'
                    }),
        password:
            Joi.string()
                .min(8)
                .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-!@#$%^&*()_+|~=`{}[\]:";'<>?,./])[a-zA-Z\d-!@#$%^&*()_+|~=`{}[\]:";'<>?,./]{8,}$/)
                .required()
                .messages({
                'string.pattern.base':
                    'The password must contain at least one lowercase letter, one uppercase letter, and one digit',
                'string.min': 'The password must be at least 8 characters long',
                'string.empty': 'The password field is required'
                }),
        termsAndConditions:
            Joi.boolean()
                .valid(true)
                .required()
                .messages({
                    'boolean.base': 'You must agree to the terms and conditions',
                    'any.only': 'You must agree to the terms and conditions',
                    'any.required': 'You must agree to the terms and conditions',
                }),
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { error } = schema.validate(formData)
        if(error){
            console.log('MessageError: There are error yet')
        }
        const callback = (response: any) => {
            console.log('Response', response)
            if(response.success){
                actionHandler({type: 'activeSignIn', payload:{}});
            }else{
                setError(response.message || 'Invalid credentials');
            }
        }
        actionHandler({type:'createUser',payload:{callback, data:formData}})
    }

    const {
        register,
        formState: { errors }
      } = useForm({
        mode: 'onBlur',
        resolver: joiResolver(schema)
      });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const options = [
        { value: 'en-en', label: wLabel('English'), src: iconsLanguage[0] },
        { value: 'es-es', label: wLabel('Spanish'), src: iconsLanguage[1] },
      ];

      function renderValue(option: SelectOption<string> | null) {
        if (!option) {
          return null;
        }

        return (
          <React.Fragment>
            <ListItemDecorator>
              <Avatar size="sm" src={options.find((o) => o.value === option.value)?.src} />
            </ListItemDecorator>
            {option.label}
          </React.Fragment>
        );
      }

      const handleChangeIdiom = (event: React.ChangeEvent<{ value: unknown }>, value: string | null) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            language: value,
        }));
    };

    return (
        <Grid
            sx={{
                fontFamily:wStyles('fonts.body'),
                minWidth: '24rem',
                maxWidth: '31rem'
            }}
            width="30%"
            padding='2rem'
            borderRadius='.2rem'
            boxShadow='0 0 1rem #5c5e5f'
            margin='auto'
            marginTop='4rem'
            marginBottom='4rem'
        >
            <Typography variant="h4" gutterBottom textAlign='center'>
                {wLabel('Create account')}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid
                    container
                    spacing={2}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    >
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            minWidth: '18rem',
                            maxWidth: '31rem'
                        }}
                        >
                        <TextField
                            label= {wLabel('Display name')}
                            {...register('displayName')}
                            name="displayName"
                            value={formData.displayName}
                            variant="standard"
                            onChange={handleChange}
                            error={!!errors.displayName}
                            helperText={errors.displayName?.message ? errors.displayName.message.toString() : ''}
                            sx={{
                                width: '100%',
                                '&:hover .MuiInput-underline:before': {
                                borderBottomColor: '#9aa2c1',
                                },
                            }}
                            margin="normal"
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            minWidth: '18rem',
                            maxWidth: '31rem'
                        }}
                        >
                        <TextField
                            label= {wLabel('username')}
                            {...register('username')}
                            name="username"
                            value={formData.username}
                            variant="standard"
                            onChange={handleChange}
                            error={!!errors.username}
                            helperText={errors.username?.message ? errors.username.message.toString() : ''}
                            sx={{
                                width: '100%',
                                '&:hover .MuiInput-underline:before': {
                                borderBottomColor: '#9aa2c1',
                                },
                            }}
                            margin="normal"
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            minWidth: '18rem',
                            maxWidth: '31rem'
                        }}
                        >
                        <TextField
                            label= {wLabel('Email')}
                            {...register('email')}
                            name="email"
                            value={formData.email}
                            variant="standard"
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email?.message ? errors.email.message.toString() : ''}
                            sx={{
                                width: '100%',
                                '&:hover .MuiInput-underline:before': {
                                borderBottomColor: '#9aa2c1',
                                },
                            }}
                            margin="normal"
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            minWidth: '18rem',
                            maxWidth: '31rem'
                        }}
                        >
                        <FormControl
                            sx={{
                                m:1 ,
                                width: '100%',
                                maxWidth: '17rem',
                                margin: 0,
                                '&:hover .MuiInput-underline:before': {
                                borderBottomColor: '#9aa2c1',
                                },
                            }}
                            variant="standard"
                            error={!!errors.password}
                            >
                            <InputLabel htmlFor="standard-adornment-password">{wLabel('Password')}</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                {...register('password')}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleShowPassword}
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                            {errors.password && (
                            <FormHelperText>{errors.password?.message ? errors.password.message.toString() : ''}</FormHelperText>
    )}
                        </FormControl>
                    </Grid>
                    <Grid
                         item
                         xs={12}
                         md={6}
                         sx={{
                             minWidth: '18rem',
                             maxWidth: '31rem',
                             marginTop: '1rem'
                         }}
                    >
                        <Select
                            defaultValue="en-en"
                            slotProps={{
                                listbox: {
                                sx: {
                                    '--ListItemDecorator-size': '44px',
                                },
                                },
                            }}
                            sx={{
                                '--ListItemDecorator-size': '44px',
                                minWidth: 240,
                            }}
                            renderValue={renderValue}
                            onChange={(event:any, value:any) => handleChangeIdiom(event, value)}
                            >
                            {options.map((option, index) => (
                                <React.Fragment key={option.value}>
                                    {index !== 0 ? <ListDivider role="none" inset="startContent" /> : null}
                                    <Option value={option.value} label={option.label}>
                                        <ListItemDecorator>
                                            <Avatar size="sm" src={iconsLanguage[index]} />
                                        </ListItemDecorator>
                                        {option.label}
                                    </Option>
                                </React.Fragment>
                            ))}
                            </Select>
                    </Grid>
                    <Grid
                        marginBottom='2rem'
                        marginTop='2rem'
                    >
                        <Checkbox
                            checked={isPressed}
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                            onChange={handleCheckboxChange}
                        />
                        <span
                            style={{color: 'black', fontSize: '13px'}}
                            >
                            {wLabel('Do you agree to')} <span style={linkStyles} onClick= {() => actionHandler({type: 'activeTermsAndConditions', payload:{}})} >{wLabel('terms and privacy policy')}</span>
                        </span>
                    </Grid>
                    <Button
                        variant="contained"
                        style={{
                            borderRadius: 20 ,
                            width: '70%',
                            fontSize: '.7rem'
                        }}
                        disabled={!isFormValid}
                        type='submit'
                    >
                        {wLabel('Sign up')}
                    </Button>
                </Grid>
            </form>
            <Divider
                    variant="fullWidth"
                    style={{
                        margin: '1.6rem 0',
                        backgroundColor: '#121212',
                        height: '.1px',
                        opacity: '0.5',
                      }}
                />
            <div style={{ textAlign: 'center' }}>
                <span style={{fontSize: '13px'}} >{wLabel('Do you have an account')} <span style={linkStyles} onClick={() => actionHandler({type:'activeSignIn', payload:{}})}>{wLabel('Log in')}</span></span>
            </div>
            {error &&
                <div>
                    <p style={{color: 'red', fontSize: '12px', textAlign: 'center'}}>{error}</p>
                </div>
            }
        </Grid>
    );
};

export default SignForm;
