import { Component, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Output() dismis = new EventEmitter();

  constructor(private el: ElementRef) { }

  ngOnInit() {
    document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestoy() {
    this.el.nativeElement.remove();
  }

  onDismissClick() {
    this.dismis.emit();
  }

}
