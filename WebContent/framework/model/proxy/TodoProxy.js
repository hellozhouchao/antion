puremvc.define({
        name: 'ejx4ui.model.proxy.TodoProxy',
        parent: puremvc.Proxy
    }, {
        todos: [],
        stats: {},
        filter: ejx4ui.AppConstants.FILTER_ALL,
        LOCAL_STORAGE: 'todos-puremvc',
        onRegister: function () {
            this.loadData();
        },
        loadData: function () {
            var storageObject;
            if (!localStorage.getItem(this.LOCAL_STORAGE)) {
                this.saveData();
            }
            storageObject = extJQ.stringToJson(localStorage.getItem(this.LOCAL_STORAGE));
            this.todos = storageObject.todos;
            this.filter = storageObject.filter;
            this.computeStats();
        },
        saveData: function () {
            var storageObject = { todos: this.todos, filter: this.filter };
            localStorage.setItem(this.LOCAL_STORAGE, extJQ.jsonToString(storageObject));
        },
        computeStats: function () {
            this.stats.totalTodo = this.todos.length;
            this.stats.todoCompleted = this.getCompletedCount();
            this.stats.todoLeft = this.stats.totalTodo - this.stats.todoCompleted;
        },
        filterTodos: function (filter) {
            var i;
            this.filter = filter;
            this.saveData();
            i = this.todos.length,
                filtered = [];
            while (i--) {
                if (filter === ejx4ui.AppConstants.FILTER_ALL) {
                    filtered.push(this.todos[ i ]);
                } else if (this.todos[i].completed === true && filter === ejx4ui.AppConstants.FILTER_COMPLETED) {
                    filtered.push(this.todos[ i ]);
                } else if (this.todos[i].completed === false && filter === ejx4ui.AppConstants.FILTER_ACTIVE) {
                    filtered.push(this.todos[ i ]);
                }
            }
            this.sendNotification(ejx4ui.AppConstants.TODOS_FILTERED, { todos: filtered, stats: this.stats, filter: this.filter });
        },
        todosModified: function () {
            this.computeStats();
            this.filterTodos(this.filter);
        },
        removeTodosCompleted: function () {
            var i = this.todos.length;
            while (i--) {
                if (this.todos[ i ].completed) {
                    this.todos.splice(i, 1);
                }
            }
            this.todosModified();
        },
        deleteTodo: function (id) {
            var i = this.todos.length;
            while (i--) {
                if (this.todos[i].id === id) {
                    this.todos.splice(i, 1);
                }
            }
            this.todosModified();
        },
        toggleCompleteStatus: function (status) {
            var i = this.todos.length;
            while (i--) {
                this.todos[ i ].completed = status;
            }
            this.todosModified();
        },
        updateTodo: function (todo) {
            var i = this.todos.length;
            while (i--) {
                if (this.todos[ i ].id === todo.id) {
                    this.todos[ i ].title = todo.title;
                    this.todos[ i ].completed = todo.completed;
                }
            }
            this.todosModified();
        },
        addTodo: function (newTodo) {
            newTodo.id = this.getUuid();
            this.todos.push(newTodo);
            this.todosModified();
        },
        getCompletedCount: function () {
            var i = this.todos.length,
                completed = 0;
            while (i--) {
                if (this.todos[ i ].completed) {
                    completed++;
                }
            }
            return completed;
        },
        getUuid: function () {
            var i, random, uuid = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-';
                }
                uuid += ( i === 12 ? 4 : (i === 16 ? ( random & 3 | 8 ) : random) ).toString(16);
            }
            return uuid;
        }
    },
    {
        NAME: 'TodoProxy'
    }
);
