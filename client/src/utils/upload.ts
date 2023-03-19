import axios from "axios";

const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_UPLOAD_KEY);

  const response = await axios.post(
    "https://api.cloudinary.com/v1_1/annnn/upload",
    formData
  );

  return response.data.url;
};

export default uploadFile;
