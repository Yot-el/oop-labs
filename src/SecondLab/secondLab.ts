import { Vector } from "./Vector";
import { Point } from "./Point";

const secondLabHtml = `
<h2>Лабораторная работа №2</h2>
<div class="vector">
  <input type="text" name="vector" id="vector" class="vector-input" placeholder="Новый вектор">
  <button class="vector-add" type="button">Добавить</button>
  <p class="vector-note">
    Задать вектор можно двумя способами:<br>
    1. Прописав в инпуте координаты вектора в виде:<br> x, y, z<br>
    2. Прописав 2 точки A, B в виде:<br> Ax, Ay, Az, Bx, By, Bz
  </p>
  <span class="vector-error"></span>
</div>
<div class="selects">
  <div class="selects-vectors">
    <select name="vector-select" id="vector-select" class="select">
      <option value="" disabled>Первый вектор</option>
    </select>
    <select name="vector-select" id="vector-select" class="select">
      <option value="" disabled>Второй вектор</option>
      <option value="none">-</option>
    </select>
    <select name="vector-select" id="vector-select" class="select">
      <option value="" disabled>Третий вектор</option>
      <option value="none">-</option>
    </select>
  </div>
  <select name="operation-select" id="operation-select" class="select selects__operation" size="3">
    <option value="add">Сложение</option>
    <option value="subtract">Вычитание</option>
    <option value="reverse">Обратный вектор</option>
    <option value="length">Длина</option>
    <option value="unit">Единичный вектор</option>
    <option value="scalar-product">Скалярное произведение</option>
    <option value="vector-product">Векторное произведение</option>
    <option value="triple-product">Смешанное произведение</option>
    <option value="check-collinear">Проверить коллинеарность</option>
    <option value="check-coplanarity">Проверить компланарность</option>
    <option value="get-angle">Угол между векторами</option>
  </select>
  <button class="selects-button">Вычислить</button>
</div>
<textarea name="result" id="result" cols="30" rows="10" placeholder="Результат вычислений"></textarea>
`
const vectors: Array<Vector> = [];

export const setupSecondLab = () => {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = secondLabHtml;

  const createVector = (vector: Vector) => {
    vectors.push(vector);

    const vectorSelects = document.querySelectorAll<HTMLSelectElement>('#vector-select');
    const selectOption = document.createElement('option');
    selectOption.setAttribute('value', `${vectors.length - 1}`);
    selectOption.innerText = `(${vector.getX()}, ${vector.getY()}, ${vector.getZ()})`;
  
    vectorSelects.forEach((select) => {
      select.append(selectOption.cloneNode(true));
    })
  }

  const vectorAddButton = document.querySelector<HTMLButtonElement>('.vector-add');
  const vectorInput = document.querySelector<HTMLInputElement>('.vector-input');
  const vectorError = document.querySelector<HTMLSpanElement>('.vector-error');

  // Добавление вектора
  vectorAddButton?.addEventListener('click', () => {
    const vectorArgs = vectorInput?.value.split(' ').map((arg) => parseFloat(arg));
    vectorError!.innerText = '';

    try {
      if (vectorArgs?.length === 6) {
        const firstPoint = new Point(vectorArgs[0], vectorArgs[1], vectorArgs[2]);
        const secondPoint = new Point(vectorArgs[3], vectorArgs[4], vectorArgs[5]);
        const newVector = new Vector(firstPoint, secondPoint);
        createVector(newVector);
        vectorInput!.value = '';
      }
      else if (vectorArgs?.length === 3) {
        const newVector = new Vector(vectorArgs[0], vectorArgs[1], vectorArgs[2]);
        createVector(newVector);
        vectorInput!.value = '';
      }
      else {
        throw new Error('Слишком много или мало параметров');
      }
    }
    catch (err: any) {
      vectorError!.innerText = err.message;
    }
  })

  // Вычисление

  const calculateButton = document.querySelector<HTMLButtonElement>('.selects-button');
  const resultContainer = document.querySelector<HTMLTextAreaElement>('#result');
  const operation = document.querySelector<HTMLSelectElement>('#operation-select');

  const calculateOperation = (operation: string, [firstVector, secondVector, thirdVector]: Array<Vector>) => {
    let result: Vector | number | boolean;

    try {
      switch (operation) {
        case 'add': {
          if (!firstVector || !secondVector) throw new Error('Необходимо выбрать 2 вектора')
          result = firstVector.add(secondVector);
          break;
        }
        case 'subtract': {
          if (!firstVector || !secondVector) throw new Error('Необходимо выбрать 2 вектора')
          result = firstVector.subtract(secondVector);
          break;
        }
        case 'reverse': {
          if (!firstVector) throw new Error('Необходимо выбрать вектор')
          result = firstVector.reverse();
          break;
        }
        case 'length': {
          if (!firstVector) throw new Error('Необходимо выбрать вектор')
          result = firstVector.length();
          break;
        }
        case 'unit': {
          if (!firstVector) throw new Error('Необходимо выбрать вектор')
          result = firstVector.createUnit();
          break;
        }
        case 'scalar-product': {
          if (!firstVector || !secondVector) throw new Error('Необходимо выбрать 2 вектора')
          result = firstVector.scalarProduct(secondVector);
          break;
        }
        case 'vector-product': {
          if (!firstVector || !secondVector) throw new Error('Необходимо выбрать 2 вектора')
          result = firstVector.vectorProduct(secondVector);
          break;
        }
        case 'triple-product': {
          if (!firstVector || !secondVector || !thirdVector) throw new Error('Необходимо выбрать 3 вектора')
          result = firstVector.tripleProduct(secondVector, thirdVector);
          break;
        }
        case 'check-collinear': {
          if (!firstVector || !secondVector) throw new Error('Необходимо выбрать 2 вектора')
          result = firstVector.checkCollinear(secondVector);
          break;
        }
        case 'check-coplanarity': {
          if (!firstVector || !secondVector || !thirdVector) throw new Error('Необходимо выбрать 3 вектора')
          result = firstVector.checkCoplanarity(secondVector, thirdVector);
          break;
        }
        case 'get-angle': {
          if (!firstVector || !secondVector) throw new Error('Необходимо выбрать 2 вектора')
          result = firstVector.getAngle(secondVector);
          break;
        }
        default: {
          throw new Error('Данной операции не предусмотрено');
        }
      }
    }
    catch (err: any) {
      result = err.message;
    }

    if (result instanceof Vector) {
      resultContainer!.value = `Итоговый вектор: (${result.getX()}, ${result.getY()}, ${result.getZ()})`;
      return;
    }

    resultContainer!.value = `${result}`;
  }

  calculateButton?.addEventListener('click', () => {
    const vectorSelects = document.querySelectorAll<HTMLSelectElement>('#vector-select');
    const activeVectors: Array<Vector> = [];
    
    vectorSelects.forEach((vector) => {
      if (vector.value !== 'none') {
        activeVectors.push(vectors[parseFloat(vector.value)]);
      }
    })

    calculateOperation(operation!.value, activeVectors);
  })
}
