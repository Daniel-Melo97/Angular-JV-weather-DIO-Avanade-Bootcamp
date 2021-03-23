import { createAction, props } from '@ngrx/store';

import { Units } from '../../models/units.enum';

export const updateUnit = createAction( //ação disparada para mudar unidade
 '[Config] Update Unit',
 props<{ unit: Units }>(),
);

