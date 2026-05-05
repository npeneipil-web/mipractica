import { EmployeeTable } from "../emloy-table";
import { useEffect, useState } from "react";

export const InputFormPage = () => {
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [age, setAge] = useState<number | undefined>();
  const [position, setPosition] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center font-sans">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Input Form</h1>
      <form className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Nombre
          </label>
          <input
            value={name}
            id="name"
            type="text"
            placeholder="Enter your name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(event) => {
              const currentValue = event.target.value;
              setName(currentValue);
            }}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Apellido
          </label>
          <input
            value={lastName}
            id="lastName"
            type="text"
            placeholder="Enter your name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(event) => {
              const currentValue = event.target.value;
              setLastName(currentValue);
            }}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            value={email}
            id="email"
            type="email"
            placeholder="Enter your email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(event) => {
              const currentValue = event.target.value;
              setEmail(currentValue);
            }}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="age"
          >
            Edad
          </label>
          <input
            value={age}
            id="age"
            type="number"
            placeholder="Enter your age"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leanding-tight focus:outline-none focus:shadow-outline"
            onChange={(event) => {
              const currentValue = event.target.value;
              setAge(currentValue ? parseInt(currentValue) : undefined);
            }}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="position"
          >
            Cargo
          </label>
          <input
            value={position}
            id="position"
            type="text"
            placeholder="Enter your position"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(event) => {
              const currentValue = event.target.value;
              setPosition(currentValue);
            }}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Descripcion
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => {
              const currentValue = event.target.value;
              setDescription(currentValue);
            }}
            placeholder="Enter your description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </form>

      <InputFormPreview
        name={name}
        lastName={lastName}
        email={email}
        position={position}
        age={age}
        description={description}
      />
    </div>
  );
};

//Este componente se llamara input-form-preview y va a recibir como parametros el nombre apellido email cargo y descripcion y se lo mostrara como texto
interface InputFormPreviewProps {
  name?: string;
  lastName?: string;
  email?: string;
  position?: string;
  age?: number;
  description?: string;
}

const InputFormPreview: React.FC<InputFormPreviewProps> = ({
  name,
  lastName,
  email,
  position,
  age,
  description,
}) => {
  return (
    <EmployeeTable
      name={name || lastName ? `${name || ""} ${lastName || ""}` : ""}
      email={email || ""}
      position={position || ""}
      age={age || undefined}
      description={description || ""}
    />
  );
};
