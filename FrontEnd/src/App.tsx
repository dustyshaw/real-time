
import { useContext, useEffect, useState } from 'react'
import './App.css'
import VehicleComponent from './component/VehicleComponent'
import { GameServerContext } from './component/GameServercontext'

function App() {
  // const [count, setCount] = useState(0)
  const gameContext = useContext(GameServerContext)
  const [ticking, setTicking] = useState(true),
    [count, setCount] = useState(0)

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {

    if(event.key === 'w'){
      console.log('move forward ')
      gameContext?.updateVehicle(1, "moveForward")
    }
    if (event.key === 's') {
      console.log('move backward')
      gameContext?.updateVehicle(1, "moveBackward")
    }
    if (event.key == 'a') {
      console.log('turn left')
    }
    if (event.key == 'd') {
      console.log('turn right')
    }
  }

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {

    if(event.key === 'w'){
      console.log('stop moving forward ')
    }
    if (event.key === 's') {
      console.log('stop move backward')
    }
    if (event.key == 'a') {
      console.log('stope turn left')
    }
    if (event.key == 'd') {
      console.log('stop turn right')
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => ticking && setCount(count + 1), 10)
    // console.log("hello?")
    return () => clearTimeout(timer)
  }, [count, ticking])

  return (
    <>
      <div className='w-screen h-screen ' style={{ width: "100vw", height: "100vh", backgroundColor: "lightskyblue" }} onKeyDown={handleKeyPress} onKeyUp={handleKeyUp}
        tabIndex={0}  // Make the div focusable 
      >

        <VehicleComponent />
      </div>
    </>
  )
}

export default App
