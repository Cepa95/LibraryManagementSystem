import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-count-header',
  templateUrl: './count-header.component.html',
  styleUrl: './count-header.component.scss'
})
export class CountHeaderComponent {
  @Input() pageNumber?: number;
  @Input() pageSize?: number;
  @Input() totalCount?: number;

}
