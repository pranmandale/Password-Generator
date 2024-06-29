import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumeberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  // useRef method hook we are using
  const passwordRef = useRef()


  // useCallback method we are using
  const generatepassword = useCallback(() => {
    let pass = ""
    let str = "ABCREFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_+"

    for(let i = 1; i<length;i++) {
     const char =   Math.floor(Math.random() * str.length + 1)
     pass += str.charAt(char)
    }

    setPassword(pass)

  },[length, numberAllowed,charAllowed])


  // useEffect method we are using
 useEffect(() => {
 generatepassword()
  },[length, numberAllowed, charAllowed])

  const copyPasswordToclipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  return (
    
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-3xl font-bold mb-2 text-center'>Password Generator</h1>
      {/* <h1 className='text-white text-center my-3'>Password Generator</h1> */}
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input
      type="text"
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='password'
      readOnly
      ref={passwordRef}
      />
      <button
      onClick={copyPasswordToclipboard} 
      className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>

    </div>

    <div className='flex text-5m gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type='range'
          min={6}
          max={20}
          value={length}
          className='curson-pointer'
          onChange={(e) => setLength(e.target.value)}
          name=""
          id=""
          />
          <label htmlFor='length'>Length : {length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input 
          type='checkbox'
          defaultChecked={numberAllowed}
          onChange={() => {
            setNumeberAllowed((prev) => !prev)
          }}
          name=""
          id=""
          />
          <label htmlFor='number'>Numbers</label>

        </div>

        <div className='flex items-center gap-x-1'>
          <input 
          type='checkbox'
          defaultChecked={charAllowed}
          onChange={() => {
            setCharAllowed((prev) => !prev)
          }}
          name=""
          id=""
          />
          <label htmlFor='charInput'>Character</label>

        </div>
    </div>

    </div>


  )
}

export default App
