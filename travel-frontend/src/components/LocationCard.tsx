import React from "react";
import { Location } from "../types/locationTypes";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteLocation } from "../services/locationServices";

interface NewCard extends Location {
  deleteData: (location: String, name: String) => void;
}

const LocationCard: React.FC<NewCard> = ({
  favourite,
  location,
  deleteData,
}) => {
  const handleDelete = async (location: String, name: String) => {
    let isDeleted = await deleteLocation(location, name);
    if (isDeleted) {
      deleteData(location, name);
    } else {
      alert("Error");
    }
  };

  return (
    <Grid container bgcolor={"ghostwhite"} margin={1} padding={3} spacing={2}>
      {favourite.map((ele,i) => (
        <Grid key={i} item xs={2.4}>
          <Card sx={{ width: 200, height: 220 }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {ele.name}
                </Typography>
                <span
                  onClick={() => {
                    handleDelete(location, ele.name);
                  }}
                >
                  <DeleteIcon />
                </span>
              </Box>
              <Divider />
              <Box mt={1}>
                <Typography variant="body2">{ele.description}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default LocationCard;
