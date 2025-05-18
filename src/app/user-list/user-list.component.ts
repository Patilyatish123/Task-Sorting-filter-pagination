import { Component } from '@angular/core';
import { USERS } from './user-list-data';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
   users = USERS;

  searchTerm = '';
  sortColumn = 'name';
  sortDirection = 'asc';
  currentPage = 1;
  itemsPerPage = 5;

  get filteredUsers() {
    let filtered = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    filtered = filtered.sort((a, b) => {
     const aVal = a[this.sortColumn as keyof typeof a];
const bVal = b[this.sortColumn as keyof typeof b];

      if (this.sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    const start = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(start, start + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(
      this.users.filter(user =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) 
      ).length / this.itemsPerPage
    );
  }

  changeSort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

}
