// import React, { useRef, useState } from 'react';
// import ImageGeneratorCSS from '../ImageGenerator/ImageGenerator.css';
// import default_image from '../Assets/default_image.svg';

// const ImageGenerator = () => {
//     const [imageUrl, setImageUrl] = useState("/"); // Use camelCase for variable names
//     const inputRef = useRef(null);

//     const imageGenerator = async () => {
//         try {
//             const response = await fetch("https://api.openai.com/v1/images/generations", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": "Bearer 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",
//                     "User-Agent": "Chrome",
//                 },
//                 body: JSON.stringify({
//                     prompt: inputRef.current.value,
//                     n: 1,
//                     size: "512x512"
//                 })
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to fetch image');
//             }

//             const data = await response.json();
//             const imageUrl = data?.data?.[0]?.url; // Extract image URL from response
//             setImageUrl(imageUrl || default_image); // Set image URL in state
//         } catch (error) {
//             console.error('Error fetching image:', error);
//             // Handle error (e.g., show error message to user)
//         }
//     };

//     return (
//         <div className='ai-image-generator'>
//             <div className='header'>AI image <span>generator</span></div>
//             <div className='img-loading'>
//                 <div className='image'><img src={imageUrl} alt='' /></div>
//             </div>
//             <div className='search-box'>
//                 <input type="text" ref={inputRef} className='search-input' placeholder='Describe What You Want To See' />
//                 <div className='generator-btn' onClick={imageGenerator}>Generator</div>
//             </div>
//         </div>
//     );
// };

// export default ImageGenerator;
import React, { useRef, useState } from 'react';
import ImageGeneratorCSS from '../ImageGenerator/ImageGenerator.css';
import defaultImage from '../Assets/default_image.svg';

const ImageGenerator = () => {
    const [imageUrl, setImageUrl] = useState(defaultImage);
    const [isClicked, setIsClicked] = useState(false);
    const inputRef = useRef(null);

    const imageGenerator = async () => {
        try {
            const response = await fetch("https://api.openai.com/v1/images/generations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer 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",
                    "User-Agent": "Chrome",
                },
                body: JSON.stringify({
                    prompt: inputRef.current.value,
                    n: 1,
                    size: "512x512"
                })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch image');
            }

            const data = await response.json();
            const imageUrl = data?.data?.[0]?.url;
            setImageUrl(imageUrl || defaultImage);
            setIsClicked(true);
        } catch (error) {
            console.error('Error fetching image:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    
    const handleReload = () => {
        // Fetch new image from the same category
        imageGenerator();
    };

    return (
        <div className='ai-image-generator'>
            <div className='header'>AI image <span>generator</span></div>
            <div className='img-loading'>
                <div className='image'><img src={imageUrl} alt='' /></div>
            </div>
            <div className='search-box'>
                <input type="text" ref={inputRef} className='search-input' placeholder='Describe What You Want To See' />
                <div className={`generator-btn ${isClicked ? 'clicked' : ''}`} onClick={imageGenerator}>
                    {isClicked ? 'Generated!' : 'Generate'}
                </div> <br/>
                {isClicked && (
                    <div className='reload-btn' onClick={handleReload}>Reload</div>
                )}
            </div>
        </div>
    );
};

export default ImageGenerator;
 //master
