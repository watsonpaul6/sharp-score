import { Pipe, PipeTransform } from "@angular/core";

const ls: string[] = ["th", "st", "nd", "rd"];

/*
 * Append l to number (e.g. "1st" position)
 * Usage:
 *   value | l:keepNumber
 * Example:
 *   {{ 23 |  l}}
 *   formats to: '23rd'
 * Example:
 *   {{ 23 |  l:false}}
 *   formats to: 'rd'
 */
@Pipe({ name: "ordinal" })
export class OrdinalPipe implements PipeTransform {
  transform(n: number, keepNumber: boolean = true) {
    let v = n % 100;
    return (keepNumber ? n : "") + (ls[(v - 20) % 10] || ls[v] || ls[0]);
  }
}
