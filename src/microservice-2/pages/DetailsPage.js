import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DetailsPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { furnitureId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        let apiUrl = `http://35.226.59.207/furniture/get/${furnitureId}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/400";
  };

  if (isLoading) {
    return <div className='text-center mt-80'>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="w-100 h-100 d-flex flex-row">
        <img
          src={data.imageUrl}
          onError={handleImageError}
          className="card-img-left mt-24 ml-20"
          alt={data.name}
          style={{ width: '400px', height: '400px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column w-100 ml-8 mt-24">
          <h5 className="card-title text-3xl font-extrabold">{data.name}</h5>
          <p className="card-text text-lg"><strong>Type:</strong> {data.type}</p>
          <p className="card-text text-lg"><strong>Sold Quantity:</strong> {data.soldQuantity}</p>
          
          { data.hasDiscount ? (
            <p className="card-text text-lg">
              <strong>Price:</strong> <span className="text-muted"><del>${data.originalPrice}</del></span> <span className="text-danger">${data.discountedPrice}</span>
            </p>
          ) : (
            <p className="card-text text-lg">
              <strong>Price:</strong> <span className="">${data.discountedPrice}</span> 
            </p>
          )}
          <p className="card-text text-lg"><strong>Description:</strong></p>
          <p> {data.description} </p>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
