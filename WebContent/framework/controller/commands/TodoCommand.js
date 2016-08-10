puremvc.define({
        name: 'ejx4ui.controller.command.TodoCommand',
        parent: puremvc.SimpleCommand
    }, {
        execute: function (note) {
            var proxy = this.facade.retrieveProxy(ejx4ui.model.proxy.TodoProxy.NAME);
            switch (note.getName()) {
                case ejx4ui.AppConstants.ADD_TODO:
                    proxy.addTodo(note.getBody());
                    break;
                case ejx4ui.AppConstants.DELETE_TODO:
                    proxy.deleteTodo(note.getBody());
                    break;
                case ejx4ui.AppConstants.UPDATE_TODO:
                    proxy.updateTodo(note.getBody());
                    break;
                case ejx4ui.AppConstants.TOGGLE_TODO_STATUS:
                    proxy.toggleCompleteStatus(note.getBody());
                    break;
                case ejx4ui.AppConstants.REMOVE_TODOS_COMPLETED:
                    proxy.removeTodosCompleted();
                    break;
                case ejx4ui.AppConstants.FILTER_TODOS:
                    proxy.filterTodos(note.getBody());
                    break;
                default:
                    // console.log('TodoCommand received an unsupported Notification');
                    break;
            }
        }
    }
);
