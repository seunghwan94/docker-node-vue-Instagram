import { createApp } from 'vue'
import App from './App.vue'
import config from '../config.json';


import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas, far, faTwitter, faFontAwesome)

const app = createApp(App)


// config를 전역 변수로 사용할 수 있도록 Vue의 전역 속성에 추가합니다.
app.config.globalProperties.$config = config;


// createApp을 통해 생성한 Application 인스턴스의 component API를 활용합니다.
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')

// URL 변수로 선언
export const BackURL = `${config.backServer.host}:${config.backServer.port}`;
