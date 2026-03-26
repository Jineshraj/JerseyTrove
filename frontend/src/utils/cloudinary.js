export const uploadToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "blcexgrj"); // your preset

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dt853ebq9/image/upload",
    {
      method: "POST",
      body: data,
    },
  );

  if (!res.ok) {
    throw new Error("Image upload failed");
  }

  const result = await res.json();
  return result.secure_url; // final image URL is returned
};

// upload multiple files
export const uploadMultipleToCloudinary = async (files) => {
  const urls = [];

  for (let i = 0; i < files.length; i++) {
    const url = await uploadToCloudinary(files[i]);
    urls.push(url);
  }

  return urls;
};
