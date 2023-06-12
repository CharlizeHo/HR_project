import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './customer_style.css';

export default function Customer() {
  const [customers, setCustomers] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const { id } = useParams();

  useEffect(() => {
    GetCustomer();
  }, []);

  const GetCustomer = async () => {
    const result = await Axios.get('http://localhost:8080/customer/getCustomer');
    setCustomers(result.data);
    setCurrentPage(1);
  };

  const deleteCustomer = async (id) => {
    await axios.delete(`http://localhost:8080/customer/getCustomer/${id}`);
    GetCustomer();
  };

  const handleDeleteClick = (id) => {
    setSelectedCustomerId(id);
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    deleteCustomer(selectedCustomerId);
    setShowConfirmDialog(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCustomers = customers?.filter((customer) =>
    customer?.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const paginatedCustomers = filteredCustomers?.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => {
    if (pageNumber === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (pageNumber === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (typeof pageNumber === 'number') {
      setCurrentPage(pageNumber);
    }
  };

  const totalPages = Math.ceil(filteredCustomers?.length / rowsPerPage);

  return (
    <div className="container container-customer">
      <h2>Customer Management</h2>
      <div className="search-container" style={{marginTop: "30px"}}>
        <div>
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="search-input"
          />
          <i className="fa fa-search"></i>
        </div>
        <Link className="btn btn-add btn-primary" to="/admin/customer/add">
        <i className="fa-solid fa-user-plus"></i>
        </Link>
      </div>

      <table className="table table-striped table-hover shadow">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Phone number</th>
            <th scope="col">Address</th>
            <th scope="col">Created in</th>
            <th scope="col">Edited in</th>
            <th scope="col">Operation</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCustomers?.map((customer) => (
            <tr key={customer.customer_id}>
              <td>{customer?.customer_id}</td>
              <td>{customer?.customerName}</td>
              <td>{customer?.customer_phonenum}</td>
              <td>{customer?.customer_address}</td>
              <td>{customer?.customer_cre_date}</td>
              <td>{customer?.customer_mod_date}</td>
              <td>
                <Link
                  className="btn btn-edit btn-success mx-2"
                  to={`/admin/customer/editcustomer/${customer?.customer_id}`}
                >
                  <i className='fa fa-pen'></i>
                </Link>
                /
                <button
                  type="button"
                  className="btn btn-delete btn-danger mx-2"
                  onClick={() => handleDeleteClick(customer?.customer_id)}
                >
                  <i className='fa fa-trash'></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-container">
        <ul className="pagination justify-content-center">
          <li
            className={`page-item${currentPage === 1 ? ' disabled' : ''}`}
            onClick={() => handlePageChange('prev')}
          >
            <button className="page-link">Previous</button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <li
              key={page}
              className={`page-item${page === currentPage ? ' active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              <button className="page-link">{page}</button>
            </li>
          ))}
          <li
            className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}
            onClick={() => handlePageChange('next')}
          >
            <button className="page-link">Next</button>
          </li>
        </ul>
      </div>

      {showConfirmDialog && (
        <div className="modal-overlay">
          <div className="modalContainer">
            <h3>Confirm</h3>
            <p>Are you sure you want to delete this customer?</p>
            <div>
              <button className="btn btn-confirm btn-danger" onClick={handleConfirmDelete}>
                Delete
              </button>
              <button className="btn btn-cancel btn-secondary" onClick={handleCancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
