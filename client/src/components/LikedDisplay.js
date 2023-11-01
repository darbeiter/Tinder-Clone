import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useCookies } from 'react-cookie'


const LikedDisplay = ({ matches, setClickedUser }) => {

  const [likedProfiles, setLikedProfiles] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['token'])


  const likedUserIds = matches.map(({ user_id }) => user_id)
  const userId = cookies.UserId

  const getLikedPersons = async() => {
    try {
      const response = await axios.get('http://localhost:8000/users', {
        params: { userIds: JSON.stringify(likedUserIds)}
      })
      setLikedProfiles(response.data)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getLikedPersons()
  },[])

  return (
    <div className='matches-display'>
      {likedProfiles?.map((match) => (
        <div key={match.user_id} className='match-card' onClick={() => setClickedUser(match)}>
          <div className="img-container">
            <img src={match?.url} alt={match?.first_name + ' profile'}/>
          </div>
          <h3>{match?.first_name}</h3>
        </div>
      ))}
    </div>
  )
}

export default LikedDisplay