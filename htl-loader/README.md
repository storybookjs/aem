htl-loader
===============

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
