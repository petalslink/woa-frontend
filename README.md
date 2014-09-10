# WOA Frontend

## Install

Install Node and Mongo. Then install the required modules:

    npm install

## Configure

Check ./config.js and update configuration fields if required.

Routes are used to define mapping between input (ie exposed by the current instance) and the output (exposed by services to call).
Check the comments in the snippet below for details.

    routes: [
      {
        method: 'GET',
        // The resource which will be cached
        resource: {
          // where to find the resource id in the 'in' parameter
          id: 'uuid',
          // the name of the resource, should be unique (not enforced)
          name: 'bank'
        },
        in: '/api/bank/:uuid',
        out: 'http://localhost:3001/bank/account/:uuid/amount'
      },
      {
        method: 'GET',
        resource: {
          id: 'uuid',
          name: 'resource'
        },
        in: '/api/item/:resource/:uuid',
        out: 'http://locahost:8084/petals/rest/:resource/?id=:uuid'
      }
]

## Run

Be sure you have mongodb up and running before.

    node index.js

Service is now started on http://localhost:3000. You can call resources based on what is configured in config/routes.
Don't forget to append the configured token to the URL, for example:

    http://localhost:3000/api/bank/1234?token=123

