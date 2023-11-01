import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useCookies } from 'react-cookie'


const MatchesDisplay = ({ matches, setClickedUser, toggleChat }) => {

  const [matchedProfiles, setMatchedProfiles] = useState(null)
  const [checkMatchedProfiles, setCheckMatchedProfiles] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['token'])


  const matchedUserIds = matches.map(({ user_id }) => user_id)
  const userId = cookies.UserId

  const getMatches = async() => {
    try {
      const response = await axios.get('http://localhost:8000/users', {
        params: { userIds: JSON.stringify(matchedUserIds)}
      })
      setMatchedProfiles(response.data)
    } catch (err) {
      console.log(err);
    }
  }

  const checkMatches = async() => {
    try {
      const userId = cookies.UserId
      const response = await axios.get(`http://localhost:8000/check-matches/${userId}`)
      console.log('test12345', response)
      setCheckMatchedProfiles(response.data)
      
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getMatches()
    checkMatches()
  },[])

  // const filteredMatchedProfiles = matchedProfiles?.filter(matchedProfile => matchedProfile.matches.filter(profile => profile.user_id === userId).length > 0)
  // matchedProfiles for Likes
  const itMatches = checkMatchedProfiles
  console.log('itmatches', itMatches)
  return (
    <div className='matches-display'>
      {itMatches?.map((match) => (
        <div key={match.user_id} className='match-card' onClick={() => {
          toggleChat(); // Call the toggleChat function to toggle Chat's active state
          setClickedUser(match);
        }}>
          <div className="img-container">
            <img src={match?.url} alt={match?.first_name + ' profile'}/>
          </div>
          <h3>{match?.first_name}</h3>
        </div>
      ))}
    </div>
  )
}

export default MatchesDisplay