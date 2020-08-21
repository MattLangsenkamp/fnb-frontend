import React from 'react';
import Layout from '../common/Layout';
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Col, Button } from 'react-bootstrap';
import Error from '../common/Error';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';

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
        .required("Required")
});

const RenderErrorMessage = (touched, errors, values, field) => {
    return (touched[field] &&
        errors[field] &&
        values[field].length > 0) && <Error touched={touched[field]} message={errors[field]} />
}

const SIGN_IN = gql`
    mutation SignIn($username: String!, $password: String!) {
        signIn(username: $username, password: $password) {
            message
            AccessToken
            RefreshToken
        }
    }
`;

export default function SignIn() {

    const updateCache = (cache, {data}) => {
        // If this is for the public feed, do nothing
        console.log(data)
      };
    const [signIn, {data : mutData, error: mutationError }] = useMutation(SIGN_IN, {update: updateCache});

    

    return (
        <FormStyles>
            <Layout title={"Sign In"} description={"Sign in to add and update locations"}>
                <Formik
                    initialValues={{
                        username: "",
                        password: ""
                    }} 
                    validationSchema={ValidationSchema}

                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true);
                        signIn({variables: {username: values.username, password: values.password}})
                        console.log(values);
                        console.log(mutData);
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
                                        autoComplete="username"
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
                                        autoComplete="current-password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.password && !errors.password}
                                        className={(touched.password &&
                                            errors.password &&
                                            values.password.length > 0)? "form-error" : null}
                                    />
                                    {RenderErrorMessage(touched, errors, values, "password")}
                                </Form.Group>
                                <Form.Group as={Col} md="3" controlId="validationFormik08">
                                    <Button type="submit">
                                        Submit
                                    </Button>
                                </Form.Group>
                                {mutationError && <p>no</p>}
                                {mutData && <p>data</p>}
                            </Form>         
                        )}
                </Formik>
            </Layout>
        </FormStyles>
    )
}