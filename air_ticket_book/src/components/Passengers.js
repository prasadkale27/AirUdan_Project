import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingService from '../services/BookingService';
import planeBG from '../assets/images/planebg1.jpg';
import Footer from './Footer';
import Header from './Header';

const Passengers = () => {
  const navigate = useNavigate();
  const [npsgn, setNpsgn] = useState(parseInt(localStorage.getItem('nop')) || 1);
   const [passengers, setPassengers] = useState(Array(npsgn).fill({ pname: '', gender: '', age: '' }));

  //const [passengers, setPassengers]= Array.from({ length: npsgn }, () => ({ pname: '', gender: '', age: '' }))
  const [btnDisabled, setBtnDisabled] = useState(true);
  const service = new BookingService();

  const gen = ['Select', 'Male', 'Female'];
 
  const handleInputChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    if (field === "age") {
      // Ensure only numeric values are accepted
      if (!/^\d*$/.test(value)) return; // Prevent non-numeric input
      if (value.length > 3) return; // Limit age to 3 digits
  }

  if (field === "pname") {
      // Ensure only letters and spaces are allowed (no numbers)
      if (!/^[A-Za-z\s]*$/.test(value)) return;
  }
   
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };


    setPassengers(updatedPassengers);
    validatePassengers(updatedPassengers);
  };
  const validatePassengers = (passengersList) => {
    const allFilled = passengersList.every(p => p.pname.trim() !== '' && p.gender && p.gender !== 'Select' && p.age.trim() !== '');
    setBtnDisabled(!allFilled);
  };
  

  const savePassengers = () => {
    localStorage.setItem('sid', JSON.stringify(passengers));
    service.addPassengers({ pass1: passengers });
    navigate('/summary');
  };

  return (
    <div className="pt-5">
      <Header />
      <div
        className="py-5"
        style={{ backgroundImage: `url(${planeBG})`, overflow: 'hidden', height: '900px' }}
      >
        <div className="row mb-4">
          <div className="col-lg-8 mx-auto text-center">
            <h1 className="display-6" style={{ color: 'white', fontWeight: '50px' }}>
              Add Passenger Details
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10 mx-auto">
            <div className="card">
              <div className="card-header">
                <div className="alert alert-info">
                  <strong>Note: </strong> Please Add Passenger Details.
                </div>
                <div className="bg-white shadow-sm pt-4 pl-2 pr-2 pb-2">
                  <div className="tab-content">
                    <div className="tab-pane fade show active pt-3">
                      <form>
                        <table className="table">
                          <thead>
                            <tr align="center">
                              <th>Name</th>
                              <th>Gender</th>
                              <th>Age</th>
                            </tr>
                          </thead>
                          <tbody>
                            {passengers.map((passenger, index) => (
                              <tr key={index}>
                                <td>
                                  <input
                                    className="form-control"
                                    type="text"
                                    value={passenger.pname}
                                    onChange={(e) => handleInputChange(index, 'pname', e.target.value)}
                                  />
                                </td>
                                <td>
                                  <select
                                  required
                                    className="btn btn-info"
                                    value={passenger.gender}
                                    onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
                                  >
                                    {gen.map((g) => (
                                      <option key={g} value={g}>
                                        {g}
                                      </option>
                                    ))}
                                  </select>
                                </td>
                                <td>
                                  <input
                                    className="form-control"
                                    type="text"
                                    value={passenger.age}
                                    onChange={(e) => handleInputChange(index, 'age', e.target.value)}
                                    maxLength="2"
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="card-footer">
                          <button
                            onClick={savePassengers}
                            type="button"
                            disabled={btnDisabled}
                            className="subscribe btn btn-primary btn-block shadow-sm"
                          >
                            Book Ticket
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Passengers;
