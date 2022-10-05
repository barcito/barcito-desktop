import { useState } from 'react';
import { Container, ImageList, ImageListItem, Stack, Typography, Box, Grid, ImageListItemBar, Button, Tab, Tabs } from "@mui/material";
import { AddBusinessOutlined } from '@mui/icons-material';
import MainCard from '../../../components/MainCard';
import BarcitoForm from './BarcitoForm';
import { useEffect } from 'react';
import { BarcitoAPI } from '../../../services/barcitoAPI';
import ManagersTable from './ManagersTable';
import TabPanel from './TabPanel';

export default function Barcitos() {

    const [barcitos, setBarcitos] = useState([]);
    const [barFocus, setBarFocus] = useState({});
    const [managers, setManagers] = useState([]);
    const [value, setValue] = useState(0);

    useEffect(() => {
        const getBarcitos = async () => {
            const response = await BarcitoAPI.getAll(); // ordenar por id la respuesta en el back
            setBarcitos(response);
        }
        getBarcitos();
    }, [barFocus]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container>
            <Grid container spacing={1.5}>
                <Grid item xs={2}>
                    <Button onClick={() => { setBarFocus({}); setManagers([]); setValue(0) }}>
                        <AddBusinessOutlined sx={{ width: "100%", height: "200px", mt: 1.75 }} />
                    </Button>
                </Grid>
                <Grid item xs={10}>
                    <ImageList sx={{
                        gridAutoFlow: "column",
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr)) !important",
                        gridAutoColumns: "minmax(320px, 1fr)"
                    }}>
                        {barcitos.map((bar, i) => (
                            <ImageListItem key={i} sx={{ height: '320px', width: '320px' }}>
                                <img
                                    src={bar.imagePath}
                                    alt={bar.name}
                                    loading='lazy'
                                />
                                <Button onClick={() => { setBarFocus(bar); setManagers(bar.managers); }}>
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

                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="barcito tabs">
                            <Tab label="Información" id={'barcito-tab-0'} aria-controls={'barcito-tabpanel-0'} />
                            <Tab disabled={barFocus.id ? false : true} label="Personal" id={'barcito-tab-1'} aria-controls={'barcito-tabpanel-1'}  />
                        </Tabs>
                    </Box>

                    <MainCard>
                        <TabPanel value={value} index={0}>
                            <BarcitoForm barcito={barFocus} setBarFocus={setBarFocus} />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                                <Stack spacing={1}>
                                    <Box sx={{ height: "195px", width: "100%" }}>
                                        {barFocus.id ?
                                            <img
                                                src={barFocus.imagePath}
                                                alt={barFocus.name}
                                                loading='lazy'
                                                height="200px"
                                            /> : <p>None</p>
                                        }
                                    </Box>
                                    <Box sx={{ backgroundColor: "red", height: "195px", width: "100%" }}>
                                        {barFocus.id && barFocus.managers ?
                                            <ManagersTable managers={managers} setManagers={setManagers}></ManagersTable>
                                            :
                                            <p>None</p>
                                        }
                                    </Box>
                                </Stack>
                        </TabPanel>
                    </MainCard>
                    {/* <MainCard>
                        <Grid container spacing={1}>
                            <Grid item md={6}>
                                <BarcitoForm barcito={barFocus} setBarFocus={setBarFocus} />
                            </Grid>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <Box sx={{ height: "195px", width: "100%" }}>
                                        {barFocus.id ?
                                            <img
                                                src={barFocus.imagePath}
                                                alt={barFocus.name}
                                                loading='lazy'
                                                height="200px"
                                            /> : <p>None</p>
                                        }
                                    </Box>
                                    <Box sx={{ backgroundColor: "red", height: "195px", width: "100%" }}>
                                        {barFocus.id && barFocus.managers ?
                                            <ManagersTable managers={managers} setManagers={setManagers}></ManagersTable>
                                            :
                                            <p>None</p>
                                        }
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>
                    </MainCard> */}
                </Grid>
            </Grid>
        </Container>
    );
}