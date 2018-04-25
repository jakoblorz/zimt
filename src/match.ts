/**
 * tests "equalness" of two strings: returns the position
 * in the tester string at which it differs from the matcher
 * @param tester string to test agains matcher
 * @param matcher string to which tester should match
 */
export function match(tester: string, matcher: string): number {

    if (matcher.length === 0) {
        return 0;
    }

    if (tester.length === 0) {
        return 0;
    }

    if (tester.length < matcher.length) {
        return 0;
    }

    if (tester[0] !== matcher[0]) {
        return 0;
    }

    return match(tester.slice(1, tester.length), matcher.slice(1, matcher.length)) + 1;
}
