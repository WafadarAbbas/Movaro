import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import ApiCall from '../../Apicall/ApiCall';
import * as Yup from 'yup';

const CreateUser = (props) => {
  const [roles, setRoles] = useState([]);
 
    const fetchRoles = async () => {
      try {
        const response = await ApiCall({
          url: 'https://localhost:44311/api/services/app/User/GetRoles',
          method: 'GET',
        });
        setRoles(response.data.result.items);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    useEffect(() => {
    fetchRoles();
  }, []);

 
  const formik = useFormik({
    initialValues: {
      userName: '',
      name: '',
      surname: '',
      emailAddress: '',
      isActive: false,
      password: '',
      roleNames: [], // To store selected roles
    },
    validationSchema: Yup.object({
      userName: Yup.string().required('Username is required'),
      name: Yup.string().required('Name is required'),
      surname: Yup.string().required('Surname is required'),
      emailAddress: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().required('Password is required'),
      roleNames: Yup.array().min(1, 'At least one role must be selected').required('Role selection is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      const dataToSubmit = {
        ...values,
        tenantId: 0,  
      };
  
      try {
        const response = await ApiCall({
          url: 'https://localhost:44311/api/services/app/User/Create',
          method: 'POST',
          data: dataToSubmit,
        });
  
        console.log('API Response:', response);
        resetForm();
        if (typeof props.onclick === "function") {
          props.onclick(); 
        }
    
      } catch (error) {
        console.error('Error creating user:', error);
     
      }
    },
  });
  
  
 
  const handleRoleChange = (roleName) => {
    const { roleNames } = formik.values;
    if (roleNames.includes(roleName)) {
      formik.setFieldValue(
        'roleNames',
        roleNames.filter((role) => role !== roleName)
      );
    } else {
      formik.setFieldValue('roleNames', [...roleNames, roleName]);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#userModal"
        ref={props.open}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="userModal"
        tabIndex="-1"
        aria-labelledby="userModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="userModalLabel">
                Create User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                ref={props.close}
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="modal-body">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                 
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link  active"
                      id="userDetails-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#userDetails"
                      type="button"
                      role="tab"
                      aria-controls="userDetails"
                      aria-selected="true"
                      style={{
                        border: '1px solid grey',
                        borderRadius: '0.25rem 0.25rem 0 0',
                        fontSize:'14px'
                      }}
                    >
                      User Details
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="userRole-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#userRole"
                      type="button"
                      role="tab"
                      aria-controls="userRole"
                      aria-selected="false"
                      style={{
                        border: '1px solid grey',
                        borderRadius: '0.25rem 0.25rem 0 0',
                         fontSize:'14px'
                      }}
                    >
                      User Role
                    </button>
                  </li>
                </ul>
                <hr/>
                <div className="tab-content mt-2" id="myTabContent">
            
                  <div
                    className="tab-pane show "
                    id="userRole"
                    role="tabpanel"
                    aria-labelledby="userRole-tab"
                  >
                    <div className="row">
                      {roles.map((role) => (
                        <div className="col-sm-3 mt-3" key={role.id}>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`role-${role.id}`}
                              name="roleNames"
                              value={role.name}
                              onChange={() => handleRoleChange(role.name)}
                              checked={formik.values.roleNames.includes(role.name)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`role-${role.id}`}
                              style={{ fontWeight: 'bold', fontSize: '16px' }}
                            >
                              {role.displayName}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                   
                  <div
                    className="tab-pane active"
                    id="userDetails"
                    role="tabpanel"
                    aria-labelledby="userDetails-tab"
                  >
                    <div className="row mb-3">
                      <label htmlFor="userName" className="col-sm-2 col-form-label"   style={{ fontWeight: 'bold', fontSize: '14px' }}>Username<span style={{ color: 'red' }}>*</span></label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          id="userName"
                          name="userName"
                          className="form-control"
                          onChange={formik.handleChange}
                          value={formik.values.userName}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="name" className="col-sm-2 col-form-label" style={{ fontWeight: 'bold', fontSize: '14px' }}>Name<span style={{ color: 'red' }}>*</span></label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          onChange={formik.handleChange}
                          value={formik.values.name}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="surname" className="col-sm-2 col-form-label" style={{ fontWeight: 'bold', fontSize: '14px' }}>Surname<span style={{ color: 'red' }}>*</span></label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          id="surname"
                          name="surname"
                          className="form-control"
                          onChange={formik.handleChange}
                          value={formik.values.surname}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="emailAddress" className="col-sm-2 col-form-label"style={{ fontWeight: 'bold', fontSize: '14px' }}>Email<span style={{ color: 'red' }}>*</span></label>
                      <div className="col-sm-10">
                        <input
                          type="email"
                          id="emailAddress"
                          name="emailAddress"
                          className="form-control"
                          onChange={formik.handleChange}
                          value={formik.values.emailAddress}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label" style={{ fontWeight: 'bold', fontSize: '14px' }}>Active<span style={{ color: 'red' }}>*</span></label>
                      <div className="col-sm-10">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="isActive"
                            name="isActive"
                            onChange={formik.handleChange}
                            checked={formik.values.isActive}
                          />
                          <label className="form-check-label" htmlFor="isActive">
                            Is Active
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="password" className="col-sm-2 col-form-label" style={{ fontWeight: 'bold', fontSize: '14px' }}>Password<span style={{ color: 'red' }}>*</span></label>
                      <div className="col-sm-10">
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="form-control"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={props.close}
                  
                >
                  Close
                </button>
                <button
  type="submit"
  className="btn btn-primary"
  disabled={!(formik.isValid && formik.dirty)} 
>
  Save changes
</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
