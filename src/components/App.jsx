import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { fetchImages } from './Api/Api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    setIsLoading(true);

    const fetchData = async () => {
      const { hits, totalHits } = await fetchImages(query, page);
      if (totalHits === 0) {
        toast.error('Nothing was found for your request🤦‍♂️');
        setIsLoading(false);
        return;
      }

      setImages(prevImages => (page === 1 ? hits : [...prevImages, ...hits]));
      setTotalHits(prevTotalHits =>
        page === 1 ? totalHits - hits.length : prevTotalHits - hits.length
      );
      setIsLoading(false);
    };

    fetchData().catch(error => {
      toast.error(`Oops! Something went wrong!😒 ${error}`);
      setIsLoading(false);
    });
  }, [page, query]);

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
      {!!totalHits && <Button onLoadMore={handleLoadMore} />}
      {isLoading && <Loader />}

      <ToastContainer autoClose={2000} />
    </>
  );
};

// export class App extends Component {
//   state = {
//     query: '',
//     images: [],
//     page: 1,
//     totalHits: 0,
//     isLoading: false,
//   };

//   async componentDidUpdate(_, prevState) {
//     const { query, page } = this.state;

//     if (
//       prevState.query !== query ||
//       prevState.page !== page
//     ) {
//       try {
//         this.setState({ isLoading: true });

//         const { totalHits, hits } = await fetchImages(
//           query,
//           page
//         );

// if (totalHits === 0) {
//   toast.error('Nothing was found for your request🤦‍♂️');
//   this.setState({ isLoading: false });
//   return;
// }

// this.setState(prevState => ({
//   images:
//     page === 1
//       ? hits
//       : [...prevState.images, ...hits],

//           totalHits:
// page === 1
//   ? totalHits - hits.length
//   : totalHits -
//     [...prevState.images, ...hits].length,
//         }));

//         this.setState({ isLoading: false });
//       } catch (error) {
//         toast.error(`Oops! Something went wrong!😒 ${error}`);
//       }
//     }
//   }

//   handleLoadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   handleQuerySubmit = query => {
//     this.setState({ query, page: 1 });
//   };

//   render() {
//     const { images, totalHits, isLoading } = this.state;
//     const { handleQuerySubmit, handleLoadMore } = this;

//     return (
//       <>
//         <Searchbar onSubmit={handleQuerySubmit} />
//         {images && <ImageGallery images={images} />}
//         {!!totalHits && (
//           <Button onLoadMore={handleLoadMore} />
//         )}
//         {isLoading && <Loader />}

//         <ToastContainer autoClose={2000} />
//       </>
//     );
//   }
// }
