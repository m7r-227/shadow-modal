const modal = document.createElement('uikit-modal'); // or ShadowModal.Uikit.create();

modal.setTitle('A title');
modal.setContent('<h3>some content</h3>');
modal.hasHeader = false;
modal.addFooterBtn('Toggle header', 'uk-button uk-button-default', function(){
    this.hasHeader = !this.hasHeader;
});
modal.addFooterBtn('Close', 'uk-button uk-button-danger', function () {
    this.close();
});
document.body.appendChild(modal);