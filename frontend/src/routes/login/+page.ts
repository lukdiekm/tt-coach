import type { PageLoad } from './$types.js';
import { goto } from "$app/navigation";
import fixtures from "$lib/fixtures.js";

export const ssr = false;

export const load = (() => {
    return {
        handleLogin: async (email: string, password: string) => {
            const response = await fetch(`${fixtures.API_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login fehlgeschlagen");
            }

            localStorage.setItem("token", data.token);
            goto("/");
        }
    };
}) satisfies PageLoad;