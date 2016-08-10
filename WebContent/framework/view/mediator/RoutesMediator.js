puremvc.define({
        name: 'ejx4ui.view.mediator.RoutesMediator',
        parent: puremvc.Mediator
    }, {
        // the router (Flatirion Director)
        router: null,
        // setup the routes when mediator is registered
        onRegister: function () {
            var todoProxy = this.facade.retrieveProxy(ejx4ui.model.proxy.TodoProxy.NAME),
                defaultRoute = this.getRouteForFilter(todoProxy.filter),
                options = { resource: this, notfound: this.handleFilterAll },
                routes = {
                    '/': this.handleFilterAll,
                    '/active': this.handleFilterActive,
                    '/completed': this.handleFilterCompleted
                };

            this.router = new Router(routes).configure(options);
            this.router.init(defaultRoute);
        },
        getRouteForFilter: function (filter) {
            var route;
            switch (filter) {
                case ejx4ui.AppConstants.FILTER_ALL:
                    route = '/';
                    break;

                case ejx4ui.AppConstants.FILTER_ACTIVE:
                    route = '/active';
                    break;
                case ejx4ui.AppConstants.FILTER_COMPLETED:
                    route = '/completed';
                    break;
            }
            return route;
        },
        // route handlers
        handleFilterAll: function () {
            this.resource.facade.sendNotification(ejx4ui.AppConstants.FILTER_TODOS, ejx4ui.AppConstants.FILTER_ALL);
        },
        handleFilterActive: function () {
            this.resource.facade.sendNotification(ejx4ui.AppConstants.FILTER_TODOS, ejx4ui.AppConstants.FILTER_ACTIVE);
        },
        handleFilterCompleted: function () {
            this.resource.facade.sendNotification(ejx4ui.AppConstants.FILTER_TODOS, ejx4ui.AppConstants.FILTER_COMPLETED);
        }
    }, {
        NAME: 'RoutesMediator'
    }
);
