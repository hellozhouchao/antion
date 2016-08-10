puremvc.define({
        name: 'ejx4ui.view.mediator.TodoFormMediator',
        parent: puremvc.Mediator
    },

    // INSTANCE MEMBERS
    {
        // Notifications this mediator is interested in 
        listNotificationInterests: function () {
            return [ ejx4ui.AppConstants.TODOS_FILTERED ];
        },

        // Code to be executed when the Mediator instance is registered with the View
        onRegister: function () {
            this.setViewComponent(new ejx4ui.view.component.TodoForm);
            this.viewComponent.addEventListener(ejx4ui.view.event.AppEvents.TOGGLE_COMPLETE, this);
            this.viewComponent.addEventListener(ejx4ui.view.event.AppEvents.TOGGLE_COMPLETE_ALL, this);
            this.viewComponent.addEventListener(ejx4ui.view.event.AppEvents.UPDATE_ITEM, this);
            this.viewComponent.addEventListener(ejx4ui.view.event.AppEvents.DELETE_ITEM, this);
            this.viewComponent.addEventListener(ejx4ui.view.event.AppEvents.ADD_ITEM, this);
            this.viewComponent.addEventListener(ejx4ui.view.event.AppEvents.CLEAR_COMPLETED, this);
        },

        // Handle events from the view component
        handleEvent: function (event) {
            switch (event.type) {
                case ejx4ui.view.event.AppEvents.TOGGLE_COMPLETE_ALL:
                    this.sendNotification(ejx4ui.AppConstants.TOGGLE_TODO_STATUS, event.doToggleComplete);
                    break;

                case ejx4ui.view.event.AppEvents.DELETE_ITEM:
                    this.sendNotification(ejx4ui.AppConstants.DELETE_TODO, event.todoId);
                    break;

                case ejx4ui.view.event.AppEvents.ADD_ITEM:
                    this.sendNotification(ejx4ui.AppConstants.ADD_TODO, event.todo);
                    break;

                case ejx4ui.view.event.AppEvents.CLEAR_COMPLETED:
                    this.sendNotification(ejx4ui.AppConstants.REMOVE_TODOS_COMPLETED);
                    break;

                case ejx4ui.view.event.AppEvents.TOGGLE_COMPLETE:
                case ejx4ui.view.event.AppEvents.UPDATE_ITEM:
                    this.sendNotification(ejx4ui.AppConstants.UPDATE_TODO, event.todo);
                    break;
            }

        },

        // Handle notifications from other PureMVC actors
        handleNotification: function (note) {
            switch (note.getName()) {
                case ejx4ui.AppConstants.TODOS_FILTERED:
                    this.viewComponent.setFilteredTodoList(note.getBody());
                    break;
            }
        }
    },

    // STATIC MEMBERS
    {
        NAME: 'TodoFormMediator'
    }
);
