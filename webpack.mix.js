// webpack.mix.js

let mix = require('laravel-mix');

mix.js('resources/index.js', 'web')
    .setPublicPath('web');