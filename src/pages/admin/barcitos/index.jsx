import { useState } from 'react';
import { ImageList, ImageListItem, Container, Stack, Typography, Box, Tabs, Tab, Paper, Button, Grid } from "@mui/material";
import { AddBusinessOutlined } from '@mui/icons-material';
import MainCard from '../../../components/MainCard';

export default function Barcitos(){

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const images = [
        { thumbnail: { uri: "https://cdn4.buysellads.net/uu/1/81016/1609783170-authentic-260x200-variation-1.jpg", name: "city" } },
        { thumbnail: { uri: "https://cdn4.buysellads.net/uu/1/81016/1609783170-authentic-260x200-variation-1.jpg", name: "city" } },
        { thumbnail: { uri: "https://cdn4.buysellads.net/uu/1/81016/1609783170-authentic-260x200-variation-1.jpg", name: "city" } },
        { thumbnail: { uri: "https://cdn4.buysellads.net/uu/1/81016/1609783170-authentic-260x200-variation-1.jpg", name: "city" } },
        { thumbnail: { uri: "https://cdn4.buysellads.net/uu/1/81016/1609783170-authentic-260x200-variation-1.jpg", name: "city" } },
        { thumbnail: { uri: "https://cdn4.buysellads.net/uu/1/81016/1609783170-authentic-260x200-variation-1.jpg", name: "city" } },
        { thumbnail: { uri: "https://cdn4.buysellads.net/uu/1/81016/1609783170-authentic-260x200-variation-1.jpg", name: "city" } },
        { thumbnail: { uri: "https://cdn4.buysellads.net/uu/1/81016/1609783170-authentic-260x200-variation-1.jpg", name: "city" } },
      ];

    return(
        <>
            <Grid container spacing={1.5}>
                <Grid item xs={2}>
                    <AddBusinessOutlined sx={{ width: "100%", height: "200px", mt: 1.75 }}  />
                </Grid>
                <Grid item xs={10}>
                    <ImageList sx={{ overflowX: 'auto' }} rowHeight={200}>
                        <ImageListItem sx={{display: 'flex', flexDirection: 'row', maxWidth: '360px'}}>
                            {images.map(image => {
                            return (
                            <img
                            key={image}
                            src={image.thumbnail.uri}
                            alt='title'
                            loading='lazy'
                            style={{paddingRight: '1px'}}
                            />
                            )
                            })}
                        </ImageListItem>
                    </ImageList>
                </Grid>
            </Grid>
        </>
    );
}