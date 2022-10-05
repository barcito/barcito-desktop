import { Stack, Button, Input } from "@mui/material";

export default function BarcitoImage({ image, alt }){
    
    return(
        <Stack spacing={1}>
            <img
                src={image}
                alt={alt}
                loading='lazy'
                height="200px"
            />
            <Stack alignItems="center" spacing={2}>
                <label htmlFor="contained-button-file">
                    <Input accept="image/*" id="contained-button-file" multiple type="file" />
                    <Button variant="contained" component="span">
                        Cargar
                    </Button>
                </label>
            </Stack>
        </Stack>
    )
}