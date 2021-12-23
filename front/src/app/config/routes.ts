export const AppR = {
  login      : {
    allowedRoles: [],
    from        : {
      config: 'login',
      root  : '/login',
    },
  },
  register   : {
    allowedRoles: [],
    from        : {
      config: 'register',
      root  : '/register',
    },
  },
  dashboard  : {
    from: {
      appConfig: 'dashboard',
      root     : '/dashboard',
    },
  },
  doctors    : {
    from          : {
      config: 'list/doctors',
      root  : '/list/doctors',
    },
    doctorsDetails: {
      from: {
        config: 'doctors/details/:id',
        list  : '/doctors/details',
        root  : '/doctors/details',
      },
    },
  },
  patients   : {
    from          : {
      config: 'list/patients',
      root  : '/list/patients',
    },
    doctorsDetails: {
      from: {
        config: 'patients/details/:id',
        list  : '/patients/details',
        root  : '/patients/details',
      },
    },
  },
  departments: {
    from          : {
      config: 'list/departments',
      root  : '/list/departments',
    },
    doctorsDetails: {
      from: {
        config: 'departments/details/:id',
        list  : '/departments/details',
        root  : '/departments/details',
      },
    },
  },
};
