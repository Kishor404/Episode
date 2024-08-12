import { useState } from 'react';
import './Style/Log.css';
import { createLogAPI, checkLogAPI } from './LogAPI';
import Cookies from 'js-cookie';

const Log = () => {

    const LogRegNo = Cookies.get('RegNo');
    const LogYear = Cookies.get('Year');
    const LogDept = Cookies.get('Dept');
    const LogName = Cookies.get('Name');
    const LogPos = Cookies.get('Position');
    const isLogged = Cookies.get('Log') === 'true'; // Check if the user is logged in

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

    const AuthLog = async (data) => {
        try {
            setIsLoading(true);
            const autho = await checkLogAPI(data);
            console.log(autho.data.check);
            if (autho) {
                if (autho.data.check === 1) {
                    Cookies.set('Log', 'true', { expires: 7 });
                    Cookies.set('Name', autho.data.Name, { expires: 7 });
                    Cookies.set('Dept', autho.data.Dept, { expires: 7 });
                    Cookies.set('Year', autho.data.Year, { expires: 7 });
                    Cookies.set('RegNo', autho.data.RegNo, { expires: 7 });
                    Cookies.set('Position', autho.data.Position, { expires: 7 });
                    window.location.reload();// Reload the page to reflect changes
                } else if (autho.data.check === 404) {
                    alert("Invalid Email!");
                } else if (autho.data.check === 0) {
                    alert("Password Incorrect");
                }
            }

            setIsLoading(false);
        } catch (error) {
            console.error(error);
            alert('Check Internet');
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
        
        const Logx = { "email": email, "password": password };
        AuthLog(Logx);
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

    const LogOut = () => {
        Cookies.remove('Log');
        Cookies.remove('RegNo');
        Cookies.remove('Year');
        Cookies.remove('Dept');
        Cookies.remove('Name');
        Cookies.remove('Position');
        window.location.reload(); // Reload the page after logging out
    }

    return (
        <div>
            <div className='Log-Cont'>
                {!isLogged ? (
                    isLoggingIn ? (
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
                    )
                ) : (
                    <div className='LogID'>
                        <p>{LogName}</p>
                        <p>{LogPos}</p>
                        <p>{LogRegNo}</p>
                        <p>{LogDept}</p>
                        <p>{LogYear}</p>
                        <button onClick={LogOut}>LogOut</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Log;
