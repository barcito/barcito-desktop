import { Button } from '@mui/material';
import {useRef} from 'react'

const FileUploader = ({onFileSelectSuccess, onFileSelectError}) => {
    const fileInput = useRef(null)

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        /* if (file.size > 1024)
            onFileSelectError({ error: "File size cannot exceed more than 1MB" });
        else  */onFileSelectSuccess(file);
    }

    return (
        <>
            <input type="file" onChange={handleFileInput} />
            <Button onClick={e => fileInput.current && fileInput.current.click()} />
        </>
    )
}

export default FileUploader;