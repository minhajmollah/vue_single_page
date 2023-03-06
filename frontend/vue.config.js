module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                @import "@/stylesheets/_mixins.scss";
                @import "@/stylesheets/_statics.scss";
                 
                 
                `
            }
        }
    }
};