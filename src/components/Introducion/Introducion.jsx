import './Introducion.css'
import React from 'react';


export function Introducion() {

    return (
        <>
            <div>
                <section className='section'>
                    <div className='container'>
                        <div className='title'>
                        <h1>Welcome</h1>
                        <h4>Instructions</h4>
                        </div>
                        <div className='corpo'>
                        <p> Navigate between the tabs above, in users type from which id number you want, in Repos just type the user name to find the desired information. </p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}