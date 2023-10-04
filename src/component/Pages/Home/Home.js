import React, { useEffect, useState } from 'react';
import { FiUsers } from 'react-icons/fi';
import { BiGasPump } from 'react-icons/bi';
import { BsSpeedometer } from 'react-icons/bs';
import { IoSpeedometerSharp } from 'react-icons/io5';
import { GiSelfLove } from 'react-icons/gi';

import datajson from '../../jsons/data.json';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    setProducts(datajson); // Load the JSON data when the component mounts
  }, []);

  useEffect(() => {
    // Reset the current page to 1 when a new search term is entered
    setCurrentPage(1);

    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredProducts);
  }, [searchTerm, products]);

  // Calculate the index of the first and last product to display on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = searchResults.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Function to change the current page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 ">
        <input
          type="text"
          className="w-full p-2 border rounded shadow"
          placeholder="Search for a product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="mt-4">
          {currentProducts.length === 0 ? (
            <p>this car is not displayed here</p>
          ) : (
            <div>
              <ul className="grid grid-cols-3 gap-4">
                {currentProducts.map((product, index) => (
                  <li
                    key={index}
                    className="border p-2 rounded shadow mb-2 bg-white"
                  >
                    {/* Your card rendering code */}
                    <div className="card w-96 bg-base-100 shadow-xl">
                      <figure>
                        <img src={product.img} alt="Shoes" className="w-full h-96" />
                      </figure>
                      <div className="card-body">
                        <h2 className="card-title">{product.name}</h2>
                        <div>
                          <div className="grid  grid-cols-2 gap-6">
                            <p className="flex  items-center gap-2">
                              <FiUsers />
                              {product.set} People
                            </p>
                            <p className="flex  items-center gap-2">
                              <BiGasPump />
                              {product.eng_oil}
                            </p>
                            <p className="flex  items-center gap-2">
                              <BsSpeedometer />
                              {product.milase}
                            </p>
                            <p className="flex  items-center gap-2">
                              <IoSpeedometerSharp />
                              {product.type}
                            </p>
                          </div>
                        </div>
                        <hr />
                        <div className="flex justify-around items-center">
                          <div className="card-actions justify-start">
                            <p>$400/Month</p>
                          </div>
                          <div>
                            <GiSelfLove />
                          </div>
                          <div className="card-actions justify-end">
                            <button className="btn btn-primary">Rent Now</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {/* Pagination */}
              <div className="mt-4">
                {Array.from(
                  { length: Math.ceil(searchResults.length / productsPerPage) },
                  (_, i) => (
                    <button
                      key={i}
                      className={`mr-2 px-4 py-2 rounded ${
                        currentPage === i + 1
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;