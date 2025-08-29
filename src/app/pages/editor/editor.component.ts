import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent implements OnInit {
  userData: { key: string; value: string }[] = [];
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  ngOnInit() {
    if (this.isBrowser) {
      const data = localStorage.getItem('userData');
      this.userData = data ? JSON.parse(data) : [];
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.userData, event.previousIndex, event.currentIndex);
  }
  print() {
    window.print();
  }
}
