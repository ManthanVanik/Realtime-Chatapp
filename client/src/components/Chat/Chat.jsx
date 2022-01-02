import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io, { Socket } from 'socket.io-client';
import { FaBars } from 'react-icons/fa';

import './Chat.css';

import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer'

let socket;

const Chat = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setmessage] = useState('');
    const [messages, setmessages] = useState([]);
    const ENDPOINT = 'https://real-time-chat-app3.herokuapp.com/';

    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(undefined);
  
    useEffect(() => {
      const handleResize = () => setScreenSize(window.innerWidth);
  
      window.addEventListener('resize', handleResize);
  
      handleResize();
  
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    useEffect(() => {
      if (screenSize <= 768) {
        setActiveMenu(false);
      } else {
        setActiveMenu(true);
      }
    }, [screenSize]);

    useEffect(() => {
        const { name, room } = queryString.parse(window.location.search);

        socket = io(ENDPOINT);
        // console.log(socket);

        setRoom(room);
        setName(name);

        socket.emit('join', { name, room }, () => {

        });

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [ENDPOINT, window.location.search]);


    useEffect(() => {
        socket.on('message', (message) => {
            setmessages([...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setmessage(''));
        }
    }

    // console.log(message, messages);

    return (
        <div className='outerContainer'>
            <div className='infoBar'>
                <button className='menu-control-container' onClick={() => setActiveMenu(!activeMenu)}>
                    <FaBars />    
                </button>
                <h2 className='chat-heading'>Chat Room</h2>
            </div>
            <div className={activeMenu ? 'side active' : 'side'}>
                <TextContainer users={users} room={room} />
            </div>
            <div className='container'>
                <Messages messages={messages} name={name} />
                <Input message={message} setmessage={setmessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Chat
