import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import img2 from './assets/img2.jpg'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  // useRef method hook we are using
  const passwordRef = useRef()

  // useCallback method we are using
  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+"

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  // useEffect method we are using
  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charAllowed, generatePassword])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  return (
    <div
      className='min-h-screen bg-cover'
      style={{ backgroundImage: `url(${img2})` }}
    >
      <div className='flex items-center justify-center h-[600px]'>
      <div 
        className='p-5 my-10 text-orange-500 bg-gray-800 rounded-lg shadow-md'
      >
        <h1 className='mb-2 text-3xl font-bold text-center'>Password Generator</h1>
        <div className='flex mb-4 overflow-hidden rounded-lg shadow'>
          <input
            type="text"
            value={password}
            className='w-full px-3 py-1 outline-none'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >
            Copy
          </button>
        </div>

        <div className='flex text-5m gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
              type='range'
              min={6}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label htmlFor='length'>Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
              type='checkbox'
              checked={numberAllowed}
              onChange={() => setNumberAllowed(prev => !prev)}
            />
            <label htmlFor='number'>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
              type='checkbox'
              checked={charAllowed}
              onChange={() => setCharAllowed(prev => !prev)}
            />
            <label htmlFor='char'>Characters</label>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default App
