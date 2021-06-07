/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const openRequest = createDB();

  // Если создаём задачу
  if (data.evt === 'new-task') {
    openRequest.addEventListener('success', () => {
      const db = openRequest.result

      const transaction = db.transaction('tasks', 'readwrite')
      const tasks = transaction.objectStore('tasks')
      const request = tasks.add(data.taskObject);

      request.addEventListener('success', () => {

        const transaction = db.transaction('tasks', 'readonly')
        const tasks = transaction.objectStore('tasks')
        const request = tasks.getAll()

        request.addEventListener('success', (data) => {
          const filtredTasks = filterTasks(request.result);
          postMessage(filtredTasks);
        })
      })
    })

  // Если изменяем задачу
  } else if (data.evt === 'edit-task') {

    openRequest.addEventListener('success', () => {
      const db = openRequest.result

      const transaction = db.transaction('tasks', 'readwrite')
      const tasks = transaction.objectStore('tasks')
      const request = tasks.put(data.taskObject);

      request.addEventListener('success', () => {

        const transaction = db.transaction('tasks', 'readonly')
        const tasks = transaction.objectStore('tasks')
        const request = tasks.getAll()

        request.addEventListener('success', () => {
          const filtredTasks = filterTasks(request.result);
          postMessage(filtredTasks);
        })
      })
    })



  // Если изменяем только статус задачи
  } else if (data.evt === 'edit-status-task') {

    if (data.taskAndColumn.nextColumnId === 'cdk-drop-list-1') {
      data.taskAndColumn.taskObject.status = 'in-progress'
    } else if (data.taskAndColumn.nextColumnId === 'cdk-drop-list-2') {
      data.taskAndColumn.taskObject.status = 'done'
    }

    openRequest.addEventListener('success', () => {
      const db = openRequest.result

      const transaction = db.transaction('tasks', 'readwrite')
      const tasks = transaction.objectStore('tasks')
      const request = tasks.put(data.taskAndColumn.taskObject);

      request.addEventListener('success', () => {

        const transaction = db.transaction('tasks', 'readonly')
        const tasks = transaction.objectStore('tasks')
        const request = tasks.getAll()

        request.addEventListener('success', () => {
          const filtredTasks = filterTasks(request.result);
          postMessage(filtredTasks);
        })
      })
    })

  // Если удаляем задачу
  } else if (data.evt === 'delete-task')  {

    openRequest.addEventListener('success', () => {
      const db = openRequest.result

      const transaction = db.transaction('tasks', 'readwrite')
      const tasks = transaction.objectStore('tasks')
      const request = tasks.delete(data.id);

      request.addEventListener('success', () => {

        const transaction = db.transaction('tasks', 'readonly')
        const tasks = transaction.objectStore('tasks')
        const request = tasks.getAll()

        request.addEventListener('success', () => {
          const filtredTasks = filterTasks(request.result);
          postMessage(filtredTasks);
        })
      })
    })

  // Если читаем базу
  } else if (data.evt === 'read-tasks') {

    openRequest.addEventListener('success', () => {
      const db = openRequest.result

      const transaction = db.transaction('tasks', 'readonly')
      const tasks = transaction.objectStore('tasks')
      const request = tasks.getAll()

      request.addEventListener('success', () => {
        const filtredTasks = filterTasks(request.result);
        postMessage(filtredTasks);
      })
    })

  // Если не нашлось действие выдать ошибку
  } else {
    throw new Error('Такого действия нет!')
  }




});



function createDB() {
  const openRequest = indexedDB.open('MyBase');

  openRequest.addEventListener('upgradeneeded', () => {
    console.log('openRequest');

    const db = openRequest.result
    if (!db.objectStoreNames.contains('tasks')) {
      db.createObjectStore('tasks', {keyPath: 'id', autoIncrement: true})
      console.log('new tasks bd');
    }
  })

  openRequest.addEventListener('error', () => {
    console.log('error: ', openRequest.error);
  })

  return openRequest;
}

interface Task {
  status: string,
  title: string,
  description?: string
}

function filterTasks(allTasks: Task[]) {

  const resultArr: (Task[])[] = [[],[],[]];

  allTasks.forEach((task: Task) => {
    if (task.status === 'new') {
      resultArr[0].push(task);
    } else if (task.status === 'in-progress') {
      resultArr[1].push(task);
    } else if (task.status === 'done') {
      resultArr[2].push(task);
    }
  });

  return resultArr;
}
