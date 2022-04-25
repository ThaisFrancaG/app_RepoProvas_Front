import React, { useState, useEffect } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
  filterItems:
    | {
        id: number;
        name: string;
        temId?: number;
      }
    | any;
}

function TeacherMap(props: Props) {
  const { filterItems } = props;
  const [open, setOpen] = useState(true);
  const [opened, setOpened] = useState(null);

  function handleClick(id: number) {
    setOpened(id);
    setOpen(!open);
  }
  console.log(filterItems);

  return (
    <>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Lista de Professores
          </ListSubheader>
        }
      >
        {filterItems.map((item) => (
          <>
            <ListItemButton key={item.id} onClick={() => handleClick(item.id)}>
              <ListItemText primary={item.name} />
              {open && opened === item.id ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {/* <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Starred" />
                </ListItemButton>
              </List>
            </Collapse> */}
          </>
        ))}
      </List>
    </>
  );
}

function DisciplineMap(props: Props) {
  const { filterItems } = props;
  const [expanded, setExpanded] = useState(null);

  function handleChange(id) {
    setExpanded(id);
  }

  return (
    <>
      {filterItems.map((item) => (
        <div>
          <Accordion
            expanded={expanded === item.id}
            onClick={() => handleChange(item.id)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                {item.name}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Tests from {item.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                feugiat. Aliquam eget maximus est, id dignissim quam.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </>
  );
}

export { TeacherMap, DisciplineMap };
