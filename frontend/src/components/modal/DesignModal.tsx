import React, { useEffect, useState } from 'react';

interface Design {
  id: number;
  title: string;
  image: string;
    description: string;
}

const DesignModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);

  // Close modal function
  const handleClose = () => {
    setIsOpen(false);
  };

  // Fetch designs from the API
  const fetchDesigns = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/modal1s/'); // Updated API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDesigns(data);
    } catch (error) {
      console.error('Error fetching designs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background blur effect */}
          <div className="absolute inset-0 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-md"></div>

          {/* Modal container */}
          <div className="relative z-50 max-w-lg p-6 transition-transform duration-500 ease-out transform bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold text-gray-900">
                🖼️ Design Gallery 🖼️
              </h2>
              <button onClick={handleClose} className="text-2xl text-gray-500 hover:text-gray-800">
                ✖
              </button>
            </div>

            {/* Loading state */}
            {loading ? (
              <p className="mt-4 text-lg text-gray-700">Loading designs...</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
                {designs.map((design) => (
                  <div key={design.id} className="p-4 border rounded-lg shadow-md">
                    <img src={design.image} alt={design.description} className="w-full h-auto rounded-lg" />
                    <h3 className="mt-2 text-lg font-semibold text-gray-800">{design.title}</h3>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DesignModal;
