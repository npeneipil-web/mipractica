import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldLabel,
  ShineBorder,
} from "@outlier-spa/component";
import { EmployeeTable } from "../emloy-table";
import { useState } from "react";

export const InputFormPage = () => {
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [age, setAge] = useState<number | undefined>();
  const [position, setPosition] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <>
      <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center font-sans">
        <Card className="relative overflow-hidden w-80 py-6 gap-6">
          <ShineBorder shineColor="white"></ShineBorder>
          <CardHeader>
            <CardTitle>Formulario</CardTitle>
            <CardDescription>Ingrese los siguientes datos</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <Field className="mb-4">
                <FieldLabel htmlFor="name">Nombre</FieldLabel>
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
              </Field>
              <Field className="mb-4">
                <FieldLabel htmlFor="name">Apellido</FieldLabel>
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
              </Field>
              <Field className="mb-4">
                <FieldLabel htmlFor="email">Email</FieldLabel>
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
              </Field>

              <Field className="mb-4">
                <FieldLabel htmlFor="age">Edad</FieldLabel>
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
              </Field>

              <Field className="mb-4">
                <FieldLabel htmlFor="position">Cargo</FieldLabel>
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
              </Field>
              <Field className="mb-4">
                <FieldLabel htmlFor="description">Descripcion</FieldLabel>
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
              </Field>
            </form>
          </CardContent>
        </Card>

        <InputFormPreview
          name={name}
          lastName={lastName}
          email={email}
          position={position}
          age={age}
          description={description}
        />
      </div>
    </>
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
