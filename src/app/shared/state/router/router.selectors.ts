import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RouterReducerState } from '@ngrx/router-store';

import { RouterState } from './router.reducer';

const selectRouterReducerState = createFeatureSelector<RouterReducerState<RouterState>>('router');

export const selectRouterState = createSelector( //seleciona o estado da rota
  selectRouterReducerState,
  (routerReducerState: RouterReducerState<RouterState>) => (routerReducerState && routerReducerState.state) || {},//verifica se o estado existe, caso contrário, retorna vazio
);
//retorna vazio, pois na inicialização não é garantido que o estado estará preenchido corretamente
export const selectRouterQueryParams = createSelector(//retorna os query params
  selectRouterState,
  (routerState: RouterState) => (routerState && routerState.queryParams) || {},
);
