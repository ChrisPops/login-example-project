import { useState } from 'react';

import LoginForm from './components/LoginForm';
import Greeting from './components/Greeting';

function App() {  
  const [token, setToken] = useState('');

  return (
    <>
      <div className="text-center mt-20">
        <h1 className="text-4xl  mb-6"><span className="bg-gray-900 text-red-500 p-1 rounded-md">Top Secret</span> Information</h1>
        <Greeting token={token} />
      </div>
      <LoginForm setToken={setToken} />
    </>
  )
}

export default App
