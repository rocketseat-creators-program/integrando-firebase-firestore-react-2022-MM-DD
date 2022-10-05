import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import * as FirestoreDB from "./utils/firestoreDB";

function App() {
  const [pathOnDB, setPathOnDB] = useState("");
  const [data, setData] = useState("");
  const [dataReceived, setDataReceived] = useState("");
  const [dataIsJson, setDataIsJson] = useState(false);

  useEffect(() => {
    console.log(`listen path = [/users/kg6hndXPPOYAYHGEP51C]`);
    FirestoreDB.listenChangeData(
      "/users/kg6hndXPPOYAYHGEP51C",
      (data, error) => {
        console.log(`document list = ${JSON.stringify(data.data())}`);
      }
    );
  }, []);

  function onButtonCreateClicked() {
    const DATA = dataIsJson ? JSON.parse(data) : data;
    FirestoreDB.createData(pathOnDB, DATA, (data, error) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log("onButtonCreateUpdateClicked", data);
    });
  }

  function onButtonUpdateClicked() {
    const DATA = dataIsJson ? JSON.parse(data) : data;
    FirestoreDB.updateData(pathOnDB, DATA, (data, error) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log("onButtonUpdateClicked", data);
    });
  }

  function onButtonReadListClicked() {
    FirestoreDB.readAllData(pathOnDB, (data, error) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log("onButtonReadListClicked", data[0].data());
      setDataReceived(`count = ${data.length}`);
    });
  }

  function onButtonReadDataClicked() {
    FirestoreDB.readData(pathOnDB, (data, error) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log("onButtonReadListClicked", data);
      setDataReceived(data);
    });
  }

  function onButtonDeleteClicked() {
    FirestoreDB.deleteData(pathOnDB, (data, error) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log("onButtonDeleteClicked", pathOnDB);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <textarea
          placeholder="pathOnDB"
          onChange={(event) => setPathOnDB(event.target.value)}
        />
        <textarea
          placeholder="data"
          onChange={(event) => setData(event.target.value)}
        />
        <br />
        <small>On get data: {JSON.stringify(dataReceived)}</small>
        <small>Data is json: </small>
        <input
          type="checkbox"
          onChange={(event) => setDataIsJson(event.target.value)}
        />
        <br />
        <button onClick={onButtonCreateClicked}>Create data</button>
        <br />
        <button onClick={onButtonUpdateClicked}>Update data</button>
        <br />
        <button onClick={onButtonReadListClicked}>Read all data</button>
        <br />
        <button onClick={onButtonReadDataClicked}>Read One data</button>
        <br />
        <button onClick={onButtonDeleteClicked}>Delete data</button>
        <br />
      </header>
    </div>
  );
}

export default App;
