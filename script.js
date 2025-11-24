const addBook=document.getElementById("addBook");
const bookTab=document.getElementById("bookTab");
const readStatus=document.getElementById("readStatus");
const addBtn=document.getElementById("addBtn");
const bookName=document.getElementById("bookName");
const bookAuthor=document.getElementById("bookAuthor");
const bookPages=document.getElementById("bookPages");
let books = [];

const changeRead = (e,x) => {
    if (e.innerHTML == "Read") {
        e.innerHTML = "Not Read";
        e.classList.remove("bg-green-500");
        e.classList.remove("hover:bg-green-600");
        e.classList.add("hover:bg-red-600");
        e.classList.add("bg-red-500");
        x.read=false;
    } else {
        e.innerHTML = "Read";
        e.classList.remove("bg-red-500");
        e.classList.remove("hover:bg-red-600");
        e.classList.add("hover:bg-green-600");
        e.classList.add("bg-green-500");
        x.read=true;
    }
    books=JSON.parse(localStorage.getItem("userBooks"))||[];
    books=books.map((book)=>book.id===x.id?{...book,read:x.read}:book);
    localStorage.setItem("userBooks",JSON.stringify(books));
};
function printDiv(x){
    const libraryDiv=document.getElementById("bookDiv");
    const div=document.createElement("div");
    const title=document.createElement("p");
    const author=document.createElement("p");
    const pages=document.createElement("p");
    const read=document.createElement("button");
    const remove=document.createElement("button");

    div.classList="w-[200px] h-[400px] color=bg-silver ml-6";
    div.id=x.id;
    title.innerHTML=x.title;
    title.classList="mt-5 font-bold text-xl text-center";
    author.innerHTML=x.author;
    author.classList="mt-5 text-xl text-center";
    pages.innerHTML=x.pages+" pages";
    pages.classList="mt-5 text-xl text-center";
    read.innerText=`${x.read?`Read`:`Not Read`}`;
    read.classList=`mt-5 ${x.read?`bg-green-500`:`bg-red-500`} hover:cursor-pointer hover:${x.read?`bg-green-600`:`bg-red-600`} text-xl w-[100%]  mt-5 h-[40px] rounded-xl`;
    read.addEventListener("click", function() {
        changeRead(read,x);
    });
    remove.innerHTML="Remove";
    remove.classList="justify-center bg-gray-400 hover:bg-gray-500 hover:cursor-pointer text-xl text-center mt-5 h-[40px] rounded-xl w-[100%]";
    remove.addEventListener("click", function(){
        removeElement(x);
    });
    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(pages);
    div.appendChild(read);
    div.appendChild(remove);
    libraryDiv.appendChild(div);
}

const removeElement=(x)=>{
    const rdiv=document.getElementById(x.id);
    books=JSON.parse(localStorage.getItem("userBooks")) || [];
    books=books.map((book)=>(book.id===x.id)?null:book);
    localStorage.setItem("userBooks",JSON.stringify(books));
    rdiv.remove();
};

addBook.addEventListener("click",()=>Booktab());
const Booktab=()=>{
    bookTab.classList.toggle("hidden");
}

addBtn.addEventListener("click", ()=>AddBtn());
const AddBtn=()=>{
    if(bookName.value&&bookAuthor.value&&bookPages.value){
        const newBook={title: bookName.value, author: bookAuthor.value, pages: bookPages.value, read: readStatus.checked,id:crypto.randomUUID() };
        books.push(newBook);
        printDiv(newBook);
        bookName.value="";
        bookPages.value="";
        bookAuthor.value="";
        readStatus.checked=false;
    }
    else{
        throw new Error("Enter all values");
    }
    localStorage.setItem("userBooks",JSON.stringify(books));
}
const user=JSON.parse(localStorage.getItem("userBooks"));
if(user){
    for(const x of user){
        printDiv(x);
    }
}