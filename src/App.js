import { useState, useEffect } from "react";
import Joke from "./components/Joke";

export default function App() {
  // States
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  // Fetch function
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
  // Fetch data on initial render
  useEffect(() => {
    fetchUsers("https://v2.jokeapi.dev/joke/Programming?amount=10");
  }, []);

  // Display loading message while fething
  if (isLoading) {
    return (
      <main className="container flex">
        <h1>Loading...</h1>
      </main>
    );
  }
  // Display error message when failed
  if (isError) {
    return (
      <main className="container flex">
        <h1>Error while fetching data...</h1>
      </main>
    );
  }
  // Display fetched data on success
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
