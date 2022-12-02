export default function Joke(data) {
  // Destructure data
  const { type, joke, setup, delivery } = data;
  return (
    <article className="joke flex flex-column">
      <h2 className="joke-title">{type === "single" ? joke : setup}</h2>
      {type === "twopart" && <p className="joke-delivery">{delivery}</p>}
    </article>
  );
}
