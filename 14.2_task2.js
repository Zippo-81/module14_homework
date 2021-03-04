//let primer = {"name":"Anton","age":36,"skills":["Javascript","HTML","CSS"],"salary":80000};
//let res = JSON.parse(JSON.stringify(primer));

let object = {
  age: 36,
  name: "Anton",
  salary: 80000,
  skills: ["Javascript", "HTML", "CSS"]
};

let result = JSON.stringify(object);


console.log(result);