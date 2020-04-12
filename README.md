# Nuxt Social Logins

A client-side integration of the [Google Sign-In SDK](https://developers.google.com/identity/sign-in/web/sign-in) and [Facebook Javascript SDK](https://developers.facebook.com/docs/javascript/) for [Nuxt.js](https://nuxtjs.org/).  
It allows the user to authenticate with Google or Facebook, and returns the active profile data to the calling application, so it could be handled according to the developer's needs.

## Quick Links

1. [Installation](#install)
2. [Setup](#setup)
3. [Configuration](#config)
4. [How to use](#usage)
5. [Components](#components)
 
## <a id="install"></a>Install

Install the package:

```sh
yarn add @glarus-labs/nuxt-social-logins
```

_or_

```sh
npm i @glarus-labs/nuxt-social-logins
```

<br/>

## <a id="setup"></a>Setup

Add  `@glarus-labs/nuxt-social-logins` under modules in `nuxt.config.js`

```js
// nuxt.config.js

{
  modules: [
    '@glarus-labs/nuxt-social-logins',
  ],
}
```

[Configuration](#options) can be passed along with the module declaration:

```js
{
  modules: [
    ['@glarus-labs/nuxt-social-logins', {
        // options
    }]
  ],
}
```

or in a separate `socialLogins` key:

```js
{
  modules: [
    '@glarus-labs/nuxt-social-logins',
  ],
  socialLogins: {
      // options
  }
}
```

<br/>

## <a id="config"></a>Configuration

Different login providers can be enabled by passing configuration for them in the module options. Each of the providers will then get injected to the app's Vue prototype.

##### Note: Since the plugin is intended to only be used from the client, it isn't available in the context of the application (e.g. in AsyncData())

-   Facebook

To enable facebook authentication, pass the `facebook` object in the options. This enables the use of `this.$fbAuth` inside your app

```js
{
	facebook: {
		appId: `YOUR_APP_ID`;
	}
}
```

-   Google

To enable google authentication and use `this.$googleAuth`, pass the `google` object in options. It also enables the usage of [GoogleButton component.](#components).

```js
{
	google: {
		clientId: `YOUR_CLIENT_ID`;
	}
}
```

## <a id="usage"></a>How to use

If $googleAuth and $fbAuth are enabled in the Vue prototype, they both export a set of functions that are wrappers around the SDK functionality. All functions have no parameters and return promises.

The format of the response the promises resolve to is:

<a id="auth-res"></a>`Auth response object`:

```ts
{
    signedIn: boolean,
    userData: {
        id: string,
        firstName: string,
        lastName: string,
        email: string
    }
}
```

<br/>  

### init()

*Best used when the page loads, for example in the layout or index page mounted() hook. It checks if the user is currently authenticated, and returns the [auth response](#auth-res) as an object.*

Example:

```ts
// index.vue

 async mounted() {
      const res = await this.$googleAuth.init();
      if (res.signedIn) {
        console.log(res.userData.id);
        console.log(res.userData.firstName);
        console.log(res.userData.lastName);
        console.log(res.userData.email);
      }

      // do something with response
  }
```

### signIn()

*Attempts to log the user in. Opens a dialog, requesting their confirmation if it hasn't already been granted. Returns the [auth response](#auth-res) on resolve, or the error on reject.*

Example:

```ts
// some-component.vue

 async signIn() {
     try {
        const res = await this.$googleAuth.signIn();
        if (res.signedIn) {
            console.log(res.userData.id);
            console.log(res.userData.firstName);
            console.log(res.userData.lastName);
            console.log(res.userData.email);
        }

        // do something with response
    } catch(e) {
        console.log(e);
    }
  }
```

### signOut()

*Attemps to log the user out. Returns a success message on resolve, and an the error on reject.*

Example:
```ts
// some-component.vue

 async signOut() {
     try {
        const res = await this.$googleAuth.signOut();
        console.log(res);
    } catch(e) {
        console.log(e);
    }
  }
```

## <a id="components"></a>Components

The module also includes a couple of premade default button components that can be used for user authentication. They both can receive `buttonText` and `customClass` to override the default one as properties.

*Style structure:*
```css
.custom-class {
    /* custom styles */
}
.custom-class .icon {
    /* custom styles for button icon */
}
.custom-class .title {
    /* custom styles for the button text */
}
```

### GoogleButton:

*A default google sign-in button. Fires the `$googleAuth.signIn()` function on click, and emits the response or error as events.*

Example: 
```html
<google-button 
    :button-text="'Your custom text'" 
    :custom-class="'custom-class'" 
    @signed-in:"onGoogleSignedIn(res)"
    @signed-in-error: "onGoogleInError(err)"
/>
```


### FacebookButton:

*A default facebook sign-in button. Fires the `$fbAuth.signIn()` function on click, and emits the response or error as events.*

Example: 
```html
<facebook-button 
    :button-text="'Your custom text'" 
    :custom-class="'custom-class'" 
    @signed-in:"onFacebookSignedIn(res)"
    @signed-in-error: "onFacebookSignInError(err)"
/>
```





