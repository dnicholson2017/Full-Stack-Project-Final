import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { supabase } from "../client";

const Login = () => {

    const navigate = useNavigate ();
    const [credentials, setCredentials] = useState({username:"", password:""})

    const handleChange = (event) => {
        const {name, value} = event.target;
        setCredentials( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const callLogin = async () => {
        try {
            const { data, error } = await supabase
                .from('Users')
                .select()
                .eq('username', credentials.username) // Replace 'username' with the state variable where you're storing the entered username
                .eq('password', credentials.password) // Replace 'password' with the state variable where you're storing the entered password
                .single(); // Assuming each username is unique
    
            if (error) {
                throw error;
            }
    
            if (data) {
                // Login successful, navigate to the user's dashboard or perform any other action
                console.log('Login successful:', data);
                navigate(`/${credentials.username}`)
            } else {
                // Invalid username or password
                console.log('Invalid username or password');
            }
        } catch (error) {
            console.error('Error logging in:', error.message);
        }
    };
    
    const callSignup = () => {
    console.log('call sign up function called');
    }

    return (

        <div>
            <h1>Login</h1>
            <form className='login-form'>

                <label>Username</label>
                <input type='text' id='username' name='username' onChange={handleChange}/><br/>
                <br/>

                <label>Password</label>
                <input type='password' id='password' name='password' onChange={handleChange}/><br/>
                <br/>

                {/* By default, when you click a button inside a form without specifying a type attribute,
                 the button behaves like a submit button. When you click it, the form is submitted, 
                 causing a reload or a change in the URL. */}

                <button type="button" onClick={callLogin}>Login</button>
                <Link to={'/sign-up'}>
                    <button type="button" onClick={callSignup}>Sign-Up</button>
                </Link>

                {/* <input type="submit" value="Submit" onClick={callLogin} /> */}

            </form>
        </div>
      )
}

export default Login