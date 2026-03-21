/**
 * AppComponent — root / shell component
 *
 * Acts purely as the composition layer: it imports all feature components,
 * holds the application data (sourced from mock-data.ts), and passes it
 * down to child components via @Input() bindings.
 *
 * No business logic lives here — that belongs in services or child components.
 *
 * Inputs: none (this is the root component, rendered by main.ts)
 *
 * Demonstrates:
 *  - How a shell component orchestrates layout and data flow
 *  - Importing standalone child components directly in the `imports` array
 *  - One-way data binding: parent → child via [input]="data"
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent }    from './components/header/header.component';
import { SidenavComponent }   from './components/sidenav/sidenav.component';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import { DataTableComponent } from './components/data-table/data-table.component';

import { STATS_CARDS, PROJECTS, StatCard, Project } from './data/mock-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SidenavComponent,
    StatsCardComponent,
    DataTableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  /** Stats data passed to the row of StatsCardComponents */
  statsCards: StatCard[] = STATS_CARDS;

  /** Project data passed to DataTableComponent */
  projects: Project[] = PROJECTS;
}
