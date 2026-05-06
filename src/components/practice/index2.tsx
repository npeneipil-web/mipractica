import { useState } from "react";
//Un componente es una funcion que devuelve un elemento
interface userProps {
  userName?: string;
  name?: string;
}

export const User = ({ userName, name }: userProps) => {
  const [isFollowing, setIsFollowing] = useState(false);

  //estructura compacta de escribir estructura if...else
  const text = isFollowing ? "Siguiendo" : "Seguir";

  const handleClick = () => {
    setIsFollowing(!isFollowing);
  };
  //crear constante
  const url = `https://unavatar.io/github/${userName}`;
  //esto es una funcion
  return (
    <>
      <article className="bg-amber-200">
        <header>
          <img src={url} />
          <div>
            <strong>{name}</strong>
            <span>{userName}</span>
          </div>
        </header>
        <aside>
          <button className="bg-blue-300" onClick={handleClick}>
            {text}
          </button>
        </aside>
      </article>
    </>
  );
};
