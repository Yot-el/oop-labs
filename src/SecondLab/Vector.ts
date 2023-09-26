import { Point } from './Point';

export class Vector {
  private _x: number;
  private _y: number;
  private _z: number;

  // Перегрузка конструктора
  constructor(firstPoint: Point, secondPoint: Point);
  constructor(x: number, y: number, z: number);

  constructor(xFirstPoint: any, ySecondPoint: any, z?: number) {
    // @ts-ignore
    if (!isNaN(xFirstPoint) && !isNaN(ySecondPoint) && !isNaN(z)) {
      this._x = xFirstPoint;
      this._y = ySecondPoint;
      // @ts-ignore
      this._z = z;
    }
    else if (xFirstPoint instanceof Point && ySecondPoint instanceof Point) {
      this._x = ySecondPoint.x - xFirstPoint.x;
      this._y = ySecondPoint.y - xFirstPoint.y;
      this._z = ySecondPoint.z - xFirstPoint.z;
    }
    else {
      throw new Error('Вектор не может быть создан с такими параметрами')
    }
  }

  // Геттеры координат
  public getX():number {
    return this._x;
  }

  public getY():number {
    return this._y;
  }

  public getZ():number {
    return this._z;
  }

  // Операции
  public reverse(): Vector {
    return new Vector(-this._x, -this._y, -this._z);
  }

  public length(): number {
    const summ = this._x ** 2 + this._y ** 2 + this._z ** 2
    return parseFloat((Math.sqrt(summ)).toFixed(5));
  }

  public add(vector: Vector): Vector {
    const x = this._x + vector.getX();
    const y = this._y + vector.getY();
    const z = this._z + vector.getZ();

    return new Vector(x, y, z);
  }

  public subtract(vector: Vector): Vector {
    const reversedVector = vector.reverse();

    const x = this._x + reversedVector.getX();
    const y = this._y + reversedVector.getY();
    const z = this._z + reversedVector.getZ();

    return new Vector(x, y, z);
  }

  public createUnit(): Vector {
    const length = this.length();

    const x = parseFloat((this._x / length).toFixed(5));
    const y = parseFloat((this._y / length).toFixed(5));
    const z = parseFloat((this._z / length).toFixed(5));

    return new Vector(x, y, z);
  }

  public scalarProduct(vector: Vector): number {
    return (this._x * vector.getX() + this._y * vector.getY() + this._z * vector.getZ());
  }

  public vectorProduct(vector: Vector): Vector {
    const x = this._y * vector.getZ() - this._z * vector.getY();
    const y = -(this._x * vector.getZ() - this._z * vector.getX());
    const z = this._x * vector.getY() - this._y * vector.getX();

    return new Vector(x, y, z);
  }

  public tripleProduct(firstVector: Vector, secondVector: Vector): number {
    // Векторное произведение двух получаемых векторов
    const resultOfVectorProduct = firstVector.vectorProduct(secondVector);
    // Скалярное произведение
    return this.scalarProduct(resultOfVectorProduct);
  }

  public checkCollinear(vector: Vector): boolean {
    const vectorProduct = this.vectorProduct(vector);
    return (vectorProduct.getX() === 0 && vectorProduct.getY() === 0 && vectorProduct.getZ() === 0);
  }

  public checkCoplanarity(firstVector: Vector, secondVector: Vector): boolean {
    return this.tripleProduct(firstVector, secondVector) === 0;
  }

  public getAngle(vector: Vector): number {
    const angle = (this.scalarProduct(vector)) / (this.length() * vector.length());
    return Math.acos(parseFloat(angle.toFixed(2))) * 180 / Math.PI;
  }
}