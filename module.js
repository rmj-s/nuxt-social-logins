import path from 'path';

const BUILD_TARGET_DIR = 'nuxt-social-logins'

// TODO: Add TypeScript support (!!!)
export default function (moduleOptions) {
	const options = {
		...moduleOptions,
		...this.options.socialLogins,
    };

    this.options.head.link.push({
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css?family=Roboto',
    });

	// TODO: Register as separate plugins or as properties in a single plugin?
	// TODO: How to make them async and check if loaded from init methods?
	if (options.google) {
		this.options.head.script.push({
			src: 'https://accounts.google.com/gsi/client',
			async: false,
			defer: false,
		});

		this.addPlugin({
			src: path.resolve(__dirname, 'plugins/google.js'),
			fileName: BUILD_TARGET_DIR + '/plugins/google.js',
			mode: 'client',
			options: options.google,
		});

		this.addTemplate({
			src: path.resolve(__dirname, 'components/GoogleButton.vue'),
			fileName: BUILD_TARGET_DIR + '/components/GoogleButton.vue',
		});

		this.addTemplate({
			src: path.resolve(__dirname, 'assets/google_logo.svg'),
			fileName: BUILD_TARGET_DIR + '/assets/google_logo.svg',
		});
	}

	  if (options.facebook) {
	    this.options.head.script.push({
	      src: "https://connect.facebook.net/en_US/sdk.js",
	      async: false,
	      defer: false
	    });

	    this.addPlugin({
            src: path.resolve(__dirname, "plugins/facebook.js"),
            fileName: BUILD_TARGET_DIR + '/plugins/facebook.js',
	        mode: 'client',
	        options: options.facebook
        });

        this.addTemplate({
			src: path.resolve(__dirname, 'components/FacebookButton.vue'),
			fileName: BUILD_TARGET_DIR + '/components/FacebookButton.vue',
		});

		this.addTemplate({
			src: path.resolve(__dirname, 'assets/facebook_logo.svg'),
			fileName: BUILD_TARGET_DIR + '/assets/facebook_logo.svg',
		});
	  }
}

module.exports.meta = require('./package.json');
