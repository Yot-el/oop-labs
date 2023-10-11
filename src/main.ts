import './style.css'
// import { setupSecondLab } from './SecondLab/secondLab';
import { Array3D } from './ThirdLab/Array3D';
// import './FirstLab/Calcer';

// setupSecondLab();

const dim1 = 3;
const dim2 = 2;
const dim3 = 4;
let val = 1;

const arr = new Array3D(dim1, dim2, dim3);

for (let i = 0; i < dim1; i++) {
  for (let j = 0; j < dim2; j++) {
    for (let k = 0; k < dim3; k++) {
      console.log(`Value: ${val}`);
      arr.setValue(i, j, k, val++);
    }
  }
}

// console.log('----------');
// const newArr = [[100, 101, 102, 103], [110, 111, 112, 113]];
// arr.setValue_1(1, 'i', newArr);

// console.log('----------');
// arr.setValue(2, 1, 3, 213);

// console.log('----------');
// const newArr_1 = [-20, -40];
// arr.setValue_2(1, 'i', 2, 'k', newArr_1);

// console.log('----------');
// arr.fill(-100);

console.log(arr);

