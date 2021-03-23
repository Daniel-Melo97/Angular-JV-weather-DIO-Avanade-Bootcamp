import { Component, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

import { Observable, Subscriber } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/public_api';

import { CityTypeaheadItem } from '../../models/city-typeahead-item.model';
import { CitiesService } from '../../services/cities.service';

@Component({
  selector: 'jv-cities-typeahead',
  templateUrl: './cities-typeahead.component.html',
  styleUrls: ['./cities-typeahead.component.scss'],
})
export class CitiesTypeaheadComponent implements OnInit, ControlValueAccessor {//implementa controlValueAcessor para ser tratado como um input qualquer 

  dataSource$: Observable<CityTypeaheadItem[]>;
  search: string;

  loading: boolean;
  disabled: boolean;
  private onChange: (value: CityTypeaheadItem) => void;
  private onTouched: () => void;

  constructor(private citiesService: CitiesService,
              @Optional() @Self() public control: NgControl) {
    control.valueAccessor = this;
  }

  ngOnInit() {
    this.dataSource$ = new Observable(
      (subscriber: Subscriber<string>) => subscriber.next(this.search)//quando o usuário digitar, ele passa o search 
    )
      .pipe(
        switchMap((query: string) => this.citiesService.getCities(query))//usa o serviço que retorna as cidades que dão match com o nome pesquisado, switchmap é usado pois ele interrompe a excução quando um novo valor é digitado
      );
  }

  onSelected(match: TypeaheadMatch) {//função disparada quando um item é selecionado
    this.onTouched();
    this.onChange(match.item);//notificar ao componente pai a cidade selecionada
  }

  registerOnChange(fn: (value: CityTypeaheadItem) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {//caso o componente pai queira desabilitar o input
    this.disabled = isDisabled;
  }

  writeValue() {
  }
}
