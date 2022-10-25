import { Directive, Output, Input, EventEmitter, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[doDragDrop]',
})
export class DragDropDirective {
    @Output() onFileDropped = new EventEmitter<any>();
    @Input() opacity: string = '0.9';

    @HostBinding('style.opacity') public styleOpacity = '0.9';

    @HostListener('dragover', ['$event']) onDragOver(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.styleOpacity = '0.5';
        this.opacity = this.styleOpacity;
    }

    @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.styleOpacity = '0.9';
        this.opacity = this.styleOpacity;
    }

    @HostListener('drop', ['$event']) public ondrop(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.styleOpacity = '0.9';
        this.opacity = this.styleOpacity;
        const files = evt.dataTransfer.files;
        if (files.length > 0) {
            this.onFileDropped.emit(files);
        }
    }

    @HostListener('mouseover', ['$event']) public onMouseOver(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.styleOpacity = '0.5';
        this.opacity = this.styleOpacity;
    }

    @HostListener('mouseleave', ['$event']) public onMouseLeave(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.styleOpacity = '0.9';
        this.opacity = this.styleOpacity;
    }

}
