/**
 * DataTableComponent
 *
 * Renders an ag-Grid Community table of project records.
 *
 * Inputs:
 *  - rowData: Project[] — array of project objects passed down from the parent.
 *
 * Demonstrates:
 *  - Integrating AgGridAngular as a standalone component import
 *  - Defining ColDef column definitions inside the component (not inline in the template)
 *  - Enabling sorting and filtering globally via defaultColDef
 *  - Custom cell renderer using cellRenderer (inline function) for the status badge
 *  - autoSizeStrategy to fit columns to the available width on first render
 */
import { Component, Input, OnChanges } from '@angular/core';
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

// Register ag-Grid modules — required for Community edition v32+
// ClientSideRowModelModule enables in-memory row management (sorting, filtering, etc.)
import { ModuleRegistry, ClientSideRowModelModule } from 'ag-grid-community';
ModuleRegistry.registerModules([ClientSideRowModelModule]);

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, AgGridAngular],
  templateUrl: './data-table.component.html',
})
export class DataTableComponent implements OnChanges {
  /** Project rows passed in from app.component */
  @Input() rowData: Project[] = [];

  // gridApi is captured on gridReady to allow programmatic operations
  private gridApi!: GridApi;

  // ── Default column behaviour ─────────────────────────────────────────────
  // Applied to every column unless overridden by a specific ColDef
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
  };

  // ── Column definitions ───────────────────────────────────────────────────
  // Each ColDef describes one column: its field mapping, header text, and
  // optional formatting / rendering logic.
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
      flex: 2,             // flex > fixed width: column grows to fill space
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
      // cellRenderer: inline function that returns an HTML string.
      // This is the simplest way to customise cell content without a full
      // component; for complex rendering use a proper ICellRendererComp.
      cellRenderer: (params: ICellRendererParams<Project>) => {
        const status = params.value as string;
        const cssClass =
          status === 'Active'   ? 'badge-active'  :
          status === 'On Hold'  ? 'badge-on-hold' :
                                  'badge-complete';
        return `<span class="badge ${cssClass}">${status}</span>`;
      },
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      width: 130,
      filter: 'agDateColumnFilter',
      // valueFormatter: transforms the raw cell value before display.
      // Here we convert the ISO string to a localised date string.
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

  // ── Grid lifecycle ───────────────────────────────────────────────────────

  /** Called once the grid is ready — store the API and size columns. */
  onGridReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
    this.gridApi.sizeColumnsToFit();
  }

  /** Re-fit columns whenever rowData changes (e.g. filtered externally). */
  ngOnChanges(): void {
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
    }
  }
}
