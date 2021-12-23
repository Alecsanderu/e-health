const backendHost = 'http://localhost:3008/1.0';

export const environment = {
  production : false,
  userAuth   : {
    login: `${ backendHost }/auth/login`,
  },
  register   : `${ backendHost }/auth/register`,
  doctors    : `${ backendHost }/doctors`,
  departments: `${ backendHost }/departments`,
  patients   : `${ backendHost }/patients`,
};
