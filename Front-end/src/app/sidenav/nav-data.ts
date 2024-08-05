import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
  {
      routeLink: 'dashboard',
      icon: 'fal fa-home',
      label: 'Dashboard'
  },
  {
      routeLink: 'oeuvres',
      icon: 'fal fa-box-open',
      label: 'Mes Oeuvres',
      items:[
        {
          routeLink:'oeuvres/oeuvres-declarer',
          label:'Declarer une oeuvre',
        },
        {
          routeLink:'oeuvres/oeuvres-signer',
          label:'Signer une delacration',
        },
        {
          routeLink:'oeuvres/oeuvres-catalogue',
          label:'Mon catalogue',
          items:[
            {
              routeLink:'oeuvres/oeuvres-catalogue/download',
              label:'Telecharger mon catalogue'
            },
          ],
        },

      ],


  },
  {
    routeLink: 'programmes',
    icon: 'fas fa-music',
    label: 'Mes Programmes',
    items:[
      {
        routeLink:'programmes/programmes-declarer',
        label:'Declarer une date',
      },
      {
        routeLink:'programmes/programmes-consulter',
        label:'consulter mes dates',
      },

    ]
},
//   {
//     routeLink: 'users',
//     icon: 'fas fa-users',
//     label: 'Users'
//     },
  {
      routeLink: 'statistics',
      icon: 'fal fa-chart-bar',
      label: 'Statistics'
  },
  {
      routeLink: 'settings',
      icon: 'fal fa-cog',
      label: 'Settings'
  },

];
