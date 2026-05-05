//se define una interfaz para las propiedades del botón,
// en este caso solo tiene una propiedad llamada "title" de tipo string.
interface ButtonProps {
  title: string;
}

//tres formas diferentes de definir el mismo componente en React utilizando TypeScript.
// Todas cumplen la misma función: renderizar un botón que muestra un texto (title) pasado por propiedades (props)
function MyButton({ title }: ButtonProps) {
  function handleClick() {
    console.log("Button clicked");
    // sume sod numero
    //cambiar fondo
  }

  return <button onClick={handleClick}>{title}</button>;
}

const Button = ({ title }: ButtonProps) => {
  function handleClick() {
    console.log("Button clicked");
    // sume sod numero
    //cambiar fondo
  }
  return <button onClick={handleClick}> {title}</button>;
};

const Button2: React.FC<ButtonProps> = ({ title }) => {
  return <button> {title}</button>;
};

//se llaman los componentes para mostrar su funcionamiento.
<MyButton title="ssad" />;
<Button title="asdasd" />;
<Button2 title="asdasd" />;
