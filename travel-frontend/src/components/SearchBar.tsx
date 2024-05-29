import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Location } from "../types/locationTypes";
import { getLocation } from "../services/locationServices";

interface SearchBarProps {
  setResult: React.Dispatch<React.SetStateAction<Location | null>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ setResult }) => {
  const [searchLocation, setSearchLocation] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false);
  const [err,setErr]=useState('')
  const handleSearchLocation = async () => {
    try {
      setLoading(true);
      setErr("")
      const response = await getLocation(searchLocation);
      setLoading(false);
      setResult(response.data);
    } catch (error) {
      setResult(null)
      setLoading(false);
      setErr('Error parsing Data from api')
    }
  };
  return (
    <div>
      <div>
        <TextField
          id="search-location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          label="Seach Location"
          variant="outlined"
        />
      </div>
      <div>
        <Button
          onClick={handleSearchLocation}
          size="small"
          variant="contained"
          sx={{ mt: 1, mb: 1 }}
        >
          Search
        </Button>
      </div>
      {loading && <CircularProgress color="inherit" />}
      {err&&<Typography variant="subtitle2" sx={{color:"red"}}>{err}</Typography>}
    </div>
  );
};

export default SearchBar;
