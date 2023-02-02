import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { fetchImages } from './Api/Api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

// export const App = () => {
//   const [query, setQuery] = useState('');
//   const [images, setImages] = useState([]);
//   const [page, setPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showLoadButton, setShowLoadButton] = useState(false);


//   useEffect(() => {
//     async function APIfetchImages() {
//       if (query === '') {
//         return;
//       }
//       try {
//         setIsLoading(true);
//         const { hits, totalHits } = await fetchImages(query, page);
//         if (hits.length !== 0) {
//           setImages(prevState => [...prevState, ...hits]);
//           setShowLoadButton(page < Math.ceil(totalHits / 12));
//         } else {
//           toast.warn('Nothing was found for your request!🤦‍♂️');
//         }
//       } catch (error) {
//         toast.error(`Oops! Something went wrong!😒 ${error}`);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     APIfetchImages();
//   }, [page, query]);

//   function handleQuerySubmit(query) {
//     setQuery(query);
//     setPage(1);
//     setImages([]);
//     setShowLoadButton(false);
//     }

//   const handleLoadMore = () => {
//     setPage(prevPage => prevPage + 1);
//   };

//   return (
//     <>
//       <Searchbar onSubmit={handleQuerySubmit} />
//       {images && <ImageGallery images={images} />}
//       {isLoading && <Loader />}
//       {showLoadButton && <Button onLoadMore={() => handleLoadMore()} />}

//       <ToastContainer autoClose={2000} />
//     </>
//   );
// };



export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    fetchImages(query, page)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          return toast.error('Nothing was found for your request!🤦‍♂️');
        }
        setImages(prevImages => (page === 1 ? hits : [...prevImages, ...hits]));
        setShowBtn(page < Math.ceil(totalHits / 12));
      })
      .catch(error => toast.error(`Oops! Something went wrong!😒 ${error}`))
      .finally(() => setIsLoading(false));
  }, [page, query]);

  // const fetchData = async () => {
  //     const { hits, totalHits } = await fetchImages(query, page);
  //     if (totalHits === 0) {
  //       toast.error('Nothing was found for your request🤦‍♂️');
  //       setIsLoading(false);
  //       return;
  //     }

  //     setImages(prevImages => (page === 1 ? hits : [...prevImages, ...hits]));
  //     setTotalHits(prevTotalHits =>
  //       page === 1 ? totalHits - hits.length : prevTotalHits - hits.length
  //     );
  //     setIsLoading(false);
  //   };

  //   fetchData().catch(error => {
  //     toast.error(`Oops! Something went wrong!😒 ${error}`);
  //     setIsLoading(false);
  //   });
  // }, [page, query]);

  const handleQuerySubmit = query => {
    setQuery(query);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleQuerySubmit} />
      {images && <ImageGallery images={images} />}
      {showBtn && <Button onLoadMore={handleLoadMore} />}
      {isLoading && <Loader />}
      <ToastContainer autoClose={2000} />
    </>
  );
};
