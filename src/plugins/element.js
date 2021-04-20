import ElementPlus from 'element-plus'
import { createI18n } from 'vue-i18n'
import 'element-plus/lib/theme-chalk/index.css'
import localeZH from 'element-plus/lib/locale/lang/zh-cn'
// import localeEN from 'element-plus/lib/locale/lang/en'
import messages from '../utils/i18n'
// console.log(msg)

// const messages = {
//   [localeEN.name]: {
//     el: localeEN.el,
//     i18n: msg.en.i18n,
//   },
//   [localeZH.name]: {
//     el: localeZH.el,
//     i18n: msg.zh.i18n,
//   },
// }

// vue-i18n vue国际化插件，推测：一个用于在app实例注册对应信息的库，说是国际化，其实就是配置两套不同的信息，当点击对应内容时显示对应语言
// 第二推测：不单单是不同对应信息库，这里还引用了组件的语言，可能同时切换了组件库的语言设置
const i18n = createI18n({
  locale: localeZH.name,
  // fallbackLocale: localeEN.name,
  messages,
})

export default (app) => {
  // 在app实例上进行全局注册
  app.use(ElementPlus, { locale:localeZH })
  // 在app实例上进行全局注册
  app.use(i18n)
}
