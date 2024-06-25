import { Component, OnInit, inject } from '@angular/core';
import { BookService } from './book.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterOutlet,ReactiveFormsModule,HttpClientModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit{

 bookService:BookService=inject(BookService);
 bookList:any=[];
 authorList:any=[];
 bookForm!:FormGroup;
 isUpdatebtn!:boolean;


constructor(private fb:FormBuilder){}

  ngOnInit(): void {
     this.getBooks();
     this.getAuthors();

     this.bookForm=this.fb.group({
       id:[,Validators.required],
       bookname:['',Validators.required],
       price:[,Validators.required],
       authorid:[,Validators.required],

     });

     this.isUpdatebtn=false;
  }

 get id(){
  return this.bookForm.get('id');
 }

 get bookname(){
  return this.bookForm.get('bookname');
 }

 get price(){
  return this.bookForm.get('price');
 }

 get authorid(){
  return this.bookForm.get('authorid');
 }

  getBooks()
  {
     this.bookService.getBooks().subscribe(result=>{
      this.bookList=result;
      console.log(this.bookList);
     })
  }
  
  getAuthors()
  {
    // let author=this.bookForm.value;
     this.bookService.getAuthors().subscribe(result=>{
      this.authorList=result;
      console.log(this.bookList);
     })
  }

  saveBooks(){
    let book=this.bookForm.value;
    if(!this.isUpdatebtn){
   

      this.bookService.saveBooks(book).subscribe(result=>{
      });
    }
    else{
      let id= parseInt(this.bookForm.value.id);
      this.bookService.updateBooks(id,book).subscribe(result=>{
      });
    }
    this.getBooks();
    this.bookForm.reset();
    this.isUpdatebtn=false;
  }
  
  editBooks(book:any){
    this.isUpdatebtn=true;
  
  
    this.bookForm.setValue({
      id:book.id,
      bookname:book.bookname,
      price:book.price,
      authorid:book.authorid
    });
  }
  deleteBooks(id:any){
    let response=confirm('Do you want to delete '+id +' ?');
    if(response==true){
      this.bookService.deleteBooks(id).subscribe(result=>{
        this.getBooks();
      })
    }
  }
  
  clearForm()
  {
    this.bookForm.reset();
    this.isUpdatebtn=false;
  }

}


