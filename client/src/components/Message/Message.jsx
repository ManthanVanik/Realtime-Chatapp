import React from 'react'

import './Message.css'

import ReactEmoji from 'react-emoji';

const Message = ({message:{user, text}, name}) => {
    let isSetByCurrentUser = false;
    let admin = false;

    const trimedName = name.trim().toLowerCase();

    if(user === trimedName) {
        isSetByCurrentUser = true;
    }

    if(user === 'admin') {
        admin = true;
    }

    return (
        isSetByCurrentUser ? (
            <div className='messageContainer justifyEnd'>
                <p className='sentText pr-10'>{trimedName}</p>
                <div className='messageBox backgroundBlue'>
                    <p className='messageText colorWhite'>{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        )
        :(
            <div className='messageContainer justifyStart'>
            {admin 
                ? (<div className='messageBox backgroundAdmin'>
                    <p className='messageText colorDark'>{ReactEmoji.emojify(text)}</p>
                    </div>) 
                : (<>
                    <div className='messageBox backgroundLight'>
                    <p className='messageText colorDark'>{ReactEmoji.emojify(text)}</p>
                    </div>
                    <p className='sentText pl-10'>{user}</p>
                    </>)
            }
            
            </div>
        )
    )
}

export default Message
