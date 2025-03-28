import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/SeatsStyle.css';
import planeBG from "../assets/images/airplane1-removebg-preview.png";
import planeBG1 from "../assets/images/carpet.jpg";
import Footer from './Footer';
import Header from './Header';

const Seats = () => {
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [numPassengers, setNumPassengers] = useState(parseInt(localStorage.getItem('nop')) );

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      alert('Please Login');
      navigate('/login');
    }
  }, []);

  const handleSeatSelection = (event) => {
    const seatId = event.target.id;
    let updatedSeats = [...selectedSeats];

    if (event.target.checked) {
      if (updatedSeats.length < numPassengers) {
        updatedSeats.push(seatId);
      } else {
        alert(`You can only select ${numPassengers} seats.`);
        event.target.checked = false;
      }
    } else {
      updatedSeats = updatedSeats.filter(seat => seat !== seatId);
    }

    setSelectedSeats(updatedSeats);
  };

  const confirmSeats = () => {
    if (selectedSeats.length !== numPassengers) {
      alert(`Please select exactly ${numPassengers} seats.`);
      return;
    }

    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
    alert('Seats booked successfully! \n Leave Feedback');
    navigate('/feedback');
  };

  return (
    <div className='pt-3'>
      <Header />
      <div
        className="py-5"
        style={{
          backgroundImage: `url(${planeBG1})`,
          overflow: 'hidden',
          height: '700px',
        }}
      >
        <div
          className="py-5"
          style={{
            marginTop: '100px',
            marginLeft: '180px',
            backgroundImage: `url(${planeBG})`,
            backgroundRepeat: 'no-repeat',
            overflow: 'hidden',
            height: '600px',
          }}
        >
          <div className="plane">
            <div className="cockpit">
              <h3>Udan Airways</h3>
              <h1 align='center'>Please select seats</h1>
            </div>
            <div className="exit exit--front fuselage"></div>
            <ol className="cabin fuselage">
              {[...Array(7)].map((_, rowIndex) => (
                <li className={`row row--${rowIndex + 1}`} key={rowIndex}>
                  <ol className="seats">
                    {[...'ABCDEF'].map((seat, seatIndex) => {
                      const seatId = `${rowIndex + 1}${seat}`;
                      return (
                        <li className="seat" key={seatId}>
                          <input
                            type="checkbox"
                            id={seatId}
                            onChange={handleSeatSelection}
                          />
                          <label htmlFor={seatId}>{seatId}</label>
                        </li>
                      );
                    })}
                  </ol>
                </li>
              ))}
            </ol>
            <div className="exit exit--back fuselage"></div>
          </div>
          <div style={{ textAlign: 'right', marginRight: '150pt', marginTop: '220pt' }}>
            <button
              className='btn btn-warning'
              onClick={confirmSeats}
              disabled={selectedSeats.length !== numPassengers}
            >
              Confirm Seats
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Seats;
