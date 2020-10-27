import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#356859',
            secondary: '#fffbe6',
            success: '#F9C413',
            accent: '#000033',
            error: '#FF0F50',
            info: '#37C948',
            warning: '#FF5722',
          },
        },
      },
});
