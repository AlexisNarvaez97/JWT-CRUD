import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private http: HttpClient, private apiCrud: ApiService) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {

    this.apiCrud.getBooks().subscribe( resp => console.log(resp));

  }

}
