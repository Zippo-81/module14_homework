const numberPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      let number = Math.floor(Math.random()*100)+1;
      //console.log(number);
      if(number % 2 === 0) {
          resolve({
              message: `Завершено успешно. Сгенерированное число — ${number}`
          });
      } else {
          reject({
            message: `Завершено с ошибкой. Сгенерированное число — ${number}`
          });
      };  
    }, 3000);
});

numberPromise
    .then((result) => {
      console.log(result.message);
    })
    .catch((error) => {
      console.log(error.message);
    })
    