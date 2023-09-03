import localizeFilter from "@/filters/localize.filter";

export default {
    install(app) {
        app.config.globalProperties.$message = function (html) {
            window.M.toast({html: html, classes: 'rounded'});
        }
        app.config.globalProperties.$error = function (html) {
            window.M.toast({html: `${localizeFilter('Error')}: ${html}`, classes: 'rounded'});
        }
    }
}