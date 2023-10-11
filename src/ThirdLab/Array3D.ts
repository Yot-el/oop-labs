export class Array3D {
  private _values: number[] = [];
  private _dim1: number;
  private _dim2: number;
  private _dim3: number;

  constructor (dim1: number, dim2: number, dim3: number) {
    this._dim1 = dim1;
    this._dim2 = dim2;
    this._dim3 = dim3;

    const arrSize = dim1 * dim2 * dim3;
    for (let i = 0; i < arrSize; i++) {
      this._values[i] = 0;
    }
  }

  public getValue(i: number, j: number, k: number): number {
    if (!this.checkIndexes(i, j, k)) throw new Error("Invalid indexes");

    const index = this.calcIndex(i, j, k);
    return this._values[index];
  }

  public getValue_1(coord: number, coordType: 'i' | 'j' | 'k'): number[][] {
    const resultArr: number[][] = [];

    if (coordType === 'i') {
      if (!this.checkIndexes(coord)) throw new Error("Invalid index");

      for (let j = 0; j < this._dim2; j++) {
        for (let k = 0; k < this._dim3; k++) {
          resultArr[j][k] = (this.getValue(coord, j, k));
        }
      }
    }
    else if (coordType === 'j') {
      if (!this.checkIndexes(undefined, coord)) throw new Error("Invalid index");

      for (let i = 0; i < this._dim1; i++) {
        for (let k = 0; k < this._dim3; k++) {
          resultArr[i][k] = this.getValue(i, coord, k);
        }
      }
    }
    else if (coordType === 'k') {
      if (!this.checkIndexes(undefined, undefined, coord)) throw new Error("Invalid index");

      for (let i = 0; i < this._dim1; i++) {
        for (let j = 0; j < this._dim2; j++) {
          resultArr[i][j] = this.getValue(i, j, coord);
        }
      }
    }

    return resultArr;
  }

  public getValue_2(firstCoord: number, firstCoordType: 'i' | 'j',  secondCoord: number, secondCoordType: 'j' | 'k'): number[] {
    if (firstCoordType == secondCoordType) throw new Error("Invalid indexes");
    const resultArr = [];

    if (firstCoordType === 'i' && secondCoordType === 'j') {
      if (!this.checkIndexes(firstCoord, secondCoord)) throw new Error("Invalid indexes");

      for (let k = 0; k < this._dim3; k++) {
        resultArr.push(this.getValue(firstCoord, secondCoord, k));
      }
    }
    else if (firstCoordType === 'i' && secondCoordType === 'k') {
      if (!this.checkIndexes(firstCoord, undefined, secondCoord)) throw new Error("Invalid indexes");

      for (let j = 0; j < this._dim2; j++) {
        resultArr.push(this.getValue(firstCoord, j, secondCoord));
      }
    }
    else if (firstCoordType === 'j' && secondCoordType === 'k') {
      if (!this.checkIndexes(undefined, firstCoord, secondCoord)) throw new Error("Invalid indexes");

      for (let i = 0; i < this._dim1; i++) {
        resultArr.push(this.getValue(i, firstCoord, secondCoord));
      }
    }

    return resultArr;
  }

  public setValue(i: number, j: number, k: number, value: number): void {
    if (!this.checkIndexes(i, j, k)) throw new Error("Invalid indexes");
  
    const index = this.calcIndex(i, j, k);
    this._values[index] = value;
  }

  public setValue_1(coord: number, coordType: 'i' | 'j' | 'k', arr: number[][]): void {
    if (coordType === 'i') {
      if (!this.checkIndexes(coord, arr.length - 1, arr[0].length - 1)) throw new Error("Invalid index");

      for (let j = 0; j < arr.length; j++) {
        for (let k = 0; k < arr[j].length; k++) {
          this.setValue(coord, j, k, arr[j][k]);
        }
      }

      return;
    }
    else if (coordType === 'j') {
      if (!this.checkIndexes(arr.length - 1, coord, arr[0].length - 1)) throw new Error("Invalid index");

      for (let i = 0; i < arr.length; i++) {
        for (let k = 0; k < arr[i].length; k++) {
          this.setValue(i, coord, k, arr[i][k]);
        }
      }

      return;
    }
    else if (coordType === 'k') {
      if (!this.checkIndexes(arr.length - 1, arr[0].length - 1, coord)) throw new Error("Invalid index");

      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
          this.setValue(i, j, coord, arr[i][j]);
        }
      }

      return;
    }
  }

  public setValue_2(firstCoord: number, firstCoordType: 'i' | 'j',  secondCoord: number, secondCoordType: 'j' | 'k', arr: number[]): void {
    if (firstCoordType == secondCoordType) throw new Error("Invalid indexes");

    if (firstCoordType === 'i' && secondCoordType === 'j') {
      if (!this.checkIndexes(firstCoord, secondCoord, arr.length - 1)) throw new Error("Invalid indexes");

      for (let k = 0; k < arr.length; k++) {
        this.setValue(firstCoord, secondCoord, k, arr[k]);
      }
    }
    else if (firstCoordType === 'i' && secondCoordType === 'k') {
      if (!this.checkIndexes(firstCoord, arr.length - 1, secondCoord)) throw new Error("Invalid indexes");

      for (let j = 0; j < arr.length; j++) {
        this.setValue(firstCoord, j, secondCoord, arr[j]);
      }
    }
    else if (firstCoordType === 'j' && secondCoordType === 'k') {
      if (!this.checkIndexes(arr.length - 1, firstCoord, secondCoord)) throw new Error("Invalid indexes");

      for (let i = 0; i < arr.length; i++) {
        this.setValue(i, firstCoord, secondCoord, arr[i]);
      }
    }
  }

  private calcIndex(i: number, j: number, k: number): number {
    console.log(`coord: ${i}, ${j}, ${k}, result is: ${k * (this._dim1 * this._dim2) + j * this._dim1 + i}`);
    return k * (this._dim1 * this._dim2) + j * this._dim1 + i;
  }

  private checkIndexes(i?: number, j?: number, k?: number): boolean {
    if ((i && i >= this._dim1) || (j && j >= this._dim2) || (k && k >= this._dim3)) {
      return false;
    }

    return true;
  }

  public fill(value: number): void {
    for (let i = 0; i < this._dim1; i++) {
      for (let j = 0; j < this._dim2; j++) {
        for (let k = 0; k < this._dim3; k++) {
          this.setValue(i, j, k, value);
        }
      }
    }
  }
}