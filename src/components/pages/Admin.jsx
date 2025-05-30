import React, { useState, useEffect } from 'react';
import { API_ENDPOINT } from '../../services/api/api';
import axios from 'axios';
import Card from '../molecules/Card';

function Admin() {
  const [cards, setCards] = useState([]);
  const [formData, setFormData] = useState({
    imageUrl: "",
    title: "",
    description: "",
    avatar: "",
    role: "",
    ratingIcon: "src/assets/images/yellow-star.svg",
    rating: "",
    profileIcon: "",
    price: "",
    category: "semua"
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all cards from API
  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_ENDPOINT.PRODUCTS);
      console.log('Fetched data:', response.data);
      setCards(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching cards:', err);
      setError('Failed to fetch cards. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'image') {
          setImagePreview(reader.result);
          setFormData({
            ...formData,
            imageUrl: reader.result
          });
        } else if (type === 'avatar') {
          setAvatarPreview(reader.result);
          setFormData({
            ...formData,
            profileIcon: reader.result
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      imageUrl: "",
      title: "",
      description: "",
      avatar: "",
      role: "",
      ratingIcon: "src/assets/images/yellow-star.svg",
      rating: "",
      profileIcon: "",
      price: "",
      category: "semua"
    });
    setImagePreview(null);
    setAvatarPreview(null);
    setEditMode(false);
    setCurrentId(null);
  };

  const handleAddNew = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleEdit = (id) => {
    const cardToEdit = cards.find(card => card.id === id);
    if (cardToEdit) {
      setFormData({
        imageUrl: cardToEdit.image || "",
        title: cardToEdit.title || "",
        description: cardToEdit.description || "",
        avatar: cardToEdit.avatar || "",
        role: cardToEdit.role || "",
        ratingIcon: cardToEdit.ratingIcon || "src/assets/images/yellow-star.svg",
        rating: cardToEdit.rating || "",
        profileIcon: cardToEdit.profileIcon || "",
        price: cardToEdit.price || "",
        category: cardToEdit.category || "semua"
      });
      setImagePreview(cardToEdit.image);
      setAvatarPreview(cardToEdit.profileIcon);
      setEditMode(true);
      setCurrentId(id);
      setIsModalOpen(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Format data for API
    const cardData = {
      image: formData.imageUrl,
      title: formData.title,
      description: formData.description,
      avatar: formData.avatar,
      role: formData.role,
      ratingIcon: formData.ratingIcon,
      rating: formData.rating,
      profileIcon: formData.profileIcon,
      price: formData.price,
      category: formData.category
    };
    
    try {
      if (editMode) {
        // Update existing card
        await axios.put(`${API_ENDPOINT.PRODUCTS}/${currentId}`, cardData);
      } else {
        // Create new card
        await axios.post(API_ENDPOINT.PRODUCTS, cardData);
      }
      
      // Refresh cards list
      fetchCards();
      setIsModalOpen(false);
      resetForm();
      setError(null);
    } catch (err) {
      console.error('Error saving card:', err);
      setError(`Failed to ${editMode ? 'update' : 'create'} card. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      setLoading(true);
      try {
        await axios.delete(`${API_ENDPOINT.PRODUCTS}/${id}`);
        fetchCards();
        setError(null);
      } catch (err) {
        console.error('Error deleting card:', err);
        setError('Failed to delete card. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredCards = cards.filter(card => 
    (card.title && card.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (card.description && card.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (card.avatar && card.avatar.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <div className='m-0 p-0 flex flex-col bg-baseBackground min-h-screen'>
        <section className='flex flex-col container m-auto py-8 px-4'>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Card Management</h1>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search cards..."
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-default"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={handleAddNew}
                className="px-4 py-2 bg-primary-default text-white rounded-md hover:bg-primary-dark transition-colors duration-300"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Add New Card'}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p>{error}</p>
            </div>
          )}

          {loading && !isModalOpen && (
            <div className="flex justify-center items-center h-40">
              <p className="text-gray-500">Loading cards...</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!loading && filteredCards.map(card => (
              <div key={card.id} className="relative group">
                <Card 
                  image={card.image}
                  title={card.title}
                  description={card.description}
                  avatar={card.avatar}
                  role={card.role}
                  profileIcon={card.profileIcon}
                  ratingIcon={card.ratingIcon || "src/assets/images/yellow-star.svg"}
                  rating={card.rating}
                  price={card.price}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(card.id)}
                      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(card.id)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!loading && filteredCards.length === 0 && (
            <div className="flex justify-center items-center h-40">
              <p className="text-gray-500">No cards found. Try a different search or add a new card.</p>
            </div>
          )}
        </section>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{editMode ? 'Edit Card' : 'Add New Card'}</h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
                disabled={loading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Image</label>
                    <div className="flex flex-col items-center">
                      {imagePreview && (
                        <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'image')}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-default file:text-white hover:file:bg-primary-dark"
                      />
                    </div>
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Or enter image URL:</label>
                      <input
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        placeholder="https://example.com/image.jpg"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-default focus:ring focus:ring-primary-default focus:ring-opacity-50 p-2 border"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-default focus:ring focus:ring-primary-default focus:ring-opacity-50 p-2 border"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-default focus:ring focus:ring-primary-default focus:ring-opacity-50 p-2 border"
                    ></textarea>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-default focus:ring focus:ring-primary-default focus:ring-opacity-50 p-2 border"
                    >
                      <option value="semua">Semua Kelas</option>
                      <option value="pemasaran">Pemasaran</option>
                      <option value="desain">Desain</option>
                      <option value="pengembangan">Pengembangan Diri</option>
                      <option value="bisnis">Bisnis</option>
                    </select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {/* Avatar Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Instructor Avatar</label>
                    <div className="flex flex-col items-center">
                      {avatarPreview && (
                        <div className="w-20 h-20 mb-4 overflow-hidden rounded-full">
                          <img 
                            src={avatarPreview} 
                            alt="Avatar Preview" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'avatar')}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-default file:text-white hover:file:bg-primary-dark"
                      />
                    </div>
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Or enter avatar URL:</label>
                      <input
                        type="text"
                        name="profileIcon"
                        value={formData.profileIcon}
                        onChange={handleInputChange}
                        placeholder="https://example.com/avatar.jpg"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-default focus:ring focus:ring-primary-default focus:ring-opacity-50 p-2 border"
                      />
                    </div>
                  </div>

                  {/* Instructor Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instructor Name</label>
                    <input
                      type="text"
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-default focus:ring focus:ring-primary-default focus:ring-opacity-50 p-2 border"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Senior accountant di Gojek"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-default focus:ring focus:ring-primary-default focus:ring-opacity-50 p-2 border"
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <input
                      type="text"
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      placeholder="e.g. 3.5 (86)"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-default focus:ring focus:ring-primary-default focus:ring-opacity-50 p-2 border"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. 300K"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-default focus:ring focus:ring-primary-default focus:ring-opacity-50 p-2 border"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-default"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-default hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-default"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : (editMode ? 'Update Card' : 'Create Card')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Admin;