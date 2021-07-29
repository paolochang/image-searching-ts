import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageViewer from "./components/ImageViewer";
import SearchBar from "./components/SearchBar";
import { GlobalStyles } from "./styles";
import { ImageInfoModel } from "./types";

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [images, setImages] = useState<ImageInfoModel[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        let response: any = await axios.get(
          `https://pixabay.com/api/?key=${
            process.env.REACT_APP_PIXABAY_KEY
          }&q=${encodeURIComponent(keyword)}&page=${page}&image_type=photo`
        );
        if (response) {
          if (page > 26) return setLoading(false);
          else if (page === 1) setImages(response.data.hits);
          else setImages((prev) => [...prev].concat(response.data.hits));
          setLoading(false);
        } else {
          throw new Error(response);
        }
      } catch (err) {
        console.error(err);
      }
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
};

export default App;
