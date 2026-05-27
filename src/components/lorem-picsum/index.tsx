import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  Card,
  CardContent,
  Input,
  CarouselNext,
  CarouselPrevious,
  Field,
  FieldLabel,
  Button,
  Command,
  CommandEmpty,
  CommandInput,
  CommandGroup,
  CommandDialog,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  Calendar,
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuTrigger,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@outlier-spa/component";
import { Calculator, Smile, Settings, CreditCard, User } from "lucide-react";

//una interfaz declara las propiedades con su respectivo tipo de dato
interface LoremPicsumData {
  width: number;
  height: number;
}

//crea una funcion
export const LoremPicsumPage = () => {
  //crea useState
  const [data, setData] = useState<LoremPicsumData>({
    width: 100,
    height: 200,
  });

  const [images, setImages] = useState<string[]>([]);

  function handleClick() {
    if (data.width <= 0 || data.height <= 0) return;
    //reemplaza los datps ingresados desde data ancho y alto
    const newUrl = `https://picsum.photos/${data.width}/${data.height}?random=${Date.now()}`;
    setImages((prev) => [...prev, newUrl]);
  }

  return (
    <>
      <div className="w-full h-full flex flex-col ">
        <div>
          <Card className=" w-100 m-auto mt-20 ">
            {images.length > 0 && (
              <div className=" mt-5 m-auto w-full  relative px-8">
                <Carousel opts={{ align: "start" }}>
                  <CarouselContent>
                    {images.map((image, index) => (
                      <CarouselItem
                        key={`${image}-${index}`}
                        className="basis-full md:basis-1/3"
                      >
                        <div className="flex justify-center p-1">
                          <img
                            src={image}
                            alt={`Lorem Picsum ${index}`}
                            className="w-40 h-40  rounded-lg shadow-sm"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            )}
            <div className=" flex w-90 m-auto ">
              <Field>
                <FieldLabel>Ingrese Ancho</FieldLabel>
                <Input
                  type="number"
                  value={data.width}
                  onChange={(evento) =>
                    setData({ ...data, width: Number(evento.target.value) })
                  }
                />
                <FieldLabel>Ingrese Altura</FieldLabel>
                <Input
                  type="number"
                  value={data.height}
                  onChange={(evento) =>
                    setData({ ...data, height: Number(evento.target.value) })
                  }
                />
              </Field>
            </div>
            <div className="p-4 m-auto ">
              <Button onClick={handleClick}>Buscar</Button>
            </div>
          </Card>
        </div>
        <div className="w-full h-120">
          <Command>
            <CommandInput placeholder="Realice una busqueda" />
            <CommandList>
              <CommandEmpty>No hay resultadp</CommandEmpty>
              <CommandGroup heading="Sugerencia">
                <CommandItem>
                  <Calendar />
                  <span>Calendario</span>
                </CommandItem>
                <CommandItem>
                  <Smile />
                  <span>Buscar Emoji</span>
                </CommandItem>
                <CommandItem disabled>
                  <Calculator />
                  <span>Calculadora</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Configuracion">
                <CommandItem>
                  <User />
                  <span>Perfil</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <CreditCard />
                  <span>Tarjeta</span>
                  <CommandShortcut>⌘T</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Settings />
                  <span>Configuracion</span>
                  <CommandShortcut>⌘C</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
        <div className="">
          <ContextMenu>
            <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
              Right click here
            </ContextMenuTrigger>
            <ContextMenuContent className="w-52">
              <ContextMenuItem inset>
                Back
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem disabled inset>
                Forward
                <ContextMenuShortcut>⌘]</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem inset>
                Reload
                <ContextMenuShortcut>⌘R</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSub>
                <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
                <ContextMenuSubContent className="w-44">
                  <ContextMenuItem>Save Page...</ContextMenuItem>
                  <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                  <ContextMenuItem>Name Window...</ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem>Developer Tools</ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem variant="destructive">
                    Delete
                  </ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSeparator />
              <ContextMenuCheckboxItem checked>
                Show Bookmarks
              </ContextMenuCheckboxItem>
              <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
              <ContextMenuSeparator />
              <ContextMenuRadioGroup value="pedro">
                <ContextMenuLabel inset>People</ContextMenuLabel>
                <ContextMenuRadioItem value="pedro">
                  Pedro Duarte
                </ContextMenuRadioItem>
                <ContextMenuRadioItem value="colm">
                  Colm Tuite
                </ContextMenuRadioItem>
              </ContextMenuRadioGroup>
            </ContextMenuContent>
          </ContextMenu>
        </div>
        <div className="w-full mt-10 ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Setting</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>Perfil</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator></DropdownMenuSeparator>
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Enviar</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Email</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem disabled>API</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};
