import React, { useEffect, useState } from 'react';

interface Design {
  id: number;
  image: string;
}

const DesignModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user has already closed the design modal before
    const isDesignModalClosed = localStorage.getItem('designModalClosed');
    if (!isDesignModalClosed) {
      setIsOpen(true);
    }
  }, []);

  // Close modal function and set flag in local storage
  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('designModalClosed', 'true'); // Store in localStorage
  };

  // Fetch designs from the API
  const fetchDesigns = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/modal1s/');
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
          <div className="relative z-50 max-w-4xl p-6 transition-transform duration-500 ease-out transform bg-white rounded-lg shadow-lg">
            <div className="flex justify-end">
              <button onClick={handleClose} className="text-2xl text-gray-500 hover:text-gray-800">
                ✖
              </button>
            </div>

            {/* Loading state */}
            {loading ? (
              <p className="mt-4 text-lg text-gray-700">Loading designs...</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 mt-4">
                {designs.map((design) => (
                  <div key={design.id} className="flex justify-center">
                    <img
                      src={design.image}
                      alt={`Design ${design.id}`}
                      className="w-full h-auto rounded-lg"
                      style={{ maxHeight: '80vh', objectFit: 'contain' }} // Ensure large display with contained size
                    />
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
