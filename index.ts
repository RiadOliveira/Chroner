import { setOnBackgroundEvent } from '@/lib/events';
import { registerRootComponent } from 'expo';

import App from './src/App';

setOnBackgroundEvent();
registerRootComponent(App);
