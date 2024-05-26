import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function FurnitureListPage() {
    const [content, setContent] = useState(null);
    const [totalPage, setTotalPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [inputValues, setInputValues] = useState({
        name: '',
        type: 'All',
        discount: false,
        priceOrder: 'default',
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

    const handleTypeChange = (e) => {
        setInputValues(prevValues => ({
            ...prevValues,
            type: String(e.target.value),
            pageNumber: 1
        }));
    }

    const handleKeywordChange = () => {
        const searchQuery = document.getElementById('search-input').value;
        console.log("searchQuery: ", searchQuery);
        setInputValues(prevValues => ({
            ...prevValues,
            name: String(searchQuery).trim(),
            pageNumber: 1
        }));
    }

    const handleIsDiscount = () => {
        setInputValues(prevValues => ({
            ...prevValues,
            discount: !prevValues.discount,
            pageNumber: 1
        }));
    }

    const handlePriceOrder = () => {
        if (inputValues.priceOrder === 'default') {
            setInputValues(prevValues => ({
                ...prevValues,
                priceOrder: "min",
                pageNumber: 1
            }));
        }
        else if (inputValues.priceOrder === 'min') {
            setInputValues(prevValues => ({
                ...prevValues,
                priceOrder: "max",
                pageNumber: 1
            }));
        }
        else if (inputValues.priceOrder === 'max') {
            setInputValues(prevValues => ({
                ...prevValues,
                priceOrder: "default",
                pageNumber: 1
            }));
        }
    }

    const handleImageError = (e) => {
        e.target.src = "https://via.placeholder.com/400";
    };

    useEffect(() => {
        async function fetchcontent() {
        try {
            let apiUrl;
            if (inputValues.type === 'All') {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                apiUrl = `http://35.226.59.207/furniture/list?name=${inputValues.name}&priceOrder=${inputValues.priceOrder}&discount=${inputValues.discount}&pageNumber=${inputValues.pageNumber}`;
            }
            else {
                apiUrl = `http://35.226.59.207/furniture/list?name=${inputValues.name}&priceOrder=${inputValues.priceOrder}&discount=${inputValues.discount}&pageNumber=${inputValues.pageNumber}&type=${inputValues.type}`;
            }

            // debug
            console.log(apiUrl);
            
            // eslint-disable-next-line no-undef
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const jsoncontent = await response.json();
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
        return <div className='text-center mt-80'>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    // PAGINATE BUTTON
    let paginateButton;
    if (totalPage !== 1 && totalPage !== 0) {
        if (inputValues.pageNumber === totalPage) {
            paginateButton = <button className="btn bg-gray-900 text-white hover:bg-cyan-700" onClick={decrementPageNumber}>
                                <FontAwesomeIcon icon={['fas', 'chevron-left']} />
                            </button>
        } 
        
        else if (inputValues.pageNumber === 1) {
            paginateButton = <button className="btn bg-gray-900 text-white hover:bg-cyan-700" onClick={incrementPageNumber}>
                                <FontAwesomeIcon icon={['fas', 'chevron-right']} />
                            </button>             
        }
        
        else {
            paginateButton = <div>
                                <button className="btn bg-gray-900 text-white hover:bg-cyan-700" onClick={decrementPageNumber}>
                                    <FontAwesomeIcon icon={['fas', 'chevron-left']} />
                                </button>
                                <button className="btn bg-gray-900 text-white hover:bg-cyan-700" onClick={incrementPageNumber}>
                                    <FontAwesomeIcon icon={['fas', 'chevron-right']} />
                                </button> 
                             </div>
        }
    }

    //PRICEORDER
    let price;
    if (inputValues.priceOrder === 'default') {
        price = <button className="btn bg-gray-900 text-white hover:bg-cyan-700 border-gray-300 border-b-2 ml-2 text-sm" onClick={handlePriceOrder}>
                                    Price
                                </button>
    }
    else if (inputValues.priceOrder === 'min') {
        price = <button className="btn bg-gray-900 text-white hover:bg-cyan-700 border-gray-300 border-b-2 ml-2 text-sm" onClick={handlePriceOrder}>
                                    <FontAwesomeIcon icon={['fas', 'caret-down']} /> Price
                                </button>
    }
    else if (inputValues.priceOrder === 'max') {
        price = <button className="btn bg-gray-900 text-white hover:bg-cyan-700 border-gray-300 border-b-2 ml-2 text-sm" onClick={handlePriceOrder}>
                                    <FontAwesomeIcon icon={['fas', 'caret-up']} /> Price
                                </button>
    }


    return (
    <div>
        <div className='text-center mt-6'>

            <select id="furniture-type" className="p-2 rounded-md border-gray-300 border-b-2 text-sm" 
            value={inputValues.type} onChange={handleTypeChange}>
                <option value="All">All</option>
                <option value="Seating">Seating</option>
                <option value="Tables">Tables</option>
                <option value="Storage">Storage</option>
                <option value="Beds">Beds</option>
                <option value="Desks">Desks</option>
                <option value="Outdoor Furniture">Outdoor Furniture</option>
                <option value="Entertainment Units">Entertainment Units</option>
                <option value="Accent Furniture">Accent Furniture</option>
                <option value="Office Furniture">Office Furniture</option>
                <option value="Dining Furniture">Dining Furniture</option>
            </select>

            
            <input id="search-input" type="text" placeholder="Search a furniture...." className="border-b-2 border-gray-300 bg-white h-10 pr-36 pl-4 rounded-md shadow-sm text-sm ml-1 sm:pr-60" />
            <button type="submit" onClick={handleKeywordChange} className="px-2 text-sm sm:px-4 py-2 bg-gray-900 text-white hover:bg-cyan-700 rounded-md shadow-sm border-b-2 border-gray-300">search</button>
            
            {price}
        </div>
        
        <div className='text-center mt-2'>
            { inputValues.discount ? (
                <button type="submit" onClick={handleIsDiscount} className="px-2 text-sm sm:px-4 py-2 bg-gray-900 text-white hover:bg-cyan-700 rounded-md shadow-sm border-b-2 border-gray-300">Discount</button>
                ) : (
                <button type="submit" onClick={handleIsDiscount} className="px-2 text-sm sm:px-4 py-2 hover:bg-cyan-700 rounded-md shadow-sm border-b-2 border-gray-300">Discount</button>
            )}
           
            

        </div>

        <div className='my-6 ml-4'>
            {paginateButton}
        </div>
        {content.map((props, key) => (
        <Link to={ `/furniture/details/${ props.internalId }`}>
        <div class="bg-white shadow-md rounded-lg flex my-2 mx-4">
        <img
          src={props.imageUrl}
          onErro={handleImageError}
          className="card-img-left"
          alt={props.name}
          style={{ width: '150px', height: '150px', objectFit: 'cover' }}
        />
            <div class="p-4">
                <h2 class="text-lg font-semibold">{ props.name }</h2>
                <p class="text-sm">Type: { props.type }</p>
                <p class="text-sm">Price: { props.discountedPrice }</p>
                <p class="text-sm">Sold: { props.soldQuantity }</p>
            </div>
        </div>
        </Link>
        ))}
    </div>
    )
}

export default FurnitureListPage;
