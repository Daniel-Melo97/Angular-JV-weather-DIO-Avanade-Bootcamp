import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Weather } from '../../models/weather.model';
import { Units } from '../../models/units.enum';
import { unitToSymbol } from '../../utils/units.utils';

@Component({
  selector: 'jv-detailed-weather',
  templateUrl: './detailed-weather.component.html',
  styleUrls: ['./detailed-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailedWeatherComponent {

  @Input() weather: Weather;
  @Input() unit: Units;

  get weatherIcon(): string {//retornar o icone correspondente ao clima (nublado, chuvoso, ensolarado, etc...)
    return `http://openweathermap.org/img/wn/${ this.weather.icon }@2x.png`;
  }

  get unitSymbol(): string { //exibe unidade na tela, chamando a função unitToSymbol
    return unitToSymbol(this.unit);
  }
}
