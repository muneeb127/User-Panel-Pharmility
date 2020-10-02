import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { useLastLocation } from 'react-router-last-location';

import * as auth from '../store/ducks/auth.duck';
import {login} from '../crud/auth.crud';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

function Copyright() {
return (
    <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <Link color="inherit" href="https://material-ui.com/">
        Your Website
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
    </Typography>
);
}

const useStyles = makeStyles((theme) => ({
paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
},
avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
},
form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
},
submit: {
    margin: theme.spacing(3, 0, 2),
},
loader: {
    marginTop: theme.spacing(2),
    marginLeft: '47%'
}
}));

function Login(props) {
    const methods = useForm({
        validateCriteriaMode: "all"
    });
    const { handleSubmit, control, errors } = methods;
    const classes = useStyles();

    let history = useHistory();
    const lastLocation = useLastLocation();

    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    // useEffect(()=>{
    //     console.log("Last Location: ", lastLocation);
    // },[lastLocation]);

    const onSubmit = (data) => {
        enableLoading();
        setTimeout(() => {
            var userData = {
                email: data.email,
                password: data.password
            };
            login(userData)
            .then(res => {
                disableLoading();
                const accessToken = res.data.data;
                props.loginAction(accessToken);
                history.push('/');
            })
            .catch(() => {
                disableLoading();
            });
        }, 1000);
    }

    const enableLoading = () => {
        setLoading(true);
    };
    
    const disableLoading = () => {
        setLoading(false);
    };

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit = {handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Controller 
                        as={<TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            error={errors.email}
                        />} 
                        name="email" 
                        control={control} 
                        rules={{required: 'Email field is required', pattern: {value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ , message: "Enter a valid email address"}}}
                        defaultValue = {values.email}
                    />
                    <ErrorMessage errors={errors} name="email">
                        {({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                            <p key={type}>{message}</p>
                        ))
                        }
                    </ErrorMessage>
                </Grid>
                <Grid item xs={12}>
                    <Controller 
                        as={
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                                error={errors.password}
                            />
                        } 
                        name="password" 
                        control={control} 
                        rules={{required: 'Password field is required'}}
                        defaultValue = {values.password}
                    />
                    <ErrorMessage errors={errors} name="password">
                        {({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                            <p key={type}>{message}</p>
                        ))
                        }
                    </ErrorMessage>
                </Grid>
            </Grid>
            {loading && <CircularProgress className = {classes.loader} />}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign In
            </Button>
            <Grid container justify="flex-end">
                <Grid item>
                <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                </Link>
                </Grid>
            </Grid>
            </form>
        </div>
        <Box mt={8}>
            <Copyright />
        </Box>
        </Container>
    );
}

export default connect(
    null,
    auth.actions
)(Login);