import { useState, useEffect } from 'react';
import { getLatestImage } from '../service/nasaService';

const NasaImage = () => {

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

  useEffect(() => {
    fetchImage();
  },[])

    const fetchImage = async () => {
        try{
            const data = await getLatestImage();
            setImage(data);
        } catch (err) {
            setError("Faild to load the image");
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <h2>Loading...</h2>
    if (error) return <h2>{error}</h2>

    const downloadImage = async () => {
        const response = await fetch(image.imageUrl);
        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "nasa-earth.png";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }
    return (
        <div style={{ textAlign : "center"}}>
            <h1>NASA EPIC IMAGE</h1>
            <img src={image.imageUrl} alt="Nasa arth" style={{ width: "100%", height: "100vh" }} />
            <p>{image.Date}</p>
            <button onClick={downloadImage}>
                Donload image
            </button>
        </div>
    )
}

export default NasaImage;