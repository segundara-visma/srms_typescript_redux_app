import { useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    const path = location.pathname.split('/').pop()

    return (
        <div className='py-4 pageTitle'>
            {path && path !== 'login' && path?.charAt(0).toUpperCase() + path.slice(1)}
            {/* {location.pathname.split('/').pop() === '' && 'profile'.toUpperCase()} */}
        </div>
    );
}

export default Header;