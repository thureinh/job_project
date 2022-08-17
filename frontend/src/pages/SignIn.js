import * as React from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '../modules/components/Typography';
import AppForm from '../modules/views/AppForm';
import { name, required } from '../modules/form/validation';
import RFTextField from '../modules/form/RFTextField';
import FormButton from '../modules/form/FormButton';
import FormFeedback from '../modules/form/FormFeedback';
import Button from '@mui/material/Button';
import { Link as ReactLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectSent, loginAsync, selectUser } from '../features/loginSlice';
import withRoot from '../modules/withRoot';
import { useNavigate } from "react-router-dom";

function SignIn() {
  const sent = useSelector(selectSent);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (Object.keys(user).length !== 0)
      navigate('/dashboard');
  }, [user, navigate]);

  const validate = (values) => {
    const errors = required(['username', 'password'], values);

    if (!errors.username) {
      const usernameError = name(values.username);
      if (usernameError) {
        errors.username = usernameError;
      }
    }

    return errors;
  };

  const handleSubmit = (userObj) => {
    dispatch(loginAsync(userObj))
  };

  return (
    <React.Fragment>
      <AppForm>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
              <Field
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Username"
                margin="normal"
                name="username"
                required
                size="large"
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Sign In'}
              </FormButton>
              <ReactLink to="/">
                <Button sx={{ mt: 3, mb: 2 }} size="large" fullWidth color="success" variant="contained">Home</Button>
              </ReactLink>
            </Box>
          )}
        </Form>
        <Typography align="center">
          <Link underline="always" href="/premium-themes/onepirate/forgot-password/">
            Forgot password?
          </Link>
        </Typography>
      </AppForm>
    </React.Fragment>
  );
}

export default withRoot(SignIn);
