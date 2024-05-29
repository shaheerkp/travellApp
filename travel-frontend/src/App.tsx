// import { useState } from "react";
import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import { Location } from "./types/locationTypes";
import LocationCard from "./components/LocationCard";

function App() {
  const [result, setResult] = useState<Location | null>(null);

  const deleteData = (location: String, name: String) => {
    setResult({
      location: location.toString(),
      favourite: result?.favourite.filter((ele) => ele.name !== name) || [],
    });
  };

  return (
    <div>
      <SearchBar setResult={setResult} />
      {result && (
        <LocationCard
          deleteData={deleteData}
          favourite={result.favourite}
          location={result.location}
        />
      )}
    </div>
  );
}

export default App;
