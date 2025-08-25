import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule,DragDropModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements OnInit {
userData: { key: string, value: string }[] = [];
 private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId); 
  ngOnInit() {
    if(this.isBrowser){
    const data = localStorage.getItem('userData');
    this.userData = data ? JSON.parse(data) : {};
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.userData, event.previousIndex, event.currentIndex);
  }
  downloadAsPDF() {
    const container = document.querySelector('.container') as HTMLElement;

    html2canvas(container).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('user-details.pdf');
    });
  }
}
