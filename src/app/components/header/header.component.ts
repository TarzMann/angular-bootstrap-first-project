/**
 * HeaderComponent
 *
 * Full-width top navigation bar rendered once at the app level.
 *
 * Inputs: none — the header is self-contained and displays static
 * branding and a placeholder user avatar.
 *
 * Demonstrates:
 *  - Standalone component with no external inputs
 *  - Bootstrap navbar with dark background (bg-dark / navbar-dark)
 *  - Bootstrap Icons for the logo and avatar icons
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  /** Placeholder user name displayed in the nav */
  readonly userName = 'Jill Butler';
}
