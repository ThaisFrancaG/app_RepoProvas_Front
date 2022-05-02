import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import api from "../services/api";
import useAuth from "../hooks/userAuth";
import Link from "@mui/material/Link";
interface Props {
  testList: {
    id: number;
    name: string;
    pdfUrl: string;
  };
  filter: string | null;
}
function TestsCategories(props: any) {
  const [expandedTest, setExpandedTest] = useState(null);
  const { auth } = useAuth();
  function handleChangeTest(id) {
    setExpandedTest(id);
  }
  const { testList, filter } = props;

  async function handleTestClick(id: number) {
    try {
      await api.testView(auth, id);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {testList.map((test) => (
        <Accordion
          sx={{ width: "100%" }}
          expanded={expandedTest === test.id}
          onClick={() => handleChangeTest(test.id)}
        >
          <AccordionSummary
            sx={{ backgroundColor: "#9575cd" }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              {test.name}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              All tests from the {test.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h5">
              <Link
                onClick={() => handleTestClick(test.id)}
                href={test.pdfUrl}
                target="_blank"
                underline="always"
              >
                PDF:{test.pdfUrl}
              </Link>
            </Typography>

            <Typography>Tests Views:{test.views}</Typography>

            {filter === "teacher" ? (
              <Typography>{test.teacherDiscipline.discipline.name} </Typography>
            ) : (
              <Typography>{test.teacherDiscipline.teacher.name} </Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}

function Categories({ categorieList, instructor }) {
  const [expandedCategorie, setExpandedCategorie] = useState(null);
  const [testList, setTestList] = useState([]);
  const { auth } = useAuth();

  function handleChangeCategorie(id) {
    setExpandedCategorie(id);
  }

  useEffect(() => {
    getInnerTestList();
  }, [expandedCategorie]);

  async function getInnerTestList() {
    const innerList = await api.testCategory(
      auth,
      instructor,
      expandedCategorie,
      "teacher"
    );

    setTestList(innerList);
  }
  return (
    <>
      {categorieList.map((item) => (
        <Accordion
          sx={{ width: "100%" }}
          expanded={expandedCategorie === item.id}
          onClick={() => handleChangeCategorie(item.id)}
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
              All tests from the {item.name} category
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <TestsCategories testList={testList} filter={"teacher"} />
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}

export { TestsCategories, Categories };
