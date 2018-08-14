const { Bootstrap4 } = require('shadow-modal');

const modal = Bootstrap4.create({
    title: 'A title',
    content: '<h3>some content</h3>',
    appendTo: 'body',
    footerBtns: [
        {
            text: 'Close',
            classNames: 'btn btn-danger',
            click: function () {
                this.close();
            }
        }
    ]
});

modal.open();