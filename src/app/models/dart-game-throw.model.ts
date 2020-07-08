export class DartGameThrow {
  // text: string;
  // value: number;
  // size: 'third' | 'fourth' | 'sixth';

  constructor(public text: string, public value: number, public size?: "half" | "third" | "fourth" | "sixth") {}

  public gotIn?: boolean;
  public gotOut?: boolean;
  public doesNotCount?: boolean;
}
