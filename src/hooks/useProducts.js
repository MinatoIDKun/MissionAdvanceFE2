import React, { useState, useEffect, useCallback } from 'react';
import { API_ENDPOINT } from '../services/api/api';
import axios from 'axios';

export function useProducts () {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = useCallback(async () => {
      setLoading(true)
      setError(null)
    
    // Fetching products from the API
      try {
          const response = await axios.get(`${API_ENDPOINT.PRODUCTS}`);
          console.log('API Response:', response.data);
            
          if (Array.isArray(response.data)) {
              const formattedData = response.data.map(item => ({
                  id: item.id,
                  image: item.image,
                  title: item.title,
                  description: item.description,
                  avatar: item.avatar,
                  role: item.role,
                  profileIcon: item.profileIcon,
                  ratingIcon: item.ratingIcon,
                  rating: item.rating,
                  price: item.price,
                  category: item.category
              }));
                
              setProducts(formattedData);
              console.log('Formatted Data:', formattedData);
          } else {
              console.error('API did not return an array:', response.data);
              setError('Data format error');
          }
      } catch (error) {
          console.error('Error fetching data:', error);
          setError('Failed to fetch data');
      } finally {
          setLoading(false);
      }
  }, []);

      useEffect(() => {
      fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts};
}