import { useState, useEffect } from "react";
import Joke from "./components/Joke";

export default function App() {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchUsers = async (url) => {
    try {
      const resp = await fetch(url);
      if (resp.status >= 200 && resp.status <= 299) {
        const data = await resp.json();
        setIsLoading(false);
        setJokes(data.jokes);
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers("https://v2.jokeapi.dev/joke/Programming?amount=10");
  }, []);

  if (isLoading) {
    return (
      <main className="container flex">
        <h1>Loading...</h1>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="container flex">
        <h1>Error while fetching data...</h1>
      </main>
    );
  }

  return (
    <main className="container flex flex-column">
      <h1 className="title">jokes</h1>
      <section className="jokes-container grid">
        {jokes.map((joke, i) => {
          return <Joke key={i} {...joke} />;
        })}
      </section>
    </main>
  );
}
