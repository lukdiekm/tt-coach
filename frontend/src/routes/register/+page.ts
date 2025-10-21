import type { PageLoad } from './$types.js';
import { goto } from "$app/navigation";
import fixtures from "$lib/fixtures.js";

export const ssr = false;

export const load = (() => {
    return {
        handleRegister: async (name: string, email: string, password: string, passwordConfirmation: string) => {
            if (password !== passwordConfirmation) {
                throw new Error("Die Passwörter stimmen nicht überein");
            }

            const response = await fetch(`${fixtures.API_URL}/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    password_confirmation: passwordConfirmation,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registrierung fehlgeschlagen");
            }

            localStorage.setItem("token", data.token);
            goto("/");
        }
    };
}) satisfies PageLoad;