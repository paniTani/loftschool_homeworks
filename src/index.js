/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {

    return new Promise(function(resolve, reject) {

        setTimeout(function() {
            resolve();
        }, seconds*1000);
    });
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {

    return new Promise(function(resolve, reject) {

        let xhr = new XMLHttpRequest();
        let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

        xhr.open('GET', url, true);
        xhr.send();
        xhr.addEventListener('load', function () {

            let towns = JSON.parse(xhr.responseText);
            let townsArr = [];

            for (let i = 0; i < towns.length; i++) {
                townsArr.push(towns[i].name);
            }

            let sortedTowns = townsArr.sort();
            let returnedArr = [];

            for (let i = 0; i < sortedTowns.length; i++) {
                returnedArr.push( {name:sortedTowns[i]} );
            }

            if(xhr.status < 400){
                resolve(returnedArr);
            }
            else{
                reject();
            }
        })
    });
}

export {
    delayPromise,
    loadAndSortTowns
};
