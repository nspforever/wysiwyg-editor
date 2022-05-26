// import logo from './logo.svg';
import { useState } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';
import Editor from './components/Editor';
import ExampleDocument from './utils/ExampleDocument';

function App() {
  const [document, updateDocument] = useState(ExampleDocument);
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <NavbarBrand href="#">
          <img
            alt=""
            src="/app-icon.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          WYSIWYG Editor
        </NavbarBrand>
      </Navbar>
      <div className="App">
        <Editor document={document} onChange={updateDocument} />
      </div>
    </>
  );
}

export default App;
