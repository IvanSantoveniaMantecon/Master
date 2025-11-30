import { useState, useEffect } from "react";
import CardList from "./Components/CardList";
import Scroll from "./Components/Scroll";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./Components/ErrorFallback";
import Searcher from "./Components/Searcher";

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchField, setSearchField] = useState("");

  // Función para manejar el cambio en el campo de búsqueda
  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  // Filtrar contactos según el campo de búsqueda
  const searchedContacts = contacts.filter((contact) =>
    `${contact.name.first} ${contact.name.last}`
      .toLowerCase()
      .includes(searchField.toLowerCase())
  );

  // Función para ordenar de A-Z
  const onAZ = () => {
    const sortedAZ = [...contacts].sort((a, b) =>
      `${a.name.first} ${a.name.last}`.localeCompare(
        `${b.name.first} ${b.name.last}`
      )
    );
    setContacts(sortedAZ);
  };

  // Función para ordenar de Z-A
  const onZA = () => {
    const sortedZA = [...contacts].sort((a, b) =>
      `${b.name.first} ${b.name.last}`.localeCompare(
        `${a.name.first} ${a.name.last}`
      )
    );
    setContacts(sortedZA);
  };

  // Efecto para obtener datos de la API
  useEffect(() => {
    fetch("https://randomuser.me/api/?results=50")
      .then((response) => response.json())
      .then((data) => setContacts(data.results));
  }, []);

  return (
    <div className="tc">
      <header>
        <h1 className="f1">My Contacts</h1>
      </header>

      {contacts.length === 0 ? (
        <h2 className="f2">Loading...</h2>
      ) : (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Searcher searchChange={onSearchChange} az={onAZ} za={onZA} />
          <Scroll>
            <CardList contacts={searchedContacts} />
          </Scroll>
        </ErrorBoundary>
      )}

      <footer>
        <hr />
        <p>Desarrollo de Software para Dispositivos Móviles. {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
