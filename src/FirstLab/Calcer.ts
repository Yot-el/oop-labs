abstract class Calcer {
  protected h: number | null = null; // Шаг
  protected n: number; // Кол-во отрезков
  protected accuracy: number = 3; // Кол-во знаков после запятой

  constructor (n: number, accuracy?: number) {
    if (!(typeof n === "number")) throw new Error('Кол-во отрезков должно быть числом');
    this.n = n;

    if (accuracy) {
      if (!(typeof accuracy === "number") || accuracy < 0 || accuracy > 10) throw new Error('Кол-во знаков после запятой должно быть числом от 0 до 10');
      this.accuracy = accuracy;
    }
  }

  protected toAccurancy(x: number): number {
    return parseFloat(x.toFixed(this.accuracy));
  };

  public abstract Calc(a: number, b: number, integralFunc: Function): number;
}

class Trapezoidal extends Calcer {
  constructor (n: number, accuracy?: number) {
    // Конструктор наследуемого класса
    super(n, accuracy);
  }

  public Calc(a: number, b: number, integralFunc: Function): number {
    if (!(typeof a === "number") || !(typeof b === "number") || !(integralFunc instanceof Function)) throw new Error('Неправильные типы параметров');

    this.h = (b - a) / this.n;
    let x = a;
    let res: number = 0;

    for (let i = 0; i <= this.n; i++) {
      let integralFuncResult = this.toAccurancy(integralFunc(x));
      if (i === 0 || i === this.n) {
        integralFuncResult = this.toAccurancy(integralFuncResult / 2);
      }

      res += integralFuncResult;
      x += this.h;
    }

    return this.toAccurancy(res * this.h);
  }
}

class Simpson extends Calcer {
  constructor (n: number, accuracy?: number) {
    // Конструктор наследуемого класса
    super(n, accuracy);
  }

  public Calc(a: number, b: number, integralFunc: Function): number {
    if (!(typeof a === "number") || !(typeof b === "number") || !(integralFunc instanceof Function)) throw new Error('Неправильные типы параметров');

    this.h = (b - a)/this.n;
    let x = a;
    let res: number = 0;

    for (let i = 0; i <= this.n; i++) {
      const integralFuncResult = this.toAccurancy(integralFunc(x));

      if (i === 0 || i === this.n) {
        res += integralFuncResult;
      }
      else if (i % 2 === 0) {
        res += 2 * integralFuncResult;
      }
      else {
        res += 4 * integralFuncResult;
      }

      x += this.h;
    }

    return this.toAccurancy(res * this.h / 3);
  }
}


// Проверка

const trapExample = new Trapezoidal(10, 4);
const simExample = new Simpson(10, 4);

const callback = (x: number): number => {
  return (1 / (5*x + 1));
}

console.log(`Метод трапеции: ${trapExample.Calc(0, 1, 'asa')}`);
console.log(`Метод Симпсона: ${simExample.Calc(0, 1, callback)}`);