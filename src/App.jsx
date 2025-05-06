import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Person from './components/Person'
import Message from './components/Messages'
function App(){
  return (
    <>
    <div style={{
           display: 'flex',
           justifyContent: 'center',
           alignItems: 'center',
           height: "100vh"
    }}>
      <div style={{
        display: 'flex',
        backgroundColor: "#FFFEFF",
        borderRadius: "10px",
        width: '70%',
        height: '85%'
      }}>
          <div className='leftSection'>
            <div className='searchSection' >
              <FontAwesomeIcon icon={faMagnifyingGlass} className='searchIcon' />
              <input type="text" placeholder='Search' className='searchInput' />
            </div>
            <div className='nameSection'>
              <Person name={'Alice'} message={'Hi!'} />
              <Person name={'John'} message={'Hello'} />
              <Person name={'Jack'} message={'How are you doing'} />
              <Person name={'Ali'} message={'Yo'} />
              <Person name={'Hani'} message={'Fantastic!'} />
              <Person name={'Neil'} message={'Who are you?'} />
              <Person name={'Abdullah'} message={'Cute'} />
              <Person name={'Hassan'} message={'Hello Friend'} />
              <Person name={'Ahmed'} message={'kya haal chaal ha'} />
              <Person name={'Rayan'} message={'aur suna bhai'} />
            </div>
          </div>
          <div className='chatSection' style={{
            width: "45%"
          }}>
              <div style={{
                display: 'flex',
                fontFamily: "sans-serif",
                padding: "10px 25px",
                border: "1px solid #d1d1d1",
                borderLeft: 'none',
                width: '100%'
              }}>
                <img src="https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure.webp" alt="" style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: '50%'
                }} />
                <span style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '3px',
                  marginLeft: '10px',
                  marginTop: '4px'
                }}>
                  <h3 style={{
                    fontWeight: 'lighter',
                    fontSize: '18px'
                  }}>Alice</h3>
                  <p style={{
                    fontWeight: 'lighter',
                    fontSize: '12px',
                    color: "#909090"
                  }}>Online</p>
                </span>
              </div>


              {/* Messaged Section... Messages come here */}

              <Message />
          </div>
          <div className='rightSection'>

          </div>
      </div>
    </div>
    </>
  )
}

export default App