import React , { useState }from 'react'
import styles from './CreateCompany.module.css';
import { useDispatch } from 'react-redux';
import { createCompany } from '../../reduxHelper/features/auth/company/companySlice'; 

const CreateCompany = () => {
  const dispatch = useDispatch();
  const initialFormData = {
    name: '',
    address: '',
    service_of_activity: '',
    number_of_employees: 0,
    description: '',
    type: '',
  };

  const [formData, setFormData] = useState(initialFormData);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const resetForm = () => {
    setFormData(initialFormData);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    formData.number_of_employees =  parseInt(formData.number_of_employees); 
 
    dispatch(createCompany(formData));
    resetForm();
  };

  return (
    <div className={styles.createCompany}>
    <h2>Create Company</h2>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <label htmlFor="address">Address:</label>
      <input
        type="text"
        id="address"
        name="address"
        value={formData.address}
        onChange={handleChange}
      />

      <label htmlFor="service_of_activity">Service of Activity:</label>
      <input
        type="text"
        id="service_of_activity"
        name="service_of_activity"
        value={formData.service_of_activity}
        onChange={handleChange}
      />

      <label htmlFor="number_of_employees">Number of Employees:</label>
      <input
        type="number"
        id="number_of_employees"
        name="number_of_employees"
        value={formData.number_of_employees}
        onChange={handleChange}
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      ></textarea>

      <label htmlFor="type">Type:</label>
      <input
        type="text"
        id="type"
        name="type"
        value={formData.type}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
    </form>
  </div>
  )
}

export default CreateCompany
