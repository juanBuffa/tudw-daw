import { DatePipe, NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';

@Component({
  selector: 'app-tabla-actividades',
  standalone: true,
  imports: [TableModule, NgFor, NgIf, DatePipe],
  templateUrl: './tabla-base.component.html',
  styleUrl: './tabla-base.component.scss',
})
export class TablaBaseComponent {
  @Input('valores') valores!: any[];
  @Input('columnas') columnas!: {
    field: string;
    header: string;
    filter?: boolean;
  }[];
  @Input('filaSeleccionada') filaSeleccionada!: any;
  @Output() filaSeleccionadaChange = new EventEmitter<any>();
  opcionesDeFiltro!: SelectItem[];

  @ViewChild('dt') table!: Table;

  constructor() {}

  ngOnInit() {
    this.opcionesDeFiltro = [
      {
        value: 'startsWith',
        label: 'Empieza con',
      },
      {
        value: 'contains',
        label: 'Contiene',
      },
    ];
  }

  seleccionar() {
    this.filaSeleccionadaChange.emit(this.filaSeleccionada);
  }
}
