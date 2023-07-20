// components/Layout.js
import Link from 'next/link';

export default function Layout({ children }) {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link legacyBehavior href="/">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="/profile">
                            <a>Profile</a>
                        </Link>
                    </li>
                </ul>
            </nav>
            {children}
        </div>
    );
}
