import Shortener from "./Shortener";
import { TiDeleteOutline } from "react-icons/ti";
import UrlList from "./UrlList";
import { useState, useEffect } from "react";

const getLocalStorage = () => {
  if (!localStorage.getItem("links")) return [];
  return JSON.parse(localStorage.getItem("links"));
};

export default function Main() {
  const [links, setLinks] = useState(getLocalStorage);

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(links));
  }, [links]);

  function addLink(newItem) {
    setLinks([...links, newItem]);
  }

  function hideLinks() {
    setLinks([]);
  }

  return (
    <main>
      <Shortener addLink={addLink} />
      <UrlList urlList={links} />
      <div className="flex justify-center">
            { links.length > 0 && <TiDeleteOutline className="btn-cross" onClick={hideLinks} /> }
        </div>
      <section className="stats pb-11 lg:pb-20">
        <h3 className="title pb-2">REMOVE ALL URL'S</h3>
      </section>
    </main>
  );
}
