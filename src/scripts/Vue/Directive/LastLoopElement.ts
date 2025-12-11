import {Directive} from 'vue';
import TypeChecker from "@/scripts/Core/Services/Types/TypeChecker";
import BaseError from "@/scripts/Core/Error/BaseError";

interface LastElement {
    index: number;
    length: number;
    callback: (...args: unknown[]) => void;
    callbackArgs: unknown[];
}

/**
 * @description triggers provided callback on last element in loop. Can be used to trigger some code only when
 *              loop handling is done.
 *
 *              > WARNING < using `$nextTick` in callback might be required in some cases
 */
export const lastLoopElement: Directive<HTMLElement, LastElement> = {
    mounted(el, binding) {
        const {index, callback, callbackArgs = []} = binding.value;
        if (!TypeChecker.isNumber(index)) {
            throw new BaseError(`Expected numeric index, got value: ${index}`)
        }

        if (index === 0) {
            callback(...callbackArgs);
        }
    }
};