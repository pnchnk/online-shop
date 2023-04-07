import React, {useState} from 'react';

interface FormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
}

function Form({title, handleClick}:FormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  return (
    <div className='d-flex justify-content-center align-items-center flex-column'>
        <input type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            className='mb-4 rounded'
        />
         <input type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            className='rounded'
        />
        <button onClick={() => handleClick(email, password)} className='mt-3'>
            {title}
        </button>
    </div>
  )
}

export default Form