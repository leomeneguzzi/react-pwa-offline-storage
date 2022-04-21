import { Cat, db } from "database/database";
import { useEffect, useMemo, useState } from "react";

export function CatFact() {
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
        db.cats.add(catFact as Cat);
        setFact(catFact.fact);
        setLoading(false);
        return;
      }

      const total = await db.cats.count();
      const lastFact = await db.cats.get(total);

      setFact(lastFact?.fact || "");
      setLoading(false);
    }

    if (loading) return;
    setLoading(true);
    load(isOnline);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline]);

  return <p>{fact}</p>;
}
