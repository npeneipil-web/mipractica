import { User } from "./index2";

//Un componente es una funcion que devuelve un elemento
export const Presentations = () => {
  //esto es una funcion
  return (
    <>
      <div className="flex flex-col gap-1">
        <User name="Nataly Soledad" userName="n4t4ly" />
        <User name="Miguel Durand " userName="midudev" />
        <User name="Juan Roman" userName="midudev2" />
        <User name="Juan Roman" userName="robertcalbulyevilao" />
      </div>
    </>
  );
};
