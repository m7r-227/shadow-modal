import { Bulma } from 'shadow-modal';

const modal = Bulma.create({
    title: 'A title',
    content: 'some content',
    hasHeader: false,
    appendTo: 'body',
    style: '.custom-color { background-color: #34495e; }',
    footerBtns: [
        {
            text: 'Toggle header',
            classNames: 'button custom-color has-text-light',
            click: function () {
                this.hasHeader = !this.hasHeader;
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
