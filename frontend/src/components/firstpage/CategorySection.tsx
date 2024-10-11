import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../slice/CategorySlice';
import { UnknownAction } from 'redux';
import { RootState } from '../store/Store';
import { Link } from 'react-router-dom';
import LoadingScreen from '../modal/LoadingScreen';
function CategorySection() {
    const dispatch = useDispatch();
    const { categories, status, error } = useSelector((state: RootState) => state.categories);

    useEffect(() => {
        dispatch(fetchCategories() as unknown as UnknownAction);
    }, [dispatch]);
    
    

    if (status === 'idle' || status === 'loading') {
        return     <LoadingScreen />;

      }
    return (
        <div className="py-10">
            {/* Title and View All Link */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Shop From <span className="text-green-600">Top Categories</span></h2>
                <Link to="/allproducts" className="text-green-600">View All &rarr;</Link>
            </div>

            

                {/* Render Categories if Data is Available */}
                {status === 'succeeded' && (
                    <div className="flex space-x-6">
                        {categories.map((category: { id: number; name: string; category_image: string }) => (
                            <Link
                                key={category.id}
                                to={`/allproducts/${category.id}`} // Pass category ID as a URL parameter
                                className="flex flex-col items-center space-y-2 transition-transform duration-300 ease-in-out transform hover:scale-105"
                            >
                                <div className="flex items-center justify-center w-24 h-24 border border-gray-200 rounded-full shadow-md hover:shadow-xl">
                                    <img
                                        src=    {category.category_image}
                                        alt={category.name}
                                        className="object-cover w-full h-full rounded-full"
                                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => (e.target as HTMLImageElement).src = '/path/to/default-image.png'} // Fallback on error
                                    />
                                </div>
                                <span className="font-semibold text-center text-blue-500">{category.name}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
    );
}

export default CategorySection;
