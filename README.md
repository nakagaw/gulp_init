# gulp_init

## gulp + webpack + sass

### pre installed below

- node.js
- gulp
- sass

If you use scss-lint, please install below:

```
gem install scss-lint
```

### npm install

```
npm install
```
jQuery
from: node_modules/jquery/dist

normalize.css is rename to _normalize.scss and compole to generic.css
from: node_modules/normalize.css/normalize.css

chosen.css , chosen-sprite
from: node_modules/chosen-npm/public/

modernizr is include to index.js by webpack on footer.
from:  https://modernizr.com/

'gulp-kss-sass' is my original gulp plugin.(Supported sass)
You have to do below:
```
cd node_modules
git clone https://github.com/nakagaw/gulp-kss-sass.git
cd gulp-kss-sass
npm install
```

### HTML base is

[HTML5 ★ BOILERPLATE](https://html5boilerplate.com/)

### Grid system is

[Jeet Grid System | Smart CSS preprocessor grids](http://jeet.gs/)

```
svn checkout https://github.com/mojotech/jeet/trunk/scss/jeet
```
Add to generic.scss,  
@import "_vendor/_jeet/index"; 

### gulp tasks

※ 先にgulp spriteをしないと_sprite*.scssがないので、sassでコンパイルエラー出ます

```
gulp
```
※ Not comp css

#### Build

```
gulp build --env comp
```
※ Minify to: js, css, image

#### Sprite PNG & SVG

```
gulp sprite
```
=> sprite.png  
=> sprite@2x.png  
=> sprite.svg  

SVG and PNG SCSS make below,  
www/_src/scss/_components

SVG icon list template below,  
www/assets/img/_iconSvgList.html

#### Server & watch

```
gulp sv
```

#### Make Styleguide

```
gulp kss
```
