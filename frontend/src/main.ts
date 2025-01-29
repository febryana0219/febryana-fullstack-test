import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount('#app');