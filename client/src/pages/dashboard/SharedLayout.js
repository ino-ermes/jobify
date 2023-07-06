import {Link, Outlet} from 'react-router-dom';
import Wrapper from '../../assets/wrappers/SharedLayout';
import {Navbar, SmallSidebar, BigSidebar} from '../../components';

function SharedLayout() {
    return (
        <Wrapper>
            <main className='dashboard'>
                <SmallSidebar />
                <BigSidebar />
            <div style={{minHeight: '1000px'}}>
                <Navbar />
                <div className='dashboard-page'>
                    <Outlet />
                </div>
            </div>
            </main>
        </Wrapper>
    );
}

export default SharedLayout;