import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
 
import ApiCall from '../../Apicall/ApiCall';
import { getToken } from '../../Compo/utilis/getToken';

// Validation schema using Yup
const UserSchema = Yup.object().shape({
  userName: Yup.string().required('Username is required'),
  name: Yup.string().required('First name is required'),
  surname: Yup.string().required('Surname is required'),
  emailAddress: Yup.string().email('Invalid email').required('Email is required'),
  isActive: Yup.boolean(),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});

const UserPage = () => {

    const token = getToken();
  const initialValues = {
    userName: '',
    name: '',
    surname: '',
    emailAddress: '',
    isActive: true,
    password: ''
  };

  const handleSubmit = async (values) => {
    try {
      const requestBody = {
        ...values,
        roleNames: ['admin']  
      };

      const response = await ApiCall({
        url: 'https://localhost:44311/api/services/app/User/Create',
        method: 'POST',
        data: requestBody 
     
      });

      console.log('User created successfully:', response);
      alert('User created successfully!');
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user. Check console for details.');
    }
  };
  return (
    <div className="container mt-5">
      <h2>Create User</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={UserSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            {/* Username */}
            <div className="mb-3">
              <label>Username</label>
              <Field name="userName" className="form-control" />
              <ErrorMessage name="userName" component="div" className="text-danger" />
            </div>

            {/* Name */}
            <div className="mb-3">
              <label>First Name</label>
              <Field name="name" className="form-control" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>

            {/* Surname */}
            <div className="mb-3">
              <label>Surname</label>
              <Field name="surname" className="form-control" />
              <ErrorMessage name="surname" component="div" className="text-danger" />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label>Email</label>
              <Field name="emailAddress" type="email" className="form-control" />
              <ErrorMessage name="emailAddress" component="div" className="text-danger" />
            </div>

            {/* Active */}
            <div className="mb-3 form-check">
              <Field name="isActive" type="checkbox" className="form-check-input" />
              <label className="form-check-label">Active</label>
            </div>

            {/* Password */}
            <div className="mb-3">
              <label>Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>

            <button type="submit" className="btn btn-primary">
              Create User
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserPage;
