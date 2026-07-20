import { useState, useEffect } from "react"
import {getLast10Images} from "../service/nasaService"

const ImageList = () => {

    const [images, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchImages();
    },[])

    const fetchImages = async (imageUrl) => {
        try{
            const data = await getLast10Images();
            setImage(data);
        } catch(err) {
            setError("Faild to load the images")
        } finally{
            setLoading(false);
        }
    }
    const downloadImage = async (imageUrl) => {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "nasa-earth.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObject(url);
    }
    if(loading) return <h2>Loading...</h2>
    if(error) return <h2>{error}</h2>
    return(
        <div style={{ textAlign: "center" }}>
            <h1>Last 10 days Earth image from nasa</h1>
            {images.map((image, index) => (
            <div  key={index} >
                <img src={image.imageUrl} alt="nasa" style={{ width: "500px", height: "500px"}} />
                
            <p>{image.date}</p>
            <button onClick={downloadImage}>Download Image</button>
            </div>
            ))}
        </div>
    )
}
export default ImageList;
