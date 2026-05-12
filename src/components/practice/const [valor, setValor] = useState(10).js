const [valor, setValor] = useState(10)


const nuevoValor = 12

setValor(nuevoValor)

// console.log(valor) => 12

setValor((prev) => {
    return prev + 10
})

// console.log(valor) => 22

  const obj = {
    prop1: "1",
    prop2: 2,
  };
  const obj2 = {
    prop3: "3",
    prop4: "otyra cosa",
  };

  const arry = ["1", "pablo", "laura"];
  const arr2 = [2, 3, 4, 5, 6];

  const cloneObject = { ...obj, ...obj2 };
  const cloneArray = [...arry, arr2];

  console.log({
    obj,
    obj2,
    arry,
    arr2,
    cloneArray,
    cloneObject,
  });