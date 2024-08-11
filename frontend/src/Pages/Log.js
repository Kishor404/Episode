import { useState } from 'react';
import './Style/Log.css'


const Log = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(true);

    const handleLogin = () => {
        if (!email || !password) {
            alert("Please fill out all fields.");
            return;
        }
        // Handle login logic here
        console.log('Logging in with', email, password);
    };

    const handleSignUp = () => {
        if (!name || !email || !password || !confirmPassword) {
            alert("Please fill out all fields.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        // Handle sign-up logic here
        console.log('Signing up with', name, email, password);
    };

    return (
        <>
            <div>
                <div>
                    <div className='Log-Cont'>
                        {isLoggingIn ? (
                            // Login Form
                            <div className='Login'>
                                <input 
                                    placeholder="College Email Id" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <input 
                                    placeholder="Password" 
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button onClick={handleLogin} className='Login-Button'>Login</button>
                                <p>
                                    Don't have an account? 
                                    <button onClick={() => setIsLoggingIn(false)}> Sign Up</button>
                                </p>
                            </div>
                        ) : (
                            // Sign Up Form 
                            <div className='SignUp'>
                                <input 
                                    placeholder="Name" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <input 
                                    placeholder="College Email Id" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <input 
                                    placeholder="Password" 
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <input 
                                    placeholder="Confirm Password" 
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button onClick={handleSignUp} className='SignUp-Button'>Sign Up</button>
                                <p>
                                    Already have an account? 
                                    <button onClick={() => setIsLoggingIn(true)}> Login</button>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Log;
