import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as jsSearch from 'js-search';

import { CityTypeaheadItem } from '../models/city-typeahead-item.model';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient) {
  }

  getCities(query: string): Observable<CityTypeaheadItem[]> {
    return this.http.get<{country: string}[]>('assets/db/cities.json')//fazendo requisição http GET na api fake
      .pipe(
        map(cities => {//filtrando resposta com base na query
          const search = new jsSearch.Search('geonameid'); 
          search.addIndex('country');//pesquisa pelo nome do país
          search.addIndex('name'); //pesquisa pelo nome da cidade
          search.addDocuments(cities);
          return search.search(query);
        }),
      );
  }
}
