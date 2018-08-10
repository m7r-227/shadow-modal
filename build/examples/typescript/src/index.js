"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shadow_modal_1 = require("shadow-modal");
const modal = shadow_modal_1.Bulma.create({
    title: 'a title',
    content: '<h3>Some content</h3>',
    appendTo: 'body',
    style: '.custom-color { background-color: #34495e; }',
    footerBtns: [
        {
            text: '',
            classNames: '',
            click: function () {
                this.close();
            }
        },
        {
            text: 'Close',
            classNames: 'button is-danger',
            click: function () {
                this.close();
            }
        }
    ]
});
modal.open();
