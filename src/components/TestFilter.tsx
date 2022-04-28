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
import api from "../services/api";
import useAuth from "../hooks/userAuth";

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
  const [outerTestList, setOuterTestList] = useState([]);
  const [expandedFilter, setExpandedFilter] = useState(null);
  const [expandedOuter, setExpandedOuter] = useState(null);
  const [expandedInner, setExpandedInner] = useState(null);

  const { auth } = useAuth();

  function handleChange(id) {
    setExpandedFilter(id);
  }

  function handleChangeOuter(id) {
    setExpandedOuter(id);
  }

  function handleChangeInner(id) {
    setExpandedOuter(id);
  }

  useEffect(() => {
    console.log("chegou aqui Outer");
    getOuterTestList();
  }, [expandedFilter]);

  useEffect(() => {
    console.log("chegou aqui Inner");
    getInnerTestList();
  }, [expandedOuter]);

  async function getOuterTestList() {
    const outerList = await api.getOuterListDisciplines(auth, expandedFilter);
    setOuterTestList(outerList);
  }

  async function getInnerTestList() {
    const innerList = await api.getInnerListDisciplines(auth, expandedOuter);
    setOuterTestList(innerList);
  }
  return (
    <>
      {filterItems.map((item: any) => (
        <div>
          <Accordion
            expanded={expandedFilter === item.id}
            onClick={() => handleChange(item.id)}
          >
            <AccordionSummary
              sx={{ backgroundColor: "#ede7f6" }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                {item.number}º Term
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                All tests from the {item.number}º term by discipline
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {outerTestList.length === 0 ? (
                  <Typography>
                    There are no tests on our archives for this term!
                  </Typography>
                ) : (
                  outerTestList.map((outerItem: any) => (
                    <Accordion
                      expanded={expandedOuter === outerItem.id}
                      onClick={() => handleChangeOuter(outerItem.id)}
                    >
                      <AccordionSummary
                        sx={{ backgroundColor: "#d1c4e9" }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography sx={{ width: "33%", flexShrink: 0 }}>
                          {outerItem.name}
                        </Typography>
                        <Typography sx={{ color: "text.secondary" }}>
                          All tests from the {outerItem.name}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Nulla facilisi. Phasellus sollicitudin nulla et quam
                          mattis feugiat. Aliquam eget maximus est, id dignissim
                          quam.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))
                )}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </>
  );
}

export { TeacherMap, DisciplineMap };
