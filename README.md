## Iconfont &hairsp; <a href="https://rapidjs.org" target="_blank"><img src="https://rapidjs.org/assets/img/plugin-badge.svg" alt="rJS Plugin"></a>

Direct iconfont from SVG icon files.

### Install

``` console
npm i rapidjs-org/plugin--iconfont
```

<sub><code>__rjs.plugin.json</code></sub>
``` json
{
  "package": "@plugins.rapidjs.org/iconfont"
}
```

### Use

```
└─ /src …
   └─ /iconfont
      ├─ __rjs.plugin.json
      └─ /icons
         ├─ 1-plus.svg
         ├─ 2-chevron.svg
         └─ 3-cross.svg
```

<sub><code>public/style.css</code></sub>

``` css
@font-face {
  font-family: "iconfont";
  src: url("/iconfont.ttf");
}

.icon::before {
  font-family: "iconfont";
}

.icon--plus::before {
  content: "\E000"
}
.icon--chevron::before {
  content: "\E001"
}
.icon--cross::before {
  content: "\E002"
}
```

<sub><code>public/index.html</code></sub>

``` html
<html>
  <head>
    <link rel="stylesheet" href="/style.css">
  </head>
  <body>
    <a href="/new" class="icon icon--plus"></a>
  </body>
</html>
```

### Configure

By default, the plugin emits the iconfont to `/iconfont.ttf`. An alternative can be specified via `outPath`.  

<sub><code>__rjs.plugin.json</code></sub>
``` json
{
  "package": "@plugins.rapidjs.org/iconfont",
  "config": {
    "outPath": "assets/fonts/my-iconfont"
  }
}
```

##

<sub>&copy; Thassilo Martin Schiepanski</sub>