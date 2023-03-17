import { useState } from "react";
import axios from "axios";
import "bootswatch/dist/vapor/bootstrap.min.css";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [filename, setFilename] = useState("");
  const [loading, setLoading] = useState("");
  const [showCleanButton, setShowClearButton] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setShowClearButton(true);
    try {
      const response = await axios.post("http://localhost:8080/image", {
        prompt,
      });
      setFilename(response.data.url);
    } catch (error) {
      console.log("error al generar la imagen", error.message);
    }
    setLoading(false);
  };
  const handleClear = () => {
    setPrompt("");
    setFilename("");
    setShowClearButton(false);
  };

  return (
    <>
      <div className="flex items-center">
        <h1>AI CANVAS</h1>
        <h3>Crea imagenes con Inteligencia Artificial</h3>
        <div>
          <div className="card border-dark mb-3 w-20 mt-5 mx-auto">
            <div className="accordion-body">
              <h2 className="text-warning">Transforma texto en imagenes...</h2>
            </div>
            <div className="card-body">
              <p className="card-text text-secondary">
                Ingresa un texto descriptivo y espera el resultado.
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3 input-group-lg">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Que quieres crear?"
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <button
                  className="btn btn-primary text-bg-primary"
                  id="button-addon2"
                  type="submit"
                >
                  Crear!
                </button>
              </div>
              {loading && (
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated w-100"
                    role="progressbar"
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              )}
              {showCleanButton && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="btn btn-outline-warning mt-5"
                >
                  <font clasName="vertical-align: inherit;">
                    <font className="vertical-align: inherit;">Limpiar</font>
                  </font>
                </button>
              )}
            </form>
          </div>
        </div>
        {filename && (
          <div className="card bg-dark mb-3 max-width: 20rem">
            <img src={filename} alt="Imagen generada" />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
