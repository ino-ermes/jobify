import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import {HiChevronDoubleLeft, HiChevronDoubleRight} from 'react-icons/hi';

function PageBntContainner() {
    const {numOfPages, page, changePage} = useAppContext();
    const nextPage = () => {
        changePage(page + 1 > numOfPages ? 1 : page + 1);
    };
    const prevPage = () => {
        changePage(page - 1 < 1 ? numOfPages : page - 1);
    };
    const pages = Array.from({length: numOfPages}, (_, index) => index + 1);
    return (
        <Wrapper>
            <button className='prev-btn' onClick={prevPage}>
                <HiChevronDoubleLeft />
                prev
            </button>
            <div className='btn-container'>
                {pages.map((value) => {
                    return (
                        <button className={page === value ? 'pageBtn active' : 'pageBtn'} onClick={() => changePage(value)} key={value}>
                            {value}
                        </button>
                    );
                })}
            </div>
            <button className='next-btn' onClick={nextPage}>
                next
                <HiChevronDoubleRight />
            </button>
        </Wrapper>
    );
}

export default PageBntContainner;