import { Trash, Upload, User } from "lucide-react";
import React, { useRef, useState } from "react";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);

  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = null;
    }
  };

  const onChooseFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="flex justify-center my-5">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {
        !image ? (
          <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
            <User className="text-purple-500" size={35} />
            <button
              onClick={onChooseFile}
              className="w-8 h-8 flex items-center justify-center bg-purple-500 text-white rounded-full absolute -bottom-1 -right-1"
              type="button"
            >
              <Upload size={15} />
            </button>
        </div>
        ) : (
            <div className="relative">
              <img
                src={previewUrl}
                alt="profile photo"
                className="w-20 h-20 rounded-full object-cover"
              />
              <button
                onClick={handleRemoveImage}
                type="button"
                className="w-8 h-8 flex items-center justify-center bg-red-800 text-white rounded-full absolute -bottom-1 -right-1"
              >
                <Trash size={15} />
              </button>
            </div>
        )
      }
    </div>
  );
};

export default ProfilePhotoSelector;
