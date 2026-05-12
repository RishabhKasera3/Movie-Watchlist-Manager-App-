import React, { useState } from 'react';

const GENRES = [
  'Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Romance', 
  'Thriller', 'Documentary', 'Animation', 'Other'
];

export function MovieForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    year: '',
    rating: '',
  });
  
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.genre) newErrors.genre = 'Genre is required';
    
    if (!formData.year) {
      newErrors.year = 'Year is required';
    } else if (isNaN(formData.year) || formData.year < 1888 || formData.year > new Date().getFullYear() + 5) {
      newErrors.year = 'Please enter a valid year';
    }
    
    if (!formData.rating) {
      newErrors.rating = 'Rating is required';
    } else if (isNaN(formData.rating) || formData.rating < 0 || formData.rating > 10) {
      newErrors.rating = 'Rating must be between 0 and 10';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        year: parseInt(formData.year),
        rating: parseFloat(formData.rating)
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="label-text" htmlFor="name">Movie Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`input-field ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
          placeholder="e.g. Inception"
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label className="label-text" htmlFor="genre">Genre</label>
        <select
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className={`input-field ${errors.genre ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
        >
          <option value="" disabled>Select a genre</option>
          {GENRES.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
        {errors.genre && <p className="mt-1 text-xs text-red-500">{errors.genre}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label-text" htmlFor="year">Release Year</label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className={`input-field ${errors.year ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="e.g. 2010"
          />
          {errors.year && <p className="mt-1 text-xs text-red-500">{errors.year}</p>}
        </div>

        <div>
          <label className="label-text" htmlFor="rating">Rating (0-10)</label>
          <input
            type="number"
            step="0.1"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className={`input-field ${errors.rating ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="e.g. 8.8"
          />
          {errors.rating && <p className="mt-1 text-xs text-red-500">{errors.rating}</p>}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button type="button" onClick={onCancel} className="flex-1 btn-secondary">
          Cancel
        </button>
        <button type="submit" className="flex-1 btn-primary">
          Add Movie
        </button>
      </div>
    </form>
  );
}
