import React, { useState } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import BubblePlot from "./BubblePlot";

export default function UploadCSV() {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      setLoading(true);
      setSuccess(false);
      setError(false);

      try {
        const formData = new FormData();
        formData.append("csv_file", file);

        const response = await fetch("http://127.0.0.1:5000/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const text = await response.text();
          csvFileToArray(text);
          setSuccess(true);
        } else {
          throw new Error("Network response was not ok.");
        }
      } catch (error) {
        console.error("Error:", error);
        setError(true);
      }

      setLoading(false);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Visualization Plots</h1>
      <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
          style={{ marginRight: "10px" }}
        />

        <br />
        <button
          style={{
            backgroundColor: "#333",
            color: "#eee",
            padding: "12px 24px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            marginRight: "10px",
            marginBottom: "10px",
          }}
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          Send
        </button>
      </form>

      {loading && (
        <div>
          <p>Uploading file and generating plots... <FontAwesomeIcon icon={faSpinner} spin /></p>
        </div>
      )}

      {success && (
        <div>
          <p>Generated plots successfully!</p>

        </div>
      )}

      {error && <p>Error generating plots. Please try again.</p>}
    </div>
  );
}
