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
      <div className="w-full h-full">
        <article
          className=" w-75 h-25
        left-20  relative top-30 "
        >
          <header className="bg-gray-200 h-full rounded-md">
            <img
              className="w-20 rounded-full relative left-3 top-2"
              src={url}
            />
            <div>
              <strong className="relative left-29 bottom-15 text-[20px]">
                {" "}
                {name}
              </strong>
              <span className="relative left-16 text-[12px] bottom-6">
                {userName}
              </span>
            </div>
          </header>
          <aside>
            <button
              className="bg-white rounded-2xl border-gray-500 relative  p-2 left-50 bottom-17  hover:bg-gray-500 hover:text-white"
              onClick={handleClick}
            >
              {text}
            </button>
          </aside>
        </article>
      </div>
    </>
  );
};
