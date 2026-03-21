/**
 * SidenavComponent
 *
 * Fixed-width left sidebar containing the primary navigation menu.
 *
 * Inputs: none — the nav items and active state are managed internally.
 *
 * Demonstrates:
 *  - Standalone component with internal state
 *  - Bootstrap list-group used as a vertical nav
 *  - Click handler to change the active item without routing
 *  - Bootstrap Icons for each nav item
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NavItem {
  label: string;
  icon: string;   // Bootstrap Icon class (bi-*)
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenav.component.html',
})
export class SidenavComponent {
  readonly navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'bi-speedometer2' },
    { label: 'Projects',  icon: 'bi-folder2'       },
    { label: 'Team',      icon: 'bi-people'         },
    { label: 'Reports',   icon: 'bi-bar-chart-line' },
  ];

  /** Tracks which nav item is currently highlighted */
  activeItem = 'Dashboard';

  setActive(label: string): void {
    this.activeItem = label;
  }
}
