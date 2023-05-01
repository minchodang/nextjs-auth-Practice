import Link from 'next/link';
import classes from './main-navigation.module.css';
import { signOut, useSession } from 'next-auth/client';
import React from 'react';

function MainNavigation() {
    const [session, loading] = useSession();
    const logoutHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        signOut({
            redirect: false,
        });
    };
    return (
        <header className={classes.header}>
            <Link href="/">
                <div className={classes.logo}>Next Auth</div>
            </Link>
            <nav>
                <ul>
                    {!session && !loading ? (
                        <li>
                            <Link href="/auth">Login</Link>
                        </li>
                    ) : null}
                    {session ? (
                        <li>
                            <Link href="/profile">Profile</Link>
                        </li>
                    ) : null}
                    {session ? (
                        <li>
                            <button onClick={logoutHandler}>Logout</button>
                        </li>
                    ) : null}
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;
