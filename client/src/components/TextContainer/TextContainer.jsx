import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users, room }) => (
  <div className="textContainer show">

    <a href='/' className='leave-button-a'>
      <button class="leave-button">Leave</button>
    </a>

    <div className='textContainer-user'>
      <h4>Room Name</h4>
      <div className="activeRoom">
        <div className="activeItem">
        <img className='active-img' src={onlineIcon} alt='online'/>
        {room}
        </div>
      </div>
    </div>

    <div className='textContainer-user'>
      <h4>Active Users</h4>
      {
        users
          ? (
            <div className="activeContainer">
              <p>
                {users.map(({ name }) => (
                  <div key={name} className="activeItem">
                    <img className='active-img' alt="Online Icon" src={onlineIcon} />
                    {name}
                  </div>
                ))}
              </p>
            </div>
          )
          : null
      }
    </div>
  </div>
);

export default TextContainer;