import { Bulma } from 'shadow-modal';

const modal = Bulma.create();

modal.setTitle('A title');
modal.setContent('<h3>Some content</h3>');

modal.hasHeader = false;

modal.addFooterBtn('Toogle header', 'button is-link', function () {
    this.hasHeader = !this.hasHeader;
});

let style = modal.addStyle('.custom-color { background-color: #34495e; }');
modal.addFooterBtn('Remove style', 'button custom-color has-text-light', function (e) {
    const button = e.currentTarget as HTMLButtonElement;
    button.classList.remove('has-text-light');
    button.classList.add('has-text-dark');
    this.removeStyle(style);
});

let button = modal.addFooterBtn('Remove me', 'button is-danger', function () {
    this.removeFooterBtn(button);
});

document.body.appendChild(modal);
modal.open();
