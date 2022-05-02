import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Stack from "@mui/material/Stack";

interface Props {
  filter: null | string;
  setFilter: null | any;
}

export default function SearchOptions(props: Props) {
  const [alignment, setAlignment] = React.useState("discipline");
  const { filter, setFilter } = props;
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);

    setFilter(filter === "disciplines" ? "teachers" : "disciplines");
  };

  return (
    <Stack direction="row" spacing={4}>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="disciplines">DISCIPLINES</ToggleButton>
        <ToggleButton value="teachers">TEACHERS</ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
