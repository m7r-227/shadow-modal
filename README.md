# ShadowModal - A bootstrap 4 modal within a customElements' shadow dom

## Description

When you want to display some data from a userscript it's often easier to just use a modal instead of directly insert it on the website. To do so you either have to use the website's css or make your own because inserting another css library might break that of the website. What this library does is creating a new HTMLElement with a shadow dom to include bootstrap 4 and a modal with some methods to manage it.

## Installing

`$ npm install shadow-modal`

then

`<script src="ShadowModal.js"></script>`

or

`const ShadowModal = require('shadow-modal');`

## Examples

```javascript
const modal = ShadowModal.create({
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
const modal = document.createElement('shadow-modal');
let style = modal.addStyle('.custom-color { background-color: #34495e; }');

modal.setTitle('A title');
modal.setContent('<h3>Some content</h3>');

modal.isLarge = true;
modal.isVerticallyCentered = true;
modal.hasHeader = false;

modal.addFooterBtn('Toogle header', 'btn btn-primary rounded-0', function () {
    this.hasHeader = !this.hasHeader;
});

modal.addFooterBtn('Toggle size', 'btn custom-color text-light rounded-0', function () {
    if (this.isSmall) {
        this.isSmall = false;
    } else if (this.isLarge) {
        this.isSmall = true;
    } else {
        this.isLarge = true;
    }
});

let button = modal.addFooterBtn('Remove me', 'btn btn-danger rounded-0', function () {
    this.removeFooterBtn(button);
});

document.body.appendChild(modal);
modal.open();
```
