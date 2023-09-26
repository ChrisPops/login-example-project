import { useState } from 'react'

function validateEmail(email) {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,63}$/;
  return regex.test(String(email).toLowerCase());
}

function LoginForm({setToken}) {
  // config
  const minPasswordLength = 6;

  // state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({body: '', type: ''});

  // UI Values
  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= minPasswordLength ? true : false;
  const isLoginFormSubmittable = (isEmailValid === true && isPasswordValid === true) ? true : false;
  const loginButtonStyle = (isLoginFormSubmittable ? 'bg-slate-800 cursor-pointer' : 'bg-slate-300 cursor-not-allowed')

  function onEmailChange(e) {
    setEmail(e.target.value)
  }

  function onPasswordChange(e) {
    setPassword(e.target.value)
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: "POST", 
        body: JSON.stringify({email, password}),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }  
      });
      if (!response.ok) {
        throw new Error('Response Error.', {
          cause: {response}
        })
      }
      const tokenObject = await response.json();
      setStatus({body: 'Success', style: 'bg-green-50 text-green-800'});
      setToken(tokenObject.token);
      
    } catch(error) {
      const errorObject = await error.cause.response.json();
      setStatus({body: 'Error: ' + errorObject.error, style: 'bg-red-50 text-red-800'});
      setToken('');
    }
    setEmail('');
    setPassword('');
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

        <div className={'p-4 mb-4 text-sm rounded-lg ' + status.style} role="alert">
          <p className='font-medium'>{status.body}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="email"
                 className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
          <input type="email" 
                  id="email" 
                  autoFocus
                  name="email" 
                  value={email} 
                  tabindex="1"
                  onChange={onEmailChange} 
                  placeholder="Email" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          <div className="min-h-[30px] pt-2">
            {(email.length > 0 && isEmailValid === false) &&
              <p className="text-red-500 text-xs italic">This email address must be valid.</p>
            }
          </div>
        </div>

        <div className="mb-10">
          <label htmlFor="password"
                  className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
          <input type="password" 
                  id="password" 
                  name="password" 
                  value={password} 
                  onChange={onPasswordChange} 
                  tabindex="2"
                  placeholder="Password" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          <div className="min-h-[30px] pt-2">      
            {(password.length > 0 && password.length < minPasswordLength) &&
            <p className="text-red-500 text-xs italic">The password must be at least {minPasswordLength} characters long.</p>
            }
          </div>
        </div>

        <div className="mb-4">
          <input type="submit" 
                  id="submit" 
                  name="submit"
                  tabindex="3"
                  className={'block w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ' + loginButtonStyle}
                  value="Submit" disabled={!isLoginFormSubmittable} 
          />
        </div>

      </form>
    </>
  )
}

export default LoginForm
