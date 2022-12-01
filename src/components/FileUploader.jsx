import { Button } from "@mui/material";
import { set } from "lodash";
import { useRef } from "react";

const FileUploader = ({ onFileSelectSuccess, onFileSelectError, setImagePreview }) => {
  const fileInput = useRef(null);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    /* if (file.size > 1024)
    onFileSelectError({ error: "File size cannot exceed more than 1MB" });
    else  */
    onFileSelectSuccess(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <>
      <input style={{ display: "none" }} onChange={handleFileInput} id="contained-button-file" type="file" />
      <label htmlFor="contained-button-file">
        <Button
          onClick={(e) => {
            fileInput.current && fileInput.current.click();
          }}
          variant="contained"
          color="primary"
          component="span"
        >
          Seleccione una imagen
        </Button>
      </label>
    </>
  );
};

export default FileUploader;
