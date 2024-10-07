enum Category {
    Business_analyst = "Business analyst",
    Developer = "Developer",
    Designer = "Designer",
    QA = "QA",
    Scrum_master = "Scrum master"
}

interface Worker1{
    id:number;
    Name: string;
    surname: string;
    available: boolean;
    salary: number;
    category: Category;
}

console.log(
    "-------------------------------------1-------------------------------\n"
  );

 function getAllworkers(): Worker1[] {
    let workers: Worker1[] = [
      { id: 1, Name: "Ivan", surname: "Ivanov", available: true, salary: 1000, category: Category.Business_analyst },
      { id: 2, Name: "Petro", surname: "Petrov", available: true, salary: 1500, category: Category.Designer },
      { id: 3, Name: "Vasyl", surname: "Vasyliev", available: false, salary: 1600, category: Category.Scrum_master },
      { id: 5, Name: "Evgen", surname: "Zhukov", available: true, salary: 1300, category: Category.Business_analyst },
      { id: 6, Name: "Marsik", surname: "HappyEnd", available: true, salary: 1800, category: Category.Developer },
    ];
    return workers;
  }

  function getWorkerByID (id:number): Worker1 | undefined {
    return getAllworkers().find(worker=> worker.id === id)
  }

  //console.table(getAllworkers());
  console.table(getWorkerByID(1))
  console.table(getWorkerByID(4)) // undefined

  function PrintWorker(worker:Worker1): void{
    console.log(worker.Name, worker.surname, "got salary", worker.salary)
  }

  getAllworkers().forEach(element => {
    PrintWorker(element)
  });

  console.log(
    "-------------------------------------2-------------------------------\n"
  );

  interface PrizeLogger{
    speak(a: string): void;
  }

  const LogPrize: PrizeLogger={
    speak(text:string):void{
        console.log(text)
    }
  }
  LogPrize.speak("Log prize is working")

  console.log(
    "-------------------------------------3-------------------------------\n"
  );

  interface Person{
    name: string;
    email: string;
  }
  interface Author extends Person{
    numBooksPublished: number;
  }
  interface Librarian extends Person{
    department: string;
    assistCustomer(custName: string): void;
  }

  const favoriteAuthor: Author = {
    name: "Henrick",
    email: "someemail",
    numBooksPublished:3
  }
  /*
  const favoriteLibrarian: Librarian = {
    name: "Henrick",
    email: "someemail",
    department: "кaзки наніч",
    assistCustomer(custName: string):void{
        console.log(custName)
    }
  }
  console.table(favoriteLibrarian)  
  */
  console.table(favoriteAuthor)

  console.log(
    "-------------------------------------4-------------------------------\n"
  );

  class UniversityLibrarian implements Librarian {
    name: string = "Henrick";
    email: string = "someemail";
    department: string = "кaзки наніч";

    assistCustomer(custName: string):void{
        console.log(`${this.name} is assisting ${custName} \n`)
    }
  }

  const favoriteLibrarian: Librarian = new UniversityLibrarian();
  favoriteLibrarian.name = "Petryk";
  favoriteLibrarian.assistCustomer("Vovchyk")

  console.log(
    "-------------------------------------5-------------------------------\n"
  );

 abstract class ReferenceItem{
    private _publisher: string =""
    protected department: string = "History" 

    public getPublisher(): string{
       return this._publisher.toUpperCase()
    }
    public setPublisher(newPublisher:string): void{
        this._publisher = newPublisher;
    }

    constructor( public title:string, protected year:number){
        /*this.title=newTitle;
        this.year=newYear;*/
        console.log(`Creating a new ReferenceItem - Title: ${title}, Year: ${year}`)
    }
    public printItem(): void{
        console.log(`${this.title} was published in ${this.year}, department: ${this.department}`)
    }
    abstract printCitation(): void;
  }

  /*const ref = new ReferenceItem("History of Skibidi toilet",2024)
  ref.printItem()
  ref.setPublisher("petya")
  console.log("Publisher:", ref.getPublisher())*/

  console.log(
    "-------------------------------------6-------------------------------\n"
  );

class Encyclopedia extends ReferenceItem{
    public edition(a:number):number{
        return a;
    };

    public printItem(): void{
        console.log(`${this.title} was published in ${this.year}, department: ${this.department}, Edition: ${this.edition(this.year)}`)
    }

    public printCitation(): void {
        console.log(`${this.title} - ${this.year}`)
    }
}

const refBook = new Encyclopedia("History of Wednesday",2020)
refBook.printItem();
refBook.printCitation();