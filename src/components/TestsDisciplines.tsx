import React, { useState, useEffect } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import api from "../services/api";
import useAuth from "../hooks/userAuth";
import { Categories } from "./TestAccordions";

function DisciplineMap({ filter }) {
  // alert("estou já npo mapeamento de disciplina");
  const [categories, setCategories] = useState([]);
  const [terms, setTerms] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [expandedTerm, setExpandedTerm] = useState(null);
  const [expandedDiscipline, setExpandedDiscipline] = useState(null);
  const [expandedCategorie, setExpandedCategorie] = useState(null);

  const { auth } = useAuth();

  function handleChange(id) {
    setExpandedTerm(id);
  }

  function handleChangeDiscipline(id) {
    setExpandedDiscipline(id);
  }
  function handleChangeCategorie(id) {
    setExpandedCategorie(id);
  }
  useEffect(() => {
    getTerms();
    getDisciplines();
  }, [expandedTerm]);

  useEffect(() => {
    getCategories();
  }, [expandedDiscipline]);

  async function getCategories() {
    const categorieList = await api.getCategories(auth);
    setCategories(categorieList);
  }
  async function getDisciplines() {
    const disciplinesList = await api.getDisciplineByTerm(auth, expandedTerm);
    setDisciplines(disciplinesList);
  }
  async function getTerms() {
    const termsList = await api.getTerms(auth);
    setTerms(termsList);
  }
  return (
    <>
      {" "}
      {terms.map((item: any) => (
        <Accordion
          sx={{ width: "100%" }}
          expanded={expandedTerm === item.id}
          onClick={() => handleChange(item.id)}
        >
          <AccordionSummary
            sx={{ backgroundColor: "#9575cd" }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              {item.number}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              All tests from the {item.number}º term
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {disciplines.map((item: any) => (
                <Accordion
                  sx={{ width: "100%" }}
                  expanded={expandedDiscipline === item.id}
                  onClick={() => handleChangeDiscipline(item.id)}
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
                      All tests from the discipline{item.name}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {" "}
                      <Categories
                        categorieList={categories}
                        filterId={item.id}
                        filter={filter}
                      />
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}

export { DisciplineMap };
