export class Point {
  public x: number;
  public y: number;
  public z: number;
  
  constructor (x: number, y: number, z: number) {
    if (isNaN(x) || isNaN(y) || isNaN(z)) {
      throw new Error('Точка не может быть создана с такими параметрами')
    }

    this.x = x;
    this.y = y;
    this.z = z;
  }
}