/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  let response = `worker response to ${data}`;




  const openRequest = createDB();



  // Если создаём задачу
  if (data.evt === 'new-task') {
    response = 'new task created'



    openRequest.addEventListener('success', () => {
      const db = openRequest.result

      const transaction = db.transaction('tasks', 'readwrite')
      const tasks = transaction.objectStore('tasks')

      const request = tasks.add(data.taskObject);

      request.addEventListener('success', () => {
        // console.log('задача создана и помещена в базу данных!')
        postMessage('задача создана и помещена в базу данных!');

        const transaction = db.transaction('tasks', 'readonly')
        const tasks = transaction.objectStore('tasks')
        // console.log('объект базы: ', tasks.getAll())
        const request = tasks.getAll()
        request.addEventListener('success', (data) => {
          console.log('таски дай: ', request.result)
          postMessage(request.result);
        })
      })


      // console.log('db: ', db);
    })






  // Если изменяем задачу
  } else if (data.evt === 'edit-task') {




    postMessage(response);
  // Если удаляем задачу
  } else if (data.evt === 'delete-task')  {




    postMessage(response);
  // Если читаем базу
  } else if (data.evt === 'read-tasks') {




    postMessage(response);
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
