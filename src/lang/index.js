import Vue from "vue";
import VueI18n from "vue-i18n";
import Cookies from "js-cookie";
import enLocale from "./en";
import zhLocale from "./zh";
Vue.use(VueI18n);
// 创建语言包
const messages={
    en:{
        ...enLocale
    },
    zh:{
        ...zhLocale
    }
};
export function getLanguage(){
    const chooseLanguage=Cookies.get("language");
    if(chooseLanguage) return chooseLanguage;
    // navigator.language获取浏览器当前使用的语言
    const language=(navigator.language||navigator.browserLanguage).toLowerCase();
    // Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组
    // 返回messages数组
    const locales=Object.keys(messages);
    for(const locale of locales){
        // indexOf:在数组中查找并返回位置
        if(language.indexOf(locale)>-1){
            return locale;
        }
    }
    return "en";
}
// 创建i18n实例
const i18n =new VueI18n({
    locale:getLanguage(),
    messages
});
export default i18n;