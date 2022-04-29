import React, { useState, useEffect } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import api from "../services/api";
import useAuth from "../hooks/userAuth";
import { Categories, TestsCategories } from "./TestAccordions";

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
  const [categories, setCategories] = useState([]);
  const [outerTestList, setOuterTestList] = useState([]);
  const [testList, setTestList] = useState([]);
  const [expandedFilter, setExpandedFilter] = useState(null);
  const [expandedOuter, setExpandedOuter] = useState(null);
  const [expandedCategorie, setExpandedCategorie] = useState(null);
  const [expandedInner, setExpandedInner] = useState(null);

  const { auth } = useAuth();
  console.log(filterItems);
  function handleChange(id) {
    setExpandedFilter(id);
  }

  function handleChangeCategorie(id) {
    setExpandedCategorie(id);
  }
  useEffect(() => {
    console.log("chegou aqui Outer");
    getCategories();
  }, [expandedFilter]);

  async function getCategories() {
    const categorieList = await api.getCategories(auth);
    setCategories(categorieList);
  }

  return (
    <>
      {filterItems.map((item: any) => (
        <Accordion
          sx={{ width: "100%" }}
          expanded={expandedFilter === item.id}
          onClick={() => handleChange(item.id)}
        >
          <AccordionSummary
            sx={{ backgroundColor: "#9575cd" }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              {item.name}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              All tests from the {item.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Categories categorieList={categories} instructor={item.id} />
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}

export { TeacherMap };
