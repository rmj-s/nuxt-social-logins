// TODO: Add TypeScript support (!!!)
export default function(moduleOptions) {
    this.options.head.link.push({
        rel: "stylesheet",
        type: "text/css",
        href: "https://fonts.googleapis.com/css?family=Roboto"
      });
    
      const options = {
        ...moduleOptions,
        ...this.options.socialLogins
      };
    
      // TODO: Register as separate plugins or as properties in a single plugin?
      // TODO: How to make them async and check if loaded from init methods? 
      if (options.google) {
        this.options.head.script.push({
          src: "https://apis.google.com/js/platform.js",
          async: false,
          defer: false
        });

        this.addPlugin({
            src: path.resolve(__dirname, "plugins/google.js"),
            fileName: 'social-logins/google.js',
            mode: 'client',
            options: options.google
        });
      }
    
    //   if (options.facebook) {
    //     this.options.head.script.push({
    //       src: "https://connect.facebook.net/en_US/sdk.js",
    //       async: false,
    //       defer: false
    //     });

    //     this.addPlugin({
    //         src: path.resolve(__dirname, "plugins/facebook.js"),
    //         mode: 'client',
    //         options: options.google
    //     });
    //   }
}

module.exports.meta = require('./package.json');