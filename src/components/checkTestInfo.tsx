import api from "../services/api";

interface TestInfo {
  name: string;
  pdfUrl: string;
  categoryId: number;
  teacherId: number;
  disciplineId: number;
}

async function checkTestInfo(testInfo: TestInfo, auth: string) {
  const { name, pdfUrl } = testInfo;

  const isUrl = require("is-valid-http-url");
  if (name.length < 3 || pdfUrl.length === 0) {
    throw {
      type: "incomplete",
      message: "Please, fill all fields to send your test",
    };
  }
  if (!isUrl) {
    throw {
      type: "incompatible",
      message: "Please, send a valid link to the test",
    };
  } else {
    let checkFormat = pdfUrl.split(".");

    if (checkFormat[checkFormat.length - 1] !== "pdf") {
      throw {
        type: "incompatible",
        message: "Only PDF formats are supported",
      };
    }
  }

  await api.newTest(auth, testInfo);
}

export { checkTestInfo };
