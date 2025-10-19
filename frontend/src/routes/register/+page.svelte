<script lang="ts">
    import { goto } from "$app/navigation";
    import fixtures from "$lib/fixtures.js";

    const API_URL = fixtures.API_URL
    let name = "";
    let email = "";
    let password = "";
    let passwordConfirmation = "";
    let errorMessage = "";
    let isLoading = false;

    async function handleSubmit() {
        isLoading = true;
        errorMessage = "";

        if (password !== passwordConfirmation) {
            errorMessage = "Die Passwörter stimmen nicht überein";
            isLoading = false;
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/register`, {
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

            // Token speichern
            localStorage.setItem("token", data.token);

            // Zur Hauptseite weiterleiten
            goto("/");
        } catch (error) {
            errorMessage =
                error instanceof Error
                    ? error.message
                    : "Ein Fehler ist aufgetreten";
        } finally {
            isLoading = false;
        }
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-900">
    <div class="max-w-md w-full space-y-8 p-8">
        <div>
            <h2
                class="mt-6 text-center text-3xl font-bold tracking-tight text-white"
            >
                Registrieren
            </h2>
            <p class="mt-2 text-center text-sm text-gray-400">
                Oder
                <a
                    href="/login"
                    class="font-medium text-indigo-400 hover:text-indigo-300"
                >
                    melde dich mit deinem bestehenden Account an
                </a>
            </p>
        </div>
        <form class="mt-8 space-y-6" on:submit|preventDefault={handleSubmit}>
            {#if errorMessage}
                <div class="rounded-md bg-red-500/10 p-4">
                    <div class="text-sm text-red-400">
                        {errorMessage}
                    </div>
                </div>
            {/if}

            <div class="space-y-6 rounded-md">
                <div>
                    <label
                        for="name"
                        class="block text-sm font-medium text-white"
                    >
                        Name
                    </label>
                    <div class="mt-1">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            bind:value={name}
                            class="block w-full rounded-md bg-white/5 border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            placeholder="Max Mustermann"
                        />
                    </div>
                </div>

                <div>
                    <label
                        for="email"
                        class="block text-sm font-medium text-white"
                    >
                        E-Mail
                    </label>
                    <div class="mt-1">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autocomplete="email"
                            required
                            bind:value={email}
                            class="block w-full rounded-md bg-white/5 border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            placeholder="your@email.com"
                        />
                    </div>
                </div>

                <div>
                    <label
                        for="password"
                        class="block text-sm font-medium text-white"
                    >
                        Passwort
                    </label>
                    <div class="mt-1">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            bind:value={password}
                            class="block w-full rounded-md bg-white/5 border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            placeholder="••••••••"
                            minlength="8"
                        />
                    </div>
                </div>

                <div>
                    <label
                        for="password_confirmation"
                        class="block text-sm font-medium text-white"
                    >
                        Passwort bestätigen
                    </label>
                    <div class="mt-1">
                        <input
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            required
                            bind:value={passwordConfirmation}
                            class="block w-full rounded-md bg-white/5 border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            placeholder="••••••••"
                            minlength="8"
                        />
                    </div>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isLoading}
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {#if isLoading}
                        <svg
                            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                class="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                            ></circle>
                            <path
                                class="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        Registrierung läuft...
                    {:else}
                        Registrieren
                    {/if}
                </button>
            </div>
        </form>
    </div>
</div>
