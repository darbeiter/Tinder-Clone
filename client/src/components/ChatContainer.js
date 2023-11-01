import React, { useState } from 'react'
import ChatHeader from './ChatHeader'
import ChatDisplay from './ChatDisplay'
import MatchesDisplay from './MatchesDisplay'

export const ChatContainer = ({ user }) => {
  const [ clickedUser, setClickedUser ] = useState(null) 
  const [matchesActive, setMatchesActive] = useState(true);
  const [chatActive, setChatActive] = useState(false);

  const toggleMatches = () => {
    setMatchesActive(true);
    setChatActive(false);
    setClickedUser(null);
  };

  const toggleChat = () => {
    setMatchesActive(false);
    setChatActive(true);
  };

  console.log('test1', matchesActive)
  console.log('test2', chatActive)
  return (
    <div className='chat-container'>
      <ChatHeader user={user} />
      <div>
        <button className={`option ${matchesActive  === true ? 'active' : ''}`} onClick={toggleMatches}>Matches</button>
        <button className={`option ${chatActive  === true ? 'active' : ''}`} disabled={!clickedUser}>Chat</button>
      </div>
      {!clickedUser && <MatchesDisplay matches={user.matches} setClickedUser={setClickedUser} toggleChat={toggleChat}/>}
      {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser}/>}
    </div>
  )
}
export default ChatContainer