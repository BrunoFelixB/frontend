import './Header.css'
import React from 'react';
import { Link } from 'react-router-dom';

export function Header(props) {


    return (
        <>
            <header className="header">
                <nav className="nav">

                    <div className="nav_menu">

                        <Link className='link' to="/">
                            <div className={props.number == 1 ? 'nav_item_active' : 'nav_item_1'}>
                                <h1 className='text_nav'>Start</h1>
                            </div>
                        </Link>

                        <Link className='link' to="/userlist">
                            <div className={props.number == 2 ? 'nav_item_active' : 'nav_item_2'}>
                                <h1>User list</h1>
                            </div>
                        </Link>

                        <Link className='link' to="/finduser">
                            <div className={props.number == 5 ? 'nav_item_active' : 'nav_item_3'}>
                                <h1>Find a user</h1>
                            </div>
                        </Link>

                    </div>

                </nav>
            </header>
        </>
    );
}