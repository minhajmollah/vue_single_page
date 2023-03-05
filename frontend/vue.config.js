module.exports = {
	css: {
		loaderOptions: {
			sass: {
				prependData: `
				@import "@/stylesheets/_mixins.scss";
				@import "@/stylesheets/_statics.scss";
				`
			}
		}
	}
}
