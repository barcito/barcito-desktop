import { useState } from 'react';
import { Container, Stack, Box, Grid, Tab, Tabs } from "@mui/material";
import MainCard from '@/components/MainCard';
import BarcitoForm from '../../admin/barcitos/BarcitoForm';
import { BarcitoAPI } from '@/services/barcitoAPI';
import ManagersTable from '../../admin/barcitos/ManagersTable';
import TabPanel from '../../admin/barcitos/TabPanel';
import FileUploader from "@/components/FileUploader";
import { useMutation, useQuery, useQueryClient } from 'react-query';

export default function Barcito(){

    const client = useQueryClient();
    const { data: barcito, isLoading } = useQuery(['barcito'], () => BarcitoAPI.get(localStorage.getItem('barcito')));
    const [selectedFile, setSelectedFile] = useState(null);
    const [value, setValue] = useState(0);

    const mutation = useMutation(
        ({id, data, image}) => {
            return image ? BarcitoAPI.updateImage(id, image) : BarcitoAPI.update(id, data);
        },
        {
            onSuccess: () => {
                client.invalidateQueries(['barcito']);
                alert('Success!');
            }
        }
    )

    const submitImage = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("barcito_img", selectedFile);
        mutation.mutate({id: barcito.id, image: formData});
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if(isLoading){
        return <p>Loading...</p>;
    }

    return(
        <Container>
            <Grid container spacing={1.5}>
                <Grid item xs={12}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="barcito tabs">
                            <Tab label="Información" id={'barcito-tab-0'} aria-controls={'barcito-tabpanel-0'} />
                            <Tab label="Personal" id={'barcito-tab-1'} aria-controls={'barcito-tabpanel-1'} />
                        </Tabs>
                    </Box>

                    <MainCard>
                        <TabPanel value={value} index={0}>
                            <Stack spacing={1} direction="row">
                                <BarcitoForm barcito={barcito} mutation={mutation} />
                                <Stack spacing={1}>
                                    <img
                                        src={barcito.imagePath || 'src/assets/images/barcito-placeholder.png'}
                                        alt={barcito.name}
                                        loading='lazy'
                                        width="200px"
                                    />
                                    <form>
                                        <FileUploader
                                            onFileSelectSuccess={(file) => setSelectedFile(file)}
                                            onFileSelectError={({ error }) => alert(error)}
                                        />
                                        <button onClick={submitImage}>Submit</button>
                                    </form>
                                </Stack>
                            </Stack>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <ManagersTable managers={barcito.managers}></ManagersTable>
                        </TabPanel>
                    </MainCard>
                </Grid>
            </Grid>
        </Container>
    );
}