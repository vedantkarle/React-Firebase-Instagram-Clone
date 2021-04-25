import React, { useState, useEffect } from "react";
import { uploadPhoto } from "../services/firebase";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");

  const types = ["image/png", "image/jpeg", "image/jpg"];

  const [error, setError] = useState("");
  const isInvalid = caption === "";

  const changeHandler = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError(null);
    } else {
      setFile(null);
      setError("Please select an image file (png or jpeg)");
    }
  };

  useEffect(() => {
    document.title = "Create Post - Instagram";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-lg items-center justify-center">
      <div className="flex flex-col w-4/5">
        <div className="flex flex-col bg-white p-4 border border-gray-primary mb-4">
          <h1 className="flex justify-center w-full">Create Post</h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              uploadPhoto(file, caption);
            }}
          >
            <input type="file" onChange={changeHandler} />
            <input
              aria-label="Enter caption"
              type="text"
              placeholder="Caption"
              className="text-am text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded  focus:outline-none focus:ring-2 focus:ring-blue-600 mb-2"
              onChange={(e) => setCaption(e.target.value)}
              value={caption}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium w-1/5 text-white rounded h-8 font-bold ${
                isInvalid && "opacity-50"
              }`}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
