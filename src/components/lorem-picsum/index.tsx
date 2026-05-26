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
} from "@outlier-spa/component";
import { PrinterX } from "lucide-react";
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
      <div className="w-full flex flex-col ">
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
    </>
  );
};
