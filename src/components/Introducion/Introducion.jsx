import './Introducion.css'
import React from 'react';


export function Introducion() {

    return (
        <>
            <div>
                <section className='section'>
                    <div className='container'>
                        <div className='title'>
                        <h1>Welcome! </h1>
                        <h4>Instructions</h4>
                        </div>
                        <div className='corpo'>
                        <p> This application allows you to search information about GitHub users in two tabs: "List of users" and "Find a user". In the "List of users" tab, just type a number you want in the "since" field, then the application will only return users with an id greater than the informed id. In the "Find a user" tab, type the name of the user you want to search for and click the "Search" button to find more detailed information about the user and their GitHub repositories. </p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}