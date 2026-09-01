import { setOnBackgroundEvent } from '@/lib/events';
import { registerRootComponent } from 'expo';
import { registerForegroundService } from '@/lib/notifications';

import App from './src/App';

registerForegroundService();
setOnBackgroundEvent();
registerRootComponent(App);
