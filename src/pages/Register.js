import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as auth from '../store/ducks/auth.duck';
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';

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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Pharmility
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Register(props) {
    const methods = useForm({
        validateCriteriaMode: "all"
    });
    const { handleSubmit, control, errors } = methods;
    const classes = useStyles();

    let history = useHistory();

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        contact: ''
    });
    // const [isSubmiited, setIssubmitted] = useState(false);


    const onSubmit = (data) => {
        // console.log("Data: ", data);

        let user;
        user = {
            name: data.name,
            email: data.email,
            password: data.password,
            contact: data.number            
        }

        props.registerAction(user);
        history.push('/login');
    }

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Sign up
            </Typography>
            <form className={classes.form} noValidate onSubmit = {handleSubmit(onSubmit)} autoComplete="off">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Controller 
                        as={ 
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                                error={errors.name}
                            />
                        } 
                        name="name" 
                        control={control} 
                        rules={{required: 'Name field is required', minLength: {value: 3, message: "Length should be greater than 2"}}}
                        defaultValue = {values.name}
                    />
                    <ErrorMessage errors={errors} name="name">
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
                        rules={{required: 'Password field is required', minLength: {value: 8, message: "Password should be atleast 8 digits long"}, pattern: {value: /((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^a-zA-Z0-9])|(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])).{8,}$/ , message: "Passwords must contain atleast 3 of 4 of the following: upper case letter, lower case letter, number and special character"}}}
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
                <Grid item xs={12}>
                    <Controller 
                        as={<TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="number"
                            label="Contact Number"
                            error={errors.number}
                        />} 
                        name="number" 
                        control={control} 
                        rules={{required: 'Number field is required', minLength: {value: 11, message: "Length should be greater than 10"}}}
                        defaultValue = {values.contact}
                    />
                    <ErrorMessage errors={errors} name="number">
                        {({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                            <p key={type}>{message}</p>
                        ))
                        }
                    </ErrorMessage>
                </Grid>
                {/* <Grid item xs={12}>
                <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                />
                </Grid> */}
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign Up
            </Button>
            <Grid container justify="flex-end">
                <Grid item>
                <Link href="/login" variant="body2">
                    Already have an account? Sign in
                </Link>
                </Grid>
            </Grid>
            </form>
        </div>
        <Box mt={5}>
            <Copyright />
        </Box>
        </Container>
    );
}


export default connect(
    null,
    auth.actions
)(Register);