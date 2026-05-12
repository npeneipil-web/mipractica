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
      <div className="">
        <div className="relative top-25">
          <article className=" w-95 bg-[#252e32] rounded-full items-center ">
            <header className=" h-full flex px-1.5 py-2">
              <img className="w-20 rounded-full" src={url} />
              <div className="flex flex-col justify-center ml-2.5">
                <strong className=" text-white text-[20px] ">{name}</strong>
                <span className=" text-[12px]  text-sm text-gray-300 ">
                  @{userName}
                </span>
              </div>
              <aside className="items-center justify-end flex flex-1 mr-2.5">
                <button
                  className="bg-white rounded-full font-semibold border-gray-500 relative  w-20 h-9  hover:bg-gray-500 hover:text-white"
                  onClick={handleClick}
                >
                  {text}
                </button>
              </aside>
            </header>
          </article>
        </div>
      </div>
    </>
  );
};
