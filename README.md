# ShadowModal

## Description

When you want to display some data from a userscript it's often easier to just use a modal instead of directly insert it on the website. To do so you either have to use the website's css or make your own because inserting another css library might break that of the website. What this library does is creating a new HTMLElement with a shadow dom to include bootstrap 4 and a modal with some methods to manage it.

## Installing

`$ npm install shadow-modal`

`import * as ShadowModal from 'shadow-modal;'`

or

`const { Bulma } = require('shadow-modal');`

## Examples

See the examples folder

```javascript
const modal = ShadowModal.Bootstrap4.create({
    title: 'a title',
    content: '<h3>Some content</h3>',
    appendTo: 'body',
    isLarge: true,
    isSmall: false,
    isVerticallyCentered: true,
    hasHeader: false,
    hasFooter: true,
    style: '.custom-color { background-color: #34495e; }',
    footerBtns: [
        {
            text: 'Toggle size',
            classNames: 'btn custom-color text-light rounded-0',
            click: function () {
                if (this.isSmall) {
                    this.isSmall = false;
                } else if (this.isLarge) {
                    this.isSmall = true;
                } else {
                    this.isLarge = true;
                }
            }
        },
        {
            text: 'Toogle header',
            classNames: 'btn btn-primary rounded-0',
            click: function () {
                this.hasHeader = !this.hasHeader;
            }
        },
        {
            text: 'Remove me',
            classNames: 'btn btn-danger rounded-0',
            click: function(e) {
                this.removeFooterBtn(e.currentTarget);
            }
        }
    ]
});

modal.open();
```

or

```javascript
// bulma
const modal = ShadowModal.Bulma.create();
let style = modal.addStyle('.custom-color { background-color: #34495e; }');

modal.setTitle('A title');
modal.setContent('<h3>Some content</h3>');

modal.hasHeader = false;

modal.addFooterBtn('Toogle header', 'button custom-color has-text-light', function () {
    this.hasHeader = !this.hasHeader;
});

modal.addFooterBtn('Remove style', 'button is-link', function () {
    this.removeStyle(style);
});

let button = modal.addFooterBtn('Remove me', 'button is-danger', function () {
    this.removeFooterBtn(button);
});

document.body.appendChild(modal);
modal.open();

// uikit
const modal = ShadowModal.Uikit.create();
let style = modal.addStyle('.custom-color { background-color: #34495e; }');

modal.setTitle('A title');
modal.setContent('<h3>Some content</h3>');

modal.hasHeader = false;

modal.addFooterBtn('Toogle header', 'uk-button uk-button-primary', function () {
    this.hasHeader = !this.hasHeader;
});

modal.addFooterBtn('Remove style', 'uk-button custom-color', function () {
    this.removeStyle(style);
});

let button = modal.addFooterBtn('Remove me', 'uk-button uk-button-danger', function () {
    this.removeFooterBtn(button);
});

document.body.appendChild(modal);
modal.open();
```
