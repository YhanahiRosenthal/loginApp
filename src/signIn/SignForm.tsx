import { Grid, TextField, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

const SignForm = () => {

    const [isPressed, setIsPressed] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);


    return (
        <Grid
            width="30%"
            padding='2rem'
            borderRadius='.2rem'
            boxShadow='0 0 1rem #5c5e5f'
            margin='auto'
            marginTop='4rem'
            marginBottom='4rem'
        >
            <Typography variant="h4" gutterBottom textAlign='center'>
                Create an account
            </Typography>
            <Grid
                container
                spacing={2}
                direction="column"
                justifyContent="center"
                alignItems="center"
                >
                <Grid item>
                    <TextField
                        label="Display Name"
                        variant="standard"
                        style={{ width: '18rem' }}
                        margin="normal"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="Username"
                        variant="standard"
                        style={{ width: '18rem' }}
                        margin="normal"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="Email"
                        variant="standard"
                        style={{ width: '18rem' }}
                        margin="normal"
                    />
                </Grid>
                <Grid item>
                    <FormControl sx={{ m: 1, width: '18rem' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>
                <Grid
                    marginBottom='2rem'
                    marginTop='2rem'
                >
                    <Checkbox
                        checked={isPressed}
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                        onClick={() => setIsPressed(!isPressed)}
                    />
                    <Link
                        href="/TermsAndCoditions"
                        rel="noopener"
                        variant="body2"
                        color="inherit"
                        >
                        Do you agree to terms and privacy policy?
                    </Link>
                </Grid>
                <Button
                    variant="contained"
                    style={{ borderRadius: 20 ,
                        width: '70%',
                        fontSize: '.7rem'
                    }}
                    disabled={!isPressed}
                >
                    Create account
                </Button>
            </Grid>
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
                <Link href="/Login" >Do you have an account? Login</Link>
            </div>
        </Grid>
    );
};

export default SignForm;
