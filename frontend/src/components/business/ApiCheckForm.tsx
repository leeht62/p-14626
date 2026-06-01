import { FormEvent, useState } from "react";

interface Header {
  key: string;
  value: string;
}

export default function ApiCheckForm() {
  const [url, setUrl] = useState("");
  const [requestBody, setRequestBody] = useState("");
  const [method, setMethod] = useState("POST");
  const [headers, setHeaders] = useState<Header[]>([{ key: "", value: "" }]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const requestOptions: RequestInit = {
        method: method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...headers.reduce((acc, { key, value }) => {
            if (key && value) {
              acc[key] = value;
            }
            return acc;
          }, {} as Record<string, string>),
        },
      };

      // GET과 DELETE가 아닐 때만 body 추가
      if (!["GET", "DELETE"].includes(method)) {
        requestOptions.body = requestBody;
      }

      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log("Response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // GET과 DELETE 메서드인지 확인하는 함수
  const isMethodWithoutBody = (method: string) =>
    ["GET", "DELETE"].includes(method);

  const handleHeaderChange = (
    index: number,
    field: keyof Header,
    value: string
  ) => {
    const newHeaders = [...headers];
    newHeaders[index] = { ...newHeaders[index], [field]: value };
    setHeaders(newHeaders);
  };

  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const removeHeader = (index: number) => {
    const newHeaders = headers.filter((_, i) => i !== index);
    setHeaders(newHeaders);
  };

  return (
    <div className="container">
      <h1>API Check Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Method:</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
          </select>
        </div>

        <div className="form-group">
          <label>API URL:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter API URL"
          />
        </div>

        <div className="form-group">
          <label>Headers:</label>
          {headers.map((header, index) => (
            <div key={index} className="header-row">
              <input
                type="text"
                value={header.key}
                onChange={(e) =>
                  handleHeaderChange(index, "key", e.target.value)
                }
                placeholder="Header key"
              />
              <input
                type="text"
                value={header.value}
                onChange={(e) =>
                  handleHeaderChange(index, "value", e.target.value)
                }
                placeholder="Header value"
              />
              <button
                type="button"
                onClick={() => removeHeader(index)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addHeader} className="add-button">
            Add Header
          </button>
        </div>

        {!isMethodWithoutBody(method) && (
          <div className="form-group">
            <label>Request Body:</label>
            <textarea
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              placeholder="Enter JSON request body"
              rows={10}
            />
          </div>
        )}

        <button type="submit">Send Request</button>
      </form>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 2rem;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        h1 {
          color: #333;
          margin-bottom: 2rem;
          text-align: center;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: bold;
          color: #555;
        }

        select,
        input,
        textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          margin-top: 0.25rem;
        }

        select {
          width: auto;
          min-width: 150px;
        }

        textarea {
          font-family: monospace;
          resize: vertical;
        }

        .header-row {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .header-row input {
          flex: 1;
        }

        .remove-button,
        .add-button {
          background-color: #dc3545;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-size: 0.875rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .add-button {
          background-color: #28a745;
          margin-top: 0.5rem;
        }

        .remove-button:hover {
          background-color: #c82333;
        }

        .add-button:hover {
          background-color: #218838;
        }

        button[type="submit"] {
          background-color: #0070f3;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        button[type="submit"]:hover {
          background-color: #0051cc;
        }
      `}</style>
    </div>
  );
}
