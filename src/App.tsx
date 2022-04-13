import { Cat, db } from "database/database";
import { useEffect, useMemo, useState } from "react";
import "./App.css";
import logo from "./logo.svg";

function App() {
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(false);

  const isOnline = useMemo(() => {
    return navigator.onLine;
  }, []);

  useEffect(() => {
    async function load(_isOnline: boolean) {
      if (_isOnline) {
        const catFact = await (
          await fetch("https://catfact.ninja/fact")
        ).json();
        (await db).put("cats", catFact as Cat);
        setFact(catFact.fact);
        setLoading(false);
        return;
      }

      const total = await (await db).count("cats");
      const lastFact = await (await db).get("cats", total - 1);

      setFact(lastFact?.fact || "");
      setLoading(false);
    }

    if (loading) return;
    setLoading(true);
    load(isOnline);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline]);

  useEffect(() => {
    console.log(fact);
  }, [fact]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>{fact}</p>
      </header>
    </div>
  );
}

export default App;
