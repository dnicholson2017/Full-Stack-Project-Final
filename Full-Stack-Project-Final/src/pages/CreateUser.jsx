import React, { useState } from "react";
import { supabase } from '../client';


const CreateUser = () => {

    // first create state variables that will have the state of the required data to be sent to supabase
    const [user, setUser] = useState({username:"", password:"", firstname:"", lastname: "" });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUser( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createUser = async (event) => {
        event.preventDefault();
    
        try {
            const { data, error } = await supabase
                .from('Users')
                .insert({ username: user.username, password: user.password, firstname: user.firstname, lastname: user.lastname })
                .select();
    
            if (error) {
                throw error;
            }
    
            console.log('User created successfully:', data);
        } catch (error) {
            console.error('Error creating user:', error.message);
        }
        // If there are 401 errors in a supabase project ensure that you investigate RLS (Row Level Security) status.
        // It is likely the reason you can't make changes to the table

        // Returns us to home page after submitting
        // window.location = "/";
        console.log('Submit clicked');
        console.log(user);
        console.log(supabase);
    }

    return (
        <div>
            <form>
                <label for="firstname">Firstname</label> <br />
                <input type="text" id="firstname" name="firstname" onChange={handleChange} /><br />
                <br/>

                <label for="lastname">Lastname</label> <br />
                <input type="text" id="lastname" name="lastname" onChange={handleChange} /><br />
                <br/>

                <label for="username">Username</label> <br />
                <input type="text" id="username" name="username" onChange={handleChange} /><br />
                <br/>

                <label for="password">Password</label> <br />
                <input type="password" id="password" name="password" onChange={handleChange} /><br />
                <br/>

                <input type="submit" value="Submit" onClick={createUser} />
                
            </form>
        </div>
    )
}

export default CreateUser;