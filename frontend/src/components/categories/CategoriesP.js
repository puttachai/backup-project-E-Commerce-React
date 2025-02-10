import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

const CategoriesP = () => {

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [currentImages, setCurrentImages] = useState([]);
  //const [setCurrentImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  //const itemsPerPage = 16; // 4 items per row, 2 rows = 8 items
  const [itemsPerPage, setItemsPerPage] = useState(8); // เริ่มต้นที่ 8

useEffect(() => {
    // ใช้ axios เพื่อดึงข้อมูลBASE_URL
    axios.get(`${BASE_URL}/api/categories-images`, {//https://cc07-49-49-230-168.ngrok-free.app
      //method: 'get',
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        //'ngrok-skip-browser-warning': '69420',//true
        //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
      }
    })
    .then(response => {
      setImages(response.data); // Assuming response.data is an array of image objects
      console.log('Fetched images (axios):', response.data);
      setLoading(false);
    })
    .catch(err => {
      console.error('Failed to fetch images (axios):', err);
      setError('Failed to load images.');
      setLoading(false);
    });
  }, [BASE_URL]); // effect ที่ใช้ axios http://49.49.230.180:5000 ${BASE_URL}
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/categories-images`, { //https://cc07-49-49-230-168.ngrok-free.app/api/categories-images
          //method: 'GET',
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
            'ngrok-skip-browser-warning': 'true',
            //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
          }
        });
        
        console.log('Response Data (fetch):', response);
        
        // ตรวจสอบสถานะการตอบสนอง
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log('Fetched data (fetch):', data); // ตรวจสอบข้อมูลที่ได้รับ
        setCurrentImages(data); // อัปเดต state ด้วยข้อมูลที่ดึงมา
      } catch (error) {
        console.error('Error fetching images (fetch):', error);
      }
    };
  
    fetchImages();
  }, [BASE_URL]); // effect ที่ใช้ fetch
  
      // Update itemsPerPage based on screen width
      useEffect(() => {
        const updateItemsPerPage = () => {
          if (window.innerWidth >= 375) {
            setItemsPerPage(8); // หน้าจอใหญ่กว่า 667px ให้แสดง 16 ข้อมูล
          } else {
            //setItemsPerPage(6); // หน้าจอเล็กกว่า 667px ให้แสดง 8 ข้อมูล
          }
        };
    
        // Initial check
        updateItemsPerPage();
    
        // Event listener for window resize
        window.addEventListener('resize', updateItemsPerPage);
    
        // Cleanup listener when component is unmounted
        return () => window.removeEventListener('resize', updateItemsPerPage);
      }, []);
  

    // Update itemsPerPage based on screen width
    useEffect(() => {
      const updateItemsPerPage = () => {
        if (window.innerWidth >= 667) {
          setItemsPerPage(12); // หน้าจอใหญ่กว่า 667px ให้แสดง 16 ข้อมูล
        } else {
          //setItemsPerPage(8); // หน้าจอเล็กกว่า 667px ให้แสดง 8 ข้อมูล
        }
      };
  
      // Initial check
      updateItemsPerPage();
  
      // Event listener for window resize
      window.addEventListener('resize', updateItemsPerPage);
  
      // Cleanup listener when component is unmounted
      return () => window.removeEventListener('resize', updateItemsPerPage);
    }, []);


        // Update itemsPerPage based on screen width
        useEffect(() => {
          const updateItemsPerPage = () => {
            if (window.innerWidth >= 1280) {
              setItemsPerPage(16); // หน้าจอใหญ่กว่า 667px ให้แสดง 16 ข้อมูล
            } else {
              //setItemsPerPage(12); // หน้าจอเล็กกว่า 667px ให้แสดง 8 ข้อมูล
            }
          };
      
          // Initial check
          updateItemsPerPage();
      
          // Event listener for window resize
          window.addEventListener('resize', updateItemsPerPage);
      
          // Cleanup listener when component is unmounted
          return () => window.removeEventListener('resize', updateItemsPerPage);
        }, []);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (images.length === 0) return <p>No images found.</p>;

    //Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    //const currentImages = images.slice(indexOfFirstItem, indexOfLastItem);
    // คำนวณ currentImages ที่ต้องการแสดงในแต่ละช่วง
    const currentDisplayedImages = currentImages.slice(indexOfFirstItem, indexOfLastItem);

    //nextPage
    const handleNext = () => {
      if (currentPage * itemsPerPage < images.length) {
        setCurrentPage(currentPage + 1);
      }
    };
    //prevPage
    const handlePrevious = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };


    // if (!Array.isArray(currentImages)) {
    //   console.error("Expected 'currentImages' to be an array:", currentImages);
    //   return <p>No images to display.</p>; // แสดงข้อความเมื่อไม่มีภาพ
    // }
    

  return (
    <div className="py-10 flex flex-col items-center gap-4 lg:gap-10 hidden sm:block">
    <div className="mx-auto p-0">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>

      <div className="relative w-full">

        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-1 rounded-full focus:outline-none"
          aria-label="Previous"
          style={{ marginLeft: '4.5px' }}
          onClick={handlePrevious}
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-8 gap-4">


        {currentDisplayedImages.map((image, index) => {

          // api hosting -R 80:localhost:5000 serveo.net
          // Forwarding HTTP traffic from https://51129e7c9a898f281afb8baa334f495b.serveo.net
          // const BASE_URL = 'https://cc07-49-49-230-168.ngrok-free.app';

          const imageUrl = `${BASE_URL}/images/categories/${image.image}`;//${BASE_URL} https://cc07-49-49-230-168.ngrok-free.app/images/categories/${image.image}

          // เพิ่ม Console Log `
          console.log('image.category_id:', image.categories_id);
          console.log('Image:', image.image);
          console.log(imageUrl)
          console.log('Image URL:', imageUrl);
          //const imageUrl = `https://cc07-49-49-230-168.ngrok-free.app/images/categories/${image.image}`;
          return (
            <div key={index} className="flex flex-col items-center p-4 border rounded-lg hover:shadow-lg transition duration-300">
              {/* <Link to={`/shop/${image.name}`}>  */}
              <Link to={`/products/category/${image.categories_id}`}>
              <img className="h-full w-full object-cover" src={`${BASE_URL}/images/categories/${image.image}`} alt={image.name} /> {/* https://cc07-49-49-230-168.ngrok-free.app/images/categories/${image.image} */}
                {/*<Image className="h-full w-full object-cover" imgSrc={`https://cc07-49-49-230-168.ngrok-free.app/images/categories/${image.image}`} />{/* http://localhost:5000/ */}
              </Link>
              <span className="text-center text-[0.775rem] leading-[1.25rem] font-medium">{image.name}</span>{/*text-sm*/}
            </div> 
          );
        })}


        </div>

        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-1 rounded-full focus:outline-none"
          aria-label="Next"
          style={{ marginLeft: '4.5px' }}
          onClick={handleNext}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
  );
};

export default CategoriesP;

