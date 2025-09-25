import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import ApiCall from '../../Apicall/ApiCall';
import * as Yup from 'yup';

const EditUser = (props) => {
    const [roles, setRoles] = useState([]);
    const [user, setUser] = useState(null);

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

    const fetchUser = async (userId) => {
        try {
            const response = await ApiCall({
                url: `https://localhost:44311/api/services/app/User/Get?Id=${userId}`,
                method: 'GET',
            });
            setUser(response.data.result);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    useEffect(() => {
        fetchRoles();
        if (props.userId) {
            fetchUser(props.userId);
        }
    }, [props.userId]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            userName: user?.userName || '',
            name: user?.name || '',
            surname: user?.surname || '',
            emailAddress: user?.emailAddress || '',
            isActive: user?.isActive || false,
            roleNames: [],  
        },
        validationSchema: Yup.object({
            userName: Yup.string().required('Username is required'),
            name: Yup.string().required('Name is required'),
            surname: Yup.string().required('Surname is required'),
            emailAddress: Yup.string().email('Invalid email').required('Email is required'),
            roleNames: Yup.array().min(1, 'At least one role must be selected').required('Role selection is required'),
        }),
        onSubmit: async (values) => {
            const dataToSubmit = {
                ...values,
                id: props.userId,   
            };
            console.log('Form data to submit:', dataToSubmit);

           
            try {
                await ApiCall({
                    url: 'https://localhost:44311/api/services/app/User/Update',
                    method: 'PUT',
                    data: dataToSubmit,
                });
                console.log('User updated successfully');
            } catch (error) {
                console.error('Error updating user:', error);
            }
        },
    });

    const handleRoleChange = (roleName) => {
        const { roleNames } = formik.values;
        if (roleNames.includes(roleName)) {
            formik.setFieldValue('roleNames', roleNames.filter((role) => role !== roleName));
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
                data-bs-target="#editUserModal"
                ref={props.open}
            >
                Launch edit modal
            </button>

            <div
                className="modal fade"
                id="editUserModal"
                tabIndex="-1"
                aria-labelledby="editUserModalLabel"
                data-bs-backdrop="static"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editUserModalLabel">
                                Edit User
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                ref={props.close}
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="userName" className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="userName"
                                        name="userName"
                                        value={formik.values.userName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.userName && formik.errors.userName ? (
                                        <div className="text-danger">{formik.errors.userName}</div>
                                    ) : null}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.name && formik.errors.name ? (
                                        <div className="text-danger">{formik.errors.name}</div>
                                    ) : null}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="surname" className="form-label">Surname</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="surname"
                                        name="surname"
                                        value={formik.values.surname}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.surname && formik.errors.surname ? (
                                        <div className="text-danger">{formik.errors.surname}</div>
                                    ) : null}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="emailAddress" className="form-label">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="emailAddress"
                                        name="emailAddress"
                                        value={formik.values.emailAddress}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.emailAddress && formik.errors.emailAddress ? (
                                        <div className="text-danger">{formik.errors.emailAddress}</div>
                                    ) : null}
                                </div>

                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="isActive"
                                        name="isActive"
                                        checked={formik.values.isActive}
                                        onChange={formik.handleChange}
                                    />
                                    <label className="form-check-label" htmlFor="isActive">Is Active</label>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="roles" className="form-label">Roles</label>
                                    <div id="roles">
                                        {roles.map((role) => (
                                            <div className="form-check" key={role.name}>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id={role.name}
                                                    name="roleNames"
                                                    value={role.name}
                                                    checked={formik.values.roleNames.includes(role.name)}
                                                    onChange={() => handleRoleChange(role.name)}
                                                />
                                                <label className="form-check-label" htmlFor={role.name}>
                                                    {role.displayName}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    {formik.touched.roleNames && formik.errors.roleNames ? (
                                        <div className="text-danger">{formik.errors.roleNames}</div>
                                    ) : null}
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={props.close}>
                                        Close
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUser;
