import { useState, useEffect } from 'react';
import './Style/Log.css';
import { createLogAPI, getLogs } from './LogAPI';

const Log = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getLogs();
                setLogs(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [regno, setRegno] = useState('');
    const [year, setYear] = useState('');
    const [department, setDepartment] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const validateEmailDomain = (email) => {
        const domain = '@ritrjpm.ac.in';
        return email.endsWith(domain);
    };

    const extractRegnoFromEmail = (email) => {
        const regno = email.split('@')[0];
        setRegno(regno);

        if (regno.startsWith("9536")) {
            const year = regno.slice(4, 6);
            setYear(year);

            const department = regno.slice(6, 9);
            setDepartment(department);
        } else {
            setYear("None");
            setDepartment("None");
        }
    };

    const postLog = async (data) => {
        try {
            await createLogAPI(data);
            alert('Log created successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to create item');
        } finally {
            setIsLoading(false);
        }
    }

    const handleLogin = () => {
        if (!email.trim() || !password.trim()) {
            alert("Please fill out all fields.");
            return;
        }
        if (!validateEmailDomain(email)) {
            alert("Please use your ritrjpm.ac.in email address.");
            return;
        }
        extractRegnoFromEmail(email);
        setIsLoading(true);

        const user = logs.find(log => log.Email === email && log.Password === password);
        if (user) {
            alert("Welcome");
        } else {
            alert("Invalid email or password.");
        }
        setIsLoading(false);
    };

    const handleSignUp = () => {
        if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            alert("Please fill out all fields.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        if (!validateEmailDomain(email)) {
            alert("Please use your ritrjpm.ac.in email address.");
            return;
        }
        extractRegnoFromEmail(email);
        setIsLoading(true);
        const data = { Name: name, Email: email, Password: password, RegNo: regno, Year: year, Department: department };
        postLog(data);
    };

    return (
        <div>
            <div className='Log-Cont'>
                {isLoggingIn ? (
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
                        <button
                            onClick={handleLogin}
                            className='Login-Button'
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                        <p>
                            Don't have an account? 
                            <button onClick={() => setIsLoggingIn(false)}> Sign Up</button>
                        </p>
                    </div>
                ) : (
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
                            onChange={(e) => {
                                setEmail(e.target.value);
                                extractRegnoFromEmail(e.target.value);
                            }}
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
                        <button
                            onClick={handleSignUp}
                            className='SignUp-Button'
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing up...' : 'Sign Up'}
                        </button>
                        <p>
                            Already have an account? 
                            <button onClick={() => setIsLoggingIn(true)}> Login</button>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Log;
