// utils/cookies.ts
import Cookies from 'js-cookie';

export function setCookie(name: string, value: string, days: number) {
    Cookies.set(name, value, { expires: days, secure: true });
}

export function getCookie(name: string): string | undefined {
    return Cookies.get(name);
}
export function removeCookie(name: string) {
    Cookies.remove(name);
}