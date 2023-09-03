import store from "@/store";
import ua from "../locales/ua.json";
import en from "../locales/en.json";

const locales = {
    'uk-UA': ua,
    'en-US': en
}

export default function localizeFilter(key) {
    const locale = store.getters.info.locale || 'uk-UA';
    return locales[locale][key] || `[Localize error:] key ${key} not found`;
}