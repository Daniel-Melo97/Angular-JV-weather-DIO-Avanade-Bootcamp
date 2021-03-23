import { takeUntil } from 'rxjs/operators';
import { Component, Input, OnInit, OnDestroy } from "@angular/core";

import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { AppState } from 'src/app/shared/state/app.reducer';
import { Units } from 'src/app/shared/models/units.enum';

import * as fromHomeSelectors from '../../../pages/home/state/home.selectors';
import * as fromHomeActions from '../../../pages/home/state/home.actions';

import * as fromConfigSelectors from '../../state/config/config.selectors';
import * as fromConfigActions from '../../state/config/config.actions';

import * as fromDetailsActions from '../../../pages/details/state/details.actions';

import { CityWeather } from "src/app/shared/models/weather.model";
import { unitToSymbol } from "../../utils/units.utils";






@Component({
  selector: 'jv-unit-selector-shared',
  templateUrl: 'unit-selector.shared.component.html',
  styleUrls: ['unit-selector.shared.component.scss'],
})
export class UnitSelectorSharedComponent implements OnInit, OnDestroy {

  @Input() page = 'home';//por padrão recebos home, mas podemos passar o nome de outra página

  cityWeather$:Observable<CityWeather>;
  cityWeather: CityWeather;
  
  unit$: Observable<Units>;
  unit: Units;

  unitsEnum = Units;

  private componentDestroyed$ = new Subject();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {

    if(this.page==="home"){ //caso essa página esteja na home, escutamos o estado do clima atual
      this.cityWeather$ = this.store.pipe(select(fromHomeSelectors.selectCurrentWeather));
      this.cityWeather$
        .pipe(takeUntil(this.componentDestroyed$))
        .subscribe(value=> this.cityWeather = value);
    }

    this.unit$ = this.store.pipe(select(fromConfigSelectors.selectUnitConfig));
    this.unit$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(unit => this.unit = unit);//selecionando unidade do state
  }

  ngOnDestroy(){
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }



  updateUnit(unit: Units) {
    this.store.dispatch(fromConfigActions.updateUnit({ unit }));// dispara ação para mudar a unidade
    
    
    if(!!this.cityWeather){//se houver alguma cidade carregada no state de Home, atualizamos o estado para que ele seja carregado com a unidade atual
      const query = this.cityWeather.city.name;
      this.store.dispatch(fromHomeActions.loadCurrentWeather({ query }));
    }

    if(this.page==="details"){//se estivermos na página de details, atualizamos para que vejamos a página com a unidade atualizada.
      this.store.dispatch(fromDetailsActions.loadWeatherDetails());
    }

  }

  showUnit(unit: Units): string {//chama a função unitToSymbol para poder exibir o simbolo da unidade em tela
    return unitToSymbol(unit);
  }
}

