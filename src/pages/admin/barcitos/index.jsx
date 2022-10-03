import { useState } from 'react';
import { ImageList, ImageListItem, Stack, Typography, Box, Grid, ImageListItemBar, Button } from "@mui/material";
import { AddBusinessOutlined, InfoOutlined } from '@mui/icons-material';
import MainCard from '../../../components/MainCard';
import BarcitoForm from './BarcitoForm';
import { useEffect } from 'react';
import { BarcitoAPI } from '../../../services/barcitoAPI';

export default function Barcitos() {

    const [barcitos, setBarcitos] = useState([]);
    const [barFocus, setBarFocus] = useState({});

    useEffect(() => {
        const getBarcitos = async () => {
            const barcitos = await BarcitoAPI.getAll();
            setBarcitos(barcitos);
        }
        getBarcitos();
        setBarFocus(barcitos[0])
    }, []);

    function submitSuccess( savedBarcito ){
        const newList = barcitos.map( (bar) => {
            bar.id === savedBarcito.id ? savedBarcito : bar
        })
        setBarcitos(newList);
        setBarFocus(savedBarcito);
    }

    return (
        <Grid container spacing={1.5}>

            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h2">Barcitos</Typography>
            </Grid>

            <Grid item xs={2}>
                <AddBusinessOutlined sx={{ width: "100%", height: "200px", mt: 1.75 }} />
            </Grid>

            <Grid item xs={10}>
                <ImageList sx={{
                    gridAutoFlow: "column",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr)) !important",
                    gridAutoColumns: "minmax(320px, 1fr)"
                }}>
                    {barcitos.map((bar, i) => (
                        <ImageListItem key={i} sx={{ height: '320px', width: '320px'}}>
                            <img
                                src={bar.imagePath}
                                alt={bar.name}
                                loading='lazy'
                            />
                            <Button onClick={() => setBarFocus(bar)}>
                            <ImageListItemBar
                                title={bar.name}
                                subtitle={bar.academicUnit}
                            ></ImageListItemBar>
                            </Button>
                        </ImageListItem>
                    ))}
                </ImageList>
            </Grid>

            <Grid item xs={12}>
                <MainCard>
                    <Grid container spacing={1}>


                        <Grid item xs={7}>
                            {barFocus ?
                                <BarcitoForm barFocus={barFocus} />
                                :
                                <Box sx={{ backgroundColor: "red", height: "195px", width: "100%" }}>no bar</Box>
                            }

                        </Grid>

                        <Grid item xs={5}>
                            <Stack spacing={1}>

                                <Box sx={{ backgroundColor: "red", height: "195px", width: "100%" }}>img</Box>

                                <Box sx={{ backgroundColor: "red", height: "195px", width: "100%" }}>list</Box>

                            </Stack>
                        </Grid>

                    </Grid>
                </MainCard>
            </Grid>
        </Grid>
    );
}