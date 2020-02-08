htl-loader
===============

> NOTE: the htl-loader differs only minial from the existing one at
> https://github.com/backflip/htl-loader
> and it is desirable to add the required features there.
>
> custom htl-engine used that addresses:
> - https://github.com/adobe/htlengine/issues/134

htl-loader for webpack using [htlengine](https://github.com/adobe/htlengine).

## Installation

`npm install markdown-loader`

## [Changelog](CHANGELOG.md)

## Usage

...todo...

### Webpack 2+

```js
// webpack.config.js

return {
    module: {
      rules: [{
                test: /\.md$/,
                use: [
                    {
                        loader: "htl-loader"
                    },
                    {
                        loader: "htl-loader",
                        options: {
                            /* your options here */
                        }
                    }
                ]
            }]
    }
}
```

### Options

...todo...

## License

Apache 2.0
