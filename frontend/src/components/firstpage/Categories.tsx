// src/components/Categories.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../slice/CategorySlice';
import { UnknownAction } from 'redux';
import { RootState } from '../store/Store';
import { Link } from 'react-router-dom';
import epsl from '../assets/epsl.png';
function Categories() {
    const dispatch = useDispatch();
    const { categories, status, error } = useSelector((state: RootState) => state.categories);

    useEffect(() => {
      dispatch(fetchCategories() as unknown as UnknownAction);
    }, [dispatch]);

    if (status === 'idle' || status === 'loading') {
      return <p>    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative animate-spin-slow">
        <img
          src={epsl} // Replace this with the path to your uploaded logo
          alt="ePasaley Logo"
          className="w-40 h-40"
        />
      </div>
    </div></p>;
    }
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="relative bg-violet-900">
        <div className="mx-auto h-12 max-w-[1200px] flex items-center">
          <div className="relative group">
            <button
              className="flex items-center px-4 py-2 text-white"
              aria-expanded={status === 'succeeded'}
              aria-haspopup="true"
            >
              <Link to={"/allproducts"}>
              All Categories
              </Link>
            </button>

            {/* Categories List */}
            <div
              className="absolute left-0 z-50 hidden w-[400px] bg-white shadow-lg top-full group-hover:flex flex-col p-6 space-y-4 transition-all duration-300 ease-in-out rounded-lg"
              role="menu"
            >
              {/* Loading and Error States */}
              {status === 'loading' && <p>Loading categories...</p>}
              {status === 'failed' && <p>Error: {error}</p>}

              {/* Render Categories if Data is Available */}
              {status === 'succeeded' && (
                <div className="grid grid-cols-2 gap-6">
                  {categories.map((category: { id: number; name: string; category_image: string }) => (
                    <Link
                      key={category.id}
                      to={`/allproducts/${category.id}`} // Pass category ID as a URL parameter
                      className="flex flex-col items-center space-y-2 transition-transform duration-300 ease-in-out transform hover:scale-105"
                      role="menuitem"
                    >
                      <img
                        src={`http://localhost:8000${category.category_image}`}// Fallback image
                        alt={category.name}
                        className="w-24 h-24 transition-shadow duration-300 rounded-full shadow-lg hover:shadow-xl"
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => (e.target as HTMLImageElement).src = '/path/to/default-image.png'} // Fallback on error
                      />
                      <span className="font-semibold text-center">{category.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Categories;
