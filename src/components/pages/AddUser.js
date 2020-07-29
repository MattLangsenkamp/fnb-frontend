import React from 'react';
import Layout from '../common/Layout';
import Thumb from '../common/Thumb';
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
        .matches(
            /^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])(.{8,15})$/,
           'Need at least one capital letter, and at least one special character',
        )
        .matches(/(?=.*[A-Z])/, "need at least one capital letter")
        .required("Required"),
    confirmPassword: yup.string()
        .required('This field is required')
        .oneOf([yup.ref('password'), null], 'Passwords must match')

  });

  const RenderErrorMessage = (touched, errors, values, field) => {
    return (touched[field] &&
        errors[field] &&
        values[field].length > 0) && <Error touched={touched[field]} message={errors[field]} />
}

  export default function AddUser() {
      return (
        <FormStyles>
                <Layout title={"Add a Location"} description={description}>
                    <Formik
                        initialValues={{
                            username: "",
                            password: "",
                            confirmPassword: ""
                        }} 
                        validationSchema={ValidationSchema}

                        onSubmit={(values, { setSubmitting}) => {
                            setSubmitting(true);
                            console.log(values);
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
                                        <Form.Label>Name</Form.Label>
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
                                        <Form.Label>Friendly Name</Form.Label>
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
                                </Form>         
                            )}
                    </Formik>
                </Layout>
            </FormStyles>
    )
  }