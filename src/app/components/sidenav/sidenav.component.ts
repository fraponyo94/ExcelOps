import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  menuItems = [
    {
      title: 'Reports',
      link: '/admin'
    },
    {
      title: 'Businesses',
      expanded: true,
      children: [
        {
          title: 'All Businesses',
          link: ['/admin/business']
        },
        {
          title: 'Add a Business',
          link: ['/business']
        }
      ]
    },
    {
      title: 'Categories',
      expanded: true,
      children: [
        {
          title: 'All Categories',
          link: ['/admin/category']
        },
        {
          title: 'Add a Category',
          link: ['/admin/category', 'add']
        }
      ]
    },
    {
      title: 'Users',
      expanded: true,
      children: [
        {
          title: 'All users',
          link: ['/admin/users']
        },
        {
          title: 'Add a user',
          link: []
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
