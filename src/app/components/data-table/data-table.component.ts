import { Component, Input, OnChanges, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ColDef,
  GridReadyEvent,
  GridApi,
  ValueFormatterParams,
  ICellRendererParams,
} from 'ag-grid-community';
import { Project } from '../../data/mock-data';

import { ModuleRegistry, ClientSideRowModelModule } from 'ag-grid-community';
ModuleRegistry.registerModules([ClientSideRowModelModule]);

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, AgGridAngular],
  templateUrl: './data-table.component.html',
})
export class DataTableComponent implements OnChanges {
  @Input() rowData: Project[] = [];

  private gridApi!: GridApi;

  gearOpen = false;
  ellipseOpen = false;

  @HostListener('document:click')
  onDocumentClick(): void {
    this.gearOpen = false;
    this.ellipseOpen = false;
  }

  toggleGear(event: MouseEvent): void {
    event.stopPropagation();
    this.gearOpen = !this.gearOpen;
    this.ellipseOpen = false;
  }

  toggleEllipse(event: MouseEvent): void {
    event.stopPropagation();
    this.ellipseOpen = !this.ellipseOpen;
    this.gearOpen = false;
  }

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
  };

  columnDefs: ColDef<Project>[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 55,
      minWidth: 55,
      suppressSizeToFit: true,
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'projectName',
      headerName: 'Project Name',
      flex: 2,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'owner',
      headerName: 'Owner',
      flex: 1,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      filter: 'agTextColumnFilter',
      cellRenderer: (params: ICellRendererParams<Project>) => {
        const status = params.value as string;
        const cssClass =
          status === 'Active'   ? 'badge-active'  :
          status === 'On Hold'  ? 'badge-on-hold' :
                                  'badge-complete';
        return `<span class="badge rounded-pill ${cssClass}">${status}</span>`;
      },
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      width: 130,
      filter: 'agDateColumnFilter',
      valueFormatter: (params: ValueFormatterParams<Project>) =>
        params.value
          ? new Date(params.value).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })
          : '',
    },
    {
      field: 'budget',
      headerName: 'Budget',
      width: 130,
      type: 'rightAligned',
      cellStyle: { fontWeight: 600 },
      filter: 'agNumberColumnFilter',
      valueFormatter: (params: ValueFormatterParams<Project>) =>
        params.value != null
          ? new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            }).format(params.value)
          : '',
    },
  ];

  onGridReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
    this.gridApi.sizeColumnsToFit();
  }

  setStatusFilter(status: string): void {
    this.gridApi.setFilterModel({
      status: { filterType: 'text', type: 'equals', filter: status },
    });
  }

  clearFilters(): void {
    this.gridApi.setFilterModel(null);
  }

  ngOnChanges(): void {
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
    }
  }
}
