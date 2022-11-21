import { useState } from "react";
import { Container, ImageList, ImageListItem, Stack, Box, Grid, ImageListItemBar, Button, Tab, Tabs } from "@mui/material";
import { AddBusinessOutlined } from "@mui/icons-material";
import MainCard from "@/components/MainCard";
import BarcitoForm from "./BarcitoForm";
import { BarcitoAPI } from "@/services/barcitoAPI";
import ManagersTable from "./ManagersTable";
import TabPanel from "./TabPanel";
import FileUploader from "@/components/FileUploader";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function Barcitos() {
  const client = useQueryClient();

  const { data: barcitos, isLoading } = useQuery(["barcitos"], () => BarcitoAPI.getAll());

  const [barFocus, setBarFocus] = useState({});
  const [managers, setManagers] = useState([]);
  const [value, setValue] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const mutation = useMutation(
    ({ id, data, image }) => {
      if (id) {
        return image ? BarcitoAPI.updateImage(id, image) : BarcitoAPI.update(id, data);
      }
      return BarcitoAPI.create(data);
    },
    {
      onSuccess: (data) => {
        client.invalidateQueries(["barcitos"]);
        alert("Success!");
        setBarFocus(data);
      },
    }
  );

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("barcito_img", selectedFile);
    mutation.mutate({ id: barFocus.id, image: formData });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Grid container spacing={1.5}>
        <Grid item xs={2}>
          <Button
            onClick={() => {
              setBarFocus({});
              setManagers([]);
              setValue(0);
              console.log(barFocus);
            }}
          >
            <AddBusinessOutlined sx={{ width: "100%", height: "200px", mt: 1.75 }} />
          </Button>
        </Grid>
        <Grid item xs={10}>
          <ImageList
            sx={{
              gridAutoFlow: "column",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr)) !important",
              gridAutoColumns: "minmax(200px, 1fr)",
            }}
          >
            {barcitos.map((bar, i) => (
              <ImageListItem key={i} sx={barFocus.id === bar.id ? { width: "200px", border: 2, borderColor: "red" } : { width: "200px" }}>
                <img src={bar.imagePath || "src/assets/images/barcito-placeholder.png"} alt={bar.name} loading="lazy" />
                <Button
                  onClick={() => {
                    setBarFocus(bar);
                    setManagers(bar.managers);
                  }}
                >
                  <ImageListItemBar title={bar.name} subtitle={bar.academicUnit?.shortName}></ImageListItemBar>
                </Button>
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} aria-label="barcito tabs">
              <Tab label="Información" id={"barcito-tab-0"} aria-controls={"barcito-tabpanel-0"} />
              <Tab disabled={barFocus.id ? false : true} label="Personal" id={"barcito-tab-1"} aria-controls={"barcito-tabpanel-1"} />
            </Tabs>
          </Box>

          <MainCard>
            <TabPanel value={value} index={0}>
              <Stack spacing={1} direction="row">
                <BarcitoForm barcito={barFocus} setBarFocus={setBarFocus} mutation={mutation} />
                {/* <BarcitoImage barId={barFocus.id} image={barFocus.imagePath} alt={barFocus.name} /> */}
                {barFocus.id && (
                  <Stack spacing={1}>
                    <img src={barFocus.imagePath || "src/assets/images/barcito-placeholder.png"} alt={barFocus.name} loading="lazy" width="200px" />
                    <form>
                      <FileUploader onFileSelectSuccess={(file) => setSelectedFile(file)} onFileSelectError={({ error }) => alert(error)} />

                      <button onClick={submitImage}>Submit</button>
                    </form>
                  </Stack>
                )}
              </Stack>
            </TabPanel>
            <TabPanel value={value} index={1}>
              {barFocus.id && barFocus.managers ? <ManagersTable managers={managers} setManagers={setManagers}></ManagersTable> : <p>None</p>}
            </TabPanel>
          </MainCard>
        </Grid>
      </Grid>
    </Container>
  );
}
