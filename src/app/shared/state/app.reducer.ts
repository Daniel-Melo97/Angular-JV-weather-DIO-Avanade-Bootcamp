import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { RouterState } from './router/router.reducer';
import { ConfigState, configReducer } from './config/config.reducer';

export interface AppState {
  router: RouterReducerState<RouterState>,//definindo o tipo de objeto que será usado em cada estado
  config: ConfigState,
}

export const reducers: ActionReducerMap<AppState> = { //exportando reducers para serem instanciados no módulo raiz
  router: routerReducer,
  config: configReducer,
};
