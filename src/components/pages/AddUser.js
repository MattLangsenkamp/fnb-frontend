import React from 'react';
import Layout from '../common/Layout';
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Col, Button } from 'react-bootstrap';
import Error from '../common/Error';
import styled from 'styled-components';

const FormStyles = styled.div`
    .form-error {
        border-color: #f44336;
    }
`;

const ValidationSchema = Yup.object({
    username: Yup.string()
        .min(3, "Name must be at least three characters")
        .max(255, "Name must be less than 255 characters")
        .required("Name is required"),
    password: Yup.string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .max(17, "Max password length is 17 characters")
        .matches(/(?=.*[A-Z])/, "need at least one capital letter")
        .matches(/(?=.*[a-z])/, "need at least one lower-case letter")
        .matches(/(?=.*[0-9])/, "need at least one number")
        .matches(/(?=.*[@$!%*#?&])/, "need at least one special character")
        .required("Required"),
    confirmPassword: Yup.string()
        .required('This field is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')

});

const RenderErrorMessage = (touched, errors, values, field) => {
    return (touched[field] &&
        errors[field] &&
        values[field].length > 0) && <Error touched={touched[field]} message={errors[field]} />
}

const SIGN_UP = gql`
    mutation SignUp($username: String!, $password: String!) {
        signUp(username: $username, password: $password) {
            message
            AccessToken
            RefreshToken
        }
    }
`;

export default function AddUser() {

    const [signUp, {data : mutData, error: mutationError }] = useMutation(SIGN_UP);

    if (mutData) {

        cache.writeQuery({
            query: IS_LOGGED_IN,
            data: {
              isLoggedIn: !!localStorage.getItem("AccessToken") && !!localStorage.getItem("RefreshToken"),
            },
          });
        if (mutData.signIn.message === "Successfully signed in") {
            return <Redirect to="/locations" />
        }
    }

    if (mutationError) return "Error"

    return (
        <FormStyles>
            <Layout title={"Sign Up"} description={"Sign up to add a location"}>
                <Formik
                    initialValues={{
                        username: "",
                        password: "",
                        confirmPassword: ""
                    }} 
                    validationSchema={ValidationSchema}

                    onSubmit={(values, { setSubmitting}) => {
                        setSubmitting(true);
                        signUp({variables: {username: values.username, password: values.password}})
                    }}
                    >

                        {({
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            values,
                            isSubmitting,
                            touched,
                            errors,
                            isValid,
                            setFieldValue
                        }) => (
                            <Form onSubmit={handleSubmit} >
                            
                                <Form.Group as={Col} md="6" controlId="validationFormik01">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        placeholder="username"
                                        value={values.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.username && !errors.username}
                                        className={(touched.username &&
                                            errors.username &&
                                            values.username.length > 0)? "form-error" : null}
                                    />
                                    {RenderErrorMessage(touched, errors, values, "username")}
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationFormik02">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.password && !errors.password}
                                        className={(touched.password &&
                                            errors.password &&
                                            values.password.length > 0)? "form-error" : null}
                                    />
                                    {RenderErrorMessage(touched, errors, values, "password")}
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationFormik03">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="confirm password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.confirmPassword && !errors.confirmPassword}
                                        className={(touched.confirmPassword &&
                                            errors.confirmPassword &&
                                            values.confirmPassword.length > 0)? "form-error" : null}
                                    />
                                    {RenderErrorMessage(touched, errors, values, "confirmPassword")}
                                </Form.Group>
                                <Form.Group as={Col} md="3" controlId="validationFormik08">
                                    <Button type="submit">
                                        Submit
                                    </Button>
                                </Form.Group>
                            </Form>         
                        )}
                </Formik>
            </Layout>
        </FormStyles>
    )
}