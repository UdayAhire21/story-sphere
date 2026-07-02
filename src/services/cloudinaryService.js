export const uploadImage = async (image) => {

    const formData = new FormData();

    formData.append(
        "file",
        image
    );

    formData.append(
        "upload_preset",
        "storysphere"
    );

    const response = await fetch(

        "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",

        {
            method: "POST",
            body: formData
        }

    );

    const data = await response.json();

    return data.secure_url;
};