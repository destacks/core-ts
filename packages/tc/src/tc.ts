import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * `tc` merges & sorts Tailwind CSS class names.
 *
 * Built on top of `clsx` & `tailwind-merge`.
 *
 * Example:
 *
 * ```jsx
 * import tc from "@destacks/tc";
 * const Button = ({ isAlert }) => <button className={tc('bg-blue-600', isAlert && 'bg-red-300')}>Click Me</button>;
 * ```
 *
 * More information at: https://github.com/destacks/tc
 */
const tc = (...classValues: ClassValue[]) => twMerge(clsx(...classValues));

export default tc;
