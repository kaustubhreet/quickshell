import React, { useState } from 'react';


const Navbar = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = ['By Status', 'By User', 'By Priority'];

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className='container' style={{ display: 'flex', border: '1px solid black' }}>
      <div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/70/70115.png"
          alt="setting"
          style={{ width: '20px', height: '20px', padding: '5px' }}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <div style={{ marginTop: '10px', marginInline: '4px' }}>Display</div>
      <div style={{ marginTop: '15px' }}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/25/25623.png"
          alt="arrow"
          style={{ height: '20px', width: '10px' }}
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <div style={{ position: 'absolute', marginTop: '10px' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {options.map((option) => (
                <li key={option} onClick={() => handleOptionClick(option)}>
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;