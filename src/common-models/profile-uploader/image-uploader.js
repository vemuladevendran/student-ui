import { React, useEffect, useRef, useState } from 'react';
import ss from './image-uploader.module.css'
// image uppload
const ProfileUpload = (props) => {
    const defaultImageUrl = '/assets/default-profile.png'
    const [imageUpload, setImageUpload] = useState(defaultImageUrl);
    const imageInput = useRef();
    // open image selection
    const openImageSelection = (event) => {

        // triggering input element
        imageInput.current.click()
    }

    // handle image change

    const handleImageChange = (event) => {
        // creating image previewurl
        const imageFile = event.target.files[0];
        props.onImgaeSelection(imageFile);
        const previewUrl = URL.createObjectURL(imageFile);
        setImageUpload(previewUrl)
    }

    useEffect(() => {
    }, [])
    return (
        <div>
            <input className="d-none" name="profileImage" onChange={handleImageChange} ref={imageInput} type="file" />
            <div className="position-relative">
                <img className={`${ss.profile_image} w-100`} src={imageUpload} alt="profile" />
                <div className="w-100 position-absolute" style={{ bottom: '2px' }}>
                    <button type="button" className="px-5 py-2 border-0 bg-white text-dark fw-bold rounded" onClick={openImageSelection}>{`${imageUpload === defaultImageUrl ? 'Upload' : 'Cancel'}`}</button>
                </div>
            </div>
        </div>
    );
}


export default ProfileUpload;