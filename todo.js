
      let todos;

      // Retrieve localStorage
      const savedTodos = JSON.parse(localStorage.getItem('todos'));

      // Controleer of het een array is
      if (Array.isArray(savedTodos)) {
        todos = savedTodos;
      } else {
        todos = [{
          title: 'Boodschappen',
          dueDate: '10-02-2023',
          id: 'id1'
        }, {
          title: 'Autowassen',
          dueDate: '15-02-2023',
          id: 'id2'
        }, {
          title: 'Eten maken',
          dueDate: '20-02-2023',
          id: 'id3'
        }];
      }

      // Maak een nieuwe todo
      const createTodo = (title, dueDate) => {
        const id = '' + new Date().getTime();

        todos.push({
          title: title,
          dueDate: dueDate,
          id: id
        });

        saveTodos();
      }

      // Delete een todo
      const removeTodo = idToDelete => {
        todos = todos.filter(todo => {
          // If  id van deze todo is gelijk aan idToDelete, return false
          // Alle overige else, return true
          if (todo.id === idToDelete) {
            return false;
          } else {
            return true;
          }
        });

        saveTodos();
      }

      const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
      }

      // Controller
      const addTodo = () => {
        const textbox = document.getElementById('todo-title');
        const title = textbox.value;

        const datePicker = document.getElementById('date-picker');
        const dueDate = datePicker.value;

        createTodo(title, dueDate);
        render();
      }

      const deleteTodo = event => {
        const deleteButton = event.target;
        const idToDelete = deleteButton.id;

        removeTodo(idToDelete);
        render();
      }

      // View
      const render = () => {
        // reset de lijst
        document.getElementById('todo-list').innerHTML = '';

        todos.forEach(todo => {
          const element = document.createElement('div');
          element.innerText = todo.title + ' ' + todo.dueDate;

          const deleteButton = document.createElement('button');
          deleteButton.innerText = 'Delete';
          deleteButton.style = 'margin-left: 12px';
          deleteButton.onclick = deleteTodo;
          deleteButton.id = todo.id;
          element.appendChild(deleteButton);

          const todoList = document.getElementById('todo-list');
          todoList.appendChild(element);
        });
      }

      render();