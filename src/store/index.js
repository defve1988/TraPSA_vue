import Vue from 'vue'
import Vuex from 'vuex'
import app_data from './modules/app_data.js'
import ui_control from './modules/ui_control.js'
import plot_data from './modules/plot_data.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app_data,
    ui_control,
    plot_data
  }
})
