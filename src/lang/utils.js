import i18n from './index'

// 转换路由标题
export function generateTitle(title) {
  const hasKey = i18n.te('routes.' + title)
  if (hasKey) {
    const translatedTitle = i18n.t('routes.' + title)

    return translatedTitle
  }
  return title
}

// 翻译之前的判断
export function generateKey(langKey) {
  const hasKey = i18n.te(langKey)
  if (hasKey) {
    return i18n.t(langKey)
  } else {
    return langKey
  }
}
