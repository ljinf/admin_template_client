import variables from '@/styles/element-variables.scss'
import { getLanguage } from '@/lang'
import { APP_SETTING } from '@/config/setting'

// state
const state = {
  theme: variables.theme,
  device: 'desktop',
  language: getLanguage(),
  tagsView: true,
  showSetting: APP_SETTING.showSetting,
  showTagsView: APP_SETTING.showTagsView,
  openLanguage: APP_SETTING.openLanguage,
  sidebarLogo: APP_SETTING.showSidebarLogo,
  sidebar: {
    opened: true,
    withoutAnimation: false,
  },
}

// getters
const getters = {
  theme: state => state.theme,
  device: state => state.device,
  language: state => state.language,
  tagsView: state => state.tagsView,
  showSetting: state => state.showSetting,
  sidebarLogo: state => state.sidebarLogo,
  openLanguage: state => state.openLanguage,
  sidebar: state => state.sidebar,
}

// mutations
const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (key in state) {
      state[key] = value
    }
  },
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language
  },
}

// actions
const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
