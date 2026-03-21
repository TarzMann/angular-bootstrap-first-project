/**
 * StatsCardComponent
 *
 * Displays a single summary metric inside a Bootstrap card.
 *
 * Inputs:
 *  - card: StatCard — the data object containing label, value, trend, and icon.
 *
 * Demonstrates:
 *  - @Input() decorator for one-way data binding from a parent component
 *  - Conditional class / template rendering based on input data
 *  - Bootstrap card component with icons
 */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCard } from '../../data/mock-data';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-card.component.html',
})
export class StatsCardComponent {
  /** The stat data passed in from the parent (app.component) */
  @Input() card!: StatCard;
}
