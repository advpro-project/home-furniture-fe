import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function FurnitureListPage() {
    const [content, setContent] = useState(null);
    const [totalPage, setTotalPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [inputValues, setInputValues] = useState({
        name: '',
        type: 'All',
        discount: 'false',
        priceOrder: '',
        pageNumber: 1,
    });

    const incrementPageNumber = () => {
        setInputValues(prevValues => ({
            ...prevValues,
            pageNumber: prevValues.pageNumber + 1
        }));
    }

    const decrementPageNumber = () => {
        setInputValues(prevValues => ({
            ...prevValues,
            pageNumber: prevValues.pageNumber - 1
        }));
    }

    
    useEffect(() => {
        async function fetchcontent() {
        try {
            setIsLoading(true);
            let apiUrl;
            if (inputValues.type = 'All') {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                apiUrl = `http://35.226.59.207/furniture/list?name=${inputValues.name}&priceOrder=${inputValues.priceOrder}
                &discount=${inputValues.discount}&pageNumber=${inputValues.pageNumber}`;
            }
            else {
                apiUrl = `http://35.226.59.207/furniture/list?name=${inputValues.name}&priceOrder=${inputValues.priceOrder}
                &discount=${inputValues.discount}&pageNumber=${inputValues.pageNumber}&type=${inputValues.type}`;
            }

            // debug
            console.log(apiUrl);
            
            // eslint-disable-next-line no-undef
            const response = await fetch(apiUrl);
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            const jsoncontent = await response.json();
            console.log(jsoncontent);
            setContent(jsoncontent.content);
            setTotalPage(jsoncontent.totalPages);
            setIsLoading(false);

            console.log(jsoncontent.totalPages);

        
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
        }

        fetchcontent();
    }, [inputValues]);

    if (isLoading) {
        return <div className='text-center pt-5'>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    let paginateButton = <div>
                            <button className="btn btn-primary" onClick={decrementPageNumber}>
                                <FontAwesomeIcon icon={['fas', 'chevron-left']} />
                            </button>
                            <button className="btn btn-primary" onClick={incrementPageNumber}>
                                <FontAwesomeIcon icon={['fas', 'chevron-right']} />
                            </button>
                        </div>

    if (inputValues.pageNumber === totalPage) {
        paginateButton = <button className="btn btn-primary" onClick={decrementPageNumber}>
                            <FontAwesomeIcon icon={['fas', 'chevron-left']} />
                        </button>
    } 
    
    if (inputValues.pageNumber === 1) {
        paginateButton = <button className="btn btn-primary" onClick={incrementPageNumber}>
                            <FontAwesomeIcon icon={['fas', 'chevron-right']} />
                        </button>
    }

    return (
    <div>
        <input id="search-input" type="text" name="q" placeholder="Search a book" class="border-b-2 border-gray-300 bg-white h-10 pr-36 pl-4 rounded-md shadow-sm text-sm ml-1 sm:pr-60" />
        <button type="submit" class="px-2 text-sm sm:px-4 py-2 bg-cyan-500 text-white hover:bg-cyan-700 rounded-md shadow-sm border-b-2 border-gray-300">search</button>
        
        <div className='mt-6'>
            {paginateButton}
        </div>

        <pre>{JSON.stringify(content, null, 2)}</pre>
    </div>
    );
}

    export default FurnitureListPage;
