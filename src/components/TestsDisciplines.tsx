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
import { TestsCategories } from "./TestAccordions";

interface Props {
  filterItems:
    | {
        id: number;
        name: string;
        temId?: number;
      }
    | any;
}

function DisciplineMap(props: Props) {
  const { filterItems } = props;
  const [categories, setCategories] = useState([]);
  const [outerTestList, setOuterTestList] = useState([]);
  const [testList, setTestList] = useState([]);
  const [expandedFilter, setExpandedFilter] = useState(null);
  const [expandedOuter, setExpandedOuter] = useState(null);
  const [expandedCategorie, setExpandedCategorie] = useState(null);
  const [expandedInner, setExpandedInner] = useState(null);

  const { auth } = useAuth();

  function handleChange(id) {
    setExpandedFilter(id);
  }
  function handleChangeOuter(id) {
    setExpandedOuter(id);
  }
  function handleChangeCategorie(id) {
    setExpandedCategorie(id);
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
    getOuterTestList();
  }, [expandedOuter]);

  useEffect(() => {
    console.log("chegou aqui categorie");
    getInnerTestList();
  }, [expandedCategorie]);

  async function getOuterTestList() {
    const { categories, disciplines } = await api.getOuterListDisciplines(
      auth,
      expandedFilter
    );
    setOuterTestList(disciplines);
    setCategories(categories);
  }

  async function getInnerTestList() {
    const innerList = await api.getInnerListDisciplines(
      auth,
      expandedOuter,
      expandedCategorie
    );
    console.log(expandedCategorie);
    console.log(innerList);
    setTestList(innerList);
  }
  return (
    <>
      {filterItems.map((item: any) => (
        <div>
          <Accordion
            sx={{ width: "100%" }}
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
                      sx={{ width: "100%" }}
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
                          {categories.length === 0 ? (
                            <Typography>Please try again!</Typography>
                          ) : (
                            categories.map((categorie: any) => (
                              <Accordion
                                sx={{ width: "100%" }}
                                expanded={expandedCategorie === categorie.id}
                                onClick={() =>
                                  handleChangeCategorie(categorie.id)
                                }
                              >
                                <AccordionSummary
                                  sx={{ backgroundColor: "#d1c4e9" }}
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1bh-content"
                                  id="panel1bh-header"
                                >
                                  <Typography
                                    sx={{ width: "33%", flexShrink: 0 }}
                                  >
                                    {categorie.name}
                                  </Typography>
                                  <Typography sx={{ color: "text.secondary" }}>
                                    All tests from the {categorie.name}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  {testList.length === 0 ? (
                                    <Typography>
                                      {" "}
                                      There are no tests!{" "}
                                    </Typography>
                                  ) : (
                                    <TestsCategories testList={testList} />
                                  )}
                                </AccordionDetails>
                              </Accordion>
                            ))
                          )}
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

export { DisciplineMap };
