import { useState } from "react";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  Card,
  Table,
  Button,
  Input,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogFooter,
  TableCaption,
  TableBody,
  TableRow,
  TableCell,
} from "@outlier-spa/component";

interface ArticleItem {
  id: number;
  name: string;
  completed: boolean; //si esta completado o no
}

export const Article = () => {
  //Reemplaza el nuevo articulo
  const [newArticle, setNewArticle] = useState<string>("");
  //realiza una busqueda
  const [search, setSearch] = useState<string>("");
  //guarda historial
  const [searchHistory, setSearchHistory] = useState<ArticleItem[]>([]);
  // Estado para saber si el AlertDialog está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);
  // Estado para guardar el mensaje de error que queremos mostrar
  const [alertMessage, setAlertMessage] = useState({
    title: "",
    description: "",
  });
  const handleAddArticle = () => {
    const trimmedSearch = search.trim();

    // campo vacio
    if (trimmedSearch === "") {
      setAlertMessage({
        title: "Un momento...",
        description: "No puedes agregar un articulo vacio",
      });
      setIsOpen(true); // abre el AlertDialog
      return;
    }

    //  repetido
    if (searchHistory.some((item) => item.name === trimmedSearch)) {
      setAlertMessage({
        title: "Articulo duplicado",
        description: `El articulo "${trimmedSearch}" ya se encuentra en la lista`,
      });
      setIsOpen(true);
      return;
    }

    // Ok, guarda
    setNewArticle(trimmedSearch);
    setSearchHistory([
      ...searchHistory,
      { id: Date.now(), name: trimmedSearch, completed: false },
    ]);
    setSearch("");
  };

  return (
    <>
      <div className=" w-full font-mono flex justify-center  ">
        <div className="w-150">
          <Card>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-center font-bold text-[20px] p-6 ">
                Articulos de Supermercado
              </h1>

              <Input
                type="text"
                placeholder="leche"
                value={search}
                onChange={(evento) => setSearch(evento.target.value)}
              ></Input>

              <Button className="mt-2" onClick={handleAddArticle}>
                Agregar
              </Button>

              <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    {/* renderiza los textos segun el error */}
                    <AlertDialogTitle>{alertMessage.title}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {alertMessage.description}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <Button onClick={() => setIsOpen(false)}>Entendido</Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <Table>
              <TableCaption>Último producto agregado {newArticle}</TableCaption>
              <TableBody>
                <TableRow className="flex flex-col">
                  {/* map se usa para recorrer el arreglo searchHistory y muestra cada elemento.*/}
                  <TableCell className="flex flex-col  gap-2 ml-10 mt-5 ">
                    {searchHistory
                      //función de filtrado sería decidir qué elementos se muestran en pantalla

                      //   .filter((item) =>
                      //     item.toLowerCase().includes(search.toLowerCase()),
                      //   )
                      //muestra los elementos por pantalla
                      .map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between w-full "
                        >
                          <input
                            className=" h-5 w-5 bg-white border transition-all duration-200 checked:p-1 checked:bg-amber-500 checked:border-amber-600 checked:border-2 border-gray-400  rounded-full appearance-none"
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => {
                              const updated = searchHistory.map((article) =>
                                article.id === item.id
                                  ? {
                                      ...article,
                                      completed: !article.completed,
                                    }
                                  : article,
                              );

                              setSearchHistory(updated);
                            }}
                          />
                          <li
                            className={
                              item.completed ? "line-through text-gray-400" : ""
                            }
                          >
                            {item.name}
                          </li>

                          <button
                            onClick={() => {
                              // Filtramos el array original para eliminar el elemento seleccionado
                              const filtered = searchHistory.filter(
                                (article) => article.id !== item.id,
                              );
                              setSearchHistory(filtered);
                            }}
                            className="border border-transparent bg-transparent  rounded-md p-1 text-xs hover:text-red-500 "
                          >
                            <Trash />
                          </button>
                        </div>
                      ))}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
      {/**    
       * Renderizado
       * <RenderChildren>
        <h1>Este es un H1</h1>
      </RenderChildren> */}
    </>
  );
};

const RenderChildren = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      {children}
      <div className="bg-gray-300 p-2.5">
        <p className="mb-2.5">
          Abajo esta el render de los hijos del componente
        </p>
      </div>
    </>
  );
};
