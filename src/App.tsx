import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageViewer from "./components/ImageViewer";
import SearchBar from "./components/SearchBar";
import { GlobalStyles } from "./styles";

function App() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      let response: any = await axios.get(
        `https://pixabay.com/api/?key=${
          process.env.REACT_APP_PIXABAY_KEY
        }&q=${keyword.replace(" ", "+")}&page=${page}&image_type=photo`
      );
      if (page === 1) setImages(response.data.hits);
      else setImages((prev) => [...prev].concat(response.data.hits));

      await new Promise((resolver) => setTimeout(resolver, 3000));

      /**********************************************************************
       *  Using Promise
       **********************************************************************/

      // const response = new Promise((resolve, rejects) => {
      //   fetch(
      //     `https://pixabay.com/api/?key=${
      //       process.env.REACT_APP_PIXABAY_KEY
      //     }&q=${keyword.replace(" ", "+")}&page=${page}&image_type=photo`
      //   );
      // });
      // response
      //   .then((response: any) => response.json())
      //   .then((result) =>
      //     setImages((prev) => [...prev].concat(result.data.hits))
      //   )
      //   .then(() => setTimeout(() => {}, 2000));

      setLoading(false);
    };

    if (loading) {
      fetchImages();
    }
  }, [loading, keyword, page]);

  const onSubmitKeyword = (event: any, searchKey: string) => {
    event.preventDefault();
    setPage(1);
    setKeyword(searchKey);
    setLoading(true);
  };

  return (
    <div className="App">
      <GlobalStyles />
      <SearchBar onSubmitKeyword={onSubmitKeyword} />
      <ImageViewer
        images={images}
        setPage={setPage}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
}

export default App;
