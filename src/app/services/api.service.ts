import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { listBooks } from '../graphql/graphql/operations/query';

import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apollo: Apollo) { }

  getBooks() {
    return this.apollo
    .watchQuery({
      query: listBooks,
      fetchPolicy: 'network-only'
    })
    .valueChanges.pipe(
      map((result: any) => {
        return result.data.books;
      })
    );
  }

}
