console.log(
  "-------------------------------------1-------------------------------\n"
);

enum Category {
  Business_analyst = "Business analyst",
  Developer = "Developer",
  Designer = "Designer",
  QA = "QA",
  Scrum_master="Scrum master",
}

function getAllworkers() {
  let workers = [
    { id: 1, Name: "Ivan", surname: "Ivanov", available: true, salary: 1000, category: Category.Business_analyst },
    { id: 2, Name: "Petro", surname: "Petrov", available: true, salary: 1500, category: Category.Designer },
    { id: 3, Name: "Vasyl", surname: "Vasyliev", available: false, salary: 1600, category: Category.Scrum_master },
    { id: 5, Name: "Evgen", surname: "Zhukov", available: true, salary: 1300, category: Category.Business_analyst },
    { id: 6, Name: "Marsik", surname: "HappyEnd", available: true, salary: 1800, category: Category.Developer },
  ];
  return workers;
}

const logFirstAvailable = (workers = getAllworkers()): void => {
  const count_workers: number = workers.length;
  console.log(`Кількість робітників: ${count_workers}`);

  for (let worker of workers) {
    if (worker.available) {
      console.log(
        `Перший Доступний робітник: ${worker.Name} ${worker.surname}`
      );
      break;
    }
  }
};

logFirstAvailable();

console.log(
  "-------------------------------------2-------------------------------\n"
);

function getWorkersNamesByCategory (category:Category = Category.Developer){
  let arr_names:Array<string> = [];
  let workers = getAllworkers();
  
  for (let worker of workers) {
    if (worker.category == category) {
      arr_names.push(worker.Name);
    }
  };
  return arr_names;
}

function logWorkersNames (arr:string[]):void{
  console.log(Category.Business_analyst, arr);
}

logWorkersNames(getWorkersNamesByCategory(Category.Business_analyst));


console.log(
  "-------------------------------------3-------------------------------\n"
);
console.log(Category.Developer,": ");
getAllworkers().forEach(worker => {
  if(worker.category == Category.Developer)
    console.log(`Name: ${worker.Name}\nSurname: ${worker.surname}`);
});
console.log("\n")

function getWorkerByID (id:number){
  return getAllworkers().find(worker=> worker.id === id)
}
console.log(getWorkerByID(3));

console.log(
  "-------------------------------------4-------------------------------\n"
);

function createCustomerID (name:string, id:number):string{
  return `Name: ${name}\nId: ${id}\n`
}

const myID:string = createCustomerID("Ann",10)
console.log(myID)

const IdGenerator: (name: string, id: number) => string = (name: string, id: number): string => {
  return `Name: ${name}\nId: ${id}\n`;
};

const generatedID = IdGenerator("Ann", 20);
console.log(generatedID);


console.log(
  "\n-------------------------------------4-------------------------------\n"
);

function createCustomer(name:string, age?:number, city?:string){
  let str:string = `Name: ${name}`
  if(age)
    str += `, age: ${age}`
  if(city)
    str += `, city: ${city}\n`
  console.log(str);
}

createCustomer("Bobby")
createCustomer("Bobby",12)
createCustomer("Bobby",12,"Chorol")

console.log(Category.Developer,": ");
console.log(getWorkersNamesByCategory(),"\n")

function checkoutWorkers (customer: string, workerIDs: number []):{id: number, Name: string, surname: string, available: boolean, salary: number, category: Category}[]{
  let arr:{id: number, Name: string, surname: string, available: boolean, salary: number, category: Category}[] =[]; 
  workerIDs.forEach((Id)=> {
    let worker = getWorkerByID(Id);
    if(worker && worker.available == true){
      arr.push(worker);
    }
  })
  console.log(`Замовник: ${customer}\nДоступні робітники: `);
  return arr
} 

let myWorkers = checkoutWorkers("Ann",[1,4,6,2]);
myWorkers.forEach((worker) => {console.log(worker.Name , worker.surname)});