import { useState } from "react";
import { Trash } from "lucide-react";
import { toast } from "sonner";

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
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  RadioGroup,
  RadioGroupItem,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
  Progress,
  Field,
  FieldContent,
  FieldLabel,
  FieldDescription,
  FieldTitle,
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  Skeleton,
  Toaster,
} from "@outlier-spa/component";
import { PokeApiPage } from "../pokeapi-page/index";
import { Presentations } from "../practice/index";

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
      <div className=" w-full font-mono flex   flex-col  items-center">
        <div className="w-150 ">
          <Card>
            <div className="flex flex-col  items-center">
              <h1 className="text-center font-bold text-[20px] p-6 ">
                Articulos de Supermercado
              </h1>
              <div className="w-120">
                <Input
                  type="text"
                  placeholder="leche"
                  value={search}
                  onChange={(evento) => setSearch(evento.target.value)}
                ></Input>
              </div>
              <Button className="mt-5" onClick={handleAddArticle}>
                Agregar
              </Button>

              <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                  <AlertDialogHeader>
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
                  <TableCell className="flex flex-col  gap-2 ml-10 mt-5 ">
                    {searchHistory.some((article) => article.completed) && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="default"
                            className="w-20 hover:text-red-500"
                          >
                            <Trash />
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Estas seguro?</AlertDialogTitle>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel variant="outline" size="default">
                              Cancelar
                            </AlertDialogCancel>

                            <AlertDialogAction
                              variant="default"
                              size="default"
                              onClick={() => {
                                const filtered = searchHistory.filter(
                                  (article) => !article.completed,
                                );
                                setSearchHistory(filtered);
                              }}
                            >
                              Continuar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}

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
                          <div className=" h-7 w-30 ">
                            <li
                              className={
                                item.completed
                                  ? "line-through text-gray-400"
                                  : ""
                              }
                            >
                              {item.name}
                            </li>
                          </div>
                        </div>
                      ))}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </div>
        <div className="mt-20">
          <Accordion
            className="w-100"
            collapsible
            defaultValue="item-1"
            type="single"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Product Information</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Natus, at hic reiciendis accusantium consectetur nam ipsum
                  aperiam debitis, est aliquid perferendis omnis inventore
                  placeat modi quisquam et, repudiandae quas ea!
                </p>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Delectus explicabo tenetur odit amet laudantium minima natus
                  nihil, accusamus in sequi.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Shipping Details</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>Lorem ipsum dolor sit amet.</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
                  quam!
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Return Policy</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Itaque, dolores.
                </p>
                <p>
                  Our hassle-free return process includes free return shipping
                  and full refunds processed within 48 hours of receiving the
                  returned item.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="mt-10">
          <Progress className="w-50" value={70} />
        </div>
        <div className="mt-10">
          <RadioGroup defaultValue="plus" className="max-w-sm">
            <FieldLabel htmlFor="plus-plan">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Plus</FieldTitle>
                  <FieldDescription>
                    Lorem ipsum dolor sit amet.
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="plus" id="plus-plan" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="pro-plan">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Pro</FieldTitle>
                  <FieldDescription>Lorem ipsum dolor sit.</FieldDescription>
                </FieldContent>
                <RadioGroupItem value="pro" id="pro-plan" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="enterprise-plan">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Enterprise</FieldTitle>
                  <FieldDescription>
                    Lorem ipsum dolor sit amet consectetur.
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="enterprise" id="enterprise-plan" />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </div>
        <div className="w-100 flex gap-4 mt-10 justify-center">
          <div>
            <Button
              onClick={() => {
                toast("Evento creado", { description: "hoy" });
              }}
              variant="outline"
            >
              click
            </Button>
          </div>
          <div className="flex items-center ">
            <Toaster />
            <Button onClick={function gG() {}}>Mensaje emergente</Button>
          </div>
        </div>

        <div className="p-10">
          <ResizablePanelGroup
            className="border md:min-w-200 max-w-md rounded-lg "
            direction="horizontal"
          >
            <ResizablePanel className="h-100" defaultSize={50}>
              <div className="flex items-center justify-center ">
                <Presentations></Presentations>
              </div>
            </ResizablePanel>
            <ResizableHandle></ResizableHandle>
            <ResizablePanel defaultSize={50}>
              {" "}
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={50}>
                  <div className="flex justify-center items-center gap-4 mt-15">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-62" />
                      <Skeleton className="h-4 w-50" />
                    </div>
                  </div>
                </ResizablePanel>
                <ResizableHandle></ResizableHandle>
                <ResizablePanel defaultSize={50}>
                  <div>
                    <span>Three</span>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
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
