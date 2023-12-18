import React ,{ useEffect }from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompanies } from '../../reduxHelper/features/auth/company/companySlice';
import styles from './CompaniesPage.module.css';

const CompaniesPage = () => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company.companies);

  useEffect(() => {
    dispatch(getAllCompanies());
  }, [dispatch]);
  return (
    <div className={styles.companiesPage}>
      <h2>Companies Page</h2>
      <table>
        <thead>
          <tr>
            <th>Company ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Service of Activity</th>
            <th>Number of Employees</th>
            <th>Description</th>
            <th>Type</th>
           
          </tr>
        </thead>
        <tbody>
          {companies?.map((company) => (
            <tr key={company.id}>
              <td>{company.id}</td>
              <td>{company.name}</td>
              <td>{company.address}</td>
              <td>{company.service_of_activity}</td>
              <td>{company.number_of_employees}</td>
              <td>{company.description}</td>
              <td>{company.type}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}

export default CompaniesPage
