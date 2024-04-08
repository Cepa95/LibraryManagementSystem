import { Component, OnInit } from '@angular/core';
import { Book } from './shared/models/book';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Library';
  books: Book[]= [];

  constructor () { }

  ngOnInit(): void {
   
  }
}